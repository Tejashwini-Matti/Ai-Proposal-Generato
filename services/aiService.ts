import { buildProposalPrompt } from "@/utils/promptBuilder";

export type GenerateProposalInput = {
  industry: string;
  revenue: string;
  pain_points: string;
};

export async function generateProposalText(input: GenerateProposalInput) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set. Add it to .env.local and restart the dev server.");
  }

  const prompt = buildProposalPrompt(input);

  const apiKey = process.env.GEMINI_API_KEY;
  const preferred = (process.env.GEMINI_MODEL ?? "").trim();

  const selectedModel = preferred || (await pickFirstGenerateContentModel(apiKey));

  const text = await generateContentRest({
    apiKey,
    model: selectedModel,
    prompt,
  });

  return text.trim();
}

async function pickFirstGenerateContentModel(apiKey: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`;
  let res: Response;
  try {
    res = await fetch(url, { method: "GET" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Network error calling Gemini ListModels. Message: ${msg}. Check your internet connection, firewall/proxy, and that https://generativelanguage.googleapis.com is reachable from this machine.`,
    );
  }
  const data = (await res.json()) as {
    models?: Array<{
      name?: string;
      supportedGenerationMethods?: string[];
    }>;
    error?: unknown;
  };

  if (!res.ok) {
    throw new Error(
      `Failed to list Gemini models (check API key / access). Response: ${JSON.stringify(data)}`,
    );
  }

  const models = data.models ?? [];
  const match = models.find((m) =>
    (m.supportedGenerationMethods ?? []).includes("generateContent"),
  );

  if (!match?.name) {
    throw new Error(
      `No available Gemini model supports generateContent for this API key. Models response: ${JSON.stringify(data)}`,
    );
  }

  return match.name;
}

async function generateContentRest({
  apiKey,
  model,
  prompt,
}: {
  apiKey: string;
  model: string;
  prompt: string;
}): Promise<string> {
  const modelPath = model.startsWith("models/") ? model : `models/${model}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/${modelPath}:generateContent?key=${encodeURIComponent(apiKey)}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Network error calling Gemini generateContent. Message: ${msg}. Check your internet connection, firewall/proxy, and that https://generativelanguage.googleapis.com is reachable from this machine.`,
    );
  }

  const data = (await res.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
    error?: { message?: string };
  };

  if (!res.ok) {
    throw new Error(
      `Gemini generateContent failed for ${modelPath}. Response: ${JSON.stringify(data)}`,
    );
  }

  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  if (!text.trim()) {
    throw new Error(`Gemini returned empty content. Response: ${JSON.stringify(data)}`);
  }

  return text;
}
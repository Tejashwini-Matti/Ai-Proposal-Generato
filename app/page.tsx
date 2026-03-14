import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-zinc-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-indigo-200/50 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white" />
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <Image src="/next.svg" alt="Logo" width={88} height={18} priority />
          <div className="text-sm font-semibold tracking-tight">AI Proposal Generator</div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://ai.google.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 sm:inline"
          >
            Gemini Docs
          </a>
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800"
          >
            Open Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <section>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm">
              Built for quick client-ready proposals
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              Generate professional proposals in minutes.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
              Enter client details, generate an AI draft, then refine, version, and export as a PDF.
              A clean workflow designed for speed and consistency.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Start generating
              </Link>
              <Link
                href="/history"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50"
              >
                View proposal history
              </Link>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-zinc-700">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <div>
                  <span className="font-semibold text-zinc-900">Editable output</span> so you can match your brand voice.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                <div>
                  <span className="font-semibold text-zinc-900">Versioned saves</span> to keep iterations organized.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-zinc-900" />
                <div>
                  <span className="font-semibold text-zinc-900">One-click PDF export</span> for client delivery.
                </div>
              </div>
            </div>
          </section>

          <section className="relative">
            <div className="rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur">
              <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                <div className="text-xs font-semibold text-zinc-500">Preview</div>
                <div className="mt-2 text-sm font-semibold text-zinc-900">AI Proposal Draft</div>
                <div className="mt-2 space-y-2 text-sm leading-6 text-zinc-600">
                  <div className="h-2 w-11/12 rounded bg-zinc-100" />
                  <div className="h-2 w-10/12 rounded bg-zinc-100" />
                  <div className="h-2 w-9/12 rounded bg-zinc-100" />
                  <div className="h-2 w-11/12 rounded bg-zinc-100" />
                  <div className="h-2 w-8/12 rounded bg-zinc-100" />
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                  <div className="text-xs font-semibold text-zinc-500">Step 1</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-900">Input</div>
                  <div className="mt-1 text-xs text-zinc-600">Industry, revenue, pain points</div>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                  <div className="text-xs font-semibold text-zinc-500">Step 2</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-900">Generate</div>
                  <div className="mt-1 text-xs text-zinc-600">AI structured proposal</div>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                  <div className="text-xs font-semibold text-zinc-500">Step 3</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-900">Export</div>
                  <div className="mt-1 text-xs text-zinc-600">Save + PDF</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-14 border-t border-zinc-200 pt-8 text-sm text-zinc-500">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>AI Proposal Generator Platform</div>
            <div className="text-zinc-500">Powered by Gemini</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

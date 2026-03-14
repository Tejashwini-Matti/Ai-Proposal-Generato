import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <main className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-black">
        <div className="flex items-center gap-3">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Logo"
            width={88}
            height={18}
            priority
          />
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            AI Proposal Generator Platform
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Generate professional AI proposals in minutes.
        </h1>
        <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Enter an industry, revenue size, and pain points. The system generates a structured business
          proposal you can edit, save with versioning, and export to PDF.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white"
          >
            Open Dashboard
          </Link>
          <a
            href="https://ai.google.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 dark:border-zinc-800 dark:bg-black dark:text-zinc-100"
          >
            Gemini Docs
          </a>
        </div>
      </main>
    </div>
  );
}

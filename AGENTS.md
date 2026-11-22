# Handball learning platform (working title)

Dutch learning site for amateur youth handball coaches: series of drills and tactics, each shown step by step with the board of Handball Coachboard. Laravel, Inertia and Svelte 5 with PostgreSQL, hosted on Laravel Cloud at academy.handballcoachboard.com. `CLAUDE.md` is a symlink to this file. The plan is `plan.md` (Dutch), with one file per step in `plans/`: read only the step you are working on.

Quality of the product and the code comes before speed and cost. A date may move; the bar doesn't.

## Who does what

- **Kay** decides, writes the data model and the first pages himself, reviews and merges. Testing with coaches and contact with the federation are his: no step waits for them, and you don't plan them or ask about them.
- **Claude in chat** makes the one-page plan and the start prompt for each step, and keeps the whiteboard up to date.
- **Claude Code** builds one task at a time from that start prompt.

## How we work

- One task, one branch, one pull request. A step may take several. Never work on `main`, and `main` always works.
- Build only after Kay approved the step's plan. If the work grows beyond the start prompt, stop and say so.
- Where the plan says Kay writes the code, write the failing tests first, then review what he wrote and explain it. Change his code only when he agrees.
- Small commits. Every check green before every commit. The one exception: a failing test written for code Kay still has to write.
- Before opening a pull request, read your own diff. The PR says what changed, why, how to test it, the risks, and what you could not test.
- Done means merged.
- No new dependency and no paid service without Kay's yes: name, version, size, reason, and the alternative without it.
- Look up version-specific details (Laravel, Inertia, Svelte, the host) in the official docs, not from memory.
- If the repo is public: commit only with Kay's GitHub noreply address.

## Quality bar

- A feature test for every route and command, and unit tests for parsing and validation.
- Browser tests on a phone-sized screen for the main routes, including an accessibility check per page type.
- Public pages work without JavaScript: a test fetches the server HTML and finds the title and the first step.
- CI runs the starter kit's own checks (format, lint, types), the tests and the SSR build on every pull request. Merge only when it is green.
- Tests run on PostgreSQL 18, the engine production uses, locally and in CI. Never on SQLite.
- Mobile first. No script from another origin and no analytics in the page.

## Sessions

The budget is one Pro plan with no extra usage. When a limit is hit, stop and continue after the reset. Never lower the bar to finish sooner.

- One task per session. No subagents and no parallel agents.
- Read the files the start prompt names. Ask before searching the whole repo.

## Content and board code

- One source: drills and tactics are the Markdown files in the `coachboard` submodule (`src/content/library/`). Never edit or copy anything in the submodule.
- Series live in `content/series/` here: title, summary, ages and the items in order.
- The board comes from the submodule: `Court.svelte` and `src/lib/board`. The link format is a contract (`docs/link-format.md` there): build links with its `encode()`, never by hand, and compare boards, never link strings.
- Dutch site text is agreed with Kay first. Reuse the submodule's own strings (`t()`, `agesLabel()`) where they exist, and follow "Copy" in its `AGENTS.md` for handball terms.

## Rules for pages

- Every URL starts with `/nl`. A published URL keeps working.
- Public pages render on the server (Inertia SSR).
- A drill's or tactic's page sets its canonical to the same item on handballcoachboard.com.
- Reading needs no account. An account holds an email address and a password, nothing else, and its owner can delete it.

## Commands

Fill in during step 3 with the commands that exist in this repo: dev server, checks, tests, build with SSR.

## Not yet

Forum, payments, search, learning paths, other authors, an inline player, English.

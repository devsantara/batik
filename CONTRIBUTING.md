# Contributing to Batik

First off, thank you. Batik is a token-first design system for
[StyleX](https://stylexjs.com), and it gets better every time someone reports a
rough edge, asks a sharp question, or sends a fix.

This guide explains how the project works so your time goes into the
contribution itself instead of guessing at process. None of it is meant to
gatekeep. If something here is unclear or gets in your way, that is a bug in
this document, and we would like to hear about it.

> [!NOTE]
> Batik is in early development. The API is not stable, nothing is on npm yet,
> and large parts of the design are still moving. Open an issue before you
> start on anything bigger than a small fix, so your work does not collide with
> changes already underway.

## Contents

- [Ways to contribute](#ways-to-contribute)
- [Asking questions](#asking-questions)
- [Reporting bugs](#reporting-bugs)
- [Suggesting features](#suggesting-features)
- [Reporting security issues](#reporting-security-issues)
- [Your first contribution](#your-first-contribution)
- [Development setup](#development-setup)
- [Making a change](#making-a-change)
- [Commit messages](#commit-messages)
- [Changesets](#changesets)
- [Opening a pull request](#opening-a-pull-request)
- [Code review](#code-review)
- [Releases](#releases)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

## Ways to contribute

Code is only one way to help. All of these count:

- **Report bugs** with a reproduction someone else can run.
- **Propose ideas** for tokens, primitives, or APIs, and argue for them.
- **Improve documentation**: fix a typo, clarify a paragraph, add an example
  that would have saved you an hour.
- **Review pull requests.** A second pair of eyes, even with no merge rights,
  catches real problems.
- **Answer questions** in [Discussions][discussions].
- **Try Batik** in a real project and tell us where it hurt.

## Asking questions

Use [GitHub Discussions][discussions] for questions, "how do I…", and
half-formed ideas. The issue tracker is for bugs and concrete proposals, and
keeping it that way lets maintainers act on it quickly.

Before you ask, search existing discussions and issues. Someone may have
already asked.

## Reporting bugs

Search [open and closed issues][issues] first. If you find a match, add a 👍
reaction or new information to it instead of opening a duplicate. "+1" comments
notify everyone watching and do not help anyone fix the problem.

If nothing matches, [open a bug report][new-issue]. A good report has:

- **A minimal reproduction.** A small repository or a StackBlitz link is best.
  A bug we can reproduce is a bug we can fix. A bug we cannot reproduce
  usually stalls.
- **Expected versus actual behavior**, stated plainly.
- **Versions** of Batik, StyleX, Node.js, your bundler, and your OS.
- **Error output** pasted as text, not screenshots.

## Suggesting features

[Open a feature request][new-issue] and lead with the problem, not the
solution. "I can't express X without Y" gives us far more to work with than
"add option Z". Describe what you tried, why it fell short, and who else is
likely to run into the same thing.

Not every good idea fits Batik. A design system stays useful by staying
coherent, so a "no" or "not yet" is a statement about scope, not about the
quality of your idea.

## Reporting security issues

**Do not report security vulnerabilities in public issues, discussions, or pull
requests.** Follow [SECURITY.md](./SECURITY.md) to report them privately
through a GitHub security advisory.

## Your first contribution

New to open source, or new to this project? Welcome. Some ways in:

- Look for issues labelled
  [`good first issue`][good-first-issue]. They are scoped to be approachable
  without deep knowledge of the codebase.
- Look for [`help wanted`][help-wanted] issues, which the maintainers want
  done but have not gotten to.
- Documentation fixes are always a good first pull request.

Comment on an issue before you start working on it, so two people do not solve
the same problem in parallel. If an issue has been claimed but has seen no
activity for a couple of weeks, ask whether it is still in progress.

Never contributed to a project on GitHub before?
[How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
and
[First Contributions](https://github.com/firstcontributions/first-contributions)
walk through forking, branching, and opening a pull request.

## Development setup

### Prerequisites

Batik uses [Vite+](https://viteplus.dev), a unified toolchain that wraps
Node.js, pnpm, Vite, Vitest, Oxlint, and Oxfmt behind one CLI called `vp`.
[Install Vite+](https://viteplus.dev/guide/#install-vp) first. It downloads the
exact Node.js and pnpm versions this repository pins, so you do not need to
install or manage them yourself.

### Get the code

[Fork the repository](https://github.com/devsantara/batik/fork), then:

```bash
git clone https://github.com/<your-username>/batik.git
cd batik
git remote add upstream https://github.com/devsantara/batik.git
vp install
```

`vp install` installs dependencies and sets up the Git hooks that format staged
files and lint commit messages. Run it again whenever you pull new changes.

### Project layout

This is a pnpm workspace:

| Path          | What lives there                                   |
| ------------- | -------------------------------------------------- |
| `packages/*`  | Published libraries                                |
| `apps/*`      | Documentation, playgrounds, and other private apps |
| `.changeset/` | Pending release notes                              |
| `.github/`    | CI workflows and issue templates                   |

### Commands

| Command                  | What it does                                |
| ------------------------ | ------------------------------------------- |
| `vp check`               | Format, lint, and type check the whole repo |
| `vp check --fix`         | Same, and apply every automatic fix it can  |
| `vp test`                | Run the test suite                          |
| `vp test watch`          | Run the test suite in watch mode            |
| `vp test run --coverage` | Run the test suite once and report coverage |
| `vp run changeset`       | Write a changeset for your change           |

`vp <name>` runs a built-in Vite+ command. `vp run <name>` runs a script from
`package.json`. When in doubt, `vp help` lists everything.

If your environment misbehaves, run `vp env doctor` and include its output
when you ask for help.

## Making a change

1. **Sync with upstream** and branch off `main`:

   ```bash
   git switch main
   git pull upstream main
   vp install
   git switch -c fix/token-contrast
   ```

2. **Keep it focused.** One pull request should do one thing. A bug fix, a
   refactor, and a formatting sweep are three pull requests. Small pull
   requests get reviewed faster and are easier to revert.

3. **Add tests.** A bug fix comes with a test that fails without it. A feature
   comes with tests that pin down its behavior. If something is hard to test,
   say so in the pull request, and we will work it out together.

4. **Update the docs** that your change affects, including types and JSDoc on
   public APIs.

5. **Run the checks** before you push:

   ```bash
   vp check
   vp test
   ```

   CI runs the same commands, so a clean local run means a green pull request.

### Code style

Formatting and linting are automated. Oxfmt and Oxlint run on staged files
when you commit and again in CI, so do not spend review time arguing about
style by hand. Beyond what the tools enforce:

- Match the style of the code around you.
- Prefer clear names over comments. Use comments to explain _why_, not _what_.
- Do not add a dependency without discussing it in an issue first. Every
  dependency becomes something our users install too.

## Commit messages

Commit messages follow
[Conventional Commits](https://www.conventionalcommits.org), with a required
scope:

```text
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

For example:

```text
feat(tokens): add a neutral color scale
fix(theme): keep dark mode overrides when nesting themes
docs(readme): clarify the install steps
```

- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
  `build`, `ci`, `chore`, `revert`.
- **Scope:** the area you touched, such as a package or a subsystem.
- **Subject:** imperative mood ("add", not "added"), lowercase, no trailing
  period, and a header of 72 characters at most.

The full rule set lives in [`commitlint.config.ts`](./commitlint.config.ts),
and a `commit-msg` hook enforces it. To check a message up front (exit code `0`
means it passes):

```bash
printf '%s' "feat(tokens): add a neutral color scale" | vp run commitlint
```

If the hook rejects a commit, the rule names in brackets, such as
`[subject-case]`, tell you what to fix. Please do not bypass the hook with
`--no-verify`.

Inside your branch, commit however you like. Pull requests are squash merged,
so the **pull request title** becomes the final commit on `main` and has to
pass the same rules. CI checks it.

## Changesets

Batik uses [Changesets](https://github.com/changesets/changesets) to version
packages and write the changelog. If your change affects a published package,
add a changeset:

```bash
vp run changeset
```

Pick the affected packages and the kind of version bump, then write one or two
sentences **for the people who use Batik**, not for the people who build it.
"Fix focus rings disappearing in high contrast mode" is useful in a changelog.
"Refactor ring util" is not. Commit the generated file in `.changeset/` with
the rest of your change.

Choosing the bump:

| Bump    | When                                                    |
| ------- | ------------------------------------------------------- |
| `major` | Consumers must change their code to upgrade             |
| `minor` | New functionality that is backwards compatible          |
| `patch` | Bug fixes and changes that do not affect the public API |

Changes that ship nothing to npm, such as docs, CI, or tests, do not need a
changeset.

## Opening a pull request

1. Push your branch to your fork and
   [open a pull request](https://github.com/devsantara/batik/compare) against
   `main`.
2. Give it a title that passes commitlint (see
   [Commit messages](#commit-messages)).
3. In the description, explain what changes and why, and link the issue it
   resolves with `Closes #123`.
4. Call out breaking changes explicitly, along with what consumers need to do.
5. Tick **Allow edits from maintainers**, so we can push small fixes without a
   round trip.

Open a **draft** pull request if you want early feedback on a direction before
you polish it.

## Code review

Every pull request needs approval from a maintainer before it merges.

- **What we look at:** whether the change fits Batik's direction, whether it is
  correct and tested, and whether the public API it adds is one we want to
  support for years.
- **Response time:** Batik is maintained by a small team, so a first response
  can take a few days. If a week goes by with no reply, a polite ping on the
  pull request is welcome.
- **Feedback is about the code, not about you.** Reviewers explain the reason
  behind a request. If you disagree, say so. Discussion is part of review, and
  reviewers get things wrong too.
- **Addressing feedback:** push new commits instead of force pushing, so
  reviewers can see what changed since their last pass. Everything is squashed
  on merge anyway.

Sometimes a pull request does not get merged, because the scope changed or the
approach does not fit. When that happens we will explain why. Opening an issue
before large work is the best way to avoid it.

## Releases

Maintainers handle releases. When changes with changesets land on `main`, a
bot opens a release pull request that bumps versions and updates the
changelog. Merging that pull request publishes to npm. You do not need to do
anything beyond including a changeset.

## Code of Conduct

Everyone taking part in this project is expected to follow the
[Code of Conduct](./CODE_OF_CONDUCT.md). Please report unacceptable behavior as
it describes.

## License

By contributing to Batik, you agree that your contributions are licensed under
the [MIT License](./LICENSE) that covers the project.

[discussions]: https://github.com/devsantara/batik/discussions
[issues]: https://github.com/devsantara/batik/issues?q=is%3Aissue
[new-issue]: https://github.com/devsantara/batik/issues/new/choose
[good-first-issue]: https://github.com/devsantara/batik/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22
[help-wanted]: https://github.com/devsantara/batik/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22

# Contributing to Batik

Thanks for taking the time to contribute.

Batik is a pnpm workspace built on [Vite+](https://viteplus.dev), which wraps the
runtime, the package manager, and the frontend toolchain behind a single `vp`
CLI. You do not need to install Node.js or pnpm yourself — `vp` downloads the
versions pinned in `package.json` under `devEngines`.

## Setup

Install `vp` once, globally:

```bash
# macOS / Linux
curl -fsSL https://vite.plus | bash

# Windows
irm https://vite.plus/ps1 | iex
```

Then clone and install:

```bash
git clone git@github.com:devsantara/batik.git
cd batik
vp install
```

`vp install` runs the `prepare` script, which installs the Git hooks in
`.vite-hooks/`. Those hooks format and lint staged files on commit and validate
your commit message, so the first `vp install` is not optional.

Run `vp install` again after every pull — the dependency catalog in
`pnpm-workspace.yaml` moves with it.

## Working on a change

| Command          | What it does                                    |
| ---------------- | ----------------------------------------------- |
| `vp check`       | Format, lint and type check the whole workspace |
| `vp check --fix` | The same, writing the fixes it can apply        |
| `vp test`        | Run the test suite in watch mode                |
| `vp test run`    | Run the test suite once                         |
| `vp run build`   | Build every package                             |

Run `vp check` and `vp test run` before opening a pull request. CI runs exactly
these commands, so a clean local run means a green PR.

`vp <name>` is a built-in command and `vp run <name>` is a `package.json` script
or a `vite.config.ts` task. They are not interchangeable: `vp check` is the
built-in checker, `vp run check` is the script. When in doubt, `vp help` and
`vp <command> --help` list what is available.

If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor`
and include its output when you ask for help.

## Commit messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org) and
are enforced by commitlint through the `commit-msg` hook. A **scope is
required**, and the header is capped at 72 characters:

```
feat(tokens): add a neutral color scale
fix(react): forward ref on Button
docs(readme): document the token naming rules
```

The full rule set lives in `commitlint.config.ts`. To read it as JSON:

```bash
vp run commitlint --print-config json
```

To validate a message before you use it (exit code `0` means valid):

```bash
printf '%s' "feat(tokens): add a neutral color scale" | vp run commitlint
```

If the hook rejects your commit, fix the rules named in brackets — for example
`[subject-case]` — and try again. **Never use `git commit --no-verify`.**

Pull requests are squash merged, so the **pull request title becomes the commit
subject on `main`** and has to pass the same rules. CI checks it for you.

## Changesets

Every change that affects a published package needs a changeset. It is what
decides the next version number and writes the changelog entry:

```bash
vp run changeset
```

Pick the affected packages, pick `patch` / `minor` / `major`, and describe the
change in a sentence a consumer of the package would understand. Commit the
generated file in `.changeset/` alongside your code.

Changes that ship nothing to npm — CI config, repo docs, tooling — do not need
one.

Releases are automated: once a pull request with changesets lands on `main`, a
bot opens a "version packages" pull request. Merging that one publishes to npm.
Maintainers handle this; you do not need to.

## Pull requests

- Branch off `main`.
- Keep the pull request focused on one thing. Several small pull requests land
  faster than one large one.
- Fill in the pull request template.
- Open an issue first for anything large or architectural, so you do not spend
  time on an approach that will not be merged.

## Code of Conduct

This project ships a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating,
you agree to uphold it.

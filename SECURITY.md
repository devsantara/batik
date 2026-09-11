# Security Policy

## Reporting a vulnerability

**Please do not report security vulnerabilities through public issues, pull
requests, or discussions.**

Report them privately through GitHub instead:

> [**Open a private security advisory**](https://github.com/devsantara/batik/security/advisories/new)

Only the maintainers can see a report filed this way, and it gives us a private
place to work with you on a fix before anything becomes public.

If you cannot use that form for any reason, open a regular issue saying only
that you have a security report to make — no details — and a maintainer will
reach out.

## What to include

The more of this you can give us, the faster we can confirm and fix it:

- The affected package and version
- The type of issue and where it is in the source
- Step-by-step instructions to reproduce it, ideally a minimal repository
- A proof of concept, if you have one
- What an attacker could do with it

## What to expect

- **Within 72 hours** — we acknowledge the report.
- **Within 7 days** — we confirm whether it is a vulnerability and tell you what
  we plan to do.
- **Then** — we keep you updated as we work on the fix, and credit you in the
  advisory when it publishes, unless you would rather stay anonymous.

We ask that you give us a reasonable window to ship a fix before disclosing
publicly. We will not take legal action against anyone who reports in good faith
and follows this policy.

## Supported versions

Batik is pre-1.0. Only the latest published version of each package receives
security fixes. Older versions are not patched — please upgrade.

## How releases are secured

- Packages publish from GitHub Actions with
  [npm trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC). No
  long-lived npm tokens exist in this repository.
- The publish job runs in a protected `npm` environment that requires a
  maintainer to approve each release.
- Release workflows check out with `persist-credentials: false` and every job
  declares the narrowest permissions it needs.
- Third-party actions are pinned to exact versions.
- Dependency updates wait out a minimum release age before they can be installed
  (`minimumReleaseAge` in `pnpm-workspace.yaml`), which blunts the window for a
  compromised upstream release.

<!--
  The title of this pull request becomes the commit subject on main, so it has
  to pass commitlint: `type(scope): subject`, lowercase, no trailing period,
  72 characters or fewer. For example: `feat(tokens): add a neutral color scale`
-->

## What this changes

<!-- What the reader gets that they did not have before. One or two sentences. -->

## Why

<!--
  The problem behind the change. Link the issue it closes:
  Closes #123
-->

## How to check it

<!--
  How a reviewer confirms this works. Steps, a screenshot, or the test that
  now covers it.
-->

## Checklist

- [ ] `vp check` passes
- [ ] `vp test run` passes
- [ ] I added a changeset (`vp run changeset`), or this ships nothing to npm
- [ ] I updated the docs and types affected by this change
- [ ] Breaking changes are called out below

## Breaking changes

<!--
  Delete this section if there are none. Otherwise: what breaks, and what a
  consumer has to do about it.
-->

None.

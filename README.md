# Next-gen Slack platform project template - Simple Demo using Reverse String
This repo contains a sample project and embedded lightweight SDK of a Typescript based project for the new Deno runtime. 

This is our single file solution for creating small, simple projects directly in the `project.ts` file to keep everything visible at a glance. Any new `functions`, `workflows` or `triggers` changes to the variable names must be represented in the `Project` object.

## Setup

Create a new project using this as repo as a template.

```bash
slack create -t slackapi/deno-simple
```

## Running it locally

```bash
slack run
```

## Deploying to Slack's Hosting

```bash
slack deploy
```

## Testing

You can write tests for your function, see `functions/reverse_test.ts` for a sample. Test base filenames should be suffixed with `_test`. To run tests just run:

```bash
slack deno test
```


---
title: 'CircleCI Resources'
slug: circleci-resources
date: 2020-07-31
language: english
category: Resources
tags:
  - CircleCI
published: true
description: "Here is a list of the resources I used to learn CircleCI. I'll keep adding more and more resources as I learn more about it."
---

# Configuration options

The link below contains CircleCI's configuration options.

- [Configuring CircleCI](https://circleci.com/docs/2.0/configuration-reference/#section=configuration)

# What are Jobs Steps and WorkFlows

- `Jobs`: Jobs are collections of steps. All of the steps in the job are executed in a single unit, either within a fresh container or VM.
- `Steps`: Steps are a collection of executable commands which are run during a job.

- [Orbs, Jobs, Steps, and Workflows](https://circleci.com/docs/2.0/jobs-steps/)

# What are Orbs?

According to the CircleCI's official document, Orbs are

> Orbs are reusable snippets of code that help automate repeated processes, speed up project setup, and make it easy to integrate with third-party tools.

So Orbs are basically like libraries. You can reuse the code that was written by somebody else.

- [CircleCI orbs](https://circleci.com/orbs/)

# Validate config in your local env

Run the command below.

```bash
$ circleci config validate
```

If you are working with Orbs you can also validate your orb:

```bash
$ circleci orb validate /tmp/my_orb.yml
```

- [Validate A CircleCI Config](https://circleci.com/docs/2.0/local-cli/#validate-a-circleci-config)

# Example

Here is a simple CircleCI configuration for a react project.

```yml
version: 2.1
# list orbs you want to use.
orbs:
  node: circleci/node@1.1.6
jobs:
  # This is the name of this job
  jest:
    # Executors define the environment in which the steps of a job will be run
    executor:
      name: node/default
    # Following the usage example of circleci/node@1.1.6.
    # https://circleci.com/orbs/registry/orb/circleci/node?version=1.1.6
    steps:
      - checkout
      - node/with-cache:
          steps:
            - run: yarn install
            - run: yarn test
workflows:
  build-and-test:
    jobs:
      - build-and-test
```

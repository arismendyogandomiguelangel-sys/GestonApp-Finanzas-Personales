# Agentic financial guidance implementation plan

## Product intent

The application is an agent-assisted financial workspace. Axelin guides the
person through a concrete financial outcome; pages are visual workspaces for
the information and decisions created together.

## Active goal contract

Only one goal is active in the floating bar at a time. A goal has a title,
status, optional target date, measurable milestones, evidence references, and
a progress value derived from completed milestones. The model may propose a
plan, but it must never fabricate progress.

Goal statuses are `active`, `paused`, `completed`, and `archived`. Completed
goals are shown in Settings > Axelin as shared iHA outcomes, including the
human confirmations and agent actions that produced the result.

## First goal: organize personal finances

1. Select reporting and conversion currencies.
2. Add financial accounts and cash locations.
3. Define recurring and variable income sources.
4. Record obligations, receivables, and debts.
5. Import or record initial transactions.
6. Confirm suggested categories.
7. Create an initial monthly budget.

Each milestone is completed only after the associated workspace data exists
and the person confirms it.

## Interaction model

The floating bar displays a two-pixel progress border and a compact percentage
only while an active goal exists. It provides the current objective and next
step without taking dashboard space. Opening the goal view exposes milestones,
evidence, pause/resume, and completion history.

Axelin receives the current route and active-goal context. It may read the
workspace, propose drafts, navigate to the relevant module, and request an
explicit confirmation before every financial write.

## Provider and Hermes boundary

The app does not expose provider secrets to the browser or repository. OpenAI
and Ollama Cloud credentials are stored only as server-side encrypted secrets.
Ollama running on a person's computer requires a local Hermes connector;
Vercel cannot access a user's `localhost:11434` endpoint.

Hermes connects through a scoped machine API/MCP identity. It receives only
the workspace permissions granted by the user and every write is auditable.

## Delivery sequence

1. Add the goal data model, RLS, audit events, and server routes.
2. Add the active-goal provider, progress border, and settings history.
3. Add financial-setup milestone evaluators backed by live workspace data.
4. Add safe agent tools for drafts, confirmations, navigation, and goal state.
5. Add provider configuration for OpenAI/Ollama Cloud and Hermes local bridge.
6. Add browser end-to-end coverage and deploy migrations before publishing the UI.

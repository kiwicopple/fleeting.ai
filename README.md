# fleeting.ai

An open source AI server .. which runs without a server. Can be deployed to serverless environments like Supabase [Edge Functions](https://supabase.com/edge-functions).

```
fleeting /flē′tĭng/

adjective

1. Passing quickly; ephemeral.
2. Passing swiftly away; not durable; transient; transitory.
```

## Motivation

I'm dogfooding Supabase Edge Functions specifically for AI use-cases. 

Simultaneously, I want to provide Supabase customers an API which they can call for common tasks like creating embeddings. At the moment customers are expected to deploy their own edge functions. To reduce friction it will be easier to if we can provide them a simple HTTP interface to get started, and then they can migrate to their own Edge Functions once they are ready.

## API

There are two sets of API

### Embeddings

- `POST /v1/embed/gte-small`: create smol embeddings
- `POST /v1/embed/gte-large`: create big embeddings

### Inference

- `POST /v1/infer/llama2`: speak to a llama
- `POST /v1/infer/mistral`: speak to a mistral


## Tech stack

- Supabase
- Deno
const routes = {
  embeddings: {
    "gte-small": "POST /router/embed/gte-small",
    "all-MiniLM-L6-v2 ": "POST /router/embed/all-minilm-l6-v2",
  },
  inference: {
    "nllb-200-distilled-600M": "POST /router/infer/nllb-200-distilled-600m",
  },
}

export default routes

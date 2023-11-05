import { serve } from "std/server"
import { env, pipeline } from "@xenova/transformers"

env.useBrowserCache = false
env.allowLocalModels = false

const pipe = await pipeline("feature-extraction", "Supabase/all-MiniLM-L6-v2")

serve(async (req) => {
  // Extract input string from JSON body
  const { input } = await req.json()

  // Generate the embedding from the user input
  const output = await pipe(input, {
    pooling: "mean",
    normalize: true,
  })

  // Extract the embedding output
  const embedding = Array.from(output.data)

  // Return the embedding
  return new Response(JSON.stringify({ embedding }), {
    headers: { "Content-Type": "application/json" },
  })
})

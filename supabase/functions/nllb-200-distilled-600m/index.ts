import { serve } from "std/server"
import { env, pipeline } from "@xenova/transformers"

env.useBrowserCache = false
env.allowLocalModels = false

// NOT WORKING - just testing that we can download the model
const pipe = await pipeline("translation", "Xenova/nllb-200-distilled-600M")

serve(async (req) => {
  const { input } = await req.json()

  const output = await pipe(input, {
    tgt_lang: "eng_Latn",
    src_lang: "fra_Latn",
  })

  console.log("output", output)

  return new Response(JSON.stringify({ res: true }), {
    headers: { "Content-Type": "application/json" },
  })
})

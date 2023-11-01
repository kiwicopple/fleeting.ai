import {
  env,
  pipeline,
} from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.5.0";

env.useBrowserCache = false;
env.allowLocalModels = false;

const pipe = await pipeline("feature-extraction", "Supabase/gte-small");

export default async function handler(context) {
  context.response.headers.set("Content-Type", "application/json");
  const req = await context.request.body({ type: "json" });
  context.response.body = JSON.stringify({
    "/gte-small": "woo!",
  });
}

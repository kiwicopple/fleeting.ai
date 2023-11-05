import routeMap from "../_shared/routes.ts"
import { serve } from "std/server"
import { corsHeaders } from "../_shared/cors.ts"
import { supabase } from "../_shared/supabase.ts"
import { success, notFound, badRequest } from "../_shared/responseHandlers.ts"

serve(async (req) => {
  const { url, method, body } = req
  const path = new URL(url).pathname.toLowerCase()

  // Handle CORS preflight requests
  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  // Handle non-POST requests
  if (method !== "POST") {
    const message = `Expected POST request. ${method} request received.`
    return badRequest(new Error(message), { routes: routeMap })
  }

  console.log("body", body)

  try {
    // const taskPattern = new URLPattern({ pathname: "/router/:task/:model" })
    // const matchingPath = taskPattern.exec(url)
    // const task = matchingPath ? matchingPath.pathname.groups.task : null
    // const model = matchingPath ? matchingPath.pathname.groups.model : null

    switch (path) {
      case "/router":
      case "/router/": {
        return success(routeMap)
      }
      case "/router/embed/gte-small":
      case "/router/embed/gte-small/": {
        const { data, error } = await supabase.functions.invoke("gte-small", {
          body: { input: body },
        })
        if (error) throw error
        else return success(data)
      }
      case "/router/embed/all-minilm-l6-v2":
      case "/router/embed/all-minilm-l6-v2/": {
        const { data, error } = await supabase.functions.invoke(
          "all-minilm-l6-v2",
          {
            body: { input: "Hello from Functions!" },
          }
        )
        if (error) throw error
        else return success(data)
      }
      case "/router/infer/nllb-200-distilled-600m":
      case "/router/infer/nllb-200-distilled-600m/": {
        const { data, error } = await supabase.functions.invoke(
          "nllb-200-distilled-600m",
          {
            body: { input: "Hello from Functions!" },
          }
        )
        if (error) throw error
        else return success(data)
      }
      default:
        return notFound(path)
    }
  } catch (error) {
    console.error("error", error)
    return badRequest(error)
  }
})

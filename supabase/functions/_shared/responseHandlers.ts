import routeMap from "./routes.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
}

export function success(data: any) {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  })
}

export function cors() {
  return new Response("ok", {
    headers: corsHeaders,
  })
}

export function notFound(path: string | undefined) {
  return new Response(
    JSON.stringify({
      status: 404,
      error: "Not found",
      path,
      availableRoutes: routeMap,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 404,
    }
  )
}

export function badRequest(error: Error, data?: any) {
  return new Response(JSON.stringify({ error: error.message, ...data }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 400,
  })
}

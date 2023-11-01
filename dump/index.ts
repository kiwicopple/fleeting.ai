import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import gteSmall from "./embed/gte-small.ts";
import gteLarge from "./embed/gte-large.ts";

const router = new Router();

router
  // Note: path should be prefixed with function name
  .get("/embed2", (context) => {
    context.response.headers.set("Content-Type", "application/json");
    context.response.body = JSON.stringify({
      "/gte-small": "324 Dimensions",
      "/gte-large": "512 Dimensions",
    });
  })
  .post("/embed2/gte-small", gteSmall)
  .get("/embed2/gte-large", gteLarge);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

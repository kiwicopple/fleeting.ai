export default function handler(context) {
  context.response.headers.set("Content-Type", "application/json");
  context.response.body = JSON.stringify({
    "/gte-large": "woo!",
  });
}

# Dogfood

I'm dogfooding Supabase Edge Functions specifically for AI use-cases. This is a Friction Log as I go through the process of creating this server. I know I can do this easily with Express/Fastify. Is it just as simple with Edge Functions?

### Nothing getting returned from function

I ran `supabase new embed` and then edited the route in the new file from `/hello-world` to `/gte-small`. I then opened my browser to `/functions/v1/embed/gte-small`. Nothing was returned. It turns out that I was supposed to edit the file to tbe `/embed/gte-small` (the file structure doesn't create the routes implicitly).


### Functions not served from `supabase start`

I thought I could call the function after running `supabase start` but it looks like I need to run `supabase functions serve` as well? As a side note, why doesn't `supabase start` give a list of all the function URLs which I can execute (like it does for REST, GraphQL, etc).


### `supabase start` be running to call `supabase functions serve`

I stopped `supabase` and then ran  `supabase functions serve`. That didn't work. It turns out I need to run _both_  `supabase start` and `supabase functions serve`? A bit confusing.


## Incorrect helper code

Can I do subfolders? I ran `supabase functions new gte-small` and then tried to exectute the code at the bottom:

```
curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data '{"name":"Functions"}'
```

This was not correct - it should be `http://localhost:54321/functions/v1/gte-small`

### Sub-routing

I want to serve serveral routes like:

- /embed
  - /gte-small
  - /gte-large

Turns out I need to digest an [entire essay](https://stackoverflow.com/questions/73171658/differents-routes-on-an-http-handler-with-deno) to get this working. 

I tried to search via Clippy (Supabase docs) and it told me how to do it with Next.js. 

Can we just set this up as our "hello world" example? 

## Oak - sub-routing v2

I discovered Oak: https://github.com/oakserver/oak. Perhaps that's the answer to my subrouting issues?

## Oak - cold booting all routes

It turns out that if I use Oak, it's going to need to cold-boot all the routes, even if I just want to call, say, `/embed/gte-small`. This is an issue with this server, because each route is loading a large model from huggingface.

## Sub-routing v3

I want to now set up some folder structure like this, where each sub-folder is a different function

- /embed
  - /gte-small - Function
  - /gte-large - Function

If I run `supabase functions new embed/gte-small` I get this error:

`Invalid Function name. Must start with at least one letter, and only include alphanumeric characters, underscores, and hyphens. (^[A-Za-z][A-Za-z0-9_-]*$)`

OK so I run `supabase functions new gte-small` and then I move it to a sub-folder "embed": 

```
functions
|- embed
    |- gte-small
```

Now if I try to call `POST 'http://localhost:54321/functions/v1/gte-small'` i get "not found and if I call`POST 'http://localhost:54321/functions/v1/embed/gte-small'` I get "bad request".

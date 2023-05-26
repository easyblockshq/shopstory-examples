import { draftMode } from "next/headers";

export function GET(request: Request) {
  draftMode().disable();

  const redirectUrl =
    (process.env.VERCEL ? "https://" : "http://") + request.headers.get("host");

  return new Response(null, {
    status: 307,
    headers: {
      Location: redirectUrl,
    },
  });
}

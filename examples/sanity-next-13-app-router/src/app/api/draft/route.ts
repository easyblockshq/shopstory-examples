import { draftMode } from "next/headers";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");

  if (!page) {
    return new Response('Missing "page" query parameter', { status: 400 });
  }

  draftMode().enable();

  const redirectUrl =
    (process.env.VERCEL ? "https://" : "http://") +
    request.headers.get("host") +
    page;

  return new Response(null, {
    status: 307,
    headers: {
      Location: redirectUrl,
    },
  });
}

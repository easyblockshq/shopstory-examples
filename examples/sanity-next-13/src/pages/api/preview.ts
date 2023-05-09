import { NextApiRequest, NextApiResponse } from "next";

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query;
  res.setPreviewData({});
  res.writeHead(307, {
    Location:
      (process.env.VERCEL ? "https://" : "http://") + req.headers.host + page,
  });
  res.end();
}

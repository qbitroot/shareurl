import dbConnect from "@/lib/dbConnect";
import ShortUrl from "@/models/ShortUrl";
import { URL_REGEXP } from "@/app/_regex";

export async function POST(req: Request) {
  await dbConnect();
  const { url } = await req.json();
  if (url.match(URL_REGEXP)) {
    const shortUrl = await ShortUrl.create({ originalUrl: url });
    return Response.json({
      shortCode: shortUrl.shortCode,
    });
  } else return Response.json({}, { status: 400 });
}

import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import ShortUrl from "@/models/ShortUrl";

type Context = {
  params: {
    url_id: string;
  };
};

export async function GET(req: Request, { params }: Context) {
  let redirUrl = null;
  try {
    await dbConnect();
    const urlEntry = await ShortUrl.findOne({ shortCode: params.url_id });
    redirUrl = urlEntry.originalUrl;
  } catch (e) {
    redirUrl = "/";
  }
  return redirect(redirUrl);
}

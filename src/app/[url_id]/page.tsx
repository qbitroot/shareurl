import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import ShortUrl from "@/models/ShortUrl";

export default async function Goto({ params }: { params: { url_id: string } }) {
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

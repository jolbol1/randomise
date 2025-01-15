import { faker } from "@faker-js/faker";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET() {
  const randomWord = faker.word.sample();
  return redirect(`https://${randomWord}.vercel.app`);
}

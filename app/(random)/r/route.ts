import { faker } from '@faker-js/faker'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const randomWord = faker.word.sample()
  return redirect(`https://${randomWord}.vercel.app`)
}


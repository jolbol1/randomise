import { ImageResponse } from 'next/og'
import { faker } from '@faker-js/faker'

export const runtime = 'edge'

export const alt = 'Find random vercel.app sites'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

function generateRandomString(length: number) {
  return faker.string.alphanumeric(length).toLowerCase()
}

export default async function Image() {
  const randomDomain = generateRandomString(5)

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <svg
            width="75"
            viewBox="0 0 75 65"
            fill="#000"
          >
            <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 60, marginBottom: 20 }}>{randomDomain}.vercel.app</div>
          <div
            style={{
              fontSize: 24,
              fontWeight: "normal",
              color: '#666',
            }}
          >
            Find random vercel.app sites
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}


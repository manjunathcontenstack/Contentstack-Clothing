import { ImageResponse } from 'next/og'

// Route segment config
export const contentType = 'image/png'
export const size = { width: 64, height: 64 }

// Generate a tiny favicon to remove 404s
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          color: '#fff',
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        CC
      </div>
    ),
    { ...size }
  )
}



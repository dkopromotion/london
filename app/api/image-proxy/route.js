// app/api/image-proxy/route.js
import { NextResponse } from 'next/server'
import sharp from 'sharp'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  // Set default width to 200 for smaller placeholders/thumbnails
  const width = parseInt(searchParams.get('w')) || 200
  // Set default quality to 75
  const quality = parseInt(searchParams.get('q')) || 75

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
  }
  try {
    const res = await fetch(url)
    if (!res.ok) {
      return NextResponse.json({ error: 'Error fetching remote image' }, { status: res.status })
    }
    const buffer = await res.arrayBuffer()
    const optimizedBuffer = await sharp(Buffer.from(buffer))
      .resize({ width })
      .toFormat('jpeg')
      // Apply quality setting
      .jpeg({ quality })
      .toBuffer()
    return new NextResponse(optimizedBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        // Set cache control to 1 day (86400 seconds)
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error('Image proxy error:', error); // Add logging
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

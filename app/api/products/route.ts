// ===============================
// FILE: app/api/products/route.ts
// ===============================

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''

  // MOCK DATA (replace with eBay API later)
  const items = [
    {
      title: `${q} OEM Replacement`,
      price: '189.99',
      image: 'https://via.placeholder.com/100',
      url: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q)}`,
    },
    {
      title: `${q} Aftermarket`,
      price: '129.99',
      image: 'https://via.placeholder.com/100',
      url: `https://www.amazon.com/s?k=${encodeURIComponent(q)}`,
    },
    {
      title: `${q} Premium Version`,
      price: '249.99',
      image: 'https://via.placeholder.com/100',
      url: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q)}`,
    },
  ]

  return NextResponse.json({ items })
}

// ===============================
// NEXT STEP (IMPORTANT):
// Replace mock with real eBay Browse API
// Add affiliate tracking params
// ===============================

// DONE

// ===============================
// FINDMYTRUCKPARTS.COM MVP (Product Card Version - Higher Conversion)
// ===============================

// Adds:
// - Product cards (image, title, price, link)
// - Server route to fetch products (mock now, replace with eBay API later)
// - Better CTA copy

// ===============================
// FILE: app/page.tsx
// ===============================

'use client'

import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: any) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
    }
  }

  const handleSubmit = async () => {
    if (!text && !file) return
    setLoading(true)

    const formData = new FormData()
    formData.append('text', text)
    if (file) formData.append('image', file)

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    setResult(data)

    // fetch products
    const query = `${data.year_range || ''} ${data.vehicle || ''} ${data.side || ''} ${data.part || ''}`
    const prodRes = await fetch('/api/products?q=' + encodeURIComponent(query))
    const prodData = await prodRes.json()
    setProducts(prodData.items || [])

    setLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-2">Find My Truck Parts</h1>
      <p className="mb-6 text-gray-600">Snap a photo or describe your issue</p>

      <textarea
        className="border p-3 w-full max-w-md mb-3 rounded"
        placeholder="e.g. Cracked headlight on Cascadia"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="mb-3"
      />

      {preview && (
        <img src={preview} alt="preview" className="w-48 mb-3 rounded" />
      )}

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading ? 'Analyzing...' : 'Identify Part'}
      </button>

      {result && !result.error && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-1">
            {result.part?.toUpperCase()}
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            {result.vehicle} • {result.year_range} • {result.side}
          </p>
          <p className="text-sm mb-4">
            Confidence: {Math.round((result.confidence || 0) * 100)}%
          </p>

          {/* Product Cards */}
          <div className="flex flex-col gap-4">
            {products.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                className="border rounded-lg p-3 flex gap-3 items-center hover:shadow"
              >
                <img src={p.image} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <p className="text-sm font-semibold line-clamp-2">{p.title}</p>
                  <p className="text-green-600 font-bold">${p.price}</p>
                  <p className="text-xs text-gray-500">Tap to view</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

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

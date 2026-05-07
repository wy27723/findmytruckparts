import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Find My Truck Parts",
  description: "Find truck parts using AI image recognition",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

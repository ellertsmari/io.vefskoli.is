import { Metadata } from 'next'
import '@/styles/globals.css'
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}
import Sidebar from '@/components/sidebar/sidebar'
import { cookies } from 'next/headers'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  if(!cookieStore.has("session")) return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  ) 
  return (
    <html lang="en">
      <body>
        {/* @ts-expect-error Server Component */}
        <Sidebar student={cookieStore.get("session").value}></Sidebar> {children}
      </body>
    </html>
  )
}
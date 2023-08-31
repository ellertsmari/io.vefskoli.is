import { Metadata } from 'next'
import '@/styles/globals.css'
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}
import Sidebar from '@/components/sidebar/sidebar'
import { MainContainer } from '@/components/mainContainer'
import { cookies } from 'next/headers'
import { UserType } from '@/models/user'
import useServerUser from '@/utils/useServerUser'

export default async function RootLayout({
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
  const user = await useServerUser();
  return (
    <html lang="en">
      <body>
        <MainContainer>
          {/* @ts-expect-error Server Component */}
          <Sidebar student={user}></Sidebar>
          {children}
        </MainContainer>
      </body>
    </html>
  )
}
import { Metadata } from "next";
import "@/styles/globals.css";
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};
import Sidebar from "@/components/sidebar/sidebar";
import {
  MainContent,
  MainContainer,
  MainLayout,
  SidebarContainer,
  NavContainer,
} from "@/components/mainLayout";
import AnimatedBackground from "../components/animatedBackground"
import { cookies } from "next/headers";
import { UserType } from "@/models/user";
import useServerUser from "@/utils/useServerUser";
import NavBar from "@/components/nav/nav";

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  if (!cookieStore.has("session"))
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  const user = await useServerUser();
  return (
    <html lang="en">
      <body>
      <AnimatedBackground />
        <MainLayout>
          <SidebarContainer>
          {/* @ts-expect-error Server Component */}
          <Sidebar student={user}></Sidebar>
          </SidebarContainer>
          <MainContainer>
            <NavContainer>
              <NavBar />
            </NavContainer>
            <MainContent>
            {children}
            </MainContent>
          </MainContainer>
        </MainLayout>
      </body>
    </html>
  );
}

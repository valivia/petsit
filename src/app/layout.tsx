"use client"
import "@styles/globals.scss";

import { SessionProvider } from "next-auth/react"
import { Raleway as Font } from "next/font/google";
const font = Font({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: Props) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        <div id="modals" />
      </body>
    </html>
  )
}

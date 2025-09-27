import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { 
  children: React.ReactNode ,
  prices: React.ReactNode

} ) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">
          {props.children}

          {props.prices}
        </main>
      </body>
    </html>
  )
}

import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <div className="pt-[100px]">
      <Nav />
      {props.children}
      {props.modal}
      {/* <Footer /> */}
    </div>
  )
}

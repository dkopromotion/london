// layout
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Content from '../components/Content'
import Script from 'next/script'
import { info } from '../utils/info'

export async function generateMetadata({ children }) {
  const defaultMetadata = info.defaultMeta
  const childMetadata = children?.props?.childProp?.segment?.metadata
  return childMetadata || defaultMetadata
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
<script src="https://www.affiliatetrack.app/js/script.js" defer data-website-id="0Whgt_76eW_pA5YlDplG6" data-domain="www.london-onlyfans.com"></script>
      </head>
      <body className="bg-zinc-100">
        <Navbar />
        <Content>{children}</Content>
        <Footer />
      </body>
    </html>
  )
}

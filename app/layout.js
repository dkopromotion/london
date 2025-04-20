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
        <script 
          src="https://app.ctabuild.com/analytics.js" 
          data-api-key="dc4c83215d569fda1d6b545cc09ef027"
          defer
        ></script>
      </head>
      <body className="bg-zinc-100">
        <Navbar />
        <Content>{children}</Content>
        <Footer />
      </body>
    </html>
  )
}

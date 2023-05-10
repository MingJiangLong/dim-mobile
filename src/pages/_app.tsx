import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Script from "next/script"
import { useEffect } from "react"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script
        src="https://g.alicdn.com/code/npm/@ali/dingtalk-h5-remote-debug/0.1.2/index.js"
        strategy="beforeInteractive"
      />
      {/* <Script
        src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
        // strategy="beforeInteractive"
        onLoad={() => {
          new window.VConsole()
        }}
      /> */}
    </>
  )
}

import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useEffect } from "react"
import dd from "dingtalk-jsapi"
export default function App({ Component, pageProps }: AppProps) {
  function getCorpId() {
    const pathParams = location.search.slice(1)
    return pathParams.split("&").reduce<{ [k: string]: string }>((a, b) => {
      const [k, v] = b.split("=")
      return {
        [k]: v,
      }
    }, {})['corpId']
  }

  useEffect(() => {
    dd.ready(async function () {
      let result = await dd.runtime.permission.requestAuthCode({
        corpId: getCorpId(),
      })
      console.log(result.code)
    })
  }, [])
  return <Component {...pageProps} />
}

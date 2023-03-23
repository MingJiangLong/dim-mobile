import React, { useEffect, useState } from "react"

/**
 *
 * @param props {DetailProps}
 */
export default function Detail(props: DetailProps) {
  const [url, setUrl] = useState()
  useEffect(() => {
    // @ts-ignore
    const tempt = window?.data?.page_url
    if (tempt) {
      console.log(tempt)
      setUrl(tempt)
    } else {
      console.log("获取page_url失败", window)
    }
  }, [])
  return (
    <div
      style={{
        height: "100vh",
        width: "vw",
        overflow: "scroll",
        background: "#F5f5f5",
      }}
    >
      {
        url ? (
          <iframe
            src={url}
            style={{ height: "100%", width: "100%", border: "none" }}
          />
        ) : null
      }
    </div>
  )
}

type DetailProps = {
  // url: string
  id: string
}

import { useRouter } from "next/router"
import { useEffect } from "react"
import styles from "./index.module.css"
export default function (props: MenuItem) {
  const router = useRouter()
  function onListClick(path: string, pageUrl: string) {
    // 这里要请求服务端 让服务端刷新数据
    const origin = window.location.origin
    window.location.href = `${origin}${path}`
  }

  return (
    <div className={styles["container"]}>
      <div
        onClick={e => {
          e.stopPropagation()
          if (props.type != 1 || !props.method) return
          onListClick(props.method, `${props.page_url ?? ""}`)
        }}
        className={styles["sub-list-container"]}
        style={{
          borderBottom: `${props.isLast ? "none" : "1px solid #f5f5f5"}`,
        }}
      >
        <div style={{ flex: 1 }}>{props.name}</div>
        <img
          src={`${process.env.imagePathPrefix ?? ""}/skip.png`}
          alt="..."
          className={styles["image"]}
        />
      </div>
    </div>
  )
}

type MenuItem = {
  name: string
  id: number
  method: string
  type: number
  status: number
  page_url: string | null
  child?: MenuItem[]
  isLast?: boolean
}

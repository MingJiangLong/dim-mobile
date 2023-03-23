import List from "./components/List"

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        width: "vw",
        overflowY: "scroll",
        background: "#F5f5f5",
      }}
    >
      <List />
    </div>
  )
}

type MenuItem = {
  name: string
  id: number
  method: string
  type: number
  status: number
  page_url: string
  child?: MenuItem[]
}

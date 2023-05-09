import { useEffect } from "react"
import List from "./components/List"
// import VConsole from "vconsole"

export default function Home() {
  // useEffect(()=>{
  //   new VConsole()
  // },[])
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
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
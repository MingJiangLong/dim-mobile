import { useState } from "react"
import SubList from "../SubList"
import styles from "./index.module.css"
export default function (props: MenuItem) {
  const { name } = props
  const [showSon, setShowSon] = useState(false)
  function onListClick() {
    setShowSon(!showSon)
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["main-list-container"]} onClick={onListClick}>
        <div style={{ flex: 1 }}>{name}</div>
        <img
          src={`${process.env.imagePathPrefix ?? ""}/down.png`}
          alt="..."
          className={styles["image"]}
          style={{
            transform: showSon ? "rotate(-180deg)" : "rotate(0deg)",
          }}
        />
      </div>
      <>
        {showSon &&
          props.child
            ?.filter(item => item.type == 1)
            .map((item, index) => (
              <SubList
                key={index}
                {...item}
                isLast={props.child?.length == index + 1}
              />
            ))}
      </>
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
}

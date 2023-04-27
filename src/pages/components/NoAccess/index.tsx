import React from "react"
import styles from "./index.module.css"
/**
 *
 * @param props {Props}
 */
export default function (props: Props) {
  return (
    <div className={styles["container"]}>
      <img
        src={`${process.env.imagePathPrefix ?? ""}/noaccess.png`}
        alt="..."
        className={styles["image"]}
      />
      <div className={styles["content"]}>权限不足,请联系管理员开通权限</div>
    </div>
  )
}

type Props = {}

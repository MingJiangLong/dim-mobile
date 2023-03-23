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
        src={`${process.env.imagePathPrefix ?? ""}/nodata.png`}
        alt="..."
        className={styles["image"]}
      />
      <div className={styles["content"]}>暂无报表</div>
    </div>
  )
}

type Props = {}

import { useEffect, useMemo, useState } from "react"
import Empty from "../Empty"
import MainList from "../MainList"
import NoAccess from "../NoAccess"

export default function () {
  const [menusData, setMenuData] = useState<any>()
  const menuList = useMemo(() => {
    const data = menusData?.menu_list
    if (Array.isArray(data))
      return data.filter(
        item => item?.type == 1 && !`${item.method}`.startsWith("/system")
      )
    return []
  }, [menusData])
  useEffect(() => {
    // @ts-ignore
    const data = window?.data || {}
    setMenuData(data)
  }, [])

  return (
    <>
      {menuList.length ? (
        menuList.map((item, index) => <MainList {...item} key={index} />)
      ) : (
        <NoAccess />
      )}
    </>
  )
}

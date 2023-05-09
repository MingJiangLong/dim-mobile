import { useEffect, useMemo, useState } from "react"
import MainList from "../MainList"
import NoAccess from "../NoAccess"
import dd from "dingtalk-jsapi"
import Empty from "../Empty"
import axios from "axios"

export default function () {
  function getCorpId() {
    const pathParams = location.search.slice(1)
    return pathParams.split("&").reduce<{ [k: string]: string }>((a, b) => {
      const [k, v] = b.split("=")
      return {
        [k]: v,
      }
    }, {})["corpId"]
  }

  function postUserCode(code: string) {
    return axios.post("https://dim.uboxol.com/user/info", {
      code,
    },{
      headers:{
        "Content-Type":"application/json"
      }
    })
  }

  function getDDCorpId() {
    return new Promise<string>((s, e) => {
      dd.ready(async function () {
        try {
          let result = await dd.runtime.permission.requestAuthCode({
            corpId: getCorpId(),
          })
          s(result.code)
        } catch (error) {
          dd.device.notification.alert({
            message: `ERROR-${JSON.stringify(error)}`,
          })
          e(error)
        }
      })
    })
  }

  async function getMenuData() {
    try {
      const code = await getDDCorpId()
      await postUserCode(code)
      const data = window?.data || {}
      setHaveAccess(data?.code == 200)
      setMenuData(data)
    } catch (error) {}
  }

  const [menusData, setMenuData] = useState<Menu>()

  const menuList = useMemo(() => {
    const data = menusData?.menu_list
    if (Array.isArray(data))
      return data.filter(
        item =>
          item?.type == 1 && !`${item?.method ?? ""}`.startsWith("/system")
      )
    return []
  }, [menusData])

  const [haveAccess, setHaveAccess] = useState(false)

  useEffect(() => {
    getMenuData()
  }, [])
  return (
    <>
      {menuList.length ? (
        menuList.map((item, index) => <MainList {...item} key={index} />)
      ) : haveAccess ? (
        <Empty />
      ) : (
        <NoAccess />
      )}
    </>
  )
}

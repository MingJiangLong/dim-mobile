import { useEffect, useMemo, useState } from "react"
import MainList from "../MainList"
import NoAccess from "../NoAccess"
import dd from "dingtalk-jsapi"
import Empty from "../Empty"
export default function () {
  function getCorpId() {
    return "dingd41f8f2af60aacb935c2f4657eb6378f"
    const pathParams = location.search.slice(1)
    return pathParams.split("&").reduce<{ [k: string]: string }>((a, b) => {
      const [k, v] = b.split("=")
      return {
        [k]: v,
      }
    }, {})["corpId"]
  }

  function postUserCode(code: string) {
    return new Promise((s, e) => {
      const xmlRequest = new XMLHttpRequest()
      xmlRequest.open("POST", "http://m-dim.dev.uboxol.com/user/info")
      xmlRequest.setRequestHeader("Content-Type", "application/json")
      xmlRequest.send(JSON.stringify({ code }))
      xmlRequest.onreadystatechange = function () {
        if (xmlRequest.readyState === 4 && xmlRequest.status == 200) {
          s(true)
        }
      }
      xmlRequest.onerror = function () {
        e(false)
      }

      xmlRequest.onprogress = function () {}
    })
  }

  function getDDCorpId() {
    return new Promise<string>((s, e) => {
      dd.ready(async function () {
        try {
          let result = await dd.runtime.permission.requestAuthCode({
            corpId: "dingd41f8f2af60aacb935c2f4657eb6378f",
          })
          s(result.code)
        } catch (error) {
          e(error)
        }
      })
    })
  }

  async function getMenuData() {
    try {
      // const code = await getDDCorpId()
      // await postUserCode(code)
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

  const render = useMemo(() => {
    return menuList.length ? (
      menuList.map((item, index) => <MainList {...item} key={index} />)
    ) : haveAccess ? (
      <Empty />
    ) : (
      <NoAccess />
    )
  }, [menuList, haveAccess])
  useEffect(() => {
    getMenuData()
  }, [])
  return <>{render}</>
}

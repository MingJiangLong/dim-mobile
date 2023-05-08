import { useEffect, useMemo, useState } from "react"
import MainList from "../MainList"
import NoAccess from "../NoAccess"
import dd from "dingtalk-jsapi"

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
    return new Promise((s, e) => {
      const xmlRequest = new XMLHttpRequest()
      xmlRequest.onreadystatechange = function (ev) {
        if (this.readyState == 4 && this.status == 200) {
          s(xmlRequest.response)
        } else {
          e(e)
        }
      }
      xmlRequest.onerror = function (error) {
        e()
      }
      xmlRequest.open("post", "https://dim.dev.uboxol.com/user/info")
      xmlRequest.send(JSON.stringify({ code }))
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
      setMenuData(data)
    } catch (error) {}
  }

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
  useEffect(() => {
    getMenuData()
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

declare global {
  interface Window {
    data: Menu;
    VConsole:any
  }
  interface Menu {
    code: number
    menu_list: MenuItem[]
    page_url:string
  }
  interface MenuItem {
    name: string
    id: number
    method: string
    type: number
    status: number
    page_url: string | null
    child?: MenuItem[]
  }
}

export { }

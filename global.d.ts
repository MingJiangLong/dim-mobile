declare global {
  interface Window {
    data: Menu;
  }
  interface Menu {
    code: number
    menu_list: MenuItem[]
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

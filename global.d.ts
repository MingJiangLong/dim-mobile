declare global {
  interface Window {
   	data: MenuItem[];
  }
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
export {}

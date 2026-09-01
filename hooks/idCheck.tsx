import { useSport } from "."

 export const SportId = (id: string) => {
  const { data} = useSport()
  const name = data?.data.find((e)=> e.id == id)?.name
  return name
}
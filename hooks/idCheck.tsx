import { useSportFetch } from "."


 export const SportId = (id: string) => {
  const { data} = useSportFetch()
  const name = data?.data.find((e)=> e.id == id)?.name
  return name
}
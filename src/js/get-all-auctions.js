import fetchData from "./tools/fetchData.js";

export default async () => {
  const data = await fetchData("listings")

  console.log(data)

  data.forEach(item => {
    console.log(item)

  })
}
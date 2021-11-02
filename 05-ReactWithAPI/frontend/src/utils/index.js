import jsonInfo from "../json/jsonInfo.json";

export const getTitle = url => {
   const json = jsonInfo.find(
     x => x.url === url
   );
   return json.title;
 }


export const getAPIPath = url => {
  const collection = jsonInfo.find((element) => element.url === url);
  return collection.name || "allProducts";
}
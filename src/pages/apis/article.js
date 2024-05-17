import http from "@/utils/request";

export const getChannels = async () => {
  const res = await http.get("/channels");
  return res.data;
};

export const publishArticle = async (params) => {
  await http.post("/mp/articles?draft=false", params);
};

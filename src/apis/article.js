import http from "@/utils/request";

export const getChannels = async () => {
  const res = await http.get("/channels");
  return res.data;
};

export const publishArticle = async (params) => {
  await http.post("/mp/articles?draft=false", params);
};

export const getArticle = async (params) => {
  const res = await http.get("/mp/articles", { params });
  return res;
};

export const getArticleById = async (articleId) => {
  const res = await http.get(`/mp/articles/${articleId}`);
  return res;
};

export const delArticle = async (articleId) => {
  await http.delete(`/mp/articles/${articleId}`);
};

export const updateArticle = async (articleId, params) => {
  await http.put(`/mp/articles/${articleId}?draft=false`, params);
};

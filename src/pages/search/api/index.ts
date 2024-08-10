import { apiOrigin } from "@/utils/serverMap";

const api = {
  getSearchList: `${apiOrigin}/v1/search`,
  getHotSearch: `${apiOrigin}/v1/search/hot`,
}

export default api

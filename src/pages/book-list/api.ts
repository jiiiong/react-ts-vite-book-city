import { apiOrigin } from "@/utils/serverMap";


const api = {
  getBookList: (key: string) => `${apiOrigin}/v1/bookList/${key}`,
}

export default api;

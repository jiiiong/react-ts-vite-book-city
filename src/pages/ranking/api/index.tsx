import { apiOrigin } from "@/utils/serverMap";

export const api = {
  ranking: `${apiOrigin}/v1/ranking/gender`,
  getBookList: (gender: 'male'|'female', id: string) => (
    `${apiOrigin}/v1/ranking/${gender}/bookList/${id}`
  )
}

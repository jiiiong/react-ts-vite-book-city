import { apiOrigin } from "@/utils/serverMap";

export const api = {
  getChapter: (bookId: string, chapterId: string) => (
    `${apiOrigin}/v1/chapter/${bookId}/${chapterId}`
  ),
  getBook: (id: string) => (
    `${apiOrigin}/v1/book/${id}`
  )
}

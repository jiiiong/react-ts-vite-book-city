import { apiOrigin } from "@/utils/serverMap";

export const api = {
  getBook: (id: string) => `${apiOrigin}/v1/book/${id}`,
}

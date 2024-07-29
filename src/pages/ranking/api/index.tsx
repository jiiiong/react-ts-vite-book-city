export const api = {
  ranking: '/api/v1/ranking/gender',
  getBookList: (gender: 'male'|'female', id: string) => (
    `/api/v1/ranking/${gender}/bookList/${id}`
  )
}

import { IBookInfo } from "@/types/book";
import storage from "./storage";

export function isShelfed(bookId?: string): boolean {
  if (bookId === undefined)
    return false
  const shelf = storage.get('shelf') as IBookInfo[] || []
  const index = shelf.findIndex((book)=>(book.bookId === bookId));
  if (index !== -1)
    return true
  const group = storage.get('shelf-group') as Record<string, IBookInfo[]> || {};
  for (const books of Object.values(group)) {
    const index = books.findIndex((book)=>(book.bookId === bookId));
    if (index !== -1)
      return true
  }

  return false

}

export function setShelf(bookInfo: IBookInfo) {

  const shelf = storage.get('shelf') as IBookInfo[] || []
  const index = shelf.findIndex((item)=>{item.bookId === bookInfo.bookId})
  if (index === -1) {
    shelf.unshift(bookInfo)
    storage.set('shelf', shelf);
  }
}

export function removeShelf(bookId: string) {
  const shelf = storage.get('shelf') as IBookInfo[] || []
  const index = shelf.findIndex((book)=>(book.bookId) === bookId);
  if (index !== -1) {
    shelf.splice(index, 1);
    storage.set('shelf', shelf);
  }
}

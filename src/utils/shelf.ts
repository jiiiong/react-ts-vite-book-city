import { IBookInfo } from "@/types/book";
import storage from "./storage";

export function isShelfed(bookId?: string): boolean {
  if (bookId === undefined)
    return false
  const shelf = storage.get('shelf') as IBookInfo[] || []
  const index = shelf.findIndex((book)=>(book.bookId === bookId));
  return index !== -1
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

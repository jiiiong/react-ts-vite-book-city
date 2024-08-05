import { IBookInfo } from "@/types/book";
import storage from "./storage";

export function hasGroup(groupName?: string): boolean {
  if (groupName === undefined)
    return false
  const group = storage.get('shelf-group') as Record<string, IBookInfo[]> || {}
  return groupName in group
}

export function setGroup(groupName: string, bookList: IBookInfo[]) {
  const group = storage.get('shelf-group') as Record<string, IBookInfo[]> || {}
  if (groupName in group) {
    const BookIdSet = new Set<string>();
    bookList.forEach((book)=>{BookIdSet.add(book.bookId)})
    group[groupName].forEach((book)=>{
      if (!BookIdSet.has(book.bookId))
        bookList.push(book)
    })
  }

  group[groupName] = bookList
  storage.set('shelf-group', group);
}

export function removeGroup(groupName: string) {
  const group = storage.get('shelf-group') as Record<string, IBookInfo[]> || {};
  if (groupName in group)
    delete group[groupName]
  storage.set('shelf-group', group);
}

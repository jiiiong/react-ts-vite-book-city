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
  const group = storage.get('shelf-group') as Record<string, IBookInfo[]> || {}
  for (const name in group) {
    const index = group[name].findIndex((item) => item.bookId === bookId)
    if (index !== -1) {
      group[name].splice(index, 1);
      if (!group[name].length)
        delete group[name];
    }
    storage.set('shelf-group', group);
  }
}

export function removeBooks(books: IBookInfo[]) {
  const shelf = storage.get('shelf') as IBookInfo[] || []
  books.forEach((book) => {
    const index = shelf.findIndex((item) => item.bookId === book.bookId)
    if (index !== -1) {
      shelf.splice(index, 1);
    }
  })
  storage.set('shelf', shelf);
  window.dispatchEvent(new CustomEvent('localStorage-update', {detail:{key:'shelf'}}))
}

export function setGroup(name: string, books: IBookInfo[], groupNames: string[]) {
  const group = storage.get('shelf-group') as Record<string, IBookInfo[]> || {};

  // 收集分组中的书籍
  const groupBooks: IBookInfo[] = [];
  groupNames.forEach((groupName) => {
    groupBooks.push(...group[groupName]);
    delete group[groupName];
  });

  // 添加到目标 group
  group[name] = group[name] || []
  group[name] = [...group[name], ...groupBooks, ...books];

  storage.set('shelf-group', group);
  removeBooks(books);
  window.dispatchEvent(new CustomEvent('localStorage-update', {detail: {key:'shelf'}}));
}

export function removeGroup(groupNames: string[]) {
  const group = storage.get('shelf-group') as Record<string, IBookInfo[]> || {};

  for (const name in group){
    const index = groupNames.findIndex(item => item === name)
    if (index !== -1)
      delete group[name]

  }
  storage.set('shelf-group', group);

  window.dispatchEvent(new CustomEvent('localStorage-update', {detail: {key:'shelf'}}));
}

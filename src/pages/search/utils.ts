import storage from "@/utils/storage";
import { HISTORY_SEARCH_LIST } from "./constants";


function updateHistory(searchString: string) {
  if (searchString === '') return

  const searchList = storage.get(HISTORY_SEARCH_LIST) as (string[] | null)|| [];
  // 删除原来的searchkey
  const oriIndex = searchList.findIndex(item => item===searchString);
  if (oriIndex!==-1)
    searchList.splice(oriIndex,1);
  searchList.unshift(searchString);
  storage.set(HISTORY_SEARCH_LIST, searchList);
  window.dispatchEvent(new CustomEvent('localStorage-update', {detail:{ key: HISTORY_SEARCH_LIST}}))
}

function deleteHistory(searchString: string){
  if (searchString === '') return
  const searchList = storage.get(HISTORY_SEARCH_LIST) as (string[] | null)|| [];
  // 删除原来的searchkey
  const oriIndex = searchList.findIndex(item => item===searchString);
  if (oriIndex!==-1)
    searchList.splice(oriIndex,1);
  storage.set(HISTORY_SEARCH_LIST, searchList);
  window.dispatchEvent(new CustomEvent('localStorage-update', {detail:{ key: HISTORY_SEARCH_LIST}}))
}

function clearHistroy() {
  storage.remove(HISTORY_SEARCH_LIST);
  window.dispatchEvent(new CustomEvent('localStorage-update', {detail:{ key: HISTORY_SEARCH_LIST}}))
}

export {updateHistory, deleteHistory, clearHistroy};

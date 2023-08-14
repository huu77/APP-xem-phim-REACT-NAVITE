import {CommentStore} from './Comment';
import { ListLikeStore } from './ListLike';
import {createContext,useContext} from'react'
import { ListSearch } from './ListSearch';
export class RootStore {
     commentStore
     likeListStore
     listSearch
  constructor() {
    this.commentStore = new CommentStore();
    this.likeListStore = new ListLikeStore();
    this.listSearch = new ListSearch();
  }
}

const rootStore = new RootStore();
export default rootStore;

  export const StoreContext= createContext(rootStore)
  export const StoreProvider= StoreContext.Provider
  export const useStore= ()=>useContext(StoreContext)


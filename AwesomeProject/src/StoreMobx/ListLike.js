import { makeObservable, observable, action } from 'mobx';
 
//class 
export class ListLikeStore {
    lists = [];

    constructor() {
        makeObservable(this, {
            lists: observable,
            getList: action,
            delete: action,
            postLIke: action,

        });
    }

    getList = async (data) => {
        try {
            this.lists = data;
        } catch (error) {
            console.error('Error fetching likelist:', error);
        }
    };
    delete = async (id) => {
        this.lists = this.lists.filter(item => item.id !== id);
    };
    postLIke = async (data) => {
        this.lists.push(data)
    };

}

const likeListStore = new ListLikeStore();
export default likeListStore;

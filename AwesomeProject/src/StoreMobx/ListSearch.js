import { makeObservable, observable, action } from 'mobx';

//class 
export class ListSearch {
    lists = { search: '', item_per_page: '5', page: '1', filter: 'ASC' ,totalCount:''}
    dataPhims = []
   
    constructor() {
        makeObservable(this, {
            lists: observable,
            dataPhims: observable,     
            addItem: action,
            setData:action,
             

        });
    }

    addItem(key, value){
        this.lists = { ...this.lists, [key]: value };
    };
    setData = async (data) => {
        this.dataPhims = data
    };

    
}

const listSearch = new ListSearch();
export default listSearch;

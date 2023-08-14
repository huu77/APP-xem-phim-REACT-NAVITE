import { makeObservable, observable, action } from 'mobx';
 

export class CommentStore {
  lists = [];

  constructor() {
    makeObservable(this, {
      lists: observable,
      getComment: action,
      postComment: action,
      deleteComment:action,
      updateComment:action
    });
  }

  getComment = async (data) => {
    try {
      this.lists = data;
    } catch (error) {
      console.error('Error fetching comment:', error);
    }
  };

  postComment = async (data) => {
    try {
      this.lists.push(data);
    } catch (error) {
      console.error('Error posting comment:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  deleteComment=async(id)=>{
    try {
      this.lists = this.lists.filter(comment => comment.id !== id);

    } catch (error) {
      console.error('Error postdeleteing comment:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };
  updateComment=async(id,data)=>{
    const updatedLists = this.lists.map(comment =>
      comment.id === id ? { ...comment, text_comment:data } : comment
    );
    this.lists = updatedLists;
  }
  
}

const commentStore = new CommentStore();
export default commentStore;

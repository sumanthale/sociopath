import React, { Component } from 'react';
import { db } from '../../firebase/firebase';
import { getAllPosts } from '../../redux/posts/posts.actions';
import Post from './Post';
let unsubscribe;
class Posts extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    unsubscribe = db
      .collection('posts')
      .orderBy('time', 'desc')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            console.log('Added : ', change.doc.data());

            this.setState({
              posts: [
                ...this.state.posts,
                { ...change.doc.data(), id: change.doc.id },
              ],
            });
          }
          if (change.type === 'modified') {
            console.log('Modified : ', change.doc.data());

            const filter = this.state.posts.map((doc) => {
              if (doc.id === change.doc.id) {
                return { ...change.doc.data(), id: doc.id };
              }
              return doc;
            });
            this.setState({ posts: filter });
          }
          if (change.type === 'removed') {
            const filter = this.state.posts.filter(
              (doc) => doc.id !== change.doc.id
            );
            this.setState({ posts: filter });
            console.log('Removed : ', change.doc.data());
          }
        });
      });
  }
  componentWillUnmount() {
    if (unsubscribe) {
      unsubscribe();
    }
  }
  render() {
    console.log(this.state.posts);
    return (
      <div>
        {this.state.posts.map((post) => (
          <Post data={post} key={post.id} />
        ))}
      </div>
    );
  }
}
export default Posts;

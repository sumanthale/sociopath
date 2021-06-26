import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { db } from '../../../firebase/firebase';
import Post from '../../common/Post';

let unsubscribe;
class ProfilePosts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    const {
      params: { profile },
    } = this.props.match;
    console.log(profile);
    unsubscribe = db
      .collection('posts')
      .where('userName', '==', profile)
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
    return (
      <div>
        {this.state.posts.length > 0 ? (
          this.state.posts.map((post) => <Post data={post} key={post.id} />)
        ) : (
          <div
            className="container d-flex flex-column justify-content-center align-items-center"
            style={{ height: '50vh' }}
          >
            <i className="far fa-question-circle fa-4x"></i>
            <h3>No Questions Yet</h3>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(ProfilePosts);

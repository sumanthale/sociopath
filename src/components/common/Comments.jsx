import React, { Component } from 'react';
import { auth, db } from '../../firebase/firebase';
import Comment from './Comment';
let unsub;
export class Comments extends Component {
  state = {
    comments: [],
    loading: true,
    comment: '',
  };

  componentDidMount() {
    const { id } = this.props.data;
    db.collection('posts')
      .doc(id)
      .collection('comments')
      .orderBy('time', 'desc')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            console.log('Added : ', change.doc.data());

            this.setState({
              comments: [
                ...this.state.comments,
                { ...change.doc.data(), id: change.doc.id },
              ],
              loading: false,
            });
          }
          if (change.type === 'modified') {
            console.log('Modified : ', change.doc.data());

            const filter = this.state.comments.map((doc) => {
              if (doc.id === change.doc.id) {
                return { ...change.doc.data(), id: doc.id };
              }
              return doc;
            });
            this.setState({ comments: filter, loading: false });
          }
          if (change.type === 'removed') {
            const filter = this.state.comments.filter(
              (doc) => doc.id !== change.doc.id
            );
            this.setState({ comments: filter, loading: false });
            console.log('Removed : ', change.doc.data());
          }
        });
        this.setState({
          loading: false,
        });
      });
  }
  handelChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };
  handelSubmit = (e) => {
    e.preventDefault();
    db.collection('posts')
      .doc(this.props.data.id)
      .collection('comments')
      .add({
        comment: this.state.comment,
        user: auth.currentUser.email,
        time: new Date(),
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      comment: '',
    });
  };
  componentWillUnmount() {
    unsub();
  }
  render() {
    const { loading, comments } = this.state;
    return (
      <div className="p-3">
        <form
          className="d-flex align-items-center"
          onSubmit={this.handelSubmit}
        >
          <img
            src={
              this.props.image ||
              'http://simpleicon.com/wp-content/uploads/account.png'
            }
            alt="..."
            width="30px"
            className="rounded-circle"
            height="30px"
          />
          <textarea
            className="form-control mx-3"
            rows="1"
            required
            value={this.state.comment}
            onChange={this.handelChange}
          />
          <button className="btn btn-primary " type="submit">
            Add
          </button>
        </form>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-center" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            {comments.length > 0 ? (
              <>
                <h6 className="border-bottom border-gray pb-2 mb-0">
                  Recent comments
                </h6>
                {comments.map((comment) => (
                  <Comment key={comment.id} data={comment} />
                ))}
              </>
            ) : (
              <>
                <h6 className="border-bottom border-gray pb-2 mb-0 text-center">
                  No comments
                </h6>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Comments;

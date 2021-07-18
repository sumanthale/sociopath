import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
const Comment = ({ data, post }) => {
  const removeComment = () => {
    db.collection('posts')
      .doc(post.id)
      .collection('comments')
      .doc(data.id)
      .delete()
      .then(() => {
        toast.success('Successfully deleted!');
      })
      .catch((err) => {
        toast.error("Sorry This didn't work.");
      });
  };

  return (
    <div className="d-flex align-items-center">
      <div className="media text-muted pt-3 flex-grow-1">
        <p className="media-body p-2 mb-0 small lh-125 border border-gray">
          <strong className="d-block text-gray-dark">
            <Link
              className="text-uppercase text-dark"
              style={{
                cursor: 'pointer',
                letterSpacing: '1px',
              }}
              to={data.user.split('@')[0]}
            >
              @{data.user.split('@')[0]}
            </Link>

            <span className="font-weight-lighter font-smaller ml-3">
              {new Date(data.time.seconds * 1000).toDateString().slice(3)}{' '}
              {new Date(data.time.seconds * 1000).toLocaleTimeString()}
            </span>
          </strong>
          {data.comment}
        </p>
      </div>
      {(auth.currentUser.email === post.user ||
        auth.currentUser.email === data.user) && (
        <i
          className="fas fa-trash ml-2 pt-3 text-danger"
          onClick={removeComment}
          style={{
            cursor: 'pointer',
          }}
        ></i>
      )}
    </div>
  );
};

export default Comment;

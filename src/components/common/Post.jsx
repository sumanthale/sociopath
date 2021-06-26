import React, { useEffect, useState } from 'react';
import firebase, { auth, db } from '../../firebase/firebase';
import Comments from './Comments';
import { Link } from 'react-router-dom';

const Post = ({ data }) => {
  const [showComments, setshowComments] = useState(false);
  const [isliked, setIsliked] = useState(false);
  const email = auth.currentUser.email;
  const [user, setUser] = useState(false);

  useEffect(() => {
    db.collection('users')
      .where('user', '==', data.user)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            setUser({ ...doc.data() });
          });
        } else {
          setUser(false);
        }
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
    const filtered = data.likes.filter((el) => el === email);
    if (filtered.length === 1) {
      setIsliked(true);
    }
  }, []);

  const likePost = () => {
    db.collection('posts')
      .doc(data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(email),
      })
      .then(() => {
        setIsliked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dislikePost = () => {
    db.collection('posts')
      .doc(data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(email),
      })
      .then(() => {
        setIsliked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card my-3 shadow">
      <div className="card-body">
        <div className="card-text d-flex">
          <img
            src={
              user
                ? user.imageUrl
                : 'http://simpleicon.com/wp-content/uploads/account.png'
            }
            alt="..."
            width="50px"
            height="50px"
            style={{
              borderRadius: '50%',
            }}
          />{' '}
          <div className="ml-3">
            <Link
              className="text-uppercase text-dark"
              style={{
                cursor: 'pointer',
                letterSpacing: '1px',
              }}
              to={data.user.split('@')[0]}
            >
              {data.user.split('@')[0]}
            </Link>
            <p className="text-muted">
              {new Date(data.time.seconds * 1000).toUTCString()}
            </p>
          </div>
          <div className="ml-auto">
            <button className="btn btn-light rounded-circle">
              <h6
                className="font-weight-bolder"
                style={{ letterSpacing: '1px' }}
              >
                ...
              </h6>
            </button>
          </div>
        </div>
        <p
          className="card-text"
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></p>

        <img src={data.image} className="img-thumbnail" alt="..." />
      </div>
      <div className="card-text d-flex w-100 p-1 flex-column h-100 border">
        {data.likes.length > 0 && (
          <div className="h-25 border-bottom">
            <div className="d-flex justify-content-between px-5">
              <div>
                <span className="text-muted">{data.likes.length} likes</span>
              </div>
              {/* <div>
                <span className="text-muted">123 comments</span>
              </div> */}
            </div>
          </div>
        )}
        <div className="d-flex justify-content-around">
          {!isliked ? (
            <div>
              <button
                className="btn"
                style={{ outline: 'none', boxShadow: 'none' }}
                onClick={likePost}
              >
                <i
                  className="far fa-thumbs-up fa-2x"
                  style={{
                    color: isliked ? '#007bff' : '',
                  }}
                ></i>
              </button>
            </div>
          ) : (
            <div>
              <button
                className="btn"
                style={{ outline: 'none', boxShadow: 'none' }}
                onClick={dislikePost}
              >
                <i
                  className="far fa-thumbs-down fa-2x"
                  style={{
                    color: isliked ? '#007bff' : '',
                  }}
                ></i>
              </button>
            </div>
          )}
          <div>
            <button
              className="btn"
              style={{ outline: 'none', boxShadow: 'none' }}
              onClick={() => setshowComments(!showComments)}
            >
              <i className="far fa-comment fa-2x"></i>
            </button>
            <span className="font-weight-bolder">Comment</span>
          </div>
        </div>
      </div>
      {showComments && <Comments data={data} image={user.imageUrl} />}
    </div>
  );
};

export default Post;

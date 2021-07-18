import React, { useEffect, useState } from 'react';
import firebase, { auth, db } from '../../firebase/firebase';
import Comments from './Comments';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import bulbOn from '../../assets/light-sm.png';
import bulbOff from '../../assets/lightbulb-sm.png';
import lgBulbOn from '../../assets/256lighton.png';
import commented from '../../assets/comment-sm.png';
let unsub;
const Post = ({ data }) => {
  const [showComments, setshowComments] = useState(false);
  const [isliked, setIsliked] = useState(false);
  const email = auth.currentUser.email;
  const [user, setUser] = useState(false);
  const [options, setOptions] = useState(false);
  const [comments, setcomments] = useState(0);

  useEffect(() => {
    db.collection('users')
      .where('user', '==', data.user)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, ' => ', doc.data());
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

  useEffect(() => {
    countComments();
    return () => {
      if (unsub) unsub();
    };
  }, []);

  const countComments = async () => {
    const query = db.collection('posts').doc(data.id).collection('comments');
    let count = 0;
    unsub = query.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') setcomments(++count);
        if (change.type === 'removed') setcomments(--count);
      });
    });
  };

  const likePost = () => {
    db.collection('posts')
      .doc(data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(email),
      })
      .then(() => {
        const el = document.getElementById(data.image);
        el.classList.remove('active');
        setTimeout(() => {
          el.classList.add('active');
        }, 800);
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
  const deletePost = () => {
    db.collection('posts')
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
    <div
      className="card my-3 shadow"
      onClick={() => {
        if (options) {
          setOptions(!options);
        }
      }}
    >
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
                fontWeight: '600',
              }}
              to={data.user.split('@')[0]}
            >
              {data.user.split('@')[0]}
            </Link>
            <p
              className="text-muted "
              style={{
                fontSize: '12.5px',
              }}
            >
              {new Date(data.time.seconds * 1000).toDateString().slice(3)}{' '}
              {new Date(data.time.seconds * 1000).toLocaleTimeString()}
            </p>
          </div>
          {data.user === auth.currentUser.email && (
            <div className="ml-auto">
              <div
                className="btn  btn-sm rounded-circle"
                onClick={() => setOptions(!options)}
              >
                <h6
                  className="font-weight-bolder"
                  style={{ letterSpacing: '1px' }}
                >
                  ...
                </h6>
              </div>
              {options && (
                <div className="post_options">
                  <button
                    className="btn btn-outline-danger"
                    onClick={deletePost}
                  >
                    Delete post
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div onDoubleClick={likePost} className="double_like ">
          <p
            className="card-text"
            dangerouslySetInnerHTML={{ __html: data.text }}
          ></p>

          {data.image && (
            <div className="double_like">
              <img src={data.image} className="img-thumbnail" alt="..." />
              <div className="double_like-one">
                <img src={lgBulbOn} alt="" className="active" id={data.image} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="card-text d-flex w-100 p-1 flex-column h-100 border">
        {(data.likes.length > 0 || comments > 0) && (
          <div className="h-25 border-bottom">
            <div className="d-flex justify-content-between px-5">
              <div>
                <span className="text-muted">{data.likes.length} likes</span>
              </div>
              <div>
                <span className="text-muted">
                  {comments} {comments === 1 ? 'comment' : 'comments'}
                </span>
              </div>
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
                {/* <i
                  className="far fa-thumbs-up fa-2x"
                  style={{
                    color: isliked ? '#007bff' : '',
                  }}
                ></i> */}
                <img src={bulbOff} alt="" />
              </button>
            </div>
          ) : (
            <div>
              <button
                className="btn"
                style={{ outline: 'none', boxShadow: 'none' }}
                onClick={dislikePost}
              >
                {/* <i
                  className="far fa-thumbs-down fa-2x"
                  style={{
                    color: isliked ? '#007bff' : '',
                  }}
                ></i> */}
                <img src={bulbOn} alt="" />
              </button>
            </div>
          )}
          <div>
            <button
              className="btn"
              style={{ outline: 'none', boxShadow: 'none' }}
              onClick={() => setshowComments(!showComments)}
            >
              <img src={commented} alt="" />
              <span className="font-weight-bolder ml-2">Answers</span>
            </button>
          </div>
        </div>
      </div>
      {showComments && <Comments data={data} image={user.imageUrl} />}
    </div>
  );
};

export default Post;

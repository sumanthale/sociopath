import React from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase/firebase';
import PostQuestion from './PostQuestion';

const Ask = () => {
  const state = useSelector((state) => state.user.loggedInUser);
  console.log(state);

  return (
    <div className="card">
      <h5 className="card-header d-flex align-items-center">
        <img
          src={
            state
              ? state.imageUrl
              : 'http://simpleicon.com/wp-content/uploads/account.png'
          }
          className="mr-3"
          alt="..."
          width="50px"
          height="50px"
          style={{ borderRadius: '50%' }}
        />
        What's on your mind, {auth.currentUser.email.split('@')[0]}?
      </h5>
      <div className="card-body">
        <PostQuestion />
      </div>
    </div>
  );
};

export default Ask;

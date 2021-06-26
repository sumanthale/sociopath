import React from 'react';
import { auth } from '../../firebase/firebase';
import PostQuestion from './PostQuestion';

const Ask = () => {
  return (
    <div className="card">
      <h5 className="card-header">
        <img
          src="https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1043&q=80"
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

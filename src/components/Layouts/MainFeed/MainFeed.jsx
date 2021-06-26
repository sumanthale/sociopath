import React from 'react';
import Ask from '../../common/Ask';
import Posts from '../../common/Posts';

const MainFeed = () => {
  return (
    <div className="container-fluid">
      <Ask />
      <Posts />
    </div>
  );
};

export default MainFeed;

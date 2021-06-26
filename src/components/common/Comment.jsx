import React from 'react';
import { Link } from 'react-router-dom';
const Comment = ({ data }) => {
  return (
    <div className="media text-muted pt-3">
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
            {new Date(data.time.seconds * 1000).toUTCString()}
          </span>
        </strong>
        {data.comment}
      </p>
    </div>
  );
};

export default Comment;

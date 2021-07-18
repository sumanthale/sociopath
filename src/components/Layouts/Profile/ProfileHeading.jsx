import React from 'react';
import { auth } from '../../../firebase/firebase';
import { Link } from 'react-router-dom';
const ProfileHeading = ({ name, user }) => {
  return (
    <div className="container bg-dark ">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="p-4 col-sm-6">
            <div className="media align-items-end">
              <div className="mr-3">
                <img
                  src={user.imageUrl}
                  alt="..."
                  width="130"
                  height="130"
                  className="rounded-circle mb-2"
                />
                {auth.currentUser.email.split('@')[0] === name && (
                  <Link
                    to={name}
                    className="btn btn-outline-warning btn-sm btn-block"
                  >
                    Edit profile
                  </Link>
                )}
              </div>
              <div className="media-body mb-5 text-white">
                <h4 className="mt-0 mb-0">{name}</h4>
                <p className="small mb-4">
                  {' '}
                  {user.firstName + ' ' + user.lastName}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 text-white col-sm-6 d-flex justify-content-center">
            <div>
              <h5 className="mb-0">About</h5>
              <div className="p-2 rounded">
                <p className="font-italic mb-0">{user.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeading;

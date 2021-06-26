import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/firebase';
import ProfileHeading from './ProfileHeading';
import ProfilePosts from './ProfilePosts';
import Error from '../../../components/Reusable/Error';

const Profile = () => {
  const { profile } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    db.collection('users')
      .where('userName', '==', profile)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            setUser({ ...doc.data() });
          });
        } else {
          setUser(null);
        }
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        console.log('Error getting documents: ', error);
      });
  }, [profile]);
  return (
    <>
      {!loading && (
        <div>
          {user ? (
            <div>
              <ProfileHeading name={profile} user={user} />
              <div className="row container-fluid">
                <div className="col-lg-3 d-none d-md-block">
                  {/* <SideBar /> */}
                </div>

                <div className="col-md-12 col-lg-6">
                  <ProfilePosts />{' '}
                </div>
                <div className="col-lg-3 d-none d-md-block">
                  {/* <RightBar /> */}
                </div>
              </div>
            </div>
          ) : (
            <Error />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;

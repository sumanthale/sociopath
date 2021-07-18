import React, { useEffect, useState } from 'react';
import MainFeed from './MainFeed/MainFeed';
import RightBar from './RightBar/RightBar';
import Details from '../Details/Details';
import SideBar from './SideBar/SideBar';
import { auth } from '../../firebase/firebase';
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [render, SetRender] = useState('');
  useEffect(() => {
    if (auth.currentUser.emailVerified) {
      SetRender(view);
    } else {
      SetRender(userInfo);
    }
    setLoading(false);
  }, []);
  const view = (
    <div className="row ">
      <div className="col-sm-2 col-md-3 d-none d-sm-block">
        <SideBar />
      </div>

      <div className="col-sm-10 col-md-9 col-lg-6">
        <MainFeed />
      </div>
      <div className="col-lg-3 d-none d-lg-block">
        <RightBar />
      </div>
    </div>
  );

  const userInfo = <Details />;

  return <>{!loading && render}</>;
};

export default Home;
// const [loading, setLoading] = useState(true);
// const [render, SetRender] = useState('');
// const [userData, setUserData] = useState(false);

// useEffect(() => {
//   const fetchData = async () => {
//     const querySnapshot = await db
//       .collection('users')
//       .where('user', '==', auth.currentUser.email)
//       .get();
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, ' => ', doc.data());
//       setUserData(true);
//     });

//     if (auth.currentUser.emailVerified && userData) {
//       SetRender(view);
//     } else {
//       SetRender(userInfo);
//     }
//     console.log(userData);
//   };

//   fetchData();
//   setLoading(false);
// }, []);

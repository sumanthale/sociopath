import { db } from '../../firebase/firebase';
import UserActionTypes from './posts.types';

export const signInFailure = () => ({
  type: UserActionTypes.GET_ALL_POSTS,
});

export const getAllPosts = () => async (dispatch) => {
  try {
    // const user = await db.collection('posts').get();
    db.collection('posts').onSnapshot((data) => {
      data.forEach((doc) => {
        console.log(doc.data());
      });
    });
  } catch (error) {}
};

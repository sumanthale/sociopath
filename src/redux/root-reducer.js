import { combineReducers } from 'redux';
import postsReducer from './posts/posts.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export default rootReducer;

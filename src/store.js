import { configureStore } from '@reduxjs/toolkit';
import userSl from './userSlice'

const mystore = configureStore({
    reducer: {
      user: userSl
    }
  });
export default mystore;
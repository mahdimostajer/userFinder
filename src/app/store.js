import { configureStore } from '@reduxjs/toolkit'

import profileReducer from '../components/Profile/profileSlice'
import repoReducer from './../components/Repos/reposSlice';


export default configureStore({
    reducer: {
      profile: profileReducer,
      repos: repoReducer
    },
  })
  
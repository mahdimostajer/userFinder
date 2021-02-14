import './App.css';
import React, { useState,useEffect } from 'react';

import { List,Avatar, Space,Row} from 'antd';
import { EyeOutlined, ForkOutlined, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import Repo from './components/Repos/Repo';
import SearchUser from './components/SearchUser/SearchUser';
import Profile from './components/Profile/Profile';
import { useSelector} from 'react-redux'
import { selectProfile } from './components/Profile/profileSlice';


function App() {
  const profile=useSelector(selectProfile)
  const showProfile=()=>{
    if(profile===null){
      return null;
    }else{
      return <Profile />;
    }
  }
  return (
    <div className="App">
      <SearchUser />
      <Row>
        {showProfile()}
        <Repo />
      </Row>

    </div>
  );
}

export default App;

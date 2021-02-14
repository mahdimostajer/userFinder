import React, { useState } from "react";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./../Profile/profileSlice";
import { unwrapResult } from '@reduxjs/toolkit'


const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

function SearchUser() {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const onSearchClick = async (value) => {
    try {
      const result = await dispatch(fetchProfile(value));
      unwrapResult(result)
    } catch (err) {
      console.log('failed to add new post', err)

    }
  };
  return (
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        suffix={suffix}
        onSearch={(value) => {
          onSearchClick(value);
        }}
        style={{
          margin: 15,
        }}
      />
    </Space>
  );
}

export default SearchUser;

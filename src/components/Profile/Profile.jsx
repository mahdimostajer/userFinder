import React from "react";
import { Card, Avatar, Col, Space,Spin } from "antd";
import {
  StarOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { selectProfile } from "./profileSlice";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const { Meta } = Card;

function Profile() {
  const profile = useSelector(selectProfile);
  const status = useSelector((state) => state.profile.status);
  let content;
  if (profile === {}) {
    content = null;
  }
  if (status === "pending") {
    content = (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    );
  } else {
    content = (
      <Col xs={24} sm={24} md={8} lg={8} xl={6}> 
        <Card
          style={{
            marginLeft: 10,
          }}
          cover={<img alt="example" src={profile.avatar_url} />}
          actions={[
            <IconText
              icon={UsergroupAddOutlined}
              text={profile.followers}
              key="list-vertical-star-o"
            />,
            <IconText
              icon={StarOutlined}
              text="?"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={HomeOutlined}
              text={profile.location}
              key="list-vertical-star-o"
            />,
          ]}
        >
          <Meta
            title={<a href={profile.html_url}>{profile.login}</a>}
            description={profile.bio}
          />
        </Card>
      </Col>
    );
  }
  return content;
}

export default Profile;

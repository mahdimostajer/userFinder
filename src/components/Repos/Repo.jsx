import React, { useEffect } from "react";

import { List, Avatar, Space, Col,Spin } from "antd";
import { EyeOutlined, ForkOutlined, StarOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import QueueAnim from "rc-queue-anim";
import { useSelector, useDispatch } from "react-redux";
import { fetchRepos, selectAllRepos } from "./reposSlice";
import { selectProfile } from "../Profile/profileSlice";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function Repo() {
  const repos = useSelector(selectAllRepos);
  const profile = useSelector(selectProfile);
  const status = useSelector((state) => state.repos.status);

  const dispatch = useDispatch();
  useEffect(() => {
    if (profile !== null) {
      dispatch(fetchRepos(profile.login));
    }else{
        dispatch(fetchRepos(''))
    }
  }, [profile, dispatch]);
  let content;
  if (status === "pending") {
    content = (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    );
  } else {
    content = (
      <Col xs={24} sm={24} md={16} lg={16} xl={18}>
        <QueueAnim className="demo-content">
          <List
            style={{
              marginTop: 20,
              marginRight: 10,
              float: "right",
            }}
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 6,
            }}
            dataSource={repos}
            grid={{ gutter: 16, xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3 }}
            renderItem={(item) => (
              <List.Item
                key={item.name}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text={item.stargazers_count}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={ForkOutlined}
                    text={item.forks_count}
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={EyeOutlined}
                    text={item.watchers_count}
                    key="list-vertical-message"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://github.githubassets.com/images/modules/open_graph/github-mark.png" />
                  }
                  title={<a href={item.html_url}>{item.name}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </QueueAnim>
      </Col>
    );
  }
  return content;
}

export default Repo;

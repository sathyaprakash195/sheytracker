import React from "react";
import { Tabs } from "antd";
import Projects from "./Projects";

function Profile() {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Projects" key="1">
          <Projects />
        </Tabs.TabPane>

        <Tabs.TabPane tab="General" key="3">
          <h1>General</h1>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;

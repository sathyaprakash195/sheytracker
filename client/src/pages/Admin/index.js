import React, { useEffect } from "react";
import { Tabs } from "antd";
import Users from "./Users";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Projects from "./Projects";

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Projects" key="1">
          <Projects />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;

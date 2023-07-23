import React from "react";
import Header from "../components/Header/Header";
import SideBar from "../components/Sidebar/SideBar";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <SideBar />
        <h1>Welcome!</h1>
      </div>
    </>
  );
};

export default Dashboard;

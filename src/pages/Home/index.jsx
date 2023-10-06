import React from "react";
import FilterPanel from "../../components/Home/FilterPanel";
import MainTable from "../../components/Home/MainTable";
// import EmptyView from "../../components/common/EmptyView";
import "./styles.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home_panelList-wrap">
        <div className="home_panel-wrap">
          <FilterPanel />
        </div>
        <div className="home_list-wrap">
          <MainTable />
        </div>
      </div>
    </div>
  );
};

export default Home;

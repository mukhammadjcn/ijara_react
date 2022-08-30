import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { CatchError } from "src/utils/index";
import { GetAdvertsListConfig } from "src/server/config/Urls";
import HorizontalCard from "src/components/home/horizontalCard";
import NoData from "../animation/NoData";

function Adverts() {
  const { TabPane } = Tabs;
  const [status, setStatus] = useState("active");
  const [adverts, setAdverts] = useState([null, null, null, null]);

  // Get adverts list
  const GetAdverts = async (status: any) => {
    try {
      const { data } = await GetAdvertsListConfig(`?status=${status}`);
      setAdverts(data.results);
    } catch (error) {
      CatchError(error);
    }
  };

  useEffect(() => {
    GetAdverts(status);
  }, [status]);

  return (
    <Tabs
      defaultActiveKey="1"
      className="profile__adverts"
      onChange={(val) => setStatus(val)}
    >
      {/* Active adverts */}
      <TabPane tab="Faol (2)" key="active">
        {adverts.length > 1 ? (
          adverts.map((elem, index) => (
            <HorizontalCard key={index} data={elem} />
          ))
        ) : (
          <NoData />
        )}
      </TabPane>

      {/* Waiting adverts */}
      <TabPane tab="Kutayotgan (4)" key="waiting">
        {adverts.length > 1 ? (
          adverts.map((elem, index) => (
            <HorizontalCard key={index} data={elem} />
          ))
        ) : (
          <NoData />
        )}
      </TabPane>

      {/* InActive adverts */}
      <TabPane tab="Nofaol (0)" key="inactive">
        {adverts.length > 1 ? (
          adverts.map((elem, index) => (
            <HorizontalCard key={index} data={elem} />
          ))
        ) : (
          <NoData />
        )}
      </TabPane>

      {/* Rejected adverts */}
      <TabPane tab=" Rad etilgan (5)" key="rejected">
        {adverts.length > 1 ? (
          adverts.map((elem, index) => (
            <HorizontalCard key={index} data={elem} />
          ))
        ) : (
          <NoData />
        )}
      </TabPane>
    </Tabs>
  );
}

export default Adverts;

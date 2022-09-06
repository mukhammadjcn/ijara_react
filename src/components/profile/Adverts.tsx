import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { CatchError } from "src/utils/index";
import { MyAdvertsConfig } from "src/server/config/Urls";
import HorizontalCard from "src/components/home/horizontalCard";
import NoData from "../animation/NoData";
import { useAppSelector } from "src/hooks/index";

function Adverts() {
  const { TabPane } = Tabs;
  const [status, setStatus] = useState("active");
  const user = useAppSelector((state) => state.Login.user);
  const [adverts, setAdverts] = useState([null, null, null, null]);

  // Get adverts list
  const GetAdverts = async (status: any) => {
    try {
      const { data } = await MyAdvertsConfig(status);
      setAdverts(data);
    } catch (error) {
      CatchError(error);
    }
  };

  useEffect(() => {
    GetAdverts(status);
  }, [status]);

  return (
    <Tabs
      defaultActiveKey="active"
      className="profile__adverts"
      onChange={(val) => setStatus(val)}
    >
      {/* Active adverts */}
      <TabPane tab={`Faol (${user.ad_count.active})`} key="active">
        {adverts.length > 0 ? (
          adverts.map((elem, index) => (
            <HorizontalCard
              key={index}
              data={elem}
              getAdverts={() => GetAdverts(status)}
            />
          ))
        ) : (
          <NoData />
        )}
      </TabPane>

      {/* Waiting adverts */}
      <TabPane tab={`Kutayotgan (${user.ad_count.waiting})`} key="waiting">
        {adverts.length > 0 ? (
          adverts.map((elem, index) => (
            <HorizontalCard
              key={index}
              data={elem}
              getAdverts={() => GetAdverts(status)}
            />
          ))
        ) : (
          <NoData />
        )}
      </TabPane>

      {/* InActive adverts */}
      <TabPane tab={`Nofaol (${user.ad_count.inactive})`} key="inactive">
        {adverts.length > 0 ? (
          adverts.map((elem, index) => (
            <HorizontalCard
              key={index}
              data={elem}
              canActive={true}
              getAdverts={() => GetAdverts(status)}
            />
          ))
        ) : (
          <NoData />
        )}
      </TabPane>

      {/* Rejected adverts */}
      <TabPane tab={`Rad etilgan (${user.ad_count.rejected})`} key="rejected">
        {adverts.length > 0 ? (
          adverts.map((elem, index) => (
            <HorizontalCard
              key={index}
              data={elem}
              rejected={true}
              getAdverts={() => GetAdverts(status)}
            />
          ))
        ) : (
          <NoData />
        )}
      </TabPane>
    </Tabs>
  );
}

export default Adverts;

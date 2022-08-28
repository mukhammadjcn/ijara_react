import { Tabs } from "antd";
import HorizontalCard from "src/components/home/horizontalCard";
import React from "react";

function Adverts() {
  const { TabPane } = Tabs;

  return (
    <Tabs defaultActiveKey="1" className="profile__adverts">
      <TabPane tab="Faol (2)" key="1">
        <HorizontalCard />
        <HorizontalCard />
        <HorizontalCard />
        <HorizontalCard />
        <HorizontalCard />
      </TabPane>
      <TabPane tab="Kutayotgan (4)" key="2">
        <HorizontalCard />
      </TabPane>
      <TabPane tab="Nofaol (0)" key="3">
        <HorizontalCard />
      </TabPane>
      <TabPane tab=" Rad etilgan (5)" key="4">
        <HorizontalCard />
      </TabPane>
    </Tabs>
  );
}

export default Adverts;

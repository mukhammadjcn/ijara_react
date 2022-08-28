import React, { useEffect, useState } from "react";
import { CatchError } from "src/utils/index";
import { Button, Select, Switch, Tabs } from "antd";
import HorizontalCard from "src/components/home/horizontalCard";
import { GetAdvertsListConfig } from "src/server/config/Urls";
import Header from "src/components/header";
import Footer from "src/components/footer";

function SearchPage() {
  const { Option } = Select;
  const { TabPane } = Tabs;
  const [url, setUrl] = useState("");
  const [adverts, setAdverts] = useState([null, null, null, null, null, null]);

  const handleMakeParams = (key: any, value: any) => {
    let urlParams = new URLSearchParams(url);
    if (value) {
      if (urlParams.has(key)) urlParams.set(key, value);
      else urlParams.append(key, value);
    } else {
      urlParams.delete(key);
    }
    setUrl(urlParams.toString());
    console.log(urlParams.toString());
  };

  // Get adverts list
  const GetAdverts = async () => {
    try {
      const { data } = await GetAdvertsListConfig();
      setAdverts(data.results);
    } catch (error) {
      CatchError(error);
    }
  };

  useEffect(() => {
    GetAdverts();
  }, []);

  return (
    <>
      <Header />
      <div className="search">
        <div className="container">
          <div className="home__search flex">
            <Select placeholder="Viloyatni tanlang" allowClear size="large">
              <Option value="jack">Andijon viloyati</Option>
              <Option value="lucy">Buxoro viloyati</Option>
              <Option value="Yiminghe">Jizzax viloyati</Option>
            </Select>
            <Select placeholder="Tumanni tanlang" allowClear size="large">
              <Option value="jack">Vobkent</Option>
              <Option value="lucy">Gazli</Option>
              <Option value="Yiminghe">Olot</Option>
            </Select>
            <Select placeholder="Xonalar soni" allowClear size="large">
              <Option value="jack">1</Option>
              <Option value="lucy">2</Option>
              <Option value="Yiminghe">3</Option>
            </Select>
            <Select placeholder="Narxi" allowClear size="large">
              <Option value="jack">100$ - 200$</Option>
              <Option value="lucy">200$ - 300$</Option>
              <Option value="luzcy">300$ - 400$</Option>
              <Option value="luccy">400$ - 500$</Option>
              <Option value="luxcy">500$+</Option>
            </Select>
            <Select placeholder="Radius" allowClear size="large">
              <Option value="jack">1km - 5km</Option>
              <Option value="jacck">5km - 10km</Option>
              <Option value="jacsk">10km - 15km</Option>
              <Option value="jacwk">15km+</Option>
            </Select>
            <button>Qidirmoq</button>
          </div>
          <div className="search__main">
            <div className="flex">
              <h2>Biz 1,000 dan ortiq e'lon topdik</h2>

              <div className="switch">
                <Switch />
                <span>Sheriklikka odam kerak</span>
              </div>
            </div>
            <div className="search__filter">
              <div className="">
                <h4>Saralash</h4>
                <Select placeholder="Viloyatni tanlang" allowClear size="large">
                  <Option value="jack">Andijon viloyati</Option>
                  <Option value="lucy">Buxoro viloyati</Option>
                  <Option value="Yiminghe">Jizzax viloyati</Option>
                </Select>
              </div>
              <div className="">
                <h4>Saralash</h4>
                <Select placeholder="Viloyatni tanlang" allowClear size="large">
                  <Option value="jack">Andijon viloyati</Option>
                  <Option value="lucy">Buxoro viloyati</Option>
                  <Option value="Yiminghe">Jizzax viloyati</Option>
                </Select>
              </div>
              <div className="">
                <h4>Saralash</h4>
                <Select placeholder="Viloyatni tanlang" allowClear size="large">
                  <Option value="jack">Andijon viloyati</Option>
                  <Option value="lucy">Buxoro viloyati</Option>
                  <Option value="Yiminghe">Jizzax viloyati</Option>
                </Select>
              </div>
              <div className="">
                <h4>Saralash</h4>
                <Select placeholder="Viloyatni tanlang" allowClear size="large">
                  <Option value="jack">Andijon viloyati</Option>
                  <Option value="lucy">Buxoro viloyati</Option>
                  <Option value="Yiminghe">Jizzax viloyati</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="search__adverts">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Hamma e’lonlar" key="1">
                {adverts.map((elem, index) => (
                  <HorizontalCard key={index} stat={false} data={elem} />
                ))}
              </TabPane>
              <TabPane tab="Agentlik" key="2">
                {adverts.map((elem, index) => (
                  <HorizontalCard key={index} stat={false} data={elem} />
                ))}
              </TabPane>
              <TabPane tab="Oliy ta’lim muassasasi" key="3">
                {adverts.map((elem, index) => (
                  <HorizontalCard key={index} stat={false} data={elem} />
                ))}
              </TabPane>
            </Tabs>
            <span className="filterClear">Filtirlarni o‘chirish</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;

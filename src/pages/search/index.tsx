import React, { useEffect, useState } from "react";
import { CatchError } from "src/utils/index";
import {
  Button,
  Dropdown,
  Input,
  Pagination,
  Select,
  Slider,
  Switch,
  Tabs,
} from "antd";
import HorizontalCard from "src/components/home/horizontalCard";
import { GetAdvertsListConfig } from "src/server/config/Urls";
import Header from "src/components/header";
import Footer from "src/components/footer";
import { useSearchParams } from "react-router-dom";
import { metroList, regionsList } from "src/server/Host";
import NoData from "src/components/animation/NoData";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { Option } = Select;
  const { TabPane } = Tabs;
  const [total, setTotal] = useState(10);
  const currentPage = searchParams.get("page");
  const [districts, setDistricts] = useState<any>([]);
  const [current, setCurrent] = useState(currentPage ? currentPage : 1);
  const [adverts, setAdverts] = useState([null, null, null, null, null, null]);

  // Default filter values
  const [disValue, setDisValue] = useState<any>(null);
  const [regValue, setRegValue] = useState<any>(null);
  const [numRoomValue, setNumRoomValue] = useState<any>([]);
  const [rentTypeValue, setRentTypeValue] = useState<any>(null);
  const [comminsionValue, setComminsionValue] = useState<any>(null);
  const [furnitureValue, setFurnitureValue] = useState<any>(null);
  const [metroValue, setMetroValue] = useState<any>(null);

  const makeDefaultParams = () => {
    if (searchParams.get("region") && regionsList.length > 1) {
      setRegValue(
        regionsList.find((item: any) => item.id == searchParams.get("region"))
          ?.name
      );
      let newDistricts = regionsList.find(
        (item: any) => item.id == searchParams.get("region")
      )?.districts;

      if (searchParams.get("district")) {
        setDisValue(
          newDistricts.find(
            (item: any) => item.id == searchParams.get("district")
          )?.name
        );
      }
    }

    if (searchParams.get("number_of_rooms__in")) {
      setNumRoomValue(searchParams.get("number_of_rooms__in")?.split(","));
    }

    if (searchParams.get("rent_type")) {
      setRentTypeValue(searchParams.get("rent_type"));
    }

    if (searchParams.get("have_commission_fee")) {
      setComminsionValue(searchParams.get("have_commission_fee"));
    }

    if (searchParams.get("is_furnished")) {
      setFurnitureValue(searchParams.get("is_furnished"));
    }

    if (searchParams.get("near_metro") && metroList.length > 1) {
      setMetroValue(
        metroList.find((item: any) => item.id == searchParams.get("near_metro"))
          ?.name
      );
    }
  };

  // ----------------------------------------------------------------------------------

  const handleMakeParams = (key: any, value: any) => {
    if (value) {
      if (searchParams.has(key)) searchParams.set(key, value);
      else searchParams.append(key, value);
    } else searchParams.delete(key);
    setSearchParams(searchParams);
  };
  const handleRegion = (id: number) => {
    if (id) {
      setDistricts(regionsList.find((item: any) => item.id == id)?.districts);
    } else {
      setDistricts(null);
      handleMakeParams("district", "");
    }
    setRegValue(id);
    setDisValue(null);
    handleMakeParams("region", id);
  };
  const handleDistrict = (id: number) => {
    setDisValue(id);
    handleMakeParams("district", id);
  };
  const urlMaker = () => {
    let url = "?";
    for (let key of searchParams.keys()) {
      let value = searchParams.get(key);
      url = url + `${url.length < 2 ? "" : "&"}${key}=${value}`;
    }
    return url.length > 2 ? url : "";
  };
  const clearFilter = () => {
    setSearchParams("");
    setDisValue(null);
    setRegValue(null);
    setNumRoomValue([]);
    setRentTypeValue(null);
    setComminsionValue(null);
    setFurnitureValue(null);
    setMetroValue(null);
  };
  const setPage = (val: any) => {
    setCurrent(val);
    handleMakeParams("page", val);
    GetAdverts();
  };

  // Get adverts list
  const GetAdverts = async () => {
    try {
      const { data } = await GetAdvertsListConfig(urlMaker());
      setAdverts(data.results);
      setTotal(data.count);
    } catch (error) {
      CatchError(error);
    }
  };

  useEffect(() => {
    GetAdverts();
  }, [searchParams]);

  useEffect(() => {
    makeDefaultParams();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="search">
        <div className="container">
          <div className="home__search flex">
            {/* Viloyat */}
            <Select
              allowClear
              size="large"
              value={regValue}
              onChange={handleRegion}
              placeholder="Viloyatni tanlang"
            >
              {regionsList?.length > 0 &&
                regionsList.map((item: any) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
            </Select>

            {/* Tuman */}
            <Select
              allowClear
              size="large"
              value={disValue}
              onChange={handleDistrict}
              placeholder="Tumanni tanlang"
            >
              {districts?.length > 0 &&
                districts.map((item: any) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
            </Select>

            {/* Xonalar soni */}
            <Select
              allowClear
              size="large"
              mode="multiple"
              value={numRoomValue}
              placeholder="Xonalar soni"
              onChange={(val) => {
                setNumRoomValue(val);
                handleMakeParams("number_of_rooms__in", val.join(","));
              }}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>

            {/* Narxi */}
            <div style={{ width: 300 }}>
              <Dropdown
                overlay={
                  <div className="search__slider">
                    <Slider
                      range
                      min={0}
                      max={10000000}
                      tipFormatter={(val) => `${val} so'm`}
                      defaultValue={[0, 5000000]}
                      onAfterChange={(val) =>
                        handleMakeParams("cost_per_month__range", val.join(","))
                      }
                    />
                  </div>
                }
                trigger={["click"]}
              >
                <div className="flex">
                  <Input
                    allowClear
                    size="large"
                    placeholder="100000 dan"
                    style={{ width: 140, flexShrink: 0 }}
                    value={
                      searchParams.get("cost_per_month__range")?.split(",")[0]
                    }
                    onChange={(e) => {
                      !e.target.value &&
                        handleMakeParams("cost_per_month__range", null);
                    }}
                  />
                  <Input
                    allowClear
                    size="large"
                    placeholder="100000 dan"
                    style={{ width: 140, flexShrink: 0 }}
                    value={
                      searchParams.get("cost_per_month__range")?.split(",")[1]
                    }
                    onChange={(e) => {
                      !e.target.value &&
                        handleMakeParams("cost_per_month__range", null);
                    }}
                  />
                </div>
              </Dropdown>
            </div>
          </div>
          <div className="search__main">
            <div className="flex">
              <h2>Biz {total} dan ortiq e'lon topdik</h2>

              <div className="switch">
                <Switch />
                <span>Sheriklikka odam kerak</span>
              </div>
            </div>
            <div className="search__filter">
              {/* Saralash ijar turiga qarab */}
              <div className="">
                <h4>Saralash</h4>
                <Select
                  allowClear
                  size="large"
                  value={rentTypeValue}
                  placeholder="Ijara turi"
                  onChange={(val) => {
                    setRentTypeValue(val);
                    handleMakeParams("rent_type", val);
                  }}
                >
                  <Option value="LT">Uzoq muddatga</Option>
                  <Option value="ML">Bir necha oyga</Option>
                  <Option value="PS">Sheriklikka</Option>
                </Select>
              </div>

              {/* Vositachilik haqqi */}
              <div className="">
                <h4>Vositachilik haqqi</h4>
                <Select
                  allowClear
                  size="large"
                  value={comminsionValue}
                  placeholder="Vositachilik haqqi"
                  onChange={(val) => {
                    setComminsionValue(val);
                    handleMakeParams("have_commission_fee", val);
                  }}
                >
                  <Option value={"true"}>Bor</Option>
                  <Option value={"false"}>Yo'q</Option>
                </Select>
              </div>

              {/* Mebel */}
              <div className="">
                <h4>Mebel</h4>
                <Select
                  allowClear
                  size="large"
                  placeholder="Mebel"
                  value={furnitureValue}
                  onChange={(val) => {
                    setFurnitureValue(val);
                    handleMakeParams("is_furnished", val);
                  }}
                >
                  <Option value={"true"}>Bor</Option>
                  <Option value={"false"}>Yo'q</Option>
                </Select>
              </div>

              {/* Metro */}
              <div className="">
                <h4>Metro</h4>
                <Select
                  allowClear
                  size="large"
                  value={metroValue}
                  placeholder="Metro"
                  onChange={(val) => {
                    setMetroValue(val);
                    handleMakeParams("near_metro", val);
                  }}
                >
                  {metroList.length > 0 &&
                    metroList.map((item: any) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              </div>

              <span className="clear-filter" onClick={clearFilter}>
                Filterlarni o'chirish
              </span>
            </div>
          </div>
          <div className="search__adverts">
            <Tabs defaultActiveKey="1" onChange={() => setPage(1)}>
              <TabPane tab="Hamma e’lonlar" key="1">
                {adverts.length > 1 ? (
                  adverts.map((elem, index) => (
                    <HorizontalCard key={index} stat={false} data={elem} />
                  ))
                ) : (
                  <NoData />
                )}

                {/* Pagination */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    total={total}
                    pageSize={12}
                    current={+current}
                    onChange={setPage}
                  />
                </div>
              </TabPane>
              <TabPane tab="Jismoniy shaxs" key="2">
                {adverts.length > 1 ? (
                  adverts.map((elem, index) => (
                    <HorizontalCard key={index} stat={false} data={elem} />
                  ))
                ) : (
                  <NoData />
                )}

                {/* Pagination */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    total={total}
                    pageSize={12}
                    current={+current}
                    onChange={setPage}
                  />
                </div>
              </TabPane>
              <TabPane tab="Agentlik" key="3">
                {adverts.length > 1 ? (
                  adverts.map((elem, index) => (
                    <HorizontalCard key={index} stat={false} data={elem} />
                  ))
                ) : (
                  <NoData />
                )}

                {/* Pagination */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    total={total}
                    pageSize={12}
                    current={+current}
                    onChange={setPage}
                  />
                </div>
              </TabPane>
              <TabPane tab="Oliy ta’lim muassasasi" key="4">
                {adverts.length > 1 ? (
                  adverts.map((elem, index) => (
                    <HorizontalCard key={index} stat={false} data={elem} />
                  ))
                ) : (
                  <NoData />
                )}

                {/* Pagination */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    total={total}
                    pageSize={12}
                    current={+current}
                    onChange={setPage}
                  />
                </div>
              </TabPane>
            </Tabs>
            <span className="filterClear" onClick={clearFilter}>
              Filtirlarni o‘chirish
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;

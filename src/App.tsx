import React from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { token } from "./server/Host";
import {
  Create,
  HomePage,
  Login,
  NotFound,
  Profile,
  SearchPage,
  SinglePage,
} from "./pages";
import "antd/dist/antd.css";
import "./styles/globals.scss";
import { useEffect } from "react";
import { CatchError } from "./utils";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setMetro, setRegions } from "src/redux/slices/static";
import { GetMetroConfig, GetRegionsConfig } from "src/server/config/Urls";

function App() {
  const dispatch = useAppDispatch();
  const metro = useAppSelector((state) => state.Static.metro);
  const regions = useAppSelector((state) => state.Static.regions);

  // Get regions at first
  const GetRegions = async () => {
    if (Object.keys(regions).length < 1) {
      try {
        const { data } = await GetRegionsConfig();
        dispatch(setRegions(data));
      } catch (error) {
        CatchError(error);
      }
    }
  };

  // Get Metro at first
  const GetMetro = async () => {
    if (Object.keys(metro).length < 1) {
      try {
        const { data } = await GetMetroConfig();
        dispatch(setMetro(data));
      } catch (error) {
        CatchError(error);
      }
    }
  };

  console.log(token);

  useEffect(() => {
    GetMetro();
    GetRegions();
  }, []);

  return (
    <>
      <Router>
        {/* All pages rendered here */}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route
            path="create"
            element={token ? <Create /> : <Navigate to="/login" />}
          />
          <Route
            path="profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          ></Route>
          <Route path="search">
            <Route index element={<SearchPage />} />
            <Route path=":id" element={<SinglePage />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

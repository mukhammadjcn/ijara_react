import React from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  METRO,
  metroList,
  REGIONS,
  regionsList,
  SetLocal,
  token,
} from "./server/Host";
import {
  Create,
  HomePage,
  Login,
  MapPage,
  NotFound,
  Profile,
  SearchPage,
  SinglePage,
} from "./pages";
import "antd/dist/antd.css";
import "./styles/globals.scss";
import { useEffect } from "react";
import { CatchError } from "./utils";
import { GetMetroConfig, GetRegionsConfig } from "src/server/config/Urls";
import Adverts from "./components/profile/Adverts";
import ProfileEdit from "./components/profile/ProfileEdit";
import SavedAdverts from "./components/profile/SavedAdverts";

function App() {
  // Get regions at first
  const GetRegions = async () => {
    if (regionsList.length < 1) {
      try {
        const { data } = await GetRegionsConfig();
        SetLocal(REGIONS, JSON.stringify(data));
      } catch (error) {
        CatchError(error);
      }
    }
  };

  // Get Metro at first
  const GetMetro = async () => {
    if (metroList.length < 1) {
      try {
        const { data } = await GetMetroConfig();
        SetLocal(METRO, JSON.stringify(data));
      } catch (error) {
        CatchError(error);
      }
    }
  };

  const CheckDefaults = async () => {
    if (metroList.length < 1 && regionsList.length < 1) {
      window.location.reload();
    }
  };

  useEffect(() => {
    GetMetro();
    GetRegions();
    setTimeout(() => CheckDefaults(), 100);
  }, []);

  return (
    <>
      <Router>
        {/* All pages rendered here */}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="map" element={<MapPage />} />
          <Route
            path="create"
            element={token ? <Create /> : <Navigate to="/login" />}
          />
          <Route
            path="profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          >
            <Route index element={<Adverts />} />
            <Route path="edit" element={<ProfileEdit />} />
            <Route path="saved" element={<SavedAdverts />} />
          </Route>
          <Route path="search">
            <Route index element={<SearchPage />} />
            <Route path=":deep_link" element={<SinglePage />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

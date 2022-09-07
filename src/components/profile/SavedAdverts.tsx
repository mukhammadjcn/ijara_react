import React, { useEffect, useState } from "react";
import Card from "src/components/home/card";
import { MyFavoritesConfig } from "src/server/config/Urls";
import { CatchError } from "src/utils/index";
import NoData from "../animation/NoData";

function SavedAdverts() {
  const [adverts, setAdverts] = useState([null, null, null, null]);

  // Get adverts list
  const GetAdverts = async () => {
    try {
      const { data } = await MyFavoritesConfig();
      setAdverts(data);
    } catch (error) {
      CatchError(error);
    }
  };

  useEffect(() => {
    GetAdverts();
  }, []);

  return (
    <div className="profile__saved">
      {adverts.length > 0 ? (
        adverts.map((elem, index) => (
          <Card key={index} data={elem} getList={GetAdverts} />
        ))
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default SavedAdverts;

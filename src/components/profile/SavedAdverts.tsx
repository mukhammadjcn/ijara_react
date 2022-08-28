import React from "react";
import Card from "src/components/home/card";

function SavedAdverts() {
  return (
    <div className="profile__saved">
      {[0, 0, 0].map((item, index) => (
        <Card key={index} />
      ))}
    </div>
  );
}

export default SavedAdverts;

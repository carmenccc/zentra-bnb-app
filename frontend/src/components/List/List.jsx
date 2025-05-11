import React from "react";
import "./List.scss";
import { Card } from "../Card/Card";

export const List = ({ listData }) => {
  console.log(listData);

  return (
    <div className="list">
      {listData?.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

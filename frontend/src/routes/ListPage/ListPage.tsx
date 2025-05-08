import { Filter } from "../../components/Filter/Filter";
import { Card } from "../../components/Card/Card";
import "./ListPage.scss";
import { Map } from "../../components/Map/Map";
import { useQuery } from "@tanstack/react-query";
import { fetchListings } from "../../api/listingService";
import { Listing } from "@zentra/shared";
import { useSearchParams } from "react-router-dom";

export const ListPage = () => {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  console.log(queryParams);

  const { data, isLoading, error } = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetchListings(queryParams),
  });

  //if (isLoading) return <p>Loading</p>;

  console.log(data);

  if (error) {
    console.log(error);
  }

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <h1>
            {data?.length} {queryParams.type}s available in{" "}
            <b>{queryParams.city}</b>
          </h1>
          <Filter />
          <div className="cards">
            {isLoading ? (
              <p>Loading</p>
            ) : error ? (
              <p>Something went wrong: {error.message}</p>
            ) : data && data.length > 0 ? (
              data.map((item) => <Card key={item.id} item={item} />)
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </div>
      <div className="mapContainer">
        {/* <Map items={data} /> */}
        <Map items={data ?? null} />
      </div>
    </div>
  );
};

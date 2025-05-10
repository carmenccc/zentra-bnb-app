import { Slider } from "../../components/Slider/Slider";
import { Map } from "../../components/Map/Map";
import "./SinglePage.scss";
import { Tab } from "../../components/Tab/Tab";
import { ListingReservation } from "../../components/ListingReservation/ListingReservation";
import { ListingOverview } from "../../components/ListingOverview/ListingOverview";
import { useEffect, useState } from "react";
import { Range } from "react-date-range";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchSingleListing,
  saveListing,
  unsaveListing,
} from "../../api/listingService";
import { useParams, useSearchParams } from "react-router-dom";
import { createReservation } from "../../api/reservationService";
import { AxiosError } from "axios";
import { eachDayOfInterval } from "date-fns";

type NullableRange = {
  startDate?: Date;
  endDate?: Date;
  key: string;
};

export const SinglePage = () => {
  // Fetching query data
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  console.log(query);

  // Fetching single listing data
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["listing"],
    queryFn: () => fetchSingleListing(id || ""),
  });

  const initialDateRange: Range = {
    startDate: query.startDate ? new Date(query.startDate) : new Date(),
    endDate: query.endDate ? new Date(query.endDate) : new Date(),
    key: "selection",
  };

  // Defining reservation mutation
  const reservationMutation = useMutation({
    mutationFn: createReservation,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["listing"] });
      alert("Reservation successful!");
    },
    onError: (error) => {
      console.log(error);
      if ((error as AxiosError).status == 401)
        alert("Please login to make reservation.");
      else alert("Reservation failed.");
    },
  });

  // State variables
  const [saved, setSaved] = useState(data?.isSaved);
  // const [guests, setGuests] = useState(query.guests || 1);
  const [selectedDates, setSelectedDates] = useState(initialDateRange);
  const [totalPrice, settotalPrice] = useState(0);

  useEffect(() => {
    if (data?.isSaved !== undefined) {
      setSaved(data.isSaved);
    }
  }, [data?.isSaved]);

  if (error) return <p>Something went wrong...</p>;

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No listing found</p>;

  const tabs = [
    {
      label: "overview",
      content: (
        <ListingOverview
          description={data.listingDetail!.description}
          amenities={data.listingDetail!.amenities}
          features={data.listingDetail!.features}
          roomTypes={data.listingDetail!.roomTypes}
        />
      ),
    },
    {
      label: "review",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo doloribus sint maiores, facere maxime dolores dicta rerum nobis non aliquam possimus doloremque eius et ut in laborum itaque odio molestias.",
    },
  ];

  // Event handlers
  const handleSave = async () => {
    let res;

    if (!saved) {
      console.log("saving");
      res = await saveListing(data.id);
      if (res.success) setSaved(true);
    } else {
      console.log("unsaving");
      res = await unsaveListing(data.id);
      if (res.success) setSaved(false);
    }
  };

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verify is user is logged in
    if (!id || !selectedDates.startDate || !selectedDates.endDate) return;
    console.log("mutating");

    reservationMutation.mutate({
      listingId: id!,
      startDate: selectedDates.startDate!,
      endDate: selectedDates.endDate!,
      totalPrice: totalPrice,
    });
  };

  return (
    <div className="singlePage">
      {/* Left panel */}
      <div className="left">
        <div className="wrapper">
          <Slider images={data.images} saved={saved} handleSave={handleSave} />
          {/* titleSec */}
          <div className="info">
            {/* top */}
            <div className="top">
              <div className="post">
                <h1>{data.title}</h1>
                <div className="subtitle">
                  <div className="address">
                    <img src="/pin.png" alt="" />
                    <span>{data.address}</span>
                  </div>
                  <div className="price-tag">
                    <div className="price">$ {data.price}</div>
                    <span>/ night</span>
                  </div>
                </div>
              </div>
              <div className="user">
                <img src={data.user?.avatar ?? ""} alt="" />
                <span>{data.user?.username}</span>
              </div>
            </div>
            {/* bottom */}
            <div className="bottom">
              <Tab tabs={tabs} />
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="right">
        <div className="wrapper">
          {/* Map */}
          <div className="mapContainer">
            <Map items={[data]} />
          </div>
          {/* Features */}
          <div className="listHorizontal">
            <h1 className="title">GENERAL</h1>
            <div className="feature">
              <img src="/size.png" alt="" />
              <div className="featureText">
                <span>Size</span>
                <p>{data.listingDetail?.size} square ft</p>
              </div>
            </div>
            <div className="feature">
              {/* <img src="/bus.png" alt="" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19ZM13.5 11C13.2239 11 13 11.2239 13 11.5C13 12.8807 11.8807 14 10.5 14H9.5C8.11929 14 7 12.8807 7 11.5C7 11.2239 6.77614 11 6.5 11C6.22386 11 6 11.2239 6 11.5C6 13.433 7.567 15 9.5 15H10.5C12.433 15 14 13.433 14 11.5C14 11.2239 13.7761 11 13.5 11ZM7 9C6.44772 9 6 8.55228 6 8C6 7.44772 6.44772 7 7 7C7.55228 7 8 7.44772 8 8C8 8.55228 7.55228 9 7 9ZM12 8C12 8.55228 12.4477 9 13 9C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7C12.4477 7 12 7.44772 12 8Z"
                  fill="black"
                />
              </svg>
              <div className="featureText">
                <span>Capacity</span>
                <p>
                  {data.guestsMin} - {data.guestsMax} guests
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <ListingReservation
            price={100}
            dateRange={selectedDates}
            onChangeDate={setSelectedDates}
            disabledDates={data.disabledDates || []}
            onSubmit={handleReserve}
          />
          <button className="btn-chat">Chat with Owner</button>
        </div>
      </div>
    </div>
  );
};

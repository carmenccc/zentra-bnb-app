import { Slider } from "../../components/Slider/Slider";
import { Map } from "../../components/Map/Map";
import "./SinglePage.scss";
import { userData } from "../../lib/dummydata";
import { Tab } from "../../components/Tab/Tab";
import { ListingReservation } from "../../components/ListingReservation/ListingReservation";
import { ListingOverview } from "../../components/ListingOverview/ListingOverview";
import { useState } from "react";
import { Range } from "react-date-range";

const mockDisabledDates = [
  new Date("2025-05-10"),
  new Date("2025-05-11"),
  new Date("2025-05-20"),
];

const singlePostData = {
  id: 1,
  title: "Beautiful Apartment",
  price: 1200,
  images: [
    "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  bedRooms: 2,
  bathroom: 1,
  size: 861,
  latitude: 51.5074,
  longitude: -0.1278,
  city: "London",
  address: "1234 Broadway St",
  description:
    "Future alike hill pull picture swim magic chain seed engineer nest outer raise bound easy poetry gain loud weigh me recognize farmer bare danger. actually put square leg vessels earth engine matter key cup indeed body film century shut place environment were stage vertical roof bottom lady function breeze darkness beside tin view local breathe carbon swam declared magnet escape has from pile apart route coffee storm someone hold space use ahead sheep jungle closely natural attached part top grain your grade trade corn salmon trouble new bend most teacher range anybody every seat fifteen eventually",
  amenities: [1, 2, 3, 4, 6],
  features: [
    "Coffee maker",
    "Air conditioning",
    "Desk",
    "Refrigerator",
    "Bath",
    "Safe",
    "Rack",
  ],
  roomTypes: ["Double Room", "Suite", "Twin Room", "Deluxe"],
  disabledDates: mockDisabledDates,
};

const initialDateRange: Range = {
  startDate: new Date("2025-05-02"),
  endDate: new Date("2025-05-05"),
  key: "selection",
};

export const SinglePage = () => {
  const [selectedDates, setSelectedDates] = useState(initialDateRange);

  const tabs = [
    {
      label: "overview",
      content: (
        <ListingOverview
          description={singlePostData.description}
          amenities={singlePostData.amenities}
          features={singlePostData.features}
          roomTypes={singlePostData.roomTypes}
        />
      ),
    },
    {
      label: "review",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo doloribus sint maiores, facere maxime dolores dicta rerum nobis non aliquam possimus doloremque eius et ut in laborum itaque odio molestias.",
    },
  ];

  return (
    <div className="singlePage">
      {/* Left panel */}
      <div className="left">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          {/* titleSec */}
          <div className="info">
            {/* top */}
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="subtitle">
                  <div className="address">
                    <img src="/pin.png" alt="" />
                    <span>{singlePostData.address}</span>
                  </div>
                  <div className="price-tag">
                    <div className="price">$ {singlePostData.price}</div>
                    <span>/ night</span>
                  </div>
                </div>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
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
            <Map items={[singlePostData]} />
          </div>
          <ListingReservation
            price={100}
            dateRange={selectedDates}
            onChangeDate={setSelectedDates}
            disabledDates={singlePostData.disabledDates}
          />
          <button className="btn-chat">Chat with Owner</button>

          {/* Nearby places */}
          {/* <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
          </div> */}
          {/* Room size */}
          {/* <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>80 sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>2 beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>1 bathroom</span>
            </div>
          </div> */}
          {/* General featrues */}
          {/* <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/icons/ic.svg" alt="" />

              <div className="featureText">
                <span>Service</span>
                <p>Owner is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pets Allowed</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div> */}

          {/* <ListingReservation
            dateRange={singlePostData.dateRange}
            // onChangeDate={() => {}}
            disabledDates={singlePostData.disabledDates}
          /> */}
        </div>
      </div>
    </div>
  );
};

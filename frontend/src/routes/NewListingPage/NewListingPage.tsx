import React, { useState } from "react";
import "./NewListingPage.scss";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import Select from "react-select";
import { WithContext as ReactTags, Tag } from "react-tag-input";
import { createListing } from "../../api/listingService";
import { ListingType, PropertyType } from "@zentra/shared";

export const NewListingPage = () => {
  const [description, setdescription] = useState("");
  const [images, setImages] = useState([]);
  const [amenities, setAmenities] = useState<
    { value: number; label: string }[]
  >([]);
  const [roomTypes, setRoomTypes] = useState<
    { value: number; label: string }[]
  >([]);
  const [features, setFeatures] = useState<Tag[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const amenityOptions = [
    { value: 1, label: "Gym" },
    { value: 2, label: "Pool" },
    { value: 3, label: "Wifi" },
    { value: 4, label: "Lounge" },
    { value: 5, label: "Spa" },
    { value: 6, label: "Hangers" },
    { value: 7, label: "Breakfast" },
  ];
  const roomTypeOptions = [
    { value: 1, label: "Twin Bedroom" },
    { value: 2, label: "Deluxe" },
    { value: 3, label: "Bathroom" },
    { value: 4, label: "Single Bedroom" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputs = Object.fromEntries(formData);

    const amenitiesData = amenities.map((e) => {
      return {
        id: e.value,
      };
    });
    const featuresData = features.map((e) => e.text);
    const roomTypesData = roomTypes.map((e) => {
      return {
        id: e.value,
      };
    });

    try {
      const res = await createListing({
        listing: {
          title: inputs.title as string,
          price: parseInt(inputs.price as string),
          address: inputs.address as string,
          city: inputs.city as string,
          bedroom: parseInt(inputs.bedroom as string),
          bathroom: parseInt(inputs.bathroom as string),
          type: inputs.type as ListingType,
          property: inputs.property as PropertyType,
          guestsMin: parseInt(inputs.guestsmin as string),
          guestsMax: parseInt(inputs.guestsmax as string),
          latitude: inputs.latitude as string,
          longitude: inputs.longitude as string,
          images: images,
        },
        listingDetail: {
          description: description,
          utilities: inputs.utilities as string,
          pet: inputs.pet as string,
          size: parseInt(inputs.size as string),
          amenities: amenitiesData,
          roomTypes: roomTypesData,
          features: featuresData,
        },
      });
      navigate("/profile");
      alert("New listing created successfully!");
      console.log(res);
    } catch (e) {
      console.log(e);
      alert("Invalid input");
    }
  };

  return (
    <div className="new-listing-page">
      {/* Left panel */}
      <div className="left">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill
                theme="snow"
                onChange={setdescription}
                value={description}
              />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="stay" defaultChecked>
                  Stay
                </option>
                <option value="rent">Rent</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
                <option value="not-allowed">Allowed With Extra Fee</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="guestsmin">Minimum Guest Number</label>
              <input min={1} id="guestsmin" name="guestsmin" type="number" />
            </div>
            <div className="item">
              <label htmlFor="guestsmax">Maximum Guest Number</label>
              <input min={1} id="guestsmax" name="guestsmax" type="number" />
            </div>
            <div className="item multi-select">
              <label htmlFor="amenities">Available Amenities</label>
              <Select
                options={amenityOptions}
                isMulti
                placeholder={"Add amenities for your listing"}
                onChange={(newValue) => setAmenities([...newValue])}
              />
            </div>
            <div className="item multi-select">
              <label htmlFor="roomTypes">Room Types</label>
              <Select
                options={roomTypeOptions}
                isMulti
                placeholder={"Specify room types"}
                onChange={(newValue) => setRoomTypes([...newValue])}
              />
            </div>
            <div className="item multi-select">
              <label htmlFor="features">Additional Features</label>
              <ReactTags
                tags={features}
                handleDelete={(i) => {
                  setFeatures(features.filter((_, index) => index !== i));
                }}
                handleAddition={(newTag) => {
                  setFeatures([...features, newTag]);
                }}
                classNames={{
                  tags: "tags-wrapper",
                  selected: "tag-list",
                  tag: "tag",
                  remove: "btn-tag-remove",
                  //   tagInputField: "tag-input-field",
                  tagInput: "tag-input",
                }}
              />
            </div>

            <button className="btn-submit">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>

      {/* Right panel */}
      <div className="right">
        Upload images for your listing
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
};

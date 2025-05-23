import "./Card.scss";
import { Link } from "react-router-dom";

export const Card = ({ item, query }) => {
  console.log(query);
  return (
    <div className="card">
      <Link
        to={{
          pathname: `/${item.id}`,
          search: `?${new URLSearchParams(query).toString()}`,
        }}
        className="imageContainer"
      >
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link
            to={{
              pathname: `/${item.id}`,
              search: `?${new URLSearchParams(query).toString()}`,
            }}
          >
            {item.title}
          </Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>

        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/icons/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          {/* <div className="icons">
            <div className="icon">
              <img src="/icons/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/icons/chat.png" alt="" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

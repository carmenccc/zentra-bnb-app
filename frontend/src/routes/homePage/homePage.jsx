import { SearchBar } from "../../components/SearchBar/SearchBar";
import "./homePage.scss";

export const HomePage = () => {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Stay Centered, Stay Anywhere.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
            amet obcaecati! Voluptatum deserunt porro delectus dolorum,
            consequatur similique ipsa reiciendis? Consequatur maiores similique
            soluta distinctio officia expedita impedit qui quidem.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

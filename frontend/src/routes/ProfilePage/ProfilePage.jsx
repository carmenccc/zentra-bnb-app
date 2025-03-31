import { Chat } from "../../components/Chat/Chat";
import { List } from "../../components/List/List";
import "./ProfilePage.scss";

export const ProfilePage = () => {
  return (
    <div className="profilePage">
      {/* left */}
      <div className="details">
        <div className="wrapper">
          {/* info */}
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://plus.unsplash.com/premium_photo-1661964412228-d4c51596f09a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </span>
            <span>
              Username <b>John Doe</b>
            </span>
            <span>
              E-mail:<b>john@gmail.com</b>
            </span>
          </div>
          {/* My list */}
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          {/* Saved list */}
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>

      {/* right */}
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};

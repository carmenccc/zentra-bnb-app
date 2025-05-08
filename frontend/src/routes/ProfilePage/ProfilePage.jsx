import { useNavigate } from "react-router-dom";
import { Chat } from "../../components/Chat/Chat";
import { List } from "../../components/List/List";
import { useAuth } from "../../context/AuthContext";
import "./ProfilePage.scss";
import { logout } from "../../api/auth";

export const ProfilePage = () => {
  const { updateUser, currentUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

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
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            </span>
            <span>
              Username <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail:<b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          {/* My list */}
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          {/* <List /> */}
          {/* Saved list */}
          <div className="title">
            <h1>Saved List</h1>
          </div>
          {/* <List /> */}
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

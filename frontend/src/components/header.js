import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUserData(JSON.parse(userInfo));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  return (
    <div>
      <nav>
        <div>
          <h1>Note</h1>
        </div>
        {userData && (
          <div className="profile-info">
            <AccountCircleIcon
              sx={{ marginTop: "7px", marginRight: "5px", fontSize: "35px" }}
            />
            {userData.email}
            <div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;

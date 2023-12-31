import React from "react";

export default function UserProHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          Name<h1>{userData.fname}</h1>
          Email <h1>{userData.email}</h1>
          Usertype <h1>{userData.userType}</h1>

          <br />
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

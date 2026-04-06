import React, { useEffect, useState } from "react";
import "./login.css";

import user_icon from "../../Assets/person.png";
import email_icon from "../../Assets/email.png";
import password_icon from "../../Assets/password.png";
import eye_icon from "../../Assets/eye-solid-full.svg";
import eye1_icon from "../../Assets/eye-slash-solid-full.svg";
import axios from "axios";

const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [userData, setUserData] = useState({});
  const [showPwd, setSetshowPwd] = useState(false);
  const handleClick = (action) => {
    setAction(action);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const data = [
      {
        Name: "vani",
        Email: "vani@gmail.com",
        Password: "vani@8832",
      },
    ];
    setUserData(data);
  }, [action]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );
        const filterdData = res.data.filtered((user)=>{
          return user.id === 5
        })
        console.log(res.data)
        console.log(filterdData)
        setUsers(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="container">
      <div className="header"></div>
      <div className="text">{action}</div>
      <div className="underline"></div>

      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              name="Name"
              type="text"
              value={userData?.name}
              placeholder="name"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input
            name="Email "
            type="email"
            value={userData?.Email}
            placeholder="email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="" />
          <input
            name="Password"
            type={showPwd ? "text" : "password"}
            value={userData?.Password}
            placeholder="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {showPwd ? (
            <img
              src={eye_icon}
              style={{ width: "20px", height: "20px" }}
              onClick={() => setSetshowPwd(false)}
              alt=""
            />
          ) : (
            <img
              src={eye1_icon}
              style={{ width: "20px", height: "20px" }}
              onClick={() => setSetshowPwd(true)}
              alt=""
            />
          )}
        </div>
      </div>
      {action === "Login" && (
        <div className="forgot-password">
          forgot password <span>click here</span>
        </div>
      )}
      <div className="submit-container">
        <div
          className={action === "Sign Up" ? "submit" : "submit gray"}
          onClick={() => {
            handleClick("Sign Up");
          }}
        >
          signup
        </div>
        <div
          className={action === "Login" ? "submit" : "submit gray"}
          onClick={() => {
            handleClick("Login");
          }}
        >
          login
        </div>
      </div>
      <div>
        <h2>User List</h2>
        <table style={{ border: "1px solid red" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Login;

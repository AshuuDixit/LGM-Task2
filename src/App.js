import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import UserCard from "./components/UserCard";
import Loader from "./components/Loader";
import Axios from "axios";

function App() {
  const [isClicked, setIsClicked] = useState(0); //shareable state with Navbar
  const [data, setData] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  // API CALL TO FETCH USERS
  const getUsers = () => {
     
    
    setIsLoader(true);
    Axios.get("https://reqres.in/api/users?page=1").then((response) => {
      console.log("api data recieved");
      setData(response.data.data);
      
      setIsLoader(false);
    });
  };

  // btn state lifing in navbar
  useEffect(() => {
    isClicked && getUsers();
  }, [isClicked]);

  return (
    <div className="App">
      <Navbar onSetIsClicked={setIsClicked} />{" "}
      <div className="row">
        {" "}
        {/* mapping through the response of the api */}{" "}
        {data &&
          data.map((val) => {
            return (
              <UserCard
                first_name={val.first_name}
                last_name={val.last_name}
                email={val.email}
                avatar={val.avatar}
              />
            );
          })}{" "}
      </div>{" "}
      <Loader show={isLoader} />{" "}
    </div>
  );
}

export default App;


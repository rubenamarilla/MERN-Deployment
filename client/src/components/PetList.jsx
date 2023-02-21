import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/PetList.css";

const PetList = () => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pet")
      .then((response) => setPets(response.data))
      .catch((err) => console.log(err));
  }, [pets]);

  return (
    <div>
      <div className="header">
        <h1 className="bigTitle">Pet Shelter</h1>
        <Link to={"/create"} className="link">
          Add a pet to the shelter
        </Link>
      </div>
      <h3 className="subtitle">These pets are looking for a good home</h3>
      <table className="list">
        <thead>
          <tr id="tHead">
            <th>Pets</th>
            <th>Type</th>
            <th>Actions Available</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.type}</td>
              <td>
                <Link to={"/edit/" + data._id}>edit</Link>
                <span> | </span>
                <Link to={"/details/" + data._id}>details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetList;

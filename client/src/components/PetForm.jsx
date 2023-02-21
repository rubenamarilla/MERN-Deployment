import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/PetForm.css"

const CreateAuthor = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [succesfull, setSuccesfull] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(false);
    setSuccesfull(false);

    axios
      .post("http://localhost:8000/api/pet", {
        name: name,
        type: type,
        description: description,
        skill1: skill1,
        skill2: skill2,
        skill3: skill3,
      })
      .then((response) => {
        console.log(response);
        setError(false);
        setSuccesfull(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        setSuccesfull(false);
        setError(err.response.data.message);
      });
  };

  return (
    <div>
      <div className="header">
        <h1 className="bigTitle">Pet Shelter</h1>
        <Link to={"/"}>back to home</Link>
      </div>
      <h3 className="subtitle">Know a pet needing a home?</h3>
      <form onSubmit={handleSubmit} className="borders">
        <div className="formColumn">
          <label>Pet Name:</label>
          <input
            type="text"
            name="name"
            minLength={3}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label>Pet Type:</label>
          <input
            type="text"
            name="type"
            minLength={3}
            required
            onChange={(e) => setType(e.target.value)}
          />
          <label>Pet Description:</label>
          <input
            type="text"
            name="description"
            minLength={3}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {succesfull && (
            <p style={{ color: "green" }}>The form was sent succesfully</p>
          )}
          <button className="btn" type="submit">
            <span className="material-symbols-rounded">upload</span>Add Pet
          </button>
        </div>
        <div className="formColumn">
          <label>Skills (optional)</label>
          <label>Skill 1:</label>
          <input
            type="text"
            name="skill1"
            onChange={(e) => setSkill1(e.target.value)}
          />
          <label>Skill 2:</label>
          <input
            type="text"
            name="skill2"
            onChange={(e) => setSkill2(e.target.value)}
          />
          <label>Skill 3:</label>
          <input
            type="text"
            name="skill3"
            onChange={(e) => setSkill3(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateAuthor;

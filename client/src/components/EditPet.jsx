import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditPet = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");

  const [error, setError] = useState(false);
  const [succesfull, setSuccesfull] = useState(false);
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pet/" + id)
      .then((response) => {
        setName(response.data.name);
        setType(response.data.type);
        setDescription(response.data.description);
        setSkill1(response.data.skill1);
        setSkill2(response.data.skill2);
        setSkill3(response.data.skill3);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(false);
    setSuccesfull(false);

    axios
      .put("http://localhost:8000/api/pet/" + id, {
        name: name,
        type: type,
        description: description,
        skill1: skill1,
        skill2: skill2,
        skill3: skill3,
      })
      .then((response) => {
        if (response.data.message) {
          setError(response.data.message);
        } else if (response.data.updated) {
          setError(false);
          setSuccesfull(true);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch((err) => {
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
      <h3 className="subtitle">Edit {name}</h3>
      <form onSubmit={handleSubmit} className="borders">
        <div className="formColumn">
          <label>Pet Name:</label>
          <input
            value={name}
            type="text"
            name="name"
            minLength={3}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label>Pet Type:</label>
          <input
            value={type}
            type="text"
            name="type"
            minLength={3}
            required
            onChange={(e) => setType(e.target.value)}
          />
          <label>Pet Description:</label>
          <input
            value={description}
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
          <button type="submit" className="btn">
            <span className="material-symbols-rounded">edit</span>Edit Pet
          </button>
        </div>
        <div className="formColumn">
          <label>Skills (optional)</label>
          <label>Skill 1:</label>
          <input
            value={skill1}
            type="text"
            name="skill1"
            onChange={(e) => setSkill1(e.target.value)}
          />
          <label>Skill 2:</label>
          <input
            value={skill2}
            type="text"
            name="skill2"
            onChange={(e) => setSkill2(e.target.value)}
          />
          <label>Skill 3:</label>
          <input
            value={skill3}
            type="text"
            name="skill3"
            onChange={(e) => setSkill3(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPet;

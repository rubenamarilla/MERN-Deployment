import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/Details.css";

const Details = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [likes, setLikes] = useState(0);
  let { id } = useParams();
  let navigate = useNavigate();

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
        setLikes(response.data.likes);
      })
      .catch((err) => {
        alert("There's been an error");
        console.log(err);
      });
  }, [id]);

  let count;
  const handleLikes = () => {
    count = likes + 1;
    setLikes(count);
    axios.put("http://localhost:8000/api/pet/" + id, { likes: count });
  };

  const adoptDelete = (petId) => {
    axios.delete("http://localhost:8000/api/pet/" + petId);
    navigate("/");
  };

  return (
    <div>
      <div className="header">
        <h1 className="bigTitle">Pet Shelter</h1>
        <Link className="link" to={"/"}>back to home</Link>
      </div>
      <div id="subHeader">
        <h2 className="subtitle">Details about: {name}</h2>
        <button onClick={(e) => adoptDelete(id)} id="adoptButton" className="btn">
          <span className="material-symbols-rounded">home</span>Adopt {name}
        </button>
      </div>
      <div className="borders" id="detailTable">
        <table>
          <tbody>
            <tr>
              <td className="bolder">Pet type:</td>
              <td>{type}</td>
            </tr>
            <tr>
              <td className="bolder">Description:</td>
              <td>{description}</td>
            </tr>
            {skill1 && (
              <tr>
                <td className="bolder">Skills:</td>
                <td>{skill1}</td>
              </tr>
            )}
            {skill2 && (
              <tr>
                <td>‎</td>
                <td>{skill2}</td>
              </tr>
            )}
            {skill3 && (
              <tr>
                <td>‎</td>
                <td>{skill3}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div id="likesTable">
          <button onClick={handleLikes} style={{backgroundColor: "#009e0f"}} className="btn">
            <span className="material-symbols-rounded">thumb_up</span>Like{" "}
            {name}
          </button>
          <p>
            Like(s): <span>{likes}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;

import { createBrowserRouter } from "react-router-dom";
import React from "react";
import PetForm from "../components/PetForm";
import PetList from "../components/PetList";
import EditPet from "../components/EditPet";
import Details from "../components/Details";
import "../styles/Main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PetList />,
  },
  {
    path: "/create",
    element: <PetForm />,
  },
  {
    path: "/edit/:id",
    element: <EditPet />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
]);

export default router;

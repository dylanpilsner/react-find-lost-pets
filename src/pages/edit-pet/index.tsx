import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { toEditPetState, userDataState } from "../../components/atoms";
import { EditPetForm } from "../../components/forms";
import { Header } from "../../components/header";
import { deletePost } from "../../lib/api";
import css from "./edit-pet.css";

export function EditPetPage() {
  const userData = useRecoilValue(userDataState);
  const toEditPet = useRecoilValue(toEditPetState);
  const navigate = useNavigate();

  async function handleClick() {
    await deletePost(toEditPet.id, userData.token);
    navigate("/my-reported-pets");
  }

  return (
    <div>
      <Header />
      <div className={css["edit-pet-page-container"]}>
        <EditPetForm />
        <span onClick={handleClick} className={css["unpublish"]}>
          DESPUBLICAR
        </span>
      </div>
    </div>
  );
}

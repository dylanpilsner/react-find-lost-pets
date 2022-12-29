import React from "react";
import { Header } from "../../components/header";
import { ProfileForm } from "../../components/forms";
import { Title } from "../../ui/texts";
import css from "./profile.css";

export function ProfilePage() {
  return (
    <div>
      <Header />
      <div className={css["profile-page-container"]}>
        <Title>Mis datos</Title>
        <ProfileForm />
      </div>
    </div>
  );
}

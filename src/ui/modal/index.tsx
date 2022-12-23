import React, { useRef, useEffect } from "react";
import css from "./modal.css";
import { TextField, TextAreaField } from "../text-field/index";
import { SendReportButton } from "../buttons";
import { ModalTitle } from "../texts";
import {
  modalStatusState,
  selectedPetState,
  useTest,
} from "../../components/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { sendLastSeenReport } from "../../lib/api";

export function Modal(props: {
  name: string;
  userId: number;
  pictureURL: string;
}) {
  const reportInformationEl: any = useRef();
  const closeModelEl: any = useRef();
  const [modalStatus, setModalStatus] = useRecoilState(modalStatusState);
  const selectedPet = useRecoilValue(selectedPetState);

  function closeModel(e) {
    setModalStatus(false);
    reportInformationEl.current.classList.toggle(css["active"]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    sendLastSeenReport(
      target.phone.value,
      target.description.value,
      target.name.value,
      1,
      props.pictureURL
    );
    console.log("hola");
  }

  useEffect(() => {
    if (modalStatus) {
      reportInformationEl.current.classList.toggle(css["active"]);
    }
  }, [modalStatus]);

  return (
    <div ref={reportInformationEl} className={css["report-information"]}>
      <div className={css["report-information-modal-card"]}>
        <div className={css["modal-head"]}>
          <img
            ref={closeModelEl}
            src="./src/assets/close.png"
            className={css["close-model"]}
            onClick={closeModel}
          />
        </div>
        <div className={css["information-container"]}>
          <ModalTitle>
            Reportar info <br />
            de {props.name}
          </ModalTitle>
        </div>
        <form className={css["report-form"]} onSubmit={handleSubmit}>
          <TextField text="TU NOMBRE" name="name" />
          <TextField text="TU TELÉFONO" name="phone" />
          <TextAreaField text="DÓNDE LO VISTE?" name="description" />
          <span className={css["status-message}"]}></span>
          <div className={css["button-container"]}>
            <SendReportButton>Enviar</SendReportButton>
          </div>
        </form>
        <div className={css["modal-foot"]}></div>
      </div>
    </div>
  );
}

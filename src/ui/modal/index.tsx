import React, { useRef, useEffect } from "react";
import css from "./modal.css";
import { TextField, TextAreaField } from "../text-field/index";
import { SendReportButton } from "../buttons";
import { ModalTitle } from "../texts";

export function Modal(props: { isActive: boolean }) {
  const reportInformationEl: any = useRef();
  const closeModelEl: any = useRef();

  function closeModel(e) {
    reportInformationEl.current.classList.toggle(css["active"]);
  }

  useEffect(() => {
    reportInformationEl.current.classList.toggle(css["active"]);
  }, [props.isActive]);

  return (
    <div
      ref={reportInformationEl}
      className={[css["report-information"], css["active"]].join(" ")}
    >
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
            de test
          </ModalTitle>
        </div>
        <form className={css["report-form"]}>
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

import React, { useRef, useEffect } from "react";
import css from "./modal.css";
import { ModalTextField, ModalTextAreaField } from "../text-field/index";
import { FormButton } from "../buttons";
import { ModalTitle } from "../texts";
import { modalStatusState, selectedPetState } from "../../components/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { sendLastSeenReport } from "../../lib/api";

export function Modal(props: {
  name: string;
  userId: number;
  pictureURL: string;
}) {
  const reportInformationEl: any = useRef();
  const closeModelEl: any = useRef();
  const formEl: any = useRef();
  const [modalStatus, setModalStatus] = useRecoilState(modalStatusState);
  const selectedPet = useRecoilValue(selectedPetState);

  function closeModel(e) {
    setModalStatus(false);
    reportInformationEl.current.classList.toggle(css["active"]);
    formEl.current.reset();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    sendLastSeenReport(
      target.phone.value,
      target.description.value,
      target.name.value,
      props.userId,
      props.pictureURL
    );
    target.reset();
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
        <form
          ref={formEl}
          className={css["report-form"]}
          onSubmit={handleSubmit}
        >
          <ModalTextField type="text" text="TU NOMBRE" name="name" />
          <ModalTextField type="text" text="TU TELÉFONO" name="phone" />
          <ModalTextAreaField text="DÓNDE LO VISTE?" name="description" />
          <span className={css["status-message}"]}></span>
          <div className={css["button-container"]}>
            <FormButton>Enviar</FormButton>
          </div>
        </form>
        <div className={css["modal-foot"]}></div>
      </div>
    </div>
  );
}

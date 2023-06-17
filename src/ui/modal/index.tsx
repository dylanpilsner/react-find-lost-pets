import React, { useRef, useEffect, useState } from "react";
import css from "./modal.css";
import { ModalTextField, ModalTextAreaField } from "../text-field/index";
import { FormButton } from "../buttons";
import { ModalTitle } from "../texts";
import { modalStatusState, selectedPetState } from "../../components/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { sendLastSeenReport } from "../../lib/api";
import { SecondaryLoader } from "../loader";

export function Modal(props: {
  name: string;
  userId: number;
  pictureURL: string;
}) {
  const reportInformationEl: any = useRef();
  const closeModelEl: any = useRef();
  const formEl: any = useRef();
  const [modalStatus, setModalStatus] = useRecoilState(modalStatusState);
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState({ message: null, type: null });

  function closeModel(e) {
    setModalStatus(false);
    reportInformationEl.current.classList.toggle(css["active"]);
    formEl.current.reset();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;

    if (target.name.value && target.phone.value && target.description.value) {
      setLoader(true);
      await sendLastSeenReport(
        target.phone.value,
        target.description.value,
        target.name.value,
        props.userId,
        props.pictureURL
      );
      setLoader(false);
      setStatus({
        message: "Su reporte ha sido enviado con éxito, muchas gracias!",
        type: "success",
      });

      target.reset();
    }
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
          <SecondaryLoader active={loader} />
          <span className={[css["status-message"], css[status.type]].join(" ")}>
            {status.message} {status.type}
          </span>
          <div className={css["button-container"]}>
            <FormButton>Enviar</FormButton>
          </div>
        </form>
        <div className={css["modal-foot"]}></div>
      </div>
    </div>
  );
}

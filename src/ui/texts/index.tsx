import React from "react";
import css from "./texts.css";

function Title({ children }) {
  return <h1 className={css.title}>{children}</h1>;
}

function Paragraph({ children }) {
  return <p className={css.paragraph}>{children}</p>;
}

export { Title, Paragraph };

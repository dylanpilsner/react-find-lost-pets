import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AppRoutes } from "./router";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);

root.render(
  <RecoilRoot>
    <Suspense fallback={<div>Hola</div>}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>
);

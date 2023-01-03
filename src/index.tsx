import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AppRoutes } from "./router";
import { MainLoader } from "./ui/loader";
const rootEl = document.getElementById("root");
const root = createRoot(rootEl);

root.render(
  <RecoilRoot>
    <Suspense fallback={<MainLoader />}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>
);

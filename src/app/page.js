"use client"
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../../public/style/style.css";
import "../../public/style/style.css"
import MainLayout from "./layouts/MainLayout";
import Home from "./home/page";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);
  return (
    <>
     <MainLayout>
      <Home />
     </MainLayout>
    </>
  );
}

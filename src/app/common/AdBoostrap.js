"use client";

import { useEffect } from "react";

export default function AddBootstrap() {
  useEffect(() => {
    // 🌟 PERF FIX: Defer heavy Bootstrap JS execution until the browser is completely idle.
    // This stops it from fighting with React Hydration on slow mobile CPUs.
    const loadBootstrap = () => {
      import("bootstrap/dist/js/bootstrap.bundle.js").then(() => {
        const tooltipTriggerList = Array.from(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
          new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
      });
    };

    // If the browser supports requestIdleCallback, use it. Otherwise, use a safe timeout.
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadBootstrap, { timeout: 2000 });
    } else {
      setTimeout(loadBootstrap, 500);
    }
    
  }, []);

  return <></>;
}
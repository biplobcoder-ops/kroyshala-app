import React, { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import InitialLoader from "./components/common/InitialLoader";

const App = () => {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1000); // অ্যাপ render হওয়ার পর ১ সেকেন্ড পর্যন্ত loader দেখাবে
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {appLoading && <InitialLoader />}
      <AppRoutes />
    </>
  );
};

export default App;
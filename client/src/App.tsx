import { useEffect, useState } from "react";
import { BackendUrl } from "./utils/url";
import Home from "./pages/Home";
import Header from "./components/Header";

export default function App() {
  const [result, setResult] = useState<any>(null);
  console.log(result);
  useEffect(() => {
    (async () => {
      const data = await fetch(`${BackendUrl}/api/test`);
      const res = await data.json();
      setResult(res);
    })();
  }, []);
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

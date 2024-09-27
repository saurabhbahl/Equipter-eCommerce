import { useEffect, useState } from "react";
import { BackendUrl } from "./utils/url";

export default function App() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let data = await fetch(`${BackendUrl}/api/test`);
      let res = await data.json();
      setResult(res);
    })();
  }, []);
  return <>{result ? <div>{result}</div> : <p>Loading..</p>}</>;
}

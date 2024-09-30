import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DynamicPage from "./pages/DynamicPage";
import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  // const [result, setResult] = useState<any>(null);

  // useEffect(() => {
  //   (async () => {
  //     const data = await fetch(`${BackendUrl}/api/test`);
  //     const res = await data.json();
  //     setResult(res);
  //   })();
  // }, []);

  return (
    <>
      <Header />
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dynamicpage" element={<DynamicPage />} />
        </Routes>
      {/* </Router> */}
    </>
  );
}

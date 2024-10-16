import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import SamplePage from "./pages/SamplePage";
import AdminPage from "./pages/admin/AdminPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<PublicRoute element={<LoginPage />} />}
        />

        {/*  admin route */}
        <Route element={<PrivateRoute role="admin" />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        {/* routes for authenticated users  */}
        <Route element={<PrivateRoute />}>
          <Route path="/sample" element={<SamplePage />} />
        </Route>
        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

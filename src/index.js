import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import LayoutOutlet from "./Outlet/LayoutOutlet";
import Dashboard, { checkData, dashboardLoader } from "./pages/Dashboard";
import Login, { loginAction, loginLoader } from "./pages/Login";
import Test, { testLoader } from "./pages/Test";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutOutlet />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />
      <Route
        path="test"
        element={<Test />}
        loader={async ({ request }) => await testLoader(request)}
      />

      {/* <Route path="test" element={<Test />} loader={async({request})=>requireAuth(request)}/> */}
      <Route
        path="/dashboard"
        loader={dashboardLoader}
        element={<Dashboard />}
      />
    </Route>
  )
);

root.render(<RouterProvider router={router} />);

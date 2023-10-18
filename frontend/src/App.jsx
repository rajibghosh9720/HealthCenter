import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home/HomePage";
import AdminPage from "./components/admin/AdminPage";
import AddDoctor from "./components/Doctor/add-doctor/Add_doctor";
import AddHospital from "./components/Hospital/add-hospital/Add_hospital";
import UpdateDoctor from "./components/Doctor/update-doctor/Update_doctor";
import UpdateHospital from "./components/Hospital/update-hospital/Update_hospital";
import ViewDoctorPage from "./components/Doctor/view-doctor/view_doctor"
import ViewHospitalPage from "./components/Hospital/view-hospital/view_hospital"


function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
    account: null,
  });

  const saveState = ({ web3, contract, account }) => {
    setState({ web3: web3, contract: contract, account: account });
  };

  const router = createBrowserRouter([
    { path: "/", element: <HomePage saveState={saveState} /> },
    { path: "/admin", element: <AdminPage /> },
    { path: "/admin/add-doctor", element: <AddDoctor state={state} /> },
    { path: "/admin/update-doctor", element: <UpdateDoctor state={state} /> },
    { path:"/admin/view-doctor", element:<ViewDoctorPage state={state} /> },
    { path:"/admin/add-health-center", element:<AddHospital state={state} /> },
    { path:"/admin/update-health-center", element:<UpdateHospital state={state} /> },
    { path:"/admin/view-health-center", element:<ViewHospitalPage state={state} /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

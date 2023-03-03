import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./features/Admin/Admin";
import { routes } from "./app/routes";
import AdminLayout from "./features/Admin/HOCs/Layout";
import NotFound from "./HOCs/Not_Found/NotFound";
import Signin from "./features/Admin/Authen/Signin.jsx";
import PrivateRoute from "./features/Admin/utils/PrivateRoute";
import Signup from "./features/Admin/Authen/Signup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "./features/Admin/Authen/thunk";

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            {routes.map(({ path, component: Component }) => {
              return <Route path={path} element={<Component />} />;
            })}
          </Route>
                       
        </Route>
        <Route path="/admin/signin" element={<Signin />} /> 
        <Route path="/admin/signup" element={<Signup />} /> 

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

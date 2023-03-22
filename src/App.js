import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./features/Admin/Admin";
import { routes, userRoutes } from "./app/routes";
import AdminLayout from "./features/Admin/HOCs/Layout";
import NotFound from "./HOCs/Not_Found/NotFound";
import Signin from "./features/Admin/Authen/Signin.jsx";
import PrivateRoute from "./features/Admin/utils/PrivateRoute";
import Signup from "./features/Admin/Authen/Signup";
import { fetchProfile } from "./features/Admin/Authen/thunk";
import Home from "./features/Bookin/Home";
import UserLayout from "./features/Bookin/HOCs/Layout";
import UserPrivateRoute from './features/Bookin/utils/UserPrivateRoute.jsx';
import Seats from "./features/Bookin/Seats";
import UserLogin from './features/Authen/Login';
import UserSignup from './features/Authen/Signup';

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
        <Route element={<UserLayout />}>
          {userRoutes.map(({ path, component: Component }) => {
            return <Route path={path} element={<Component />} />;
          })}
          <Route element={<UserPrivateRoute/>}>
          <Route path="/seats/:id" element={<Seats/>}/>
        </Route>
        </Route>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

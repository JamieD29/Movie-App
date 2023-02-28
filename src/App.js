import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./features/Admin/Admin";
import {routes} from "./app/routes"
import AdminLayout from "./features/Admin/HOCs/Layout";
import NotFound from "./HOCs/Not_Found/NotFound";



function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<AdminLayout/>}>
      {routes.map(({path, component: Component})=>{
        return <Route path={path} element={<Component/>}/>
      })}
     
     </Route>

     <Route path="*" element={<NotFound/>}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;

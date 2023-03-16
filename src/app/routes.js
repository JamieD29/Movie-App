import Admin from "../features/Admin/Admin";
import AddMovie from '../features/Admin/features/Movie/AddMovie';
import MovieList from '../features/Admin/features/Movie/MovieList';
import UserList from '../features/Admin/features/User/UserList';

import EditMovie from "../features/Admin/features/Movie/EditMovie";
import ShowTimes from "../features/Admin/features/Movie/ShowTimes";
import AddUser from "../features/Admin/features/User/AddUser";
import EditUser from "../features/Admin/features/User/EditUser";


export const routes = [
    { path: "/admin", component: Admin },
    { path: "users", component: UserList },
    {path: "users/adduser", component: AddUser},
    {path: "users/edituser/:id", component: EditUser},
    { path: "movielist", component: MovieList },
    // { path: "movielist/:id", component: MovieList },
    { path: "addmovie", component: AddMovie},
    {path: "editmovie/:id", component: EditMovie},
    {path: "showtimes/:id", component: ShowTimes}
  ];
  

  export const userRoutes = [
      
  ];
import Admin from "../features/Admin/Admin";
import AddMovie from '../features/Admin/features/Movie/AddMovie';
import MovieList from '../features/Admin/features/Movie/MovieList';
import UserList from '../features/Admin/features/User/UserList';
import MovieSchedule from "../features/Admin/features/Movie/Schedule";
import EditMovie from "../features/Admin/features/Movie/EditMovie";


export const routes = [
    { path: "/admin", component: Admin },
    { path: "users", component: UserList },
    { path: "movielist", component: MovieList },
    { path: "movielist/:id", component: MovieList },
    { path: "addschedule", component: MovieSchedule},
    { path: "addmovie", component: AddMovie},
    {path: "editmovie/:id", component: EditMovie}
  ];
  
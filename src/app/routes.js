import Admin from "../features/Admin/Admin";
import AddMovie from '../features/Admin/features/AddMovie';
import MovieList from '../features/Admin/features/MovieList';
import UserList from '../features/Admin/features/UserList';
import MovieSchedule from "../features/Admin/features/Schedule";


export const routes = [
    { path: "/admin", component: Admin },
    { path: "users", component: UserList },
    { path: "movielist", component: MovieList },
    { path: "movielist/:id", component: MovieList },
    { path: "addschedule", component: MovieSchedule},
    { path: "addmovie", component: AddMovie},
  ];
  
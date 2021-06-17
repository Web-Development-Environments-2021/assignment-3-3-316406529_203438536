import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import TeamPage from "./pages/TeamPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/curStageGames",
    name: "curStageGames",
    component: () => import("./pages/curStagePage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/users/FavoriteGames",
    name: "favoriteGames",
    component: () => import("./components/FavoriteGames"),
  },
  {
    path: "/users/FavoriteTeams",
    name: "favoriteTeams",
    component: () => import("./components/FavoriteTeams"),
  },
  {
    path: "/users​/FavoritePlayers",
    name: "favoritePlayers",
    component: () => import("./components/FavoritePlayers"),
  },
  {
    path: "/PlayerPage/:id",
    name: "PlayerPage",
    component: () => import("./pages/PlayerPage"),
    // props: {id: 84658}
  },
  {
    path: "/CoachPage/:id",
    name: "CoachPage",
    component: () => import("./pages/CoachPage"),
  },
  {
    path: "/TeamPage/:id",
    name: "TeamPage",
    component: () => import("./pages/TeamPage"),
  },
  {
    path: "/userPage",
    name: "userPage",
    component: () => import("./pages/userPage"),
  },
  {
    path: "/LeagueManagment",
    name: "LeagueManagment",
    component: () => import("./pages/LeagueManagment"),
    props: { id: 84658 },
  },

  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;

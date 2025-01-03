import {Home, Profile, SignIn, SignUp } from "@/pages";
import FollowedTournament from "./pages/FollowedTournament/FollowedTournament";
import Tournament from "./pages/Tournament/Tournament";
import ChatForumLandingPage from "./pages/Chat Forum/Chat-forum";
import Playlist from "./pages/Match-replay/Match-replay";
import AdminDashboard from "./pages/Admin/AdminDashboard";


export const routes = [
  {
    name: "Home",
    path: "/home",
    element: <Home/>,
  },
  {
    name: "Turnament",
    path: "/tournament", 
    element: <Tournament/>,
  },
  {
    name: "Followed Tournament",
    path: "/followed-tournament", // Path untuk daftar turnamen
    element: <FollowedTournament/>,
  },
  {
    name: "Chat",
    path: "/chat-forum",
    element: <ChatForumLandingPage />,
  },
  {
    name: "Match Replay",
    path: "/playlist",
    element: <Playlist />,
  },
  {
    name: "Admin Dashboard",
    path: "/admin",
    element: <AdminDashboard />,
  },

];

export default routes;

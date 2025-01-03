import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import Tournament from "./pages/Tournament/Tournament";
import DetailTournament from "./pages/DetailTournament/DetailTournament";
import TournamentRegistration from "./pages/DetailTournament/TournamentRegistration";
import FollowedTournament from "./pages/FollowedTournament/FollowedTournament";
import DetailFollowedTournament from "./pages/DetailFollowedTournament/DetailFollowedTournament";
import TeamList from "./pages/Member/TeamList/TeamList";
import TeamDetail from "./pages/Member/TeamDetail/TeamDetail";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import { Profile } from "./pages";
import AdminLayout from "./pages/Admin/layout";
import AdminDashboard from "./pages/Admin/page";
import ManageUsers from "./pages/Admin/users/page";
import ManageTournaments from "./pages/Admin/tournaments/page";
import ForumDiscussions from "./pages/Admin/forum/page";
import ReplayManagement from "./pages/Admin/replays/page";

function App() {
  const { pathname } = useLocation();
  const isAuthenticated = false; // Replace this with your authentication logic

  return (
    <>
      {/* Navbar only appears if not on sign-in or sign-up pages */}
      {!(pathname === "/sign-in" || pathname === "/sign-up" || pathname.startsWith("/admin")) && (
        <div className="container mx-auto p-4 z-10">
          <Navbar routes={routes} />
        </div>
      )}

      <Routes>
        {/* Redirect to login if not authenticated */}
        {!isAuthenticated && <Route path="*" element={<Navigate to="/sign-in" replace />} />}

        {/* Routes for Sign-In and Sign-Up */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="tournaments" element={<ManageTournaments />} />
          <Route path="forum" element={<ForumDiscussions />} />
          <Route path="replays" element={<ReplayManagement />} />
        </Route>

        {/* Routes for main pages and details */}
        {routes.map(({ path, element }, key) => (
          <Route key={key} path={path} element={element} />
        ))}

        {/* Routes for Tournament and Tournament Details */}
        <Route path="/tournament" element={<Tournament />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/tournament/:id" element={<DetailTournament />} />
        <Route path="/followed-tournament" element={<FollowedTournament />} />
        <Route path="/followed-tournament/:id" element={<DetailFollowedTournament />} />
        <Route path="/followed-tournament/:id/teams" element={<TeamList />} />
        <Route path="/followed-tournament/:id/teams/:teamId" element={<TeamDetail />} />

        {/* Route for registration page */}
        <Route path="/tournament-registration/:id" element={<TournamentRegistration />} />

        {/* Fallback route if not found */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;


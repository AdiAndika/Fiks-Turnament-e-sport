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
import { Home, Profile, ProfileEdit } from "./pages";
import AdminLayout from "./pages/Admin/layout";
import AdminDashboard from "./pages/Admin/page";
import ManageUsers from "./pages/Admin/users/page";
import ManageTournaments from "./pages/Admin/tournaments/page";
import ForumDiscussions from "./pages/Admin/forum/page";
import ReplayManagement from "./pages/Admin/replays/page";
import ChatForumLandingPage from "./pages/Chat Forum/Chat-forum";
import Playlist from "./pages/Match-replay/Match-replay";
import AuthProvider from "./providers/AuthProvider";
import PrivateRoute from "./components/layout/PrivateRoute";
import PrivateRouteAdmin from "./components/layout/PrivateRouteAdmin";

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
    <AuthProvider>
        <Routes>
          {/* Redirect to login if not authenticated */}
          {!isAuthenticated && <Route path="*" element={<Navigate to="/sign-in" replace />} />}

          {/* Routes for Sign-In and Sign-Up */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={<PrivateRouteAdmin component={<AdminLayout />} />}
          >
            <Route 
              index 
              element={<PrivateRouteAdmin component={<AdminDashboard />} />} />
            <Route 
              path="users" 
              element={<PrivateRouteAdmin component={<ManageUsers />} />} />
            <Route 
              path="tournaments" 
              element={<PrivateRouteAdmin component={<ManageTournaments />} />} />
            <Route 
              path="forum" 
              element={<PrivateRouteAdmin component={<ForumDiscussions />} />} />
            <Route 
              path="replays" 
              element={<PrivateRouteAdmin component={<ReplayManagement />} />} />
          </Route>

          {/* Routes for main pages and details
          {routes.map(({ path, element }, key) => (
            <Route 
            key={key} 
            path={path} 
            element={<PrivateRoute component={element}/>} 
            />
          ))} */}

          {/* Normal route */}
          <Route 
            path="/home" 
            element={<PrivateRoute component={<Home />}/>}  
          />
          <Route 
            path="/chat-forum" 
            element={<PrivateRoute component={<ChatForumLandingPage />}/>}
          />
          <Route 
            path="/playlist" 
            element={<PrivateRoute component={<Playlist />} />} 
          />

          {/* Routes for Tournament and Tournament Details */}
          {/* Routes for Tournament and Tournament Details */}
          <Route
            exact
            path="/tournament"
            element={<PrivateRoute component={<Tournament />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute component={<Profile />} />}
          />
          <Route
            path="/profile/edit"
            element={<PrivateRoute component={<ProfileEdit />} />}
          />
          <Route
            exact
            path="/tournament/:id"
            element={<PrivateRoute component={<DetailTournament />} />}
          />
          <Route
            path="/followed-tournament"
            element={<PrivateRoute component={<FollowedTournament />} />}
          />
          <Route
            path="/followed-tournament/:id"
            element={<PrivateRoute component={<DetailFollowedTournament />} />}
          />
          <Route
            path="/followed-tournament/:id/teams"
            element={<PrivateRoute component={<TeamList />} />}
          />
          <Route
            path="/followed-tournament/:id/teams/:teamId"
            element={<PrivateRoute component={<TeamDetail />} />}
          />

          {/* Route for registration page */}
          <Route
            path="/tournament-registration/:id"
            element={<PrivateRoute component={<TournamentRegistration />} />}
          />


          {/* Fallback route if not found */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    </AuthProvider>
    </>
  );
}

export default App;


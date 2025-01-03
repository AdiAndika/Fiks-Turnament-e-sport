import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import Tournament from "./pages/Tournament/Tournament"; // Halaman daftar turnamen
import DetailTournament from "./pages/DetailTournament/DetailTournament"; // Halaman detail turnamen
import TournamentRegistration from "./pages/DetailTournament/TournamentRegistration"; // Halaman pendaftaran turnamen
import FollowedTournament from "./pages/FollowedTournament/FollowedTournament"; // Halaman daftar turnamen diikuti
import DetailFollowedTournament from "./pages/DetailFollowedTournament/DetailFollowedTournament"; // Halaman detail turnamen diikuti
import TeamList from "./pages/Member/TeamList/TeamList"; // Halaman list Team
import TeamDetail from "./pages/Member/TeamDetail/TeamDetail"; // Halaman Detail Team
import SignIn from "./pages/sign-in"; // Halaman Login
import SignUp from "./pages/sign-up"; // Halaman Sign-Up
import { Profile } from "./pages";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  const { pathname } = useLocation();
  const isAuthenticated = false; // Ganti ini dengan logika autentikasi seperti cek token, session, dll.

  return (
    <>
      {/* Navbar hanya muncul jika bukan di halaman sign-in atau sign-up */}
      {!(pathname === "/sign-in" || pathname === "/sign-up") && (
        <div className="container mx-auto p-4 z-10">
          <Navbar routes={routes} />
        </div>
      )}

      <Routes>
        {/* Redirect ke login jika belum autentikasi */}
        {!isAuthenticated && <Route path="*" element={<Navigate to="/sign-in" replace />} />}

        {/* Route untuk Sign-In dan Sign-Up */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />



        {/* Routing untuk halaman utama dan detail */}
        {routes.map(({ path, element }, key) => (
          <Route key={key} path={path} element={element} />
        ))}

        {/* Route untuk halaman Tournament dan Detail Tournament */}
        <Route path="/tournament" element={<Tournament />} /> {/* Daftar turnamen */}
        <Route path="profile" element={<Profile />} />
        <Route path="/tournament/:id" element={<DetailTournament />} /> {/* Halaman detail berdasarkan ID */}
        <Route path="/followed-tournament" element={<FollowedTournament />} /> {/* Turnamen diikuti */}
        <Route path="/followed-tournament/:id" element={<DetailFollowedTournament />} /> {/* Detail turnamen diikuti */}
        <Route path="/followed-tournament/:id/teams" element={<TeamList />} /> {/* List Team Tournament Yang diikuti */}
        <Route path="/followed-tournament/:id/teams/:teamId" element={<TeamDetail />} /> {/* Detail Team Tournament Yang diikuti */}

        {/* Route untuk halaman pendaftaran */}
        <Route path="/tournament-registration/:id" element={<TournamentRegistration />} />

        <Route path="/admin" element={<AdminDashboard />} />

        {/* Route fallback jika tidak ditemukan */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;


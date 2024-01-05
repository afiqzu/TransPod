import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/_auth/AuthLayout.tsx";
import SignInForm from "@/_auth/forms/SignInForm.tsx";
import SignUpForm from "@/_auth/forms/SignUpForm.tsx";
import Home from "@/_root/pages/Home.tsx";
import RootLayout from "@/_root/RootLayout.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import SearchResults from "@/_root/pages/SearchResults.tsx";
import Podcast from "@/_root/pages/Podcast.tsx";
import Episode from "@/_root/pages/Episode.tsx";
import Landing from "@/_auth/Landing.tsx";
import "non.geist";
import RecoverPassword from "@/_auth/forms/RecoverPassword.tsx";
import ResetPassword from "@/_auth/forms/ResetPassword.tsx";

function App() {
  return (
    <main className="font-geist">
      <Toaster />
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route index element={<Landing />} />
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* private routes */}

        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/search/:term" element={<SearchResults />} />
          <Route path="/podcast/:id" element={<Podcast />} />
          <Route path="/episode/:id" element={<Episode />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;

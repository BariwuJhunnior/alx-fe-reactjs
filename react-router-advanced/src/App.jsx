import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details.jsx";
import Home from "./components/Home.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";
import Profile from "./components/Profile.jsx";
import ProfileDetails from "./components/ProfileDetails.jsx";
import ProfileSettings from "./components/ProfileSettings.jsx";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BlogPost from "./components/BlogPost.jsx";

// --- Simple Login Component ---
const Login = () => {
  const { login } = useAuth();

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold">Login Required</h2>
      <p>Click below to simulate a successful login.</p>
      <button
        onClick={login}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Simulate Login
      </button>
    </div>
  );
};

// --- Main Application Component ---
function App() {
  const { user, logout } = useAuth(); //Use the hook inside App to access auth state

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/blog/:id" element={<BlogPost />} />

        <Route path="/profile" element={<Profile />}>
          <Route index={true} element={<ProfileDetails />} />

          <Route path="settings" element={<ProfileSettings />} />

          {/* DYNAMIC ROUTE: Implementation for /profile/:userId 
          Note: This is often defined at the top level, but can also be nested.
          We'll use it here as a sibling to the sub-sections for flexibility.
        */}
          <Route
            path=":userId"
            element={<h2>Viewing Profile for ID: {":userId"}</h2>}
          >
            {/* NESTED ROUTES are now protected because their parent is protected */}
            <Route index element={<ProfileDetails />} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
            <Route path=":userId" element={<h2>Viewing Dynamic Profile</h2>} />
          </Route>

          {/* =================================
            PROTECT THE /profile ROUTE
            =================================
          */}
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<h1>404: Page Not Found!</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

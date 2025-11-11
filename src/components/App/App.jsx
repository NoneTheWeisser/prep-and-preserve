import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import useStore from "../../zustand/store";
import Nav from "../Nav/Nav";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import About from "../About/About";
import Footer from "../Footer/Footer";
import AddRecipeForm from "../AddRecipeForm/AddRecipeForm";
import CommunityRecipes from "../CommunityRecipes/CommunityRecipes";
import MyRecipe from "../MyRecipe/MyRecipe";
import FullRecipeView from "../Recipe/FullRecipeView";
import EditRecipeForm from "../AddRecipeForm/EditRecipeForm";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AdminRoute from "../AdminDashboard/AdminRoute";

function App() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              user.id ? (
                <Navigate to="/" replace /> // Redirect authenticated user.
              ) : (
                <LoginPage /> // Render LoginPage for unauthenticated user.
              )
            }
          />
          <Route
            exact
            path="/registration"
            element={
              user.id ? (
                <Navigate to="/" replace /> // Redirect authenticated user.
              ) : (
                <RegisterPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
          <Route
            exact
            path="/addrecipe"
            element={
              <AddRecipeForm />
              // user.id ? <AddRecipeForm /> : <Navigate to="/login" replace />
            }
          />
          <Route
            exact
            path="/myrecipes"
            element={
              <MyRecipe />
              // user.id ? <MyRecipe /> : <Navigate to="/login" replace />
            }
          />
          <Route exact path="/community" element={<CommunityRecipes />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/recipes/:id" element={<FullRecipeView />} />
          <Route path="/recipes/edit/:id" element={<EditRecipeForm />} />
          <Route path="*" element={<h2>404 Page</h2>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage, { companiesLoader } from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="jobs/:id"
          element={
            <ProtectedRoute>
              <JobPage />
            </ProtectedRoute>
          }
          loader={jobLoader}
        />
        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute>
              <EditJobPage />
            </ProtectedRoute>
          }
          loader={jobLoader}
        />
        <Route
          path="/add-job"
          element={
            <ProtectedRoute>
              <AddJobPage />
            </ProtectedRoute>
          }
          loader={companiesLoader}
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFoundPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

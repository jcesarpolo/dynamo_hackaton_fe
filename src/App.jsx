import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import PublicLayout from "./layouts/PublicLayout";
import NotFoundPage from "./pages/NotFound";
import IssuesPage from "./pages/IssuesPage";
import FoldersPage from "./pages/FoldersPage";
import ProjectsPage from "./pages/Projects";
import PrivateLayout from "./layouts/PrivateLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/" element={<PrivateLayout />}>
          <Route path="projects">
            <Route path="" element={<ProjectsPage />} />
            <Route path=":projectId/issues" element={<IssuesPage />} />
          </Route>
          <Route
            path="/projects/:projectId/folders"
            element={<FoldersPage />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Exportación
export default App; // module.exports = App

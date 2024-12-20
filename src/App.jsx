import "./App.css";
import Home from "./pages/Home";
import Projectform from "./components/Projectform";
import Locationform from "./components/Locationform";
import Project from "./pages/Project";
import Location from "./pages/Location";
import Footer from "./components/Footer";
import Preview from "./pages/Preview";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  /*
  Routes:
  1. "/" - Home component: Displays the home page of the application.
  2. "/allProjects" - Project component: Shows all the projects.
  3. "/project/addEditProjects" - Projectform component: Allows adding of a project
  4. "/project/addEditProjects/:id" - Projectform component: Allows editing a specific project by its ID.
  5. "/location/addEditLocations/projectID/:projectID" - Locationform component: Adds or edits a location for a specific project, identified by the projectID.
  6. "/allLocations/:id" - Location component: Displays all locations for a specific project, identified by the project ID.
  7. "/location/addEditLocations/:id" - Locationform component: Allows editing a specific location by its ID.
  8. "/preview/:projectID" - Preview component: Displays a preview for a specific project, identified by the projectID.
*/
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allProjects" element={<Project />} />
            <Route path="/project/addEditProjects" element={<Projectform />} />
            <Route
              path="/project/addEditProjects/:id"
              element={<Projectform />}
            />
            <Route
              path="/location/addEditLocations/projectID/:projectID"
              element={<Locationform />}
            />
            <Route path="/allLocations/:id" element={<Location />} />
            <Route
              path="/location/addEditLocations/:id"
              element={<Locationform />}
            />
            <Route path="/preview/:projectID" element={<Preview />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

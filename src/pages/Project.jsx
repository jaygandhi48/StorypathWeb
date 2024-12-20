import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  createProject,
  getProjects,
  getProject,
  deleteProject,
} from "../api/index.js";
import { useState, useEffect } from "react";

/**
 * The `Project` component is responsible for displaying a list of projects created by the user.
 * It allows users to view, manage, and delete projects, as well as navigate to a form to create a new project.
 *
 * State:
 * - `projects` (array): Stores the list of projects retrieved from the API.
 * - `isLoading` (boolean): Tracks the loading state, indicating whether the projects data is still being fetched.
 *
 * Functionality:
 * - Fetches all projects from the API using `getProjects()` when the component mounts.
 * - Displays a loading message while the data is being retrieved.
 * - Renders a list of project cards (via the `Card` component), each containing project details such as title and description.
 * - Allows users to delete a project by calling `deleteProject()` and filtering the deleted project from the displayed list.
 * - Provides a button to navigate to the "Add/Edit Project" page for creating a new project.
 *
 * Effects:
 * - The `useEffect` hook fetches project data on component mount and updates the state with the retrieved data.
 * - If there is an error during data fetching or deletion, it is logged to the console.
 *
 * Components:
 * - `Navbar`: A navigation bar at the top of the page.
 * - `Card`: A card component that displays individual project details and provides delete functionality.
 * - `Footer`: A footer at the bottom of the page (not currently used in the render).
 *
 * Returns:
 * - A layout that includes the navigation bar, a list of project cards, and an "Add Project" button.
 * - If there are no projects, users are prompted to create a new project.
 *
 * Error Handling:
 * - Catches and logs any errors that occur during the fetching or deletion of projects.
 */

function Project() {
  // State to store projects and loading status. Initially loading is set to true as data has not been fetched yet.
  const [projects, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects on component mount
    try {
      const fetchProjects = async () => {
        const allProjects = await getProjects();
        setProjects(allProjects);
        setLoading(false);
      };
      fetchProjects();
    } catch (error) {
      //Display any console errors that occurred while fetching
      console.error("Error fetching projects: ", error);
    }
  }, [projects]);

  const deleteProjects = async (id) => {
    try {
      // Update state by filtering out the deleted project
      await deleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  };
  /*
  Project page which showcases the current projects that the user has created.
  If it has not created any, then it will prompt them to create a new project. 
  Components such as card is used in order to represent the projects
   */
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl ml-5 font-semibold">Projects Page</h1>
      <h1 className="text-lg m-5 ">
        Start creating a custom project by clicking on the add project button{" "}
      </h1>
      <div className="flex gap-5 flex-wrap">
        {isLoading ? (
          <h1>Loading Projects</h1>
        ) : (
          projects.map((project, key) => {
            return (
              <Card
                key={key}
                id={project.id}
                deleteProjects={deleteProjects}
                title={project.title}
                desc={project.description}
                isPublised={project.is_published}
              ></Card>
            );
          })
        )}
      </div>
      <div className="flex justify-start m-3">
        <Link
          className="btn btn-primary btn-sm font-normal"
          to="/project/addEditProjects"
        >
          Add project
        </Link>
      </div>
    </div>
  );
}

export default Project;

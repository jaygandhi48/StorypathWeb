import React from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { getLocation, getProject } from "../api/index.js";
import { useParams } from "react-router-dom";

/**
 * The `Preview` component is designed to allow users to simulate an exploration of a project, such as a scavenger hunt,
 * based on locations within a specified project. Users can mark locations as visited and view the project's content
 * and scoring system in a preview mode.
 *
 * State:
 * - `currentScreen` (string): Tracks the current location or screen being viewed, initially set to "Homescreen".
 * - `locations` (array): Stores all locations retrieved from the API for the specified project.
 * - `project` (object): Contains project details such as title, instructions, and scoring information.
 * - `isLoading` (boolean): Indicates whether the component is loading location and project data.
 * - `visited` (number): Tracks how many locations have been marked as visited.
 * - `points` (number): Tracks the total points accumulated by visiting locations with score points.
 * - `totalPoints` (number): The sum of all possible score points across all locations.
 * - `visitedLocations` (array): Stores the names of the locations marked as visited.
 *
 * Functionality:
 * - Fetches project and location data from the API based on the project ID from the URL.
 * - Allows users to select locations from a dropdown, view content for each location, and mark locations as visited.
 * - Displays the number of visited locations and the score points achieved based on the participant scoring system.
 *
 * Effects:
 * - The `useEffect` hook is used to fetch project and location data when the component mounts and when the location list changes.
 *
 * Returns:
 * - A page layout including a navigation bar, project details, and a card-based interface for viewing locations and project content.
 * - Location-specific content is dynamically displayed based on the user selection from the dropdown menu.
 * - If no location is selected, the project’s homescreen content is displayed.
 *
 * Error Handling:
 * - If an error occurs during data fetching, it is logged to the console.
 */
function Preview() {
  const [currentScreen, setCurrentScreen] = useState("Homescreen");
  const [locations, setLocations] = useState([]);
  const [project, setProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visited, setVisited] = useState(0); //Count of visited. In order to represent in fraction
  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [visitedLocations, setVisitedLocations] = useState([]); //Array of visited locations

  /**
   * Handles the logic for marking a location as visited.
   *
   * @param {string} location - The name of the location being marked as visited.
   *
   * The function checks if the location has already been visited. If not, it:
   * 1. Adds the location to the list of visited locations.
   * 2. Increments the visited count by 1.
   * 3. Finds the corresponding location object based on its name and adds its score points to the current total points.
   */
  const handleVisitedLocations = (location) => {
    if (visitedLocations.includes(location)) {
      return;
    } else {
      setVisitedLocations([...visitedLocations, location]);
      setVisited(visited + 1);
      const locationnGivenTitle = locations.find((singleLocation) => {
        return singleLocation.location_name === location;
      });
      setPoints(points + locationnGivenTitle.score_points);
    }
  };

  /**
   * Calculates the total points available across all locations.
   *
   * This function iterates through the list of locations, sums up their score points,
   * and updates the total points state with the computed value.
   */
  const getTotalPoints = () => {
    let total = 0;
    locations.map((singleLocation) => {
      total += singleLocation.score_points;
    });
    setTotalPoints(total);
  };

  const markup = { __html: "" };
  let projectId = useParams();
  projectId = projectId.projectID.substring(1, projectId.projectID.length); //Remove the : from the param and since useParams output the object. We need to extract the projectID from the field.

  useEffect(() => {
    try {
      const fetchLocation = async () => {
        const allLocations = await getLocation(projectId);
        const projectDetails = await getProject(allLocations[0].project_id);
        setLocations(allLocations);
        setProject(projectDetails[0]);
        getTotalPoints();
        setIsLoading(false);
      };
      fetchLocation();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      getTotalPoints();
    }
  }, [locations]);

  //Styling for preview component which lets users preview the project as if its real user.
  return (
    <div className="mb-10">
      {isLoading ? (
        <h1>Loading the data</h1>
      ) : (
        <>
          <Navbar />
          <h1 className="text-3xl font-semibold m-5">Exploring - Preview</h1>
          <h1 className="text-gray-500 text-lg m-5">
            Change the locations to test Scoring and other user displays:
          </h1>
          <details className="dropdown w-full">
            <summary className="btn rounded-sm w-[96%] ml-4 bg-[#fbf7f5] border-neutral border-opacity-15 border-[1px] text-lg font-normal flex justify-between">
              {currentScreen}
              <MdOutlineArrowDropDown />
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-[96%] p-2 shadow">
              {locations.map((element, index) => {
                return (
                  <li
                    key={index}
                    onClick={(e) => {
                      handleVisitedLocations(e.target.textContent);
                      setCurrentScreen(e.target.textContent);
                    }}
                  >
                    <a>{element.location_name}</a>
                  </li>
                );
              })}
            </ul>
          </details>

          <div className="container flex justify-center mt-10">
            {locations.map((element, index) => {
              if (element.location_name === currentScreen) {
                markup.__html = element.location_content;
                return (
                  <div
                    className="card bg-base-100 w-[30%] shadow-xl"
                    key={index}
                  >
                    <div className="card-body">
                      <h2 className="card-title">{element.location_name}</h2>

                      <div dangerouslySetInnerHTML={markup}></div>
                      <h1 className="font-bold text-lg">Clue</h1>
                      <p>{element.clue}</p>

                      <div className="card-actions justify-between">
                        {project.participant_scoring === "Not Scored" ? (
                          <div className="badge badge-outline badge-lg">
                            Points 0/0
                          </div>
                        ) : (
                          <div className="badge badge-outline badge-lg">
                            Points {points}/{totalPoints}
                          </div>
                        )}
                        <div className="badge badge-outline badge-lg">
                          Locations Visited {visited}/{locations.length}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}

            {currentScreen === "Homescreen" && (
              <div className="card bg-base-100 w-[30%] shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{project.title}</h2>
                  <h2 className="font-bold text-lg">Instructions</h2>
                  <p>{project.instructions}</p>

                  {project.homescreen_display === "Display Initial Clue" ? (
                    <>
                      <h2 className="font-bold">Initial Clue</h2>
                      <h1 className="text-lg">{project.initial_clue}</h1>
                    </>
                  ) : (
                    <>
                      <h2 className="font-bold">All locations</h2>
                      {locations.map((element) => {
                        return (
                          <h1 key={element.id} className="text-lg">
                            {element.location_name}
                          </h1>
                        );
                      })}
                    </>
                  )}

                  <h2 className="font-bold">Description:</h2>
                  <h1 className="text-lg">{project.description}</h1>

                  <div className="card-actions justify-between">
                    {project.participant_scoring === "Not Scored" ? (
                      <>
                        <div className="badge badge-outline badge-lg">
                          Points 0/0
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="badge badge-outline badge-lg">
                          Points 0/{totalPoints}
                        </div>
                      </>
                    )}
                    <div className="badge badge-outline badge-lg">
                      Locations Visited 0/{locations.length}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Preview;

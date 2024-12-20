import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import NavBar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { getLocation } from "../api/index.js";

/**
 * Location component fetches and displays all locations for a specific project based on the project ID.
 *
 * Features:
 * - Fetches location data from the API using the project ID obtained from URL parameters.
 * - Displays the locations in a table format using the `Table` component.
 * - Shows a loading state while data is being fetched.
 * - If no locations are found for the project, displays a message prompting the user to add new locations.
 * - Provides buttons to add new locations or preview existing locations for the project.
 *
 * State Variables:
 * - `locations` (array): Stores the fetched locations for the project.
 * - `isLoading` (boolean): Controls whether to show the loading state while location data is being fetched.
 * - `Qrvalue` (string): Stores the value for QR codes associated with locations.
 *
 * URL Parameters:
 * - The component extracts the `projectId` from the URL parameters using `useParams()`.
 * - The `projectId` is processed to remove any extra `:` characters.
 *
 * API Call:
 * - The component uses `getLocation` to asynchronously fetch the location data based on the project ID.
 *
 * Effect Hook:
 * - `useEffect` fetches location data once the component mounts or the `locations` state updates.
 * - If an error occurs during data fetching, it is logged to the console, and loading is disabled.
 *
 * Conditional Rendering:
 * - If `isLoading` is true, a loading message is displayed.
 * - If locations are found, they are shown in a table with a prompt to add or edit locations.
 * - If no locations exist, the user is prompted to add locations via a button.
 *
 * Links:
 * - Add Locations button navigates to the "Add/Edit Locations" page.
 * - Preview button navigates to the preview page for the project.
 *
 * Example usage:
 * @example
 * <Route path="/project/:id/locations" element={<Location />} />
 *
 * Dependencies:
 * - `Table` component for rendering locations in a table format.
 * - `NavBar` component for navigation links.
 * - `useParams` from React Router to obtain the project ID.
 * - `getLocation` API call to fetch locations based on the project ID.
 */
function Location() {
  // State to store locations data and loading status and QR code value.
  const [locations, setLocations] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [Qrvalue, setQrvalue] = useState("");
  //Fetching the project id from parameter and making sure it doesn't contain extra ':'
  let projectId = useParams();
  let refinedId;
  if (Object.keys(projectId).length !== 0) {
    refinedId = projectId.id.substring(1, projectId.id.length);
  }

  // Fetch location data based on the project ID
  useEffect(() => {
    try {
      const fetchLocation = async () => {
        const allLocations = await getLocation(refinedId);
        setLocations(allLocations);
        //Display data once its been fetched
        setLoading(false);
      };
      fetchLocation();
    } catch (err) {
      console.error("Error fetching locations: ", err);
      setLoading(false);
    }
  }, [locations]);

  return (
    /*
    Location page which represents all the locations for a given project id.
    If there are no locations for the given project, it will display a message to add locations.
    Displays this in table format using the table component.
     */
    <div>
      <NavBar />
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {locations.length > 0 ? (
            <>
              <h1 className="m-5 text-3xl font-semibold">
                All your locations for Project 1
              </h1>
              <h1 className="m-5 text-xl ">
                In order to add or edit existing locations, please use the table
                buttons, otherwise to add new projects click add new button
              </h1>
              <Table
                allLocation={locations}
                setValue={setQrvalue}
                qrValue={Qrvalue}
              />
              <div className="flex justify-between mb-10">
                <Link
                  className="btn btn-primary btn-sm font-normal ml-5 mt-3"
                  to={`/location/addEditLocations/projectID/:${refinedId}`}
                >
                  Add Locations
                </Link>
                <Link
                  className="btn btn-accent btn-sm font-normal mr-5 mt-3"
                  to={`/preview/:${refinedId}`}
                >
                  Preview
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-semibold text-center">
                No data added yet. Click on Add Locations to start adding
                locations
              </h1>
              <div className="flex items-center flex-col">
                <Link
                  className="btn btn-primary btn-sm font-normal ml-5 mt-5"
                  to={`/location/addEditLocations/projectID/:${refinedId}`}
                >
                  Add Locations
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Location;

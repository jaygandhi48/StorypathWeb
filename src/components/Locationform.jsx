import React from "react";
import Navbar from "./Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createLocation,
  getLocation,
  LocationById,
  updateLocation,
} from "../api/index.js";
import Swal from "sweetalert2";
import Map from "./Map.jsx";

/**
 * Locationform component allows users to add or edit location details,
 * including name, position, points, and related content.
 *
 * It supports a form interface to input or update data and interact with a map
 * to set location coordinates. The form handles both creating new locations
 * and updating existing ones.
 *
 * Features:
 * - Location name, trigger, position (lat/long), points, clue, and content.
 * - Option to select coordinates from a map.
 * - Uses ReactQuill for rich text content editing.
 * - Provides success feedback and navigates users back after successful submission.
 */
function Locationform() {
  // Toolbar modules for ReactQuill editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [
        {
          font: [],
        },
        {
          color: [],
        },
        {
          background: [],
        },
      ],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState();
  const [trigger, setTrigger] = useState("Locations");
  const [position, setPosition] = useState("");
  const [points, setPoints] = useState("");
  const [clue, setClue] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModel, setShowModel] = useState(false);

  let LinkParams = useParams(); // Extract URL parameters
  let projectID; //Could pass in projectId, that means its adding a new project
  let locationID; //Could pass in locationId, that means its editing an existing location

  //Removing the colon (:) from the URL parameter
  if (LinkParams.hasOwnProperty("projectID")) {
    projectID = LinkParams.projectID.substring(1, LinkParams.projectID.length);
  } else if (LinkParams.hasOwnProperty("id")) {
    locationID = LinkParams.id.substring(1, LinkParams.id.length);
  }

  // Fetch location data when locationID is defined
  useEffect(() => {
    if (locationID !== undefined) {
      try {
        const fetchData = async () => {
          const arrayDataObject = await LocationById(locationID);
          const fetchData = arrayDataObject[0];
          setLocationName(fetchData.location_name);
          setTrigger(fetchData.location_trigger);
          setPosition(fetchData.location_position);
          setPoints(fetchData.score_points);
          setClue(fetchData.clue);
          setContent(fetchData.location_content);
          setIsLoading(false);
        };
        fetchData();
      } catch (err) {
        console.error("Error fetching location: ", err);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  // Handle form submission for creating or updating a location
  const handleformInput = async (e) => {
    try {
      if (locationID === undefined) {
        //If locationId is undefined then it means its adding new location
        e.preventDefault();
        const newLocation = {
          location_name: locationName,
          location_trigger: trigger,
          location_position: position, // Ensure this matches the expected format
          score_points: parseFloat(points), // Convert to number if necessary
          clue: clue,
          location_content: content,
          project_id: parseInt(projectID), // Convert to integer
        };

        const createNewLocation = await createLocation(newLocation);
        console.log("Location created: " + createNewLocation);
        Swal.fire({
          title: "Location created successfully",
          text: "Naviagating you back to the Projects page!",
          icon: "success",
        });
        navigate("/allProjects");
      } else {
        e.preventDefault();
        const updatedLocation = {
          location_name: locationName,
          location_trigger: trigger,
          location_position: position, // Ensure this matches the expected format
          score_points: parseFloat(points), // Convert to number if necessary
          clue: clue,
          location_content: content,
        };

        await updateLocation(locationID, updatedLocation);
        Swal.fire({
          title: "Location updated successfully",
          text: "Naviagating you back to the Projects page!",
          icon: "success",
        });
        navigate("/allProjects");
      }
    } catch (err) {
      console.error("Error saving location: ", err);
    }
  };

  /*
  Necessary styling to create editing and adding form for locations. 
  Using the Map component to choose the longitude and latitude from the map. 
   */
  return (
    <div>
      <Navbar />
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div className="mx-auto max-w-4xl p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold ml-[15%] text-black">
              Edit Locations
            </h1>
            <h2 className="mt-5 ml-[15%] text-lg">
              Edit or add new locations here by filling the form below
            </h2>
            <form
              className="flex flex-col mt-2 ml-[15%]"
              onSubmit={handleformInput}
            >
              <label className="text-lg">Location name</label>
              <input
                type="text"
                required={true}
                placeholder="Location name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="rounded-xl w-[60%] p-2 bg-[#fbf7f5]  border-neutral border-opacity-15 border-[1px] text-neutral placeholder-[#866c5f] mt-2"
              ></input>
              <label className="text-lg mt-3">Location Trigger</label>
              <select
                className="rounded-xl w-[60%] p-2 bg-[#fbf7f5]  border-neutral border-opacity-15 border-[1px] text-neutral placeholder-[#866c5f] mt-2"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
              >
                <option value="locations">Locations</option>
                <option value="codes">QR codes</option>
                <option value="locationsAndCodes">Both</option>
              </select>
              <label className="text-lg mt-3">
                Location position (lat, long).
              </label>
              <textarea
                type="text"
                placeholder="Enter longitude and latitude or choose from the map"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="rounded-xl w-[60%] p-2 bg-[#fbf7f5]  border-neutral border-opacity-15 border-[1px] text-neutral placeholder-[#866c5f] mt-2"
              ></textarea>
              <button
                type="button"
                className="btn btn-neutral mt-2 w-fit"
                onClick={() => {
                  setShowModel(!showModel);
                }}
              >
                Click to choose from Map
              </button>

              {showModel ? (
                <>
                  <Map setCoordinate={setPosition}></Map>
                  <label className="text-lg mt-3">
                    Points for Reaching Location
                  </label>
                  <input
                    type="text"
                    placeholder="Location points"
                    required={true}
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    className="rounded-xl w-[60%] p-2 bg-[#fbf7f5]  border-neutral border-opacity-15 border-[1px] text-neutral placeholder-[#866c5f] mt-2"
                  ></input>
                  <label className="text-lg mt-3">Clue</label>
                  <textarea
                    type="text"
                    placeholder="Location Clue"
                    value={clue}
                    onChange={(e) => setClue(e.target.value)}
                    className="rounded-xl w-[60%] p-2 bg-[#fbf7f5]  border-neutral border-opacity-15 border-[1px] text-neutral placeholder-[#866c5f] mt-2"
                  ></textarea>

                  <label className="text-lg mt-3">Location content</label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    className="mt-5"
                    value={content}
                    onChange={(e) => setContent(e)}
                  />
                  <button className="btn btn-neutral relative w-1/4 left-[75%] mt-5">
                    Next
                  </button>
                </>
              ) : (
                <>
                  <label className="text-lg mt-3">
                    Points for Reaching Location
                  </label>
                  <input
                    type="text"
                    placeholder="Location points"
                    required={true}
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    className="rounded-xl w-[60%] p-2 bg-[#fbf7f5]  border-neutral border-opacity-15 border-[1px] text-neutral placeholder-[#866c5f] mt-2"
                  ></input>
                  <label className="text-lg mt-3">Clue</label>
                  <textarea
                    type="text"
                    placeholder="Location clue"
                    value={clue}
                    onChange={(e) => setClue(e.target.value)}
                    className="rounded-xl w-[60%] p-2 bg-[#fbf7f5]  border-neutral border-opacity-15 border-[1px] text-neutral placeholder-[#866c5f] mt-2"
                  ></textarea>

                  <label className="text-lg mt-3">Location content</label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    className="mt-5"
                    value={content}
                    onChange={(e) => setContent(e)}
                  />
                  <button className="btn btn-neutral relative w-1/4 left-[75%] mt-5">
                    Next
                  </button>
                </>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Locationform;

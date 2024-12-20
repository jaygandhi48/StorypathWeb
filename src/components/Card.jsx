import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

/**
 * Card component representing a project with title, description, and options
 * to edit, delete, or add locations to the project.
 * It also displays whether the project is published or not.
 *
 * @param {Object} props - The props for the Card component.
 * @param {string} props.id - The unique identifier for the project.
 * @param {Function} props.deleteProjects - Function to delete the project.
 * @param {string} props.title - The title of the project.
 * @param {string} props.desc - The description of the project.
 * @param {boolean} props.isPublised - Boolean indicating if the project is published.
 *
 * Component adapted from daisyUI.
 */
function Card({ id, deleteProjects, title, desc, isPublised }) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title">{title}</h2>
          <div className="badge badge-success badge-lg">
            {isPublised ? "Published" : "Not Published"}
          </div>
        </div>
        <p>{desc}</p>
        <div className="card-actions justify-between items-center ">
          <div>
            <Link
              className="btn btn-neutral btn-sm"
              to={`/allLocations/:${id}`}
            >
              Add locations
            </Link>
          </div>
          <div className="gap-4 flex">
            <Link
              className="badge badge-warning badge-md"
              to={`/project/addEditProjects/:${id}`}
            >
              Edit
            </Link>
            <button
              className="badge badge-error badge-md"
              onClick={() => {
                deleteProjects(id);
                Swal.fire({
                  title: "Success",
                  text: "Project deleted successfully",
                  icon: "success",
                });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

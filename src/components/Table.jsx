import React from "react";
import { deleteLocation } from "../api/index.js";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import QRCode from "react-qr-code";
import { useState } from "react";

/**
 * Table component to display a list of locations.
 *
 * This component renders a table that lists various location details, including:
 * - Position of the location in the list.
 * - Name of the location.
 * - Trigger associated with the location.
 * - Points associated with the location.
 *
 * Each row contains buttons for:
 * - Editing the location, which navigates to a different page.
 * - Deleting the location, which triggers a confirmation alert and deletes the entry.
 * - Printing a QR code that encodes specific information about the location.
 *
 * The component uses local state to manage the visibility of the QR code display.
 *
 * @param {Object} props - The component props
 * @param {Array} props.allLocation - Array of location objects to be displayed in the table.
 * @param {Function} props.setValue - Function to set the value for the QR code generation.
 * @param {string} props.qrValue - The value to encode in the QR code.
 */
function Table({ allLocation, setValue, qrValue }) {
  const [model, setModel] = useState(false); //Setting the QR model. Initially its off.
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-lg">
        <thead>
          <tr>
            <th>Position</th>
            <th>Location Name</th>
            <th>Trigger</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {allLocation.map((element, index) => (
            <tr draggable={true} key={index}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{element.location_name} </div>
                    <div>Position: {element.location_position} </div>
                  </div>
                </div>
              </td>
              <td>{element.location_trigger}</td>
              <td>{element.score_points}</td>
              <th>
                <Link
                  className="btn btn-outline btn-ghost btn-xs m-2"
                  to={`/location/addEditLocations/:${element.id}`}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-outline btn-error btn-xs m-2"
                  onClick={() => {
                    deleteLocation(element.id);
                    Swal.fire({
                      title: "Success",
                      text: "Project deleted successfully",
                      icon: "success",
                    });
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline btn-success btn-xs"
                  onClick={() => {
                    setValue(element.location_name + toString(element.id));
                    setModel(true);
                  }}
                >
                  Print QR code
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {qrValue &&
        model && ( // Conditionally render QR code if qrValue is available and model is true
          <>
            <div className="flex items-center flex-col mt-10">
              <QRCode value={qrValue} size={150}></QRCode>
              <button
                className="btn btn-neutral btn-sm mt-10"
                onClick={() => {
                  setModel(false);
                }}
              >
                Close QR Code
              </button>
            </div>
          </>
        )}
    </div>
  );
}

export default Table;

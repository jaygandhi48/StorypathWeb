import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/**
 * HandleMapClick component that listens for click events on the map
 * and executes a provided function.
 *
 * @param {function} onClickFunction - Function to be executed on map click.
 */
const HandleMapClick = ({ onClickFunction }) => {
  const map = useMap();
  useEffect(() => {
    map.on("click", onClickFunction);
    return () => {
      map.off("click", onClickFunction);
    };
  }, [map, onClickFunction]);
  return null;
};

/**
 * Map component for displaying an interactive map.
 *
 * This component initializes a map centered on a default latitude and longitude.
 * It allows users to click on the map to select a location, updates the marker position,
 * and passes the selected coordinates to the parent component via setCoordinate function.
 *
 * @param {function} setCoordinate - Function to update the coordinates of the selected location.
 */
function Map({ setCoordinate }) {
  const mapRef = useRef(null);
  const [latitude, setLatitude] = useState(-27.4698);
  const [longitude, setLongitude] = useState(153.0251);

  const onClick = (e) => {
    const { lat, lng } = e.latlng;
    setLongitude(lng);
    setLatitude(lat);
    const formatPosition = "(" + lat + "," + lng + ")";
    setCoordinate(formatPosition);
  };

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      ref={mapRef}
      style={{ height: "50vh", width: "50vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}></Marker>
      <HandleMapClick onClickFunction={onClick} />
    </MapContainer>
  );
}

export default Map;

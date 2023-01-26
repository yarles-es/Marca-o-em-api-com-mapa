import React from "react";
import verde from "../icones/verde.png";
import vermelho from "../icones/vermelho.png";

function LocationMarker({ Marker, Popup, newPositions, icon }) {
  const iconVerde = icon({
    iconUrl: verde,
    iconSize: [20, 20],
    iconAnchor: [20, 20],
  });
  const iconVermelho = icon({
    iconUrl: vermelho,
    iconSize: [20, 20],
    iconAnchor: [20, 20],
  });
  const markers = newPositions.map((position) => (
    <Marker
      position={position.geo}
      icon={position.online ? iconVerde : iconVermelho}
    >
      <Popup>You are here</Popup>
    </Marker>
  ));
  return markers;
}

export default LocationMarker;

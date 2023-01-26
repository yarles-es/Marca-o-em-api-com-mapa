import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import LocationMarker from "./components/LocationMarker";
import "./App.css";

function App() {
  const [position, setPosition] = useState(null);
  const [newPositions, setNewPositions] = useState([]);
  const [inputLatLong, setInputLatLong] = useState("");
  const [inputStatus, setInputState] = useState({
    offline: false,
    online: false,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  const inputChange = ({ target }) => {
    const { name, value } = target;
    if (name === "state") {
      setInputState({ [value]: target.checked });
    }
    if (name === "inputLatLong") setInputLatLong(value);

  };

  const applyButton = () => {
    if (!inputStatus.offline && !inputStatus.online && !inputLatLong)
      return alert("É nescessario que todos os dados estejam preenchidos");
    if (!inputStatus.offline && !inputStatus.online)
      return alert("é nescessario que escolha Offline ou Online");
    if (!inputLatLong) return alert("coordenadas não podem ficar vazias");
    const arrayLongLat = inputLatLong.split(",");
    if(arrayLongLat.length !== 2)
      return alert('Coordenadas digitadas de maneira incorreta');
    setNewPositions([
      ...newPositions,
      { ...inputStatus, geo: [...arrayLongLat] },
    ]);
    setInputLatLong("");
    setInputState({ offline: false, online: false });
  };

  return (
    <div className="map">
      <input
        type="text"
        placeholder="Longitude , latitude"
        name="inputLatLong"
        onChange={inputChange}
      />
      <form>
        <label htmlFor="off">
          <input
            checked={inputStatus.offline}
            onChange={inputChange}
            type="radio"
            id="off"
            name="state"
            value="offline"
          />
          Offline
        </label>
        <label htmlFor="on">
          <input
            checked={inputStatus.online}
            onChange={inputChange}
            type="radio"
            id="on"
            name="state"
            value="online"
          />
          Online
        </label>
      </form>
      <button onClick={applyButton}>Criar Ponto</button>
      {position && (
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={false}
          className="map-square"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            Marker={Marker}
            Popup={Popup}
            newPositions={newPositions}
            icon={icon}
          />
        </MapContainer>
      )}
    </div>
  );
}

export default App;

// -41.0589677, -41.056779 -0.0021887

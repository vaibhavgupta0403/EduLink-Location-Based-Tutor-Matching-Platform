import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import { useState, useRef, useCallback } from "react";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiY29kZWxvdmVyNDY1NSIsImEiOiJja3l3dXZ1bmswYzY4MnFxaWZuMzB6bzJ2In0.fc8OZYG7p6jsuXHo5domPA";

class Map extends React.Component {
  async giveadd(lat, long) {
    let add = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1IjoiY29kZWxvdmVyNDY1NSIsImEiOiJja3l3dXZ1bmswYzY4MnFxaWZuMzB6bzJ2In0.fc8OZYG7p6jsuXHo5domPA`
    );
    if (!add.ok) {
      alert("pleas select some location and click submit button ");
      alert(add.status);
    } else {
      const yoyo = add.json();
      yoyo.then((data) => {
        console.log(data.features[0].geometry.coordinates[0]);
        console.log(data.features[0].place_name);
        localStorage.setItem("add", data.features[0].place_name);
        window.location = "/Homepage";
      });
    }
  }

  handleclick(view) {
    localStorage.setItem("latitude", view.latitude);
    localStorage.setItem("longitude", view.longitude);
    let add = this.giveadd(view.latitude, view.longitude);
  }

  render() {
    return (
      <div className="Mappopup">
        <h1>SELECT THE LOCATION WHERE YOU WANT TO SEARCH TUTORS</h1>
        <div className="Map">
          <Mappopup onclick={(view) => this.handleclick(view)} />
        </div>
      </div>
    );
  }
}

const Mappopup = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 26.9124,
    longitude: 75.7873,
    zoom: 8,
  });

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },

    [handleViewportChange]
  );

  return (
    <>
      <button
        type="button"
        style={{ display: "flex" }}
        onClick={() => props.onclick(viewport)}
      >
        SUBMIT TO FINALIZE LOCATION
      </button>
      <div style={{ height: "70vh" }}>
        <MapGL
          ref={mapRef}
          {...viewport}
          width="100%"
          height="95%"
          mapStyle="mapbox://styles/codelover4655/ckyykqauo000j14qo4cpkinbu"
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
        </MapGL>
      </div>
    </>
  );
};

export default Map;

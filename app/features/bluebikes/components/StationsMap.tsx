import React, { useRef, useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { Stations } from "app/models/bluebikes/stations.server";

type Props = {
  mapboxToken: string;
  stations: Stations;
};

const StationsMap = ({ mapboxToken, stations }: Props) => {
  const [lng, setLng] = useState(-71.1097);
  const [lat, setLat] = useState(42.3736);
  const [zoom, setZoom] = useState(12);

  return (
    <div>
      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: zoom,
        }}
        style={{ width: "100%", height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxToken}
      >
        {stations.map((station) => {
          return (
            <Marker
              longitude={station.longitude}
              latitude={station.latitude}
              anchor="center"
            >
              <svg width={10} height={10}>
                <circle r={5} fill="lightblue" stroke="black" cx={5} cy={5} />
              </svg>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
};

export default StationsMap;

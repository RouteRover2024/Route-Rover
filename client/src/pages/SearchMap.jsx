import { useState } from "react";
//import MapHeader from "@/components/MapHeader";
 import Map from "./Map";
// import List from "./List";
// import { getPlacesData } from "@/api";
// import { Helmet } from "react-helmet";

const SearchMap = () => {
 
  const [coordinates, setCoordinates] = useState({lat:0, lng:0});

  return (
    <div className="flex justify-center items-center w-screen h-screen max-w-screen max-h-screen relative">
     <Map setCoordinates={setCoordinates} coordinates={coordinates} />
    </div>
  );
};

export default SearchMap;

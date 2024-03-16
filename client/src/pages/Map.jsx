import PropTypes from 'prop-types';
import GoogleMapReact from "google-map-react";

const Map = ({ coordinates }) => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
      
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={10}
                margin={[50, 50, 50, 50]}
                options={{}}
                onChange={() => { }}
                onChildClick={() => { }}
            />
        </div>
    );
};

Map.propTypes = {
    coordinates: PropTypes.object.isRequired,
    setCoordinates: PropTypes.func.isRequired,
};

export default Map;

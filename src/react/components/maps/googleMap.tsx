import marker from "../../../assets/img/marker.png";
import GoogleMapReact from "google-map-react";
import React from "react";

const GoogleMapsMarker = (props: any) => <div><img className="marker" src={marker} alt="marker"/></div>;

interface GoogleMapsProps {
    lat: number;
    lon: number;
}

export const GoogleMaps = (props: GoogleMapsProps) => {
    return (
        // Important! Always set the container height explicitly
        <div style={{height: "225px", width: "100%"}} className="map">
            <GoogleMapReact
                yesIWantToUseGoogleMapApiInternals
                bootstrapURLKeys={{key: "AIzaSyCFghWiQ6YR9gvIn572y9yTD49K3igUeiI"}}
                defaultCenter={{lat: props.lat, lng: props.lon}}
                defaultZoom={15}
            >
                <GoogleMapsMarker
                    position={{
                        lat: props.lat,
                        lng: props.lon
                    }}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
};
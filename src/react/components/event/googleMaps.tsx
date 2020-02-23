import React from 'react';
import GoogleMapReact from 'google-map-react';

export const GoogleMaps = () => {
    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };
    return (
        // Important! Always set the container height explicitly
        <div style={{height: '225px', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyCFghWiQ6YR9gvIn572y9yTD49K3igUeiI'}}
                defaultCenter={{lat: 10, lng: -10}}
                defaultZoom={8}
            >
            </GoogleMapReact>
        </div>
    );
};

export default GoogleMaps;
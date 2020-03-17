import React from 'react';
import Event from './../../models/event.model';
import ShareIcon from "@material-ui/icons/Share";
import ClockIcon from "@material-ui/icons/AccessTime";
import LocationIcon from "@material-ui/icons/LocationOn";
import placeholder1 from "../../../assets/img/placeholder_item.png";
import placeholder2 from "../../../assets/img/placeholder_person.jpg";
import GoogleMapReact from "google-map-react";
import {getDateTimeString, getTimeString} from "../../util/common";

const event: Event = {
    title: 'Lorem Ipsum',
    rating: 5,
    description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br/><br/>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>`,
    address1: '20 W 34th St',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    zip: '10001',
    lat: 40.7498443802915,
    lon: -73.98506271970849,
    startTime: new Date('March 23, 2020 14:00:00'),
    datePosted: new Date()
};

export const ViewEvent = () => {
    return (
        <main className="event">
            <EventTitle event={event}/>
            <EventInformation event={event}/>
            <EventDetails event={event}/>
            <EventAttendees/>
        </main>
    )
};

export default ViewEvent;

interface EventProps {
    event: Event;
}

const EventTitle = (props: EventProps) => {

    return (
        <section className="paper elevation-3 title">
            <h5 className="">{getDateTimeString(props.event.startTime)}</h5>
            <h1>Speed Networking & Business MatchMaking: Fastest Way to Expand Your Network</h1>
            <div className="member-share">
                <div className="member">
                    <div className="image">
                        <img src={placeholder2} alt="profile_image"/>
                    </div>
                    <div className="details">
                        <h3>Google Events</h3>
                        <span>100 Followers</span>
                    </div>
                </div>
                <div className="share">
                    <button className="outline-button"><ShareIcon/>Share</button>
                </div>
            </div>
        </section>
    )
};

const EventInformation = (props: EventProps) => {
    return (
        <section className="paper elevation-3 information">
            <div className="info">
                <div className="icon">
                    <ClockIcon/>
                </div>
                <div className="text">
                    <p>{getDateTimeString(props.event.startTime)}{getTimeString(props.event.startTime)}</p>
                </div>
            </div>
            <div className="info">
                <div className="icon">
                    <LocationIcon/>
                </div>
                <div className="text">
                    <p>23 W 33rd St, New York, NY 10118, USA</p>
                </div>
            </div>
            <div className="map">
                <GoogleMaps event={event}/>
            </div>
        </section>
    );
};


interface MarkerProps {
    text: string;
    lat: number;
    lng: number;
}

const Marker = ({text}: any) => <div>{text}</div>;
const GoogleMaps = (props: EventProps) => {

    const geolocationUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCFghWiQ6YR9gvIn572y9yTD49K3igUeiI";

    const defaultProps = {
        center: {
            lat: 40.7484405,
            lng: -73.98566439999999
        },
        zoom: 5
    };
    return (
        // Important! Always set the container height explicitly
        <div style={{height: '225px', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyCFghWiQ6YR9gvIn572y9yTD49K3igUeiI"}}
                defaultCenter={{lat: props.event.lat, lng: props.event.lon}}
                defaultZoom={15}
            >
                <Marker
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
};

const EventDetails = (props: EventProps) => {
    return (
        <section className="paper elevation-3 details">
            <div className="image">
                <img src={placeholder1} alt="event_image"/>
            </div>
            <div className="text">
                <h2>Details</h2>
                <div dangerouslySetInnerHTML={{__html: props.event.description}}/>
            </div>
        </section>
    )
};

export const EventAttendees = () => {
    return (
        <section>
            <div className="paper elevation-3 attendees-title">
                <h2>Attendees (12)</h2>
                <a>See all</a>
            </div>
            <div className="attendees-list">
                <Attendee/>
                <Attendee/>
            </div>
        </section>
    )
};

export const Attendee = () => {
    return (
        <div className="attendee paper elevation-3">
            <div className="image">
                <img src={placeholder2} alt="profile_image"/>
            </div>
            <h3>Jason Efthimiou</h3>
            <h4>100 followers</h4>
        </div>
    )
};
import React from "react";
import ShareIcon from "@material-ui/icons/Share";
import placeholder from "../../../assets/img/placeholder_person.jpg";

export const EventTitle = () => {
    return (
        <section className="paper elevation-3 title">
            <h5 className="">Monday, February 3, 2020</h5>
            <h1>Speed Networking & Business MatchMaking: Fastest Way to Expand Your Network</h1>
            <div className="member-share">
                <div className="member">
                    <div className="image">
                        <img src={placeholder} alt="profile_image"/>
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

export default EventTitle;
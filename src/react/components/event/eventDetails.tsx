import React from 'react';

export const EventDetails = () => {
    return (
        <section className="paper elevation-3 details">
            <div className="image">
                <img src="" alt="event_image"/>
            </div>
            <div className="text">
                <h2>Details</h2>
                <p>
                    Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard
                    dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and
                    scrambled it to make a type specimen
                    book.
                    <br/><br/>
                    It has survived not only five centuries, but
                    also the leap into electronic typesetting,
                    remaining essentially unchanged.
                </p>
            </div>
        </section>
    )
};

export default EventDetails;
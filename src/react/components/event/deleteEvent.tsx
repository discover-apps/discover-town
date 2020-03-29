import React, {useState} from 'react';
import {Event} from '../../models/event.model';
import {deleteEventRecord} from "../../api/event.api";
import {useHistory} from 'react-router-dom';
import {CircularProgress} from "@material-ui/core";

interface DeleteEventProps {
    event: Event;
    setDeleting: any;
}

export const DeleteEvent = (props: DeleteEventProps) => {

    const history = useHistory();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const clickCancel = () => {
        props.setDeleting(false);
    };

    const clickDelete = () => {
        setLoading(true);
        deleteEventRecord(props.event).then((message: string) => {
            // Redirect to user profile
            history.push('/user');
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    return <div className="delete-event-container">
        <div className="delete-event paper elevation-3">
            <h1>Are you sure you want to delete this event?</h1>
            <p>The following actions will take place:</p>
            <ul>
                <li>All event information will be permanently deleted.</li>
                <li>All event attendees will be removed from the event.</li>
            </ul>
            <div className="buttons">
                <button onClick={() => clickCancel()} className="outline-button">Cancel</button>
                {!loading ? <button onClick={() => clickDelete()} className="danger-button">Delete</button> :
                    <button type="button"><CircularProgress size={18}/></button>}
            </div>
            {error ? <p className="error">{error}</p> : ''}
        </div>
    </div>
};
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {createEventRecord, searchPlaces} from "../../api/event.api";
import {SearchResult} from "../../models/searchResult.model";
import Event from '../../models/event.model';
import {CircularProgress} from "@material-ui/core";
import {useHistory} from 'react-router-dom';

export const CreateEvent = () => {

    const history = useHistory();
    const [error, setError] = useState('');
    const [event, setEvent] = useState<Event>({
        title: '',
        description: '',
        address_name: '',
        address_location: '',
        lat: 0,
        lon: 0,
        dateStart: new Date(),
        datePosted: new Date()
    });
    const [loading, setLoading] = useState<boolean>(false);

    const postEvent = () => {
        // clear error
        setError('');
        // lock controls
        setLoading(true);
        // send event object to server
        createEventRecord(event).then((event: Event) => {
            // TODO: redirect to created event
            history.push('/');
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.persist();
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }
        postEvent();
    };

    return (
        <main className="create-event">
            <form onSubmit={onSubmit}>
                <input type="text"
                       id="title"
                       name="title"
                       placeholder="Event title"
                       onChange={onChange}
                       required
                />
                <input type="file"
                       id="imageUrl"
                       name="imageUrl"
                       placeholder="Upload an image"
                       onChange={onChange}
                       disabled
                />
                <textarea
                    id="description"
                    name="description"
                    placeholder="Event description"
                    onChange={onChange}
                    required
                />
                <input type="datetime-local"
                       id="dateStart"
                       name="dateStart"
                       placeholder="Search places"
                       onChange={onChange}
                       required
                />
                <input type="text"
                       id="address_name"
                       name="address_name"
                       placeholder="Location name (e.g. Central Park)"
                       value={event.address_name}
                       onChange={onChange}
                       required
                />
                <input type="text"
                       id="address_location"
                       name="address_location"
                       placeholder="Location address"
                       value={event.address_location}
                       onChange={onChange}
                       required
                />
                {!loading ? <button type="submit">Create event</button> :
                    <button type="button"><CircularProgress size={18}/></button>}
                {error ? <p className="error">{error}</p> : ''}
            </form>
            <SearchPlace event={event} setEvent={setEvent}/>
        </main>
    )
};

interface SearchPlace {
    event: Event;
    setEvent: any;
}

const SearchPlace = (props: SearchPlace) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const postSearch = () => {
        setLoading(true);
        searchPlaces(search).then((results) => {
            setResults(results);
        }).finally(() => {
            setLoading(false);
        });
    };
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setSearch(e.target.value);
    };
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }
        postSearch();
    };
    const clickResult = (result: SearchResult) => {
        props.setEvent({
            ...props.event,
            address_name: result.name,
            address_location: result.formatted_address,
            lat: result.lat,
            lon: result.lon
        });
    };
    return (
        <form onSubmit={onSubmit}>
            <div className="search-places">
                <input type="text"
                       id="place"
                       name="place"
                       placeholder="Search places"
                       onChange={onChange}
                />
                {!loading ? <button type="submit">Search</button> :
                    <button type="button"><CircularProgress size={18}/></button>}
            </div>
            <div className="search-results">
                {
                    results.map((r, i) =>
                        <div key={i} className="result" onClick={() => clickResult(r)}>
                            <h3>{r.name}</h3>
                            <p>{r.formatted_address}</p>
                        </div>
                    )
                }
            </div>
        </form>
    )
};
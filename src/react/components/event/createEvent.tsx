import React, {ChangeEvent, FormEvent, useState} from 'react';
import {createEventRecord, searchPlaces} from "../../api/event.api";
import {SearchResult} from "../../models/searchResult.model";
import Event from '../../models/event.model';

export const CreateEvent = () => {

    const [error, setError] = useState('');
    const [event, setEvent] = useState<Event>({
        title: '',
        description: '',
        location_name: '',
        location_address: '',
        lat: 0,
        lon: 0,
        startTime: new Date(),
        datePosted: new Date()
    });

    const postEvent = () => {
        // clear error
        setError('');
        // send event object to server
        createEventRecord(event).then((result: string) => {
            console.log(result);
        }).catch((error) => {
            setError(error);
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
                       id="image"
                       name="image"
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
                <input type="date"
                       id="date"
                       name="date"
                       placeholder="Search places"
                       onChange={onChange}
                       required
                />
                <input type="text"
                       id="location_name"
                       name="location_name"
                       placeholder="Location name (e.g. Jason's apartment)"
                       value={event.location_name}
                       onChange={onChange}
                       required
                />
                <input type="text"
                       id="location_address"
                       name="location_address"
                       placeholder="Location address"
                       value={event.location_address}
                       onChange={onChange}
                       required
                />
                <button>Create event</button>
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
    const postSearch = () => {
        console.log('Submitting query', search);
        searchPlaces(search).then((results) => {
            setResults(results);
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
            location_name: result.name,
            location_address: result.formatted_address,
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
                <button type="submit">Search</button>
            </div>
            <div className="search-results">
                {/*TODO: Add spinny thing here*/}
                {
                    results.map(r =>
                        <div className="result" onClick={() => clickResult(r)}>
                            <h3>{r.name}</h3>
                            <p>{r.formatted_address}</p>
                        </div>
                    )
                }
            </div>
        </form>
    )
};
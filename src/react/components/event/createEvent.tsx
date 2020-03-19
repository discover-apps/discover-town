import React, {ChangeEvent, FormEvent, useState} from 'react';
import {searchPlaces} from "../../api/event.api";
import {SearchResult} from "../../models/searchResult.model";

export const CreateEvent = () => {

    const [error, setError] = useState('');
    const [event, setEvent] = useState<Event>(undefined);

    const postEvent = () => {
        // clear error
        setError('');
        // send event object to server
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
                <button>Create event</button>
            </form>
            <SearchPlace/>
        </main>
    )
};

const SearchPlace = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const postSearch = () => {
        console.log('Submitting query', search);
        searchPlaces(search).then((results) => {
            setResults(results);
            console.log(results);
        });
        // receive result query
        // set results array
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
    return (
        <form onSubmit={onSubmit}>
            <div className="search-places">
                <input type="text"
                       id="place"
                       name="place"
                       placeholder="Search places"
                       onChange={onChange}
                       required
                />
                <button type="submit">Search</button>
            </div>
            <div className="search-results">
                {
                    results.map(r =>
                        <div className="result">
                            <h3>{r.name}</h3>
                            <p>{r.formatted_address}</p>
                        </div>
                    )
                }
                {/*<div className="result">*/}
                {/*    <h3>Empire State Building</h3>*/}
                {/*    <p>20 W 34th St, New York, NY 10001, United States</p>*/}
                {/*</div>*/}
                {/*<div className="result">*/}
                {/*    <h3>Empire State Building</h3>*/}
                {/*    <p>20 W 34th St, New York, NY 10001, United States</p>*/}
                {/*</div>*/}
            </div>
        </form>
    )
};
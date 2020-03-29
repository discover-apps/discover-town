import React from 'React';
import {Event} from "../../models/event.model";
import {ChangeEvent, useState} from "react";
import {SearchResult} from "../../models/searchResult.model";
import {searchPlaces} from "../../api/event.api";
import {CircularProgress} from "@material-ui/core";

interface SearchPlace {
    event: Event;
    setEvent: any;
}

export const SearchPlace = (props: SearchPlace) => {
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
    const clickSearch = () => {
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
        setResults([]);
        setSearch("");
    };
    return (
        <div className="search-places">
            <hr/>
            <form onSubmit={clickSearch}>
                <div className="search-input">
                    <input type="text"
                           id="place"
                           name="place"
                           placeholder="Search places"
                           value={search}
                           onChange={onChange}
                    />
                    {!loading ? <button type="button" onClick={clickSearch}>Search</button> :
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
            <hr/>
        </div>
    )
};
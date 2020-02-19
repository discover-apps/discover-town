import React from 'react';

interface Props {
    showMore: any;
}

export const ShowMore = (props: Props) => {
    return (
        <article className="paper elevation-3 show-more" onClick={props.showMore}>
            <h3>Show More</h3>
        </article>
    )
};

export default ShowMore;
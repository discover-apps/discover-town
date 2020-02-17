import React from 'react';
import {render, unmountComponentAtNode} from "react-dom";
import {act} from 'react-dom/test-utils';

import App from './app';

let container: HTMLDivElement | null = null;
beforeEach(() => {
    // setup DOM element as render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('renders with an h1 with some text', () => {
    act(() => {
        render(<App/>, container);
    });
    const h1 = container.children[0].children[0].children[0];
    expect(h1.tagName).toBe("H1");
    expect(h1.textContent).toBe("Welcome to React-Typescript!");
});

it('renders an image with some alt text', () => {
    act(() => {
        render(<App/>, container);
    });
    const img = container.children[0].children[0].children[1];
    expect(img.tagName).toBe("IMG");
    expect(img.attributes.getNamedItem("alt").value).toBe("react_logo");
});
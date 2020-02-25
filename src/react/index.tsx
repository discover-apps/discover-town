import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app';
import reducer from './store/reducers/_index.reducer';

const store = createStore(reducer);

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App/>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render();

if ((module as any).hot) {
    (module as any).hot.accept('./components/app');
}
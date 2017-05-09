import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import state from './state';
import MainContainer from './containers/MainContainer';


class App extends React.Component {
    constructor() {
        super();
        this.store = state.setupStore(state.rootStore);
    }

    render() {
        return (
            <Provider store={this.store}>
                <MainContainer />
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#sa-app-container'));
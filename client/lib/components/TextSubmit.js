import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';


class TextSubmit extends React.Component {

    constructor() {
        super();
        this.state = {
            input: ''
        }
    }

    onInputChange(event) {
        this.setState({ input: _.get(event, 'target.value') });
    }

    onInputSubmit() {
        this.props.onSubmit(this.state.input);
    }

    render() {
        return (
            <div className="uk-margin-top">
                
                <textarea 
                    className="uk-textarea"
                    onChange={this.onInputChange.bind(this)}>
                </textarea>

                <button className="uk-button uk-button-primary"
                        onClick={this.onInputSubmit.bind(this)}>
                    Submit RAW csv
                </button>

            </div>
        );
    }
}

TextSubmit.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default TextSubmit;
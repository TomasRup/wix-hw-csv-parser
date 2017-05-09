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
                <fieldset className="uk-fieldset">

                    <div>
                        <textarea
                            className="uk-textarea uk-form-width-large"
                            rows="5"
                            onChange={this.onInputChange.bind(this)}>
                        </textarea>
                    </div>

                    <div>
                        <button className="uk-button uk-button-primary uk-form-width-large"
                                onClick={this.onInputSubmit.bind(this)}>
                            {this.props.submitText}
                        </button>
                    </div>

                </fieldset>
            </div>
        );
    }
}

TextSubmit.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired
};

export default TextSubmit;
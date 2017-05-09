import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import state from '../state';
import Table from '../components/Table';
import TextSubmit from '../components/TextSubmit';


class MainContainer extends React.Component {

    render() {
        return (
            <div className="sa-main-container uk-position-center">

                <TextSubmit
                    onSubmit={this.props.csvActions.submitRawCsv}
                    submitText={`Submit raw CSV`} />

                <p className="uk-text-danger">{this.props.csv.parsingError}</p>

                <Table
                    title={`Parsed CSV data`}
                    data={this.props.csv.parsedTable} />

            </div>
        );
    }
}

const mapStateToProps = mappedState => ({
    csv: mappedState.csv
});

const mapDispatchToProps = dispatch => ({
    csvActions: bindActionCreators(state.actions.csv, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
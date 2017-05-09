import React from 'react';
import PropTypes from 'prop-types';


class Table extends React.Component {

    render() {
        const rows = this.props.data
            ? this.props.data.map((row, rowIndex) => {
                const columns = row
                    ? row.map((column, columnIndex) => (<td key={columnIndex}>{column}</td>))
                    : null
                return (<tr key={rowIndex}>{columns}</tr>);
            })
            : null;

        return (
            <table className="uk-margin-top uk-table uk-table-divider">
                <caption>{this.props.title}</caption>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

Table.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string.isRequired
};

export default Table;
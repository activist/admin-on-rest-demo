import React, { PropTypes } from 'react';

import Checkbox from 'material-ui/Checkbox';

export default class ColumnPicker extends React.Component {

    constructor(props) {
        super(props);
        this.onCheck = this.onCheck.bind(this);
    }

    onCheck(column, isChecked) {
        return this.props.onCheckboxChanged(column, isChecked);
    }

    renderCheckbox(column, onCheck) {
        const disabled = (column.source === 'id');
        return (<Checkbox key={column.source} label={column.source.toUpperCase()} onCheck={(event, checked) => onCheck(column, checked)} defaultChecked disabled={disabled} />);
    }

    render() {
        const columns = this.props.columns || [];

        return (
            <div className="column-picker">
                {columns.map((column) => {
                    return this.renderCheckbox(column, this.onCheck);
                })}
            </div>
        );
    }
}

ColumnPicker.propTypes = {
    columns: PropTypes.any,
    onCheckboxChanged: PropTypes.func.isRequired,
};

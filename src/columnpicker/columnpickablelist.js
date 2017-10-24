import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, Datagrid } from 'admin-on-rest';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import ColumnPicker from './columnpicker';

import { toggleColumnPickerStatusAction, initializeColumnPickerAction } from './actions';

export class ColumnPickableList extends React.Component {

    constructor(props) {
        super(props);

        this.state  = {
            open: false,
        };
    }

    componentWillMount() {
        let columnSourceNames = [];
        if (this.props.children) {
            columnSourceNames = React.Children.map(this.props.children, (child) => {
                return ({ source: child.props.source, checked: true });
            });
        }
        const columnsDisplayed = columnSourceNames.filter((column) => column.source);
        this.props.initializeColumnPicker(this.props.resource, columnsDisplayed);
    }

    /*
    shouldComponentUpdate(nextProps) {
        const diff = nextProps.columnsDisplayed.filter((currentColumn) => {
            return !this.props.columnsDisplayed.some((prevColumn) => {
                return currentColumn.source === prevColumn.source && currentColumn.checked === prevColumn.checked;
            });
        });

        return diff.length > 0;
    }
    */

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    removeHiddenColumns(children) {
        return React.Children.map(children, (child) => {
            if (!child.props.source) {
                return child;
            }
            const column = this.props.columnsDisplayed.find((columnDisplayed) => {
                return columnDisplayed.source === child.props.source;
            });

            if (this.props.columnsDisplayed.length === 0 || (column && column.checked)) {
                return child;
            }
            return null;
        });
    }

    render() {
        const { children, ...rest } = this.props;
        const childrenToRender = this.removeHiddenColumns(children);

        return (
            <div className="columnpickable-list">
                <FlatButton label="Hide columns" secondary onClick={this.handleTouchTap}/>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    style={{ padding: '1rem' }}
                >
                    <ColumnPicker columns={this.props.columnsDisplayed} onCheckboxChanged={this.props.handleCheckboxChanged} />
                </Popover>
                <Datagrid {...rest}>
                    {childrenToRender}
                </Datagrid>
            </div>
        );
    }
}

ColumnPickableList.propTypes = {
    resource: PropTypes.string,
    columnsDisplayed: PropTypes.array,
    children: PropTypes.node,
    initializeColumnPicker: PropTypes.func,
    handleCheckboxChanged: PropTypes.func,
};

ColumnPickableList.defaultProps = {
    columnsDisplayed: [],
};


function mapStateToProps(state) {
    return {
        columnsDisplayed: state.columnsDisplayed || [],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initializeColumnPicker: (resource, columns) => dispatch(initializeColumnPickerAction(resource, columns)),
        handleCheckboxChanged: (column) => dispatch(toggleColumnPickerStatusAction(column)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnPickableList);

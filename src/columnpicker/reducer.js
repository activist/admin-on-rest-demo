import { actions } from './actions';

function columnPickerReducer(state = [], action) {
    switch (action.type) {
        case actions.INIT_COLUMNPICKER: {
            console.log('Init columnopicker reducer');
            return action.columns;
        }
        case actions.TOGGLE_COLUMNPICKER_STATUS: {
            const columns = state.map((column) => {
                if (column.source === action.column.source) {
                    return { ...column, checked: !column.checked };
                }
                return column;
            });
            return columns;
        }
        default:
            return state;
    }
}

export default columnPickerReducer;
export const actions = {
    INIT_COLUMNPICKER: 'INIT_COLUMNPICKER',
    TOGGLE_COLUMNPICKER_STATUS: 'UPDATE_COLUMNPICKER_STATUS',
    UPDATE_COLUMNPICKER_STATUSES: 'UPDATE_COLUMNPICKER_STATUSES',
}


export function initializeColumnPickerAction(resource, columns) {
    return {
        type: actions.INIT_COLUMNPICKER,
        columns,
        meta: { resource },
    };
}


export function toggleColumnPickerStatusAction(column) {
    return {
        type: actions.TOGGLE_COLUMNPICKER_STATUS,
        column,
    };
}
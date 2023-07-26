import MaterialTable from 'material-table';
import React, { useEffect } from 'react';

const TablaClientesComponent = (props) => {
    const title = props.title;
    const columns = props.columns;
    const data = props.data;
    const actions = props.actions;
    const options = props.options || {
        actionsColumnIndex: -1
    };
    const localization = props.localization || {};

    useEffect(() => {

    }, []);



    return (
        <>
            <MaterialTable
                title={title}
                columns={columns}
                data={data}
                actions={actions}
                options={options}
                localization={localization}
            />
        </>
    )
}

export default TablaClientesComponent;
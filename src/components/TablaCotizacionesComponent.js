import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';

const TablaCotizacionesComponent = (props) => {

    return (
        <>
            {
                props.title === "Abiertas" && (
                    <div className="text-right">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={props.handleClickOpenNuevaCotizacion}
                        >
                            Agregar Cotización
                        </Button>
                        <br />
                        <br />
                    </div>
                )
            }

            <MaterialTable
                title={props.title}
                columns={props.columns}
                data={props.data}
                actions={props.actions}
                options={{
                    actionsColumnIndex: -1,
                    sorting: true
                }}
            />
        </>
    )
}

export default TablaCotizacionesComponent;
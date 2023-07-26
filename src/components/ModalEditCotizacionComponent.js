import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormNuevaCotizacionComponent from './FormNuevaCotizacionComponent';

const ModalEditCotizacionComponent = (props) => {
    const user = props.user;
    const open = props.openModal;
    const handleClose = props.handleClose;
    const tableData = props.tableData;
    const setTableData = props.setTableData;
    const cotizacionSelected = props.cotizacionSelected;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth={'md'}
            >
                <DialogTitle id="alert-dialog-title">{"Editar Cotización"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormNuevaCotizacionComponent
                            user={user}
                            cancelFunction={handleClose}
                            tableData={tableData}
                            setTableData={setTableData}
                            cotizacionSelected={cotizacionSelected}
                        />
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions> */}
                {/* <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
                    </Button> */}


                {/* <Button type="button" variant="outlined" color="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>

                    <Button type="button" variant="contained" color="primary" autoFocus>
                        Registro
                    </Button> */}

                {/* </DialogActions> */}
            </Dialog>
        </div>
    );
}

export default ModalEditCotizacionComponent;
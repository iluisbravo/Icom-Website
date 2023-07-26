import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormEditClienteComponent from './FormEditClienteComponent';

const ModalEditClienteComponent = (props) => {

    const open = props.openModal;
    const handleClose = props.handleClose;
    const setClienteSelected = props.setClienteSelected;
    const clienteSelected = props.clienteSelected;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Detalle Cliente"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormEditClienteComponent handleClose={handleClose} clienteSelected={clienteSelected} setClienteSelected={setClienteSelected} isAdmin={true} />
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

export default ModalEditClienteComponent;
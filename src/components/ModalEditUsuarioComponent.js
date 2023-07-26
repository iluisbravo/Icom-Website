import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormMiPerfilComponent from './FormMiPerfilComponent';

const ModalNuevoUsuarioComponent = (props) => {

    const open = props.openModal;
    const handleClose = props.handleClose;
    const setUserSelected = props.setUserSelected;
    const userSelected = props.userSelected;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Detalle Usuario"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormMiPerfilComponent handleClose={handleClose} userSelected={userSelected} setUserSelected={setUserSelected} isAdmin={true} />
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

export default ModalNuevoUsuarioComponent;
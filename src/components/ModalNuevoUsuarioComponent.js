import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormNuevoUsuarioComponent from './FormNuevoUsuarioComponent';

const ModalNuevoUsuarioComponent = (props) => {
    const open = props.openModal;
    const handleClose = props.handleClose;

    const users = props.users || [];
    const setUsers = props.setUsers;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Nuevo Usuario"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormNuevoUsuarioComponent users={users} setUsers={setUsers} cancelFunction={handleClose} />
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
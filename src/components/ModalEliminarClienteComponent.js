import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormNuevoUsuarioComponent from './FormNuevoUsuarioComponent';
import ClientesServices from '../services/ClientesServices';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    paddingDialogAction: {
        padding: "24px !important"
    }
}));

const Styles = styled.div` 

`;

const ModalEliminarClienteComponent = (props) => {
    const classes = useStyles();
    const functionModalEliminar = props.functionModalEliminar;
    const open = props.openModal;
    const handleClose = props.handleClose;
    const clienteSelected = props.clienteSelected;
    const setClienteSelected = props.setClienteSelected;

    const [loading, setLoading] = React.useState(false);

    const onOffCliente = async () => {
        setLoading(true);
        const onOffUserResult = await ClientesServices.onOffClientes({ id: clienteSelected.id, activo: !clienteSelected.activo });
        if (onOffUserResult.status === 200) {
            clienteSelected.activo = !clienteSelected.activo;
            setClienteSelected(clienteSelected);
            handleClose();
        }
        setLoading(false);
    }

    return (
        <Styles>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{functionModalEliminar === "Activar" ? "Activar Cliente" : "Eliminar Cliente"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <p>¿Esta seguro que desea {functionModalEliminar === "Activar" ? "activar" : "eliminar"} al cliente {clienteSelected?.nombre}?</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.paddingDialogAction}>
                        <Button type="button" variant="outlined" color="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>

                        <Button type="button" variant="contained" color="primary" autoFocus onClick={onOffCliente} disabled={loading}>
                            {functionModalEliminar === "Activar" ? "Activar" : "Eliminar"}
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        </Styles>
    );
}

export default ModalEliminarClienteComponent;
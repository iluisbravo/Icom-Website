import MaterialTable from 'material-table';
import React, { useEffect } from 'react';
import UserServices from '../services/UsersServices';
import ModalEliminarClienteComponent from './ModalEliminarClienteComponent';
import ModalNuevoClienteComponent from './ModalNuevoClienteComponent';
import ModalEditClienteComponent from './ModalEditClienteComponent';
import TablaClientesComponent from './TablaClientesComponent';
import CheckIcon from '@material-ui/icons/Check';
import ClientesServices from '../services/ClientesServices';
import moment from 'moment';
import 'moment/locale/es';

const SeccionClientesComponent = (props) => {
    const auth = props.auth;
    const userAuth = auth.user;

    const [openModal, setOpenModal] = React.useState(false);
    const [openModalEditar, setOpenModalEditar] = React.useState(false);
    const [openModalEliminar, setOpenModalEliminar] = React.useState(false);
    const [functionModalEliminar, setFunctionModalEliminar] = React.useState("");

    const [clienteSelected, setClienteSelected] = React.useState(false);
    const [clientes, setClientes] = React.useState([]);

    const setNuevoClienteClic = props.setNuevoClienteClic;

    useEffect(() => {
        getClientes();
        setNuevoClienteClic(() => handleClickOpen);
    }, []);

    const getClientes = async () => {
        const usersResult = await ClientesServices.GetClientes();
        console.log(usersResult.data);
        setClientes(usersResult.data);
    }

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleClickOpenActivar = (userData) => {
        setFunctionModalEliminar("Activar");
        setClienteSelected(userData);
        setOpenModalEliminar(true);
    };

    const handleClickOpenEliminar = (userData) => {
        setFunctionModalEliminar("Eliminar");
        setClienteSelected(userData);
        setOpenModalEliminar(true);
    };

    const handleCloseEliminar = () => {
        setOpenModalEliminar(false);
    };

    const handleClickOpenEditar = (userData) => {
        setClienteSelected(userData);
        setOpenModalEditar(true);
    };

    const handleCloseEditar = () => {
        setOpenModalEditar(false);
    };

    return (
        <>
            <ModalEliminarClienteComponent openModal={openModalEliminar} handleClose={handleCloseEliminar} clienteSelected={clienteSelected} setClienteSelected={setClienteSelected} functionModalEliminar={functionModalEliminar} />
            <ModalEditClienteComponent openModal={openModalEditar} handleClose={handleCloseEditar} clienteSelected={clienteSelected} setClienteSelected={setClienteSelected} />
            <ModalNuevoClienteComponent openModal={openModal} handleClose={handleClose} clientes={clientes} setClientes={setClientes} />
            <TablaClientesComponent
                title="Clientes Registrados"
                columns={[
                    { title: 'Id', field: 'id', hidden: true },
                    { title: 'Nombre', field: 'nombre' },
                    {
                        title: 'Fecha Registro', field: 'fechaCreacion', type: 'date',
                        render: (rowData) => { return moment(rowData.fechaCreacion).locale('es').format('DD/MMM/yyyy') }
                    },
                    { title: 'Teléfono', field: 'telefono', type: 'numeric' },
                    { title: 'Correo', field: 'correo' },
                    { title: 'Ciudad', field: 'ubicacion' },
                    { title: 'Activo', field: 'activo', hidden: true },
                ]}
                data={clientes}
                actions={[
                    // {
                    //     icon: 'add',
                    //     tooltip: 'Nuevo Cliente',
                    //     isFreeAction: true,
                    //     onClick: (event) => handleClickOpen()
                    // },
                    rowData => ({
                        icon: 'delete',
                        tooltip: 'Eliminar Cliente',
                        onClick: (event, rowData) => handleClickOpenEliminar(rowData),
                        // disabled: rowData.id === userAuth.attributes.id,
                        hidden: (rowData.id === userAuth.attributes.id || rowData.activo === false)
                    }),
                    rowData => ({
                        icon: () => <CheckIcon />,
                        tooltip: 'Activar Cliente',
                        onClick: (event, rowData) => handleClickOpenActivar(rowData),
                        // disabled: rowData.id === userAuth.attributes.id,
                        hidden: (rowData.id === userAuth.attributes.id || rowData.activo === true)
                    }),
                    rowData => ({
                        icon: 'list',
                        tooltip: 'Detalle Cliente',
                        onClick: (event, rowData) => handleClickOpenEditar(rowData),
                        // disabled: rowData.id === userAuth.attributes.id
                        hidden: rowData.id === userAuth.attributes.id
                    })
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={{
                    header: {
                        actions: "Opciones"
                    }
                }}
            />
        </>
    )
}

export default SeccionClientesComponent;
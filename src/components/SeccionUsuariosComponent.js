import MaterialTable from 'material-table';
import React, { useEffect } from 'react';
import UserServices from '../services/UsersServices';
import ModalEliminarUsuarioComponent from './ModalEliminarUsuarioComponent';
import ModalNuevoUsuarioComponent from './ModalNuevoUsuarioComponent';
import ModalEditUsuarioComponent from './ModalEditUsuarioComponent';
import CheckIcon from '@material-ui/icons/Check';
import moment from 'moment';
import 'moment/locale/es';
import TablaUsuariosComponent from './TablaUsuariosComponent';

const SeccionUsuariosComponent = (props) => {
    
    const auth = props.auth;
    const userAuth = auth.user;

    const [openModal, setOpenModal] = React.useState(false);
    const [openModalEditar, setOpenModalEditar] = React.useState(false);
    const [openModalEliminar, setOpenModalEliminar] = React.useState(false);
    const [functionModalEliminar, setFunctionModalEliminar] = React.useState("");

    const [userSelected, setUserSelected] = React.useState(false);
    const [users, setUsers] = React.useState([]);

    const setNuevoUsuarioClic = props.setNuevoUsuarioClic;

    useEffect(() => {
        getUsers();
        setNuevoUsuarioClic(() => handleClickOpen);
    }, []);

    const getUsers = async () => {
        const usersResult = await UserServices.GetUsers();
        setUsers(usersResult.data.sort((a, b) => b.activo - a.activo));
    }

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleClickOpenActivar = (userData) => {
        setFunctionModalEliminar("Activar");
        setUserSelected(userData);
        setOpenModalEliminar(true);
    };

    const handleClickOpenEliminar = (userData) => {
        setFunctionModalEliminar("Eliminar");
        setUserSelected(userData);
        setOpenModalEliminar(true);
    };

    const handleCloseEliminar = () => {
        setOpenModalEliminar(false);
    };

    const handleClickOpenEditar = (userData) => {
        setUserSelected(userData);
        setOpenModalEditar(true);
    };

    const handleCloseEditar = () => {
        setOpenModalEditar(false);
    };

    return (
        <>
            <ModalEliminarUsuarioComponent openModal={openModalEliminar} handleClose={handleCloseEliminar} userSelected={userSelected} setUserSelected={setUserSelected} functionModalEliminar={functionModalEliminar} />
            <ModalEditUsuarioComponent openModal={openModalEditar} handleClose={handleCloseEditar} userSelected={userSelected} setUserSelected={setUserSelected} />
            <ModalNuevoUsuarioComponent openModal={openModal} handleClose={handleClose} users={users} setUsers={setUsers} />
            <TablaUsuariosComponent
                title="Usuarios Registrados"
                columns={[
                    { title: 'Id', field: 'id', hidden: true },
                    {
                        title: 'Fecha Registro', field: 'fechaRegistro', type: 'date',
                        render: (rowData) => { return moment(rowData.fechaRegistro).locale('es').format('DD/MMM/yyyy HH:mm') }
                    },
                    { title: 'Nombre', field: 'nombre' },
                    { title: 'Apellido', field: 'apellido' },
                    { title: 'Teléfono', field: 'telefono', type: 'numeric' },
                    { title: 'Correo', field: 'correo' },
                    { title: 'Dirección', field: 'direccion', hidden: true },
                    { title: 'Ciudad', field: 'ciudad', hidden: true },
                    { title: 'Tipo Empleado', field: 'tipoUsuario' },
                    { title: 'Activo', field: 'activo', hidden: true },
                ]}
                data={users}
                actions={[
                    // {
                    //     icon: 'add',
                    //     iconProps: { style: { color: "#f05522" } },
                    //     tooltip: 'Nuevo Usuario',
                    //     isFreeAction: true,
                    //     onClick: (event) => handleClickOpen()
                    // },
                    rowData => ({
                        icon: 'delete',
                        tooltip: 'Eliminar Usuario',
                        onClick: (event, rowData) => handleClickOpenEliminar(rowData),
                        // disabled: rowData.id === userAuth.attributes.id,
                        hidden: (rowData.id === userAuth.attributes.id || rowData.activo === false)
                    }),
                    rowData => ({
                        icon: () => <CheckIcon />,
                        tooltip: 'Activar Usuario',
                        onClick: (event, rowData) => handleClickOpenActivar(rowData),
                        // disabled: rowData.id === userAuth.attributes.id,
                        hidden: (rowData.id === userAuth.attributes.id || rowData.activo === true)
                    }),
                    rowData => ({
                        icon: 'edit',
                        tooltip: 'Detalle Usuario',
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

export default SeccionUsuariosComponent;
import SeccionUsuariosComponent from '../components/SeccionUsuariosComponent';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import { useState } from 'react';
const Styles = styled.div` 
    

`;

const AdministracionAdministracionUsuariosPage = (props) => {
    const auth = props.auth;
    const userAuth = auth.user;

    const [nuevoUsuarioClic,setNuevoUsuarioClic] = useState();

    return (
        <>
            <Styles>


                <Grid container spacing={4} className="contentPage">
                    <Grid item xs={12} md={12}>
                        <div className="contentForm">
                            <h4 className="orange">Administración Usuarios</h4>
                            <div className="text-right">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={nuevoUsuarioClic}                                   
                                >
                                    Agregar Usuario
                                </Button>
                                <br />
                                <br />
                            </div>
                            <SeccionUsuariosComponent auth={auth} setNuevoUsuarioClic={setNuevoUsuarioClic} />
                        </div>
                    </Grid>
                </Grid>
            </Styles>
        </>
    )
}


export default AdministracionAdministracionUsuariosPage;
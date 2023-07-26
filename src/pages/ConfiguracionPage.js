import { Button, Grid } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import SeccionClientesComponent from '../components/SeccionClientesComponent';
const Styles = styled.div` 
    

`;

const ConfiguracionPage = (props) => {
    const auth = props.auth;
    const userAuth = auth.user;

    const [nuevoClienteClic,setNuevoClienteClic] = useState();

    return (
        <>
            <Styles>
                <Grid container spacing={4} className="contentPage">
                    <Grid item xs={12} md={12}>
                        <div className="contentForm">
                            <h4 className="orange">Administración Clientes</h4>
                            <div className="text-right">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={nuevoClienteClic}                                   
                                >
                                    Agregar Cliente
                                </Button>
                                <br />
                                <br />
                            </div>
                            <SeccionClientesComponent auth={auth} setNuevoClienteClic={setNuevoClienteClic}/>
                        </div>
                    </Grid>
                </Grid>
            </Styles>
        </>
    )
}

export default ConfiguracionPage;
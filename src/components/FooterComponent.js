import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
const Styles = styled.div`    
    .footer span {
        margin-left: 20px;
    }
`;


export default function FooterComponent() {
    return (
        <>
            <Styles>
                <Grid container spacing={3} className="footer text-center">
                    <Grid item xs={12} md={12}>
                        <img alt="logo.png" src="https://www.industrialcom.com.mx/wp-content/uploads/2020/04/Tricom-150x50.png" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <p>
                            Industrial Com SA de CV - ©  {new Date().getFullYear()}.


                            <span>
                                <Link className="orange" rel="noreferrer" target="_blank" href="https://www.industrialcom.com.mx/wp-content/uploads/2020/07/AP-Integral-Clientes-ICOM.pdf">Aviso de Privacidad</Link>
                                {" | "}
                                <Link className="orange" rel="noreferrer" target="_blank" href="https://www.industrialcom.com.mx/wp-content/uploads/2021/08/Privacy.pdf">Comprehensive Privacy Notice</Link>
                            </span>

                        </p>
                    </Grid>
                </Grid>
            </Styles>

        </>

    );
}
import { Button, IconButton, Input } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
const Styles = styled.div` 
 table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
 }

`;

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        // position: 'relative',
        // right: theme.spacing(0),
        color: theme.palette.grey[500],
        float: 'right'
    },
}));


const FormDetalleEstructura = (props) => {
    const setShowDetalle = props.setShowDetalle;
    const classes = useStyles();

    return (
        <>
            <Styles>
                <form className="formBorder" noValidate autoComplete="off" >
                    <IconButton className={classes.closeButton} aria-label="close" onClick={() => setShowDetalle(false)}>
                        <CloseIcon />
                    </IconButton>
                    <br />
                    <h6 className="text-center">Detalle</h6>
                    <label className="inputLabel">Cantidad puentes</label>
                    <Input id="component-simple" type="number" disabled />

                    <h6 className="text-center">Material</h6>

                    <br />
                    <label className="inputLabel">Propiedades</label>
                    <Input id="component-simple" type="number" disabled />

                    <table border="1" width="100%" className="text-center">
                        <thead>
                            <tr>
                                <th>Metros lineales</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>

                    <br />
                    <label className="inputLabel">Metros lineales totales</label>
                    <Input id="component-simple" type="number" disabled />

                    <br />
                    <label className="inputLabel">Kilogramos totales</label>
                    <Input id="component-simple" type="number" disabled />

                    <br />
                    <label className="inputLabel">Precio por KG</label>
                    <Input id="component-simple" type="number" disabled />

                    <br />
                    <label className="inputLabel">Total</label>
                    <Input id="component-simple" type="number" disabled />

                </form>
            </Styles>
        </>
    )
}

export default FormDetalleEstructura;
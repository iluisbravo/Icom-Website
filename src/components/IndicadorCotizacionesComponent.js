import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import styled from 'styled-components';
import { Badge } from '@material-ui/core';
const Styles = styled.div` 
    .MuiCardContent-root:last-child{
        padding-bottom: 16px;
    }

    .MuiCard-root:hover{
        cursor: pointer;
        opacity: 0.8;
    }

    p {
        margin-top: 0;
        margin-bottom: 0;
    }

    p.number{
        margin-bottom: 0px;
    }

    .red{
        background-color: red;
        color:white;
    }

    .green{
        background-color: limegreen;
        color:white;
    }

    .orange{
        background-color: orange;
        color:white !important;
    }

    .blue{
        background-color: cornflowerblue;
        color:white;
    }

    .gray{
        background-color: dimgrey;
        color:white !important;
    }

    .MuiBadge-root {
        display: block;
    }

`;

const IndicadorCotizacionesComponent = (props) => {
    const onClickStatus = props.onClick;

    return (
        <>
            <Styles>

                <Card name={props.title} className={props.color} onClick={() => onClickStatus(props.title)}>
                    <CardContent>
                        <Badge badgeContent={props.pendientes || 0} color="primary">
                            <p className="text-left">

                                {props.title}

                            </p>
                        </Badge>

                        {/* <p className="text-center number">
                            {props.number}
                        </p> */}
                    </CardContent>
                </Card>

            </Styles>

        </>
    );
}

export default IndicadorCotizacionesComponent;
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import styled from 'styled-components';
import imageCompression from 'browser-image-compression';
import S3BucketServices from '../services/S3BucketServices';
import UserServices from '../services/UsersServices';
import { store } from 'react-notifications-component';

const Styles = styled.div` 
    .image {
        position: relative;        
    }

    .image .btnsImg {   
        display:none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0,0,0,0.6);
        border-radius: 25px;
        color: white;
    }

    .image:hover .btnsImg {
        display: block;
    }

    .hidden{
        display:none;
    }

    img{
        border-radius: 120px;
        height: 140px;
        width: 140px;
        object-fit: contain;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    }
`;

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

const ImgUserProfileComponent = (props) => {
    const classes = useStyles();
    const auth = props.auth;
    const userAuth = auth.user;
    const imgDefault = "/img/user-profile.png";
    const imgUrl = props.imgUrl || imgDefault;
    const imgName = props.imgName || "ImgDefault.img";
    const userId = props.userId || null;
    const [profileImgUrl, setProfileImg] = React.useState();
    const [profileImgName, setProfileImgName] = React.useState();
    const [profileImgFile, setProfileImgFile] = React.useState();
    const [openModal, setOpenModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setProfileImg(imgUrl);
        setProfileImgName(imgName);
    }, []);

    const fileInputRef = React.useRef();

    const clickUploadFile = () => {
        fileInputRef.current.click();
    }


    const handleNewImage = async (e) => {

        let imageFile = e.target.files[0];

        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        if (imageFile) {

            const options = {
                maxSizeMB: 5,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            }

            if (options.maxSizeMB < imageFile.size / 1024 / 1024) {
                //SHOW ERROR THE FILE MUST BE MINIMUM 5MB
                showAlert("Atención", "La imagen debe pesar máximo 5 MB.", "warning");
                return;

            }

            try {
                const compressedFile = await imageCompression(imageFile, options);
                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);

                const compressedFileURL = await imageCompression.getDataUrlFromFile(compressedFile);
                setProfileImg(compressedFileURL);
                setProfileImgFile(compressedFile);

                saveImageOnS3(compressedFile);

            } catch (error) {
                console.log(error);
            }
        }

    }

    const saveImageOnS3 = (imgFile) => {

        S3BucketServices.uploadImage(imgFile)
            .then(async (res) => {

                let img_url = res.location;
                let img_name = res.key;

                const editUser = {
                    id: userAuth.attributes.id,
                    tkn: userAuth.attributes.token,
                    nombre: userAuth.attributes.nombre,
                    apellido: userAuth.attributes.apellido,
                    direccion: userAuth.attributes.direccion,
                    ciudad: userAuth.attributes.ciudad,
                    telefono: userAuth.attributes.telefono,
                    correo: userAuth.attributes.correo,
                    // tipoUsuario: getTipoUsuario(userAuth.attributes.idTipoUsuario),
                    idTipoUsuario: userAuth.attributes.idTipoUsuario,
                    imgUrl: img_url,
                    imgNombre: img_name
                };

                const editUserResult = await UserServices.EditUser(editUser);

                if (!editUserResult.hasError) {
                    const userEdited = {};
                    userEdited.attributes = editUserResult.data;

                    auth.setUser(userEdited);
                    console.log(editUserResult, "IMAGE SAVED");
                    showAlert("Excelente", "Tu foto de perfil ha sido actualizada correctamente.", "success");
                }
                else {
                    showAlert("Error", editUserResult.message, "error");
                }

            })
            .catch(error => {
                //showAlert("Error!", error.status + " " + error.statusText);
                showAlert("Error", error.status + " " + error.statusText, "warning");
            });
    }

    const clickRemoveImage = () => {
        // setProfileImg(imgUrl);
        // setProfileImgFile(null);
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const removeImage = () => {
        UserServices.DeleteUserImageById({ userId })
            .then(res2 => {

                if (!res2.hasError) {
                    setProfileImg(imgDefault);
                    setProfileImgFile(null);

                    const userEdited = userAuth;
                    userEdited.attributes.imgUrl = "";
                    userEdited.attributes.imgNombre = "";

                    auth.setUser(userEdited);

                    console.log(res2, "IMAGE DELETED");
                    showAlert("Excelente", "Tu foto de perfil ha sido eliminada correctamente.", "success");
                    setOpenModal(false);
                }
                else {
                    showAlert("Error", res2.message, "error");
                }
            })
            .catch(err => {
                showAlert("Error", err.message, "error");
            });
    }

    const showAlert = (title, message, type) => {

        store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "center",
            animationIn: ["animate__animated", "animate__zoomIn"],
            animationOut: ["animate__animated", "animate__zoomOut"],
            dismiss: {
                duration: 5000,
                onScreen: true,
                showIcon: true
            },
            touchSlidingExit: {
                swipe: {
                    duration: 400,
                    timingFunction: 'ease-out',
                    delay: 0,
                },
                fade: {
                    duration: 400,
                    timingFunction: 'ease-out',
                    delay: 0
                }
            }
        });

    }

    return (
        <>
            <Styles>
                <Dialog
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <p>¿Esta seguro que desea eliminar su foto de perfil?</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.paddingDialogAction}>
                        <Button type="button" variant="outlined" color="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>

                        <Button type="button" variant="contained" color="primary" autoFocus onClick={removeImage} disabled={loading}>
                            {"Eliminar"}
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>

                    </DialogActions>
                </Dialog>
                <div id="container">
                    {/* <div class="image" id="image1">
                        <img alt="profile.img" src={img} height="160" />
                        <a href="#" class="delete">x</a>
                    </div> */}
                    <div className="image">
                        <img
                            alt="profile.img"
                            src={profileImgUrl}
                            height="160"
                        />
                        <div className="btnsImg">
                            <IconButton aria-label="delete" onClick={clickRemoveImage}>
                                <DeleteIcon color="primary" />
                            </IconButton>
                            |
                            <IconButton aria-label="edit" onClick={clickUploadFile}>
                                <EditIcon color="primary" />
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleNewImage}
                                    accept=".jpg, .jpeg, .png" />
                            </IconButton>
                        </div>

                    </div>

                </div>

            </Styles>
        </>
    )
}

export default ImgUserProfileComponent;
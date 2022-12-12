import React, { useState, useEffect } from 'react';
//import Header from '../../../components/header/Header';
import UserProfile from '../../../components/security/usersRoles/UserProfile';
import DataServices from '../../../service/ApiSeguridad';
import ToastContainer from '../../../components/toast/Toast';

const UserProfileContainer = props => {

    const [title, setTitle] = useState('');
    const [userData, setUserData] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [id, setId] = useState(0);
    //const [userId, setUserId] = useState(0);
    const [profileSelected, setProfileSelected] = useState([]);
    const [userSelected, setUserSelected] = useState([]);
    let [isActive, setIsActive] = useState(false);
    const [isNew, setNew] = useState(true);
    const [errorMessageUser, setErrorMessageUser] = useState('');
    const [errorMessageProfile, setErrorMessageProfile] = useState('');
    const [disableBtnSave, setDisableBtnSave] = useState(false);
    //const [valueUser, setValueUser] = useState(0);
    const [disabledUser, setDisabledUser] = useState(false);
    const [executeLoading, setExecuteLoading] = useState(false);


    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            getUserList();
            getProfileList();
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                getUserProfileById(props.match.params.id);
                setNew(false);
                setId(props.match.params.id);
                setDisabledUser(true);
                setTitle('Editar perfil al usuario');
            } else {
                setNew(true);
                setDisabledUser(false);
                setTitle('Asignar perfil al usuario');
            }
        } else {
            props.history.push('/');
        }
    }, [props])

    /**Metodo para obtener todos los registros */
    const getUserList = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllUsers();
            if (response.status === 200) {
                setExecuteLoading(false);
                let newData = [];
                newData = response.data;
                const newObject = {
                    id: 0,
                    usuario: "Seleccione..."
                }
                newData.splice(0, 0, newObject);

                setUserData(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Metodo para obtener todos los registros */
    const getProfileList = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllProfiles();
            if (response.status === 200) {
                setExecuteLoading(false);
                setProfileData(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    const getUserProfileById = async (id) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getUserProfileById(id);
            if (response.status === 200) {
                setExecuteLoading(false);
                setIsActive(response.data.activo);
                //setUserId(response.data.usuarioId.id);
                //setValueUser(response.data.usuarioId.id);
                let dataUserSelected = [];
                const newObjectUser = {}

                let dataSelected = [];
                const newObject = {}

                newObjectUser.id = response.data.usuarioId.id;
                newObjectUser.name = response.data.usuarioId.usuario
                dataUserSelected.push(newObjectUser)

                newObject.id = response.data.perfilId.id;
                newObject.name = response.data.perfilId.nombre
                dataSelected.push(newObject);
                
                
                /* for (let i = 0; i < response.data.perfilId.length; i++) {
                    const newObject = {}
                    newObject.id = response.data.perfilId[i].id;
                    newObject.name = response.data.perfilId[i].nombre
        
                    console.log(response.data);
                } */
                setUserSelected(dataUserSelected);
                setProfileSelected(dataSelected);

                //setProfileId(response.data.perfilId.id);
                //setValueProfile(response.data.perfilId.id);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    const saveData = (e) => {
        e.preventDefault();
        if (validateData()) {
            if (isNew) {
                setDisableBtnSave(true);
                saveUserProfile();
            } else {
                editUserProfile();
            }
        }
    }

    const saveUserProfile = async () => {
        setExecuteLoading(true);
        try {
            const perfilUsuario = [];
            for (let i = 0; i < profileSelected.length; i++) {
                const newObject = {
                    activo: false,
                    perfilId: {},
                    usuarioId: {}
                };
                newObject.activo = isActive;
                newObject.perfilId.id = profileSelected[i].id;
                newObject.usuarioId.id = userSelected[0].id;
                perfilUsuario.push(newObject);

            }
            const response = await DataServices.postUserProfile(perfilUsuario);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se guardaron correctamente");
                /* setTimeout(function () {
                    
                }, 6000); */
            }
        } catch (error) {
            setExecuteLoading(false);
            setDisableBtnSave(false);
            console.log('error', error);
        }
        initialStateToast();
    }

    const editUserProfile = async () => {
        setExecuteLoading(true);
        try {
            //const i = parseInt(id); 
            const perfilUsuario = {
                id:  id,
                activo: isActive,
                perfilId: {
                    id: profileSelected[0].id
                },
                usuarioId: {
                    id: userSelected[0].id
                }
            }
            const response = await DataServices.putUserProfile(perfilUsuario);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se guardaron correctamente");
                /* setTimeout(function () {
                   
                }, 6000); */
            }
        } catch (error) {
            setExecuteLoading(false);
            setDisableBtnSave(false);
            console.log('error', error);
        }
        initialStateToast();
    }

    const handleChangeIsActive = (e) => {
        isActive = e.target.checked;
        setIsActive(isActive);
    }

    /* const selectedItemUser = (e) => {
        e.preventDefault();
        setUserId(e.target.value);
        setValueUser(e.target.value);
        setErrorMessageUser('');
    } */

    const onSelectUser = (selectedList, selectedItem) => {
        setUserSelected(selectedList);
        setErrorMessageUser('');
    }


    const onSelect = (selectedList, selectedItem) => {
        setProfileSelected(selectedList);
        setErrorMessageProfile('');
    }

    const onRemove = (selectedList, removedItem) => {
        setProfileSelected(selectedList);
    }

    /**Funcion para validar los campos requeridos */
    const validateData = () => {
        if (userSelected.length <= 0) {
            setErrorMessageUser('Debe seleccionar el usuario');
            return false;
        }

        if (profileSelected.length <= 0 || profileSelected === null) {
            setErrorMessageProfile('Debe seleccionar el perfil');
            return false;
        }

        return true;
    }

    const clearData = (e) => {
        e.preventDefault();
        if (isNew) {
            setDisableBtnSave(false);
            setIsActive(false);
            setUserSelected([]);
            //setProfileSelected([]);
            setErrorMessageUser('');
            setErrorMessageProfile('');
        } else {
            setDisableBtnSave(false);
            setIsActive(false);
            //setProfileSelected([]);
            setErrorMessageUser('');
            setErrorMessageProfile('');
        }
    }

    return (
        <>
            {/* <Header /> */}
            <UserProfile
                saveData={saveData}
                clearData={clearData}
                title={title}
                userData={userData}
                profileData={profileData}
                //selectedItemUser={selectedItemUser}
                errorMessageUser={errorMessageUser}
                errorMessageProfile={errorMessageProfile}
                handleChangeIsActive={handleChangeIsActive}
                disableBtnSave={disableBtnSave}
                isActive={isActive}
                //valueUser={valueUser}
                disabledUser={disabledUser}
                onSelect={onSelect}
                onRemove={onRemove}
                profileSelected={profileSelected}
                onSelectUser={onSelectUser}
                userSelected={userSelected}
                executeLoading={executeLoading}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
}

export default UserProfileContainer;
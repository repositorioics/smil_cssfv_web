import React, { useState, useEffect } from 'react';
//import Header from '../../../components/header/Header';
import Menu from '../../../components/security/menus/Menu';
import DataServices from '../../../service/Api';
import ToastContainer from '../../../components/toast/Toast';

const MenuContainer = props => {

    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [order, setOrder] = useState('');
    const [menuIcon, setMenuIcon] = useState('');
    let [isActive, setIsActive] = useState(false);
    const [disableBtnSave,setDisableBtnSave] = useState(false);
    const [executeLoading, setExecuteLoading] = useState(false);
    
    const [isNew, setNew] = useState(true);
    const [id, setId] = useState('');

    const [errorMessageName, setErrorMessageName] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            //getById
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setTitle('Editar menu');
                getById(props.match.params.id);
                setId(props.match.params.id);
                setNew(false);
            } else {
                setTitle('Agregar menu');
                setNew(true);
            }
        } else {
            props.history.push('/');
        }
    }, [props])

    /**Metodo para obtener todos los registros */
    const getById = async (id) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getMenuById(id);
            if (response.status === 200) {
                setExecuteLoading(false);
                setId(response.data.id);
                setName(response.data.nombre);
                setDescription(response.data.descripcion !== null ? response.data.descripcion : "");
                setOrder(response.data.orden !== null ? response.data.orden : "");
                setMenuIcon(response.data.icono !== null ? response.data.icono : "");
                setIsActive(response.data.activo);
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

    const handleChangeName = (e) => {
        if (e.target.validity.valid) { // validando el pattern
            setName(e.target.value);   
        }
        setErrorMessageName('');
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleChangeMenuIcon = (e) => {
        setMenuIcon(e.target.value);
    }

    const handleChangeOrder = (e) => {
        if (e.target.validity.valid) {
            setOrder(e.target.value);
        }
    }

    const handleChangeIsActive = (e) => {
        isActive = e.target.checked;
        setIsActive(isActive);
    }

    const saveData = (e) => {
        e.preventDefault();
        if (validateData()) {
            if (isNew) {
                setDisableBtnSave(true);
                saveMenu();
            } else {
                editMenu();
            }
        }
    }

    const saveMenu = async () => {
        setExecuteLoading(true);
        try {
            const menu = {
                nombre: name,
                descripcion: description,
                orden: order,
                icono: menuIcon,
                activo: isActive
            }
            const response = await DataServices.postMenu(menu);
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

    const editMenu = async () => {
        setExecuteLoading(true);
        try {
            const menu = {
                id: id,
                nombre: name,
                descripcion: description,
                orden: order,
                icono: menuIcon,
                activo: isActive
            }

            const response = await DataServices.putMenu(menu);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se modificaron correctamente");
                /* setTimeout(function () {
                    
                }, 6000);*/
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
        initialStateToast();
    }

    const clearData = (e) => {
        e.preventDefault();
        setName('');
        setDescription('');
        setOrder('');
        setIsActive(false);
        setDisableBtnSave(false);
    }

    /**Funcion para validar los campos requeridos */
    const validateData = () => {
        if (name === '' || name === null || name === undefined) {
            setErrorMessageName('El nombre es requerido');
            return false;
        }
        return true;
    }

    return (
        <>
            {/* <Header /> */}
            <Menu 
                name={name}
                description={description}
                order={order}
                isActive={isActive}
                menuIcon={menuIcon}
                handleChangeName={handleChangeName}
                handleChangeDescription={handleChangeDescription}
                handleChangeOrder={handleChangeOrder}
                handleChangeIsActive={handleChangeIsActive}
                handleChangeMenuIcon={handleChangeMenuIcon}
                errorMessageName={errorMessageName}
                saveData={saveData}
                clearData={clearData}
                disableBtnSave={disableBtnSave}
                title={title}
                executeLoading={executeLoading}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
}

export default MenuContainer;
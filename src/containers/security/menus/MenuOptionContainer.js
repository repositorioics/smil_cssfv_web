import React, { useState, useEffect } from 'react';
//import Header from '../../../components/header/Header';
import MenuOptions from '../../../components/security/menus/MenuOptions';
import DataServices from '../../../service/Api';
import ToastContainer from '../../../components/toast/Toast';

const MenuOptionContainer = props => {

    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [order, setOrder] = useState('');
    let [isActive, setIsActive] = useState(false);
    let [visible, setVisible] = useState(false);
    const [disableBtnSave,setDisableBtnSave] = useState(false);

    const [menuList, setMenuList] = useState([]);
    const [menuSelected, setMenuSelected] = useState([]);
    const [menuId, setMenuId] = useState(0);
    
    const [isNew, setNew] = useState(true);
    const [id, setId] = useState('');

    const [errorMessageName, setErrorMessageName] = useState('');
    const [errorMessageMenu, setErrorMessageMenu] = useState('');
    const [errorMessageUrl, setErrorMessageUrl] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            getMenuList();
            //getById
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setTitle('Editar opción de menú');
                getById(props.match.params.id);
                setId(props.match.params.id);
                setNew(false);
            } else {
                setTitle('Agregar opción de menú');
                setNew(true);
            }
        } else {
            props.history.push('/');
        }
    }, [props])

    /**Metodo para obtener todos los registros */
    const getMenuList = async () => {
        try {
            const response = await DataServices.getAllMenu();
            if (response.status === 200) {
                setMenuList(response.data);
                //history.push('/home');
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    /**Metodo para obtener todos los registros */
    const getById = async (id) => {
        try {
            const response = await DataServices.getMenuOptionById(id);
            if (response.status === 200) {
                setId(response.data.id);
                setMenuId(response.data.menuId.id);
                let dataSelected = [];
                const newObjectMenu = {}

                newObjectMenu.id = response.data.menuId.id;
                newObjectMenu.name = response.data.menuId.nombre
                dataSelected.push(newObjectMenu)
                setMenuSelected(dataSelected);
                
                setName(response.data.nombre);
                setDescription(response.data.descripcion !== null ? response.data.descripcion : "");
                setUrl(response.data.url);
                setOrder(response.data.orden !== null ? response.data.orden : "");
                setIsActive(response.data.activo);
                setVisible(response.data.visible);
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    const handleChangeName = (e) => {
        setName(e.target.value);
        setErrorMessageName('');
    }

    const handleChangeUrl = (e) => {
        setUrl(e.target.value);
        setErrorMessageUrl('');
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleChangeOrder = (e) => {
        setOrder(e.target.value);
    }

    const handleChangeIsActive = (e) => {
        isActive = e.target.checked;
        setIsActive(isActive);
    }

    const handleChangeVisible = (e) => {
        visible = e.target.checked;
        setVisible(visible);
    }

    const saveData = (e) => {
        e.preventDefault();
        if (validateData()) {
            if (isNew) {
                setDisableBtnSave(true);
                saveMenuOption();
            } else {
                editMenuOption();
            }
        }
    }

    const saveMenuOption = async () => {
        try {
            const opcionMenu = {
                activo: isActive,
                descripcion: description,
                menuId: {
                  id: menuId,
                },
                nombre: name,
                orden: order,
                url: url,
                visible: visible
              }

            const response = await DataServices.postMenuOption(opcionMenu);
            if (response.status === 200) {
                setType("success");
                setMessageAlert("Los datos se guardaron correctamente");
                /* setTimeout(function () {
                    
                }, 6000); */
            }
        } catch (error) {
            setDisableBtnSave(false);
            console.log('error', error);
        }
        initialStateToast();
    }

    const editMenuOption = async () => {
        try {
            const opcionMenu = {
                id: id,
                activo: isActive,
                descripcion: description,
                menuId: {
                  id: menuId,
                },
                nombre: name,
                orden: order,
                url: url,
                visible: visible
              }

            const response = await DataServices.putMenuOption(opcionMenu);
            if (response.status === 200) {
                setType("success");
                setMessageAlert("Los datos se modificaron correctamente");
                /* setTimeout(function () {
                    
                }, 6000);*/
            }
        } catch (error) {
            console.log('error', error);
        }
        initialStateToast();
    }

    const onSelectMenu = (selectedList, selectedItem) => {
        setMenuId(selectedItem.id)
        setMenuSelected(selectedList);
        setErrorMessageMenu('');
    }

    const clearData = (e) => {
        e.preventDefault();
        setName('');
        setUrl('');
        setDescription('');
        setOrder('');
        setIsActive(false);
        setVisible(false);
        setDisableBtnSave(false);
        setMenuSelected([]);
        setErrorMessageMenu('');
        setErrorMessageName('');
        setErrorMessageUrl('');
        setMenuId(0);
    }

    /**Funcion para validar los campos requeridos */
    const validateData = () => {
        if (menuId <= 0) {
            setErrorMessageMenu('Debe seleccionar el menú');
            return false;
        }
        if (name === '' || name === null || name === undefined) {
            setErrorMessageName('El nombre es requerido');
            return false;
        }
        if (url === '' || url === null || url === undefined) {
            setErrorMessageUrl('Debe ingresar la url');
            return false;
        }
        return true;
    }

    return (
        <>
            {/* <Header /> */}
            <MenuOptions 
                name={name}
                description={description}
                order={order}
                url={url}
                isActive={isActive}
                visible={visible}
                handleChangeName={handleChangeName}
                handleChangeDescription={handleChangeDescription}
                handleChangeOrder={handleChangeOrder}
                handleChangeIsActive={handleChangeIsActive}
                handleChangeUrl={handleChangeUrl}
                handleChangeVisible={handleChangeVisible}
                errorMessageName={errorMessageName}
                errorMessageUrl={errorMessageUrl}
                errorMessageMenu={errorMessageMenu}
                saveData={saveData}
                clearData={clearData}
                disableBtnSave={disableBtnSave}
                title={title}
                menuList={menuList}
                onSelectMenu={onSelectMenu}
                menuSelected={menuSelected}
                
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
}

export default MenuOptionContainer;
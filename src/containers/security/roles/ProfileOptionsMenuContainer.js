import React, { useState, useEffect } from 'react';
//import Header from '../../../components/header/Header';
import ProfileOptionsMenu from '../../../components/security/roles/ProfileOptionsMenu';
import { textFilter } from 'react-bootstrap-table2-filter';
//import paginationFactory from 'react-bootstrap-table2-paginator';
import DataServices from '../../../service/ApiSeguridad';
import ToastContainer from '../../../components/toast/Toast';

const ProfileOptionsMenuContainer = props => {

    const [titleForm] = useState('Perfil Opciones de Menú');
    const [data, setData] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [profileSelected, setProfileSelected] = useState('');
    const [profileId, setProfileId] = useState(0);
    const [profileMenuOptions, setProfileMenuOptions] = useState([]);
    const [hideContent, setHideContent] = useState(true);
    const [executeLoading, setExecuteLoading] = useState(false);
    const [mounted, setMounted] = useState(true);

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    const columns = [
        { dataField: 'id', text: 'Id', hidden: true },
        { dataField: 'activo', text: 'activo', hidden: true },
        { dataField: 'opcionMenu', text: 'Opción de Menú', sort: true, filter: textFilter({ placeholder: 'Ingrese la opción' }) },
        { dataField: 'menu', text: 'Menú', sort: true, filter: textFilter({ placeholder: 'Ingrese el menú' }) },
        { dataField: 'descripcion', text: 'Descripción', sort: true, filter: textFilter({ placeholder: 'Ingrese la descripción' }) }
    ];

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        hideSelectAll: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                data.forEach(function(entry) {
                    if (entry.id === row.id) {
                        entry.activo = true;
                    }                    
                });
            } else {
                data.forEach(function(entry) {
                    if (entry.id === row.id) {
                        entry.activo = false;
                    }                    
                });
            }
        }
    };

    /* const pagination = paginationFactory({
        firstPageText: 'Primera página',
        prePageText: 'Anterior',
        nextPageText: 'Siguiente',
        lastPageText: 'Última página',
    }); */

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            if (mounted) {
                getMenuOptionList();
                getProfileList();
            }
        } else {
            props.history.push('/');
        }
        return () => setMounted(false);
    }, [mounted, props])

    const getProfileMenuOptionsByProfileId = async (id) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllProfileOptionsMenuByProfileId(id);
            if (response.status === 200) {
                setExecuteLoading(false);
                for (let i = 0; i < response.data.length; i++) {
                    for(let j = 0; j < data.length; j++) {
                        if (response.data[i].opcionMenuId.id === data[j].id && response.data[i].activo === true) {
                            data[j].activo = true;
                        }
                    }
                }
                setProfileMenuOptions(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Metodo para obtener todas las opciones de menu */
    const getMenuOptionList = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllMenuOption();
            if (response.status === 200) {
                setExecuteLoading(false);
                const newData = [];
                for (var i = 0; i < response.data.length; i++) {
                    newData.push({
                        "id": response.data[i].id,
                        "activo": false,
                        "opcionMenu": response.data[i].nombre,
                        "menu": response.data[i].menuId.nombre,
                        "descripcion": response.data[i].descripcion
                    });
                }
                setData(newData);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Metodo para obtener todas las opciones de menu */
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

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    const onSelect = (e) => {
        cleanDataState();
        setProfileSelected(e.target.value);
        const id = e.target.value;
        getProfileMenuOptionsByProfileId(id);
        setProfileId(id);
        setHideContent(false);
        initialStateToast();
    }

    const cleanDataState = () => {
        for (let i = 0; i < data.length; i++) {
            data[i].activo = false;
        }
    }

    const onRemove = (selectedList, removedItem) => {
        setProfileSelected(selectedList);
    }

    const saveData = () => {
        if (validateData()) {
            saveProfileOptionsMenu();
        }
    }

    const saveProfileOptionsMenu = async () => {
        setExecuteLoading(true);
        try {
             let perfilOpcionMenu = [];
            
            for (let i = 0; i < data.length; i++) {
                const newObject = {
                    activo: false,
                    opcionMenuId: {},
                    perfilId: {}
                };
                newObject.activo = data[i].activo;
                newObject.opcionMenuId.id = data[i].id
                newObject.perfilId.id = profileId
                perfilOpcionMenu.push(newObject);
            }
            
            /**Validando que se seleccione al menos una opcion de menu */
           /* const foundOptionMenu = perfilOpcionMenu.find(a => a.activo === true);
            if (foundOptionMenu === undefined || foundOptionMenu === null || foundOptionMenu === '') {
                setExecuteLoading(false);
                setType('warning');
                setMessageAlert('Debe seleccionar una opcion de menú');
                setTimeout(function () {
                    initialStateToast();
                }, 6000);
                return
            } */

            const response = await DataServices.postProfileOptionsMenu(perfilOpcionMenu);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se guardaron correctamente");
                /* setTimeout(function () {
                    
                }, 6000);*/
            }   
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
        initialStateToast();
    }

    const validateData = () => {
        if (profileSelected === '' || profileSelected === null || profileSelected === undefined || profileSelected ==='0') {
            if (profileSelected ==='0') {}
            setType('warning');
            setMessageAlert('Debe seleccionar un perfil');
            setTimeout(function () {
                initialStateToast();
            }, 6000);
            return false;
        }
        return true;
    }

    return (
        <>
            {/* <Header /> */}
            <ProfileOptionsMenu
                titleForm={titleForm}
                data={data}
                columns={columns}
                //pagination={pagination}
                selectRow={selectRow}
                profileData={profileData}
                onSelect={onSelect}
                onRemove={onRemove}
                profileSelected={profileSelected}
                saveData={saveData}
                profileMenuOptions={profileMenuOptions}
                hideContent={hideContent}
                executeLoading={executeLoading}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
}

export default ProfileOptionsMenuContainer;
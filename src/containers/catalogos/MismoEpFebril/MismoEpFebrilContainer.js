import React, { useState, useEffect } from 'react';
//import Header from '../../../components/header/Header';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import MismoEpFebril from '../../../components/catalogo/mismo_epFebril/MismoEpFebril';
import DataServices from '../../../service/ApiCatalogos';
import ToastContainer from '../../../components/toast/Toast';
//import { useAuth } from '../../../context/Auth';

const MismoEpFebrilContainer = props => {
    const [title, setTitle] = useState('Agregar episodio febril');
    const [titleForm] = useState('Lista de episodios febriles');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isNew, setIsNew] = useState(true);
    const [id, setId] = useState(0);
    const [executeLoading, setExecuteLoading] = useState(false);
    const [mounted, setMounted] = useState(true);

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    let [isChecked, setIsChecked] = useState(false);

    const [errorMessageName, setErrorMessageName] = useState('');

    const [show, setShow] = useState(false);

    const [data, setData] = useState([]);

    //const { authToken } = useAuth();

    const handleShow = () => {
        setShow(true);
        setIsNew(true);
        setTitle('Agregar episodio febril');
        setErrorMessageName('');
        setName('');
        setDescription('');
        setIsChecked(false);
    }

    const columns = [
        { dataField: 'id', text: 'Id', hidden: true },
        { dataField: 'nombre', text: 'Nombre', sort: true, filter: textFilter({ placeholder: 'Ingrese el nombre' }) },
        { dataField: 'descripcion', text: 'Descripción', sort: true, filter: textFilter({ placeholder: 'Ingrese la descripción' }) },
        { dataField: 'estado', text: 'Estado', sort: true, filter: textFilter({ placeholder: 'Ingrese el estado' }) }
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            if (mounted) {
                getAll();
            }
        } else {
            props.history.push('/');
        }
        return () => setMounted(false);
    }, [mounted, props])

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    /**Metodo para obtener todos los registros */
    const getAll = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllEpFebriles();
            if (response.status === 200) {
                setExecuteLoading(false);
                const newData = [];
                for (var i = 0; i < response.data.length; i++) {
                    newData.push({
                        "id": response.data[i].id,
                        "nombre": response.data[i].nombre,
                        "descripcion": response.data[i].descripcion,
                        "estado": response.data[i].activo === true ? "Activo" : "Inactivo"
                    });
                }
                setData(newData);
                setShow(false);
                //history.push('/home');
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    const pagination = paginationFactory({
        firstPageText: 'Primera página',
        prePageText: 'Anterior',
        nextPageText: 'Siguiente',
        lastPageText: 'Última página',
    });

    const handleClose = () => {
        setShow(false);
    }

    const handleChangeName = (e) => {
        if (e.target.validity.valid) {
            setName(e.target.value);
        }
        setErrorMessageName('');
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeCheckbox = (e) => {
        isChecked = e.target.checked;
        setIsChecked(isChecked);
    }

    const tableRowEvents = {
        onClick: (e, row, rowIndex) => {
            setTitle('Editar episodio febril');
            setName(row.nombre);
            setDescription(row.descripcion);
            setId(row.id)
            if (row.estado === "Activo") {
                setIsChecked(true);
            }
            if (row.estado === "Inactivo") {
                setIsChecked(false);
            }
            setShow(true);
            setIsNew(false);
        },
    }


    const saveData = (event) => {
        //validateData();
        event.preventDefault();
        if (isNew) {
            if (validateData()) {
                saveEpisodioFebril();
            }
        } else {
            if (validateData()) {
                editEpisodioFebril();
            }
        }

    };

    /**Metodo para enviar a guardar */
    const saveEpisodioFebril = async () => {
        setExecuteLoading(true);
        try {
            const catMismoEpfebril = {
                nombre: name,
                descripcion: description,
                activo: isChecked
            }

            const response = await DataServices.postMismoEpFebril(catMismoEpfebril);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se guardaron correctamente");
                setTimeout(function () {
                    setShow(false);
                }, 6000);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
        initialStateToast();
    }

    /**Metodo para Editar un registro */
    const editEpisodioFebril = async () => {
        setExecuteLoading(true);
        try {
            const catMismoEpfebril = {
                id: id,
                nombre: name,
                descripcion: description,
                activo: isChecked
            }

            const response = await DataServices.putMismoEpFebril(catMismoEpfebril);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se modificaron correctamente");
                setTimeout(function () {
                    setShow(false);
                }, 6000);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
        initialStateToast();
    }
    /**Validando los datos requeridos */
    const validateData = () => {
        if (name === '' || name === null || name === undefined) {
            setErrorMessageName('El nombre es requerido');
            return false;
        }
        return true;
    }

    const refreshPage = () => {
        //window.location.reload();
        getAll();
    }

    return (
        <>
            {/* <Header /> */}
            <MismoEpFebril
                title={title}
                errorMessageName={errorMessageName}
                handleChangeName={handleChangeName}
                handleDescription={handleDescription}
                onChangeCheckbox={onChangeCheckbox}
                saveData={saveData}
                name={name}
                description={description}
                isChecked={isChecked}
                show={show}
                handleShow={handleShow}
                handleClose={handleClose}
                titleForm={titleForm}
                data={data}
                columns={columns}
                pagination={pagination}
                tableRowEvents={tableRowEvents}
                refreshPage={refreshPage}
                executeLoading={executeLoading}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>

    );
}
export default MismoEpFebrilContainer;
import React, { useState, useEffect } from 'react';
//import Header from '../../../components/header/Header';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import TipoPruebas from '../../../components/catalogo/tipo-pruebas/TipoPruebas';
import DataServices from '../../../service/Api';
import ToastContainer from '../../../components/toast/Toast';
//import { useAuth } from '../../../context/Auth';

const TipoPruebasContainer = props => {
    const [title, setTitle] = useState('Agregar tipo de prueba');
    const [titleForm] = useState('Lista tipos de pruebas');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isNew, setIsNew] = useState(true);
    const [id, setId] = useState(0);
    const [executeLoading, setExecuteLoading] = useState(false);
    const [dataMx, setDataMx] = useState([]);
    const [selectedMx, setSelectedMx] = useState('');
    const [mounted, setMounted] = useState(true);
    const [idMxSelected, setIdMxSelected] = useState(0);
    const [level, setLevel] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    let [isChecked, setIsChecked] = useState(false);

    const [errorMessageName, setErrorMessageName] = useState('');
    const [errorMessageMx, setErrorMessageMx] = useState('');
    const [errorMessageLevel, setErrorMessageLevel] = useState('');

    const [show, setShow] = useState(false);

    const [data, setData] = useState([]);

    //const { authToken } = useAuth();

    const handleShow = () => {
        setShow(true);
        setIsNew(true);
        setTitle('Agregar tipo de prueba');
        setErrorMessageName('');
        setErrorMessageMx('');
        setName('');
        setDescription('');
        setIsChecked(false);
    }

    const columns = [
        { dataField: 'id', text: 'Id', hidden: true },
        { dataField: 'idMuestra', text: 'IdMuestra', hidden: true },
        { dataField: 'nivel', text: 'Nivel', hidden: true },
        { dataField: 'nombre', text: 'Nombre', sort: true, filter: textFilter({ placeholder: 'Ingrese el nombre' }) },
        { dataField: 'descripcion', text: 'Descripción', sort: true, filter: textFilter({ placeholder: 'Ingrese la descripción' }) },
        { dataField: 'muestra', text: 'Muestra', sort: true, filter: textFilter({ placeholder: 'Ingrese la muestra' }) },
        { dataField: 'estado', text: 'Estado', sort: true, filter: textFilter({ placeholder: 'Ingrese el estado' }) }
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            if (mounted) {}
            getAll();
            getAllMx();
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
            const response = await DataServices.getAllTipoPruebas();
            if (response.status === 200) {
                setExecuteLoading(false);
                const newData = [];
                for (var i = 0; i < response.data.length; i++) {
                    newData.push({
                        "id": response.data[i].id,
                        "idMuestra": response.data[i].idCatMuestra.id,
                        "nivel": response.data[i].nivel,
                        "nombre": response.data[i].nombre,
                        "descripcion": response.data[i].descripcion,
                        "muestra": response.data[i].idCatMuestra.nombre,
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

    const getAllMx = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllCatMuetra();
            if (response.status === 200) {
                setExecuteLoading(false);
                setDataMx(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /* const data = [
        { id: 1, nombre: 'A', descripcion: 'Indica que es categoria A', estado: 'Activo' },
        { id: 2, nombre: 'B', descripcion: 'Indica que es categoria B', estado: 'Activo' },
        { id: 3, nombre: 'C', descripcion: 'Indica que es categoria C', estado: 'Inactivo' }
    ] */

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

    const handleChangeLevel = (e) => {
        setLevel(e.target.value);
    }

    const onChangeCheckbox = (e) => {
        isChecked = e.target.checked;
        setIsChecked(isChecked);
    }

    const handleChangeMx = (e) => {
        setSelectedMx(e.target.value);
        setIdMxSelected(e.target.value);
        setErrorMessageMx('');
    }

    const tableRowEvents = {
        onClick: (e, row, rowIndex) => {
            setTitle('Editar tipo de prueba');
            setName(row.nombre);
            setDescription(row.descripcion);
            setId(row.id)
            setSelectedMx(row.idMuestra);
            setIdMxSelected(row.idMuestra);
            setLevel(row.nivel);
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
                saveTipoPrueba();
            }
        } else {
            if (validateData()) {
                editTipoPrueba();
            }
        }

    };

    /**Metodo para enviar a guardar */
    const saveTipoPrueba = async () => {
        setExecuteLoading(true);
        try {
            const catTipoPrueba = {
                nombre: name,
                descripcion: description,
                nivel: level,
                idCatMuestra: {
                    id: idMxSelected,
                },
                activo: isChecked
            }

            const response = await DataServices.postTipoPruebas(catTipoPrueba);
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
    const editTipoPrueba = async () => {
        setExecuteLoading(true);
        try {
            const catTipoPrueba = {
                id: id,
                nombre: name,
                descripcion: description,
                nivel: level,
                idCatMuestra: {
                    id: idMxSelected,
                },
                activo: isChecked
            }
            const response = await DataServices.putTipoPruebas(catTipoPrueba);
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
        if (idMxSelected <= 0) {
            setErrorMessageMx('Debe seleccionar la muestra');
            return false;
        }
        if (level === '' || level === null || level === undefined) {
            setErrorMessageLevel('Debe indicar el nivel');
            return false;
        }
        return true;
    }

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <>
            {/* <Header /> */}
            <TipoPruebas
                title={title}
                errorMessageName={errorMessageName}
                handleChangeName={handleChangeName}
                handleDescription={handleDescription}
                handleChangeLevel={handleChangeLevel}
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
                dataMx={dataMx}
                handleChangeMx={handleChangeMx}
                selectedMx={selectedMx}
                errorMessageMx={errorMessageMx}
                errorMessageLevel={errorMessageLevel}
                level={level}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>

    );
}
export default TipoPruebasContainer;
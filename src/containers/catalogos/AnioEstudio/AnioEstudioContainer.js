import React, { useState, useEffect } from 'react';
//import Header from '../../../components/header/Header';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AnioEstudio from '../../../components/catalogo/anio-estudio/AnioEstudio';
import DataServices from '../../../service/ApiCatalogos';
import ToastContainer from '../../../components/toast/Toast';
//import { useAuth } from '../../../context/Auth';

const AnioEstudioContainer = props => {
    const [title, setTitle] = useState('Agregar año estudio');
    const [titleForm] = useState('Lista años estudios');
    const [isNew, setIsNew] = useState(true);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [anio, setAnio] = useState('');
    const [id, setId] = useState(0);
    const [executeLoading, setExecuteLoading] = useState(false);
    const [mounted, setMounted] = useState(true);

    const [errorFechaInicio, setErrorFechaInicio] = useState('');
    const [errorFechaFin, setErrorFechaFin] = useState('');
    const [errorMessageAnio, setErrorMessageAnio] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);


    const [show, setShow] = useState(false);

    const [data, setData] = useState([]);

    //const { authToken } = useAuth();

    const handleShow = () => {
        setShow(true);
        setIsNew(true);
        setTitle('Agregar año estudio');
    }

    const columns = [
        { dataField: 'id', text: 'Id', hidden: true },
        { dataField: 'fechaInicio', text: 'Fecha Inicio', sort: true, filter: textFilter({ placeholder: 'Fecha Inicio' }) },
        { dataField: 'fechaFin', text: 'Fecha Fin', sort: true, filter: textFilter({ placeholder: 'Fecha Fin' }) },
        { dataField: 'anio', text: 'Año', sort: true, filter: textFilter({ placeholder: 'Año del estudio' }) }
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
            const response = await DataServices.getAllCatAnioEstudio();
            if (response.status === 200) {
                setExecuteLoading(false);
                /* const newData = [];
                for (var i = 0; i < response.data.length; i++) {
                    newData.push({
                        "id": response.data[i].id,
                        "fechaInicio": response.data[i].fechaInicio,
                        "fechaFin": response.data[i].fechaFin,
                        "anio": response.data[i].anio
                    });
                } */
                setData(response.data);
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

    const handleChangeFechaInicio = (selectedDate) => {
        setFechaInicio(selectedDate);
        setErrorFechaInicio('');
    }
    const handleChangeFechaFin = (selectedDate) => {
        setFechaFin(selectedDate);
        setErrorFechaFin('');
    }
    const handleChangeAnio = (e) => {
        setAnio(e.target.value);
        setErrorMessageAnio('');
    }

    const tableRowEvents = {
        onClick: (e, row, rowIndex) => {
            setTitle('Editar episodio febril');
            setId(row.id)
            setFechaInicio(row.fechaInicio);
            setFechaFin(row.fechaFin);
            setAnio(row.anio);
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
            const catAnioEstudio = {
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                anio: anio
            }

            const response = await DataServices.postCatAnioEstudio(catAnioEstudio);
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
            const catAnioEstudio = {
                id: id,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                anio: anio
            }

            const response = await DataServices.putCatAnioEstudio(catAnioEstudio);
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
        if (fechaInicio === '' || fechaInicio === null || fechaInicio === undefined) {
            setErrorFechaInicio('Fecha inicio requerida');
            return false;
        }
        if (fechaFin === '' || fechaFin === null || fechaFin === undefined) {
            setErrorFechaFin('Fecha fin requerida');
            return false;
        }
        if (anio === '' || anio === null || anio === undefined) {
            setErrorMessageAnio('El año es requerido');
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
            <AnioEstudio
                title={title}
                fechaInicio={fechaInicio}
                fechaFin={fechaFin}
                anio={anio}
                show={show}
                titleForm={titleForm}
                data={data}
                columns={columns}
                pagination={pagination}
                tableRowEvents={tableRowEvents}
                refreshPage={refreshPage}
                handleShow={handleShow}
                handleClose={handleClose}
                handleChangeFechaInicio={handleChangeFechaInicio}
                handleChangeFechaFin={handleChangeFechaFin}
                handleChangeAnio={handleChangeAnio}
                saveData={saveData}
                executeLoading={executeLoading}
                errorFechaInicio={errorFechaInicio}
                errorFechaFin={errorFechaFin}
                errorMessageAnio={errorMessageAnio}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>

    );
}
export default AnioEstudioContainer;
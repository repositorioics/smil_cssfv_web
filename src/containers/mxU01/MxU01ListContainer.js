import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import moment from "moment";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import MxU01List from '../../components/mxU01/MxU01List';
import AnularMx from '../../components/AnularMx';
import Edit from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import DataServices from '../../service/Api';
import ToastContainer from '../../components/toast/Toast';
import Utils from '../../utils/Utils';

const MxU01ListContainer = props => {
    let history = useHistory();
    const [titleForm] = useState('Muestras de U01');
    const [data, setData] = useState([]);
    const [executeLoading, setExecuteLoading] = useState(false);
    const [mounted, setMounted] = useState(true);
    const [show, setShow] = useState(false);
    const [disabledOtroMotivo, setDisabledOtroMotivo] = useState(true);
    const [disabledOtroMotivoSelected, setDisabledOtroMotivoSelected] = useState(false);
    let [ckOtroMotivo, setCkOtroMotivo] = useState(false);
    const [otroMotivo, setOtroMotivo] = useState('');
    const [motivosAnulacion, setMotivosAnulacion] = useState([]);
    const [selectedMotivo, setSelectedMotivo] = useState('');
    const [muestraId, setMuestraId] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [code, setCode] = useState('');

    const [errorMessageOtroMotivo, setErrorMessageOtroMotivo] = useState('');
    const [errorMessageOtroMotivoSelected, setErrorMessageOtroMotivoSelected] = useState('');
    const [errorStartDate, setErrorStartDate] = useState('');
    const [errorEndDate, setErrorEndDate] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);


    const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            < div
                style={{
                    textAlign: "center",
                    cursor: "pointer",
                    lineHeight: "normal",
                    display: "flex"
                }}>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Editar</Tooltip>}>
                    <Edit
                        onClick={() => editMxU01(row)}
                        style={{ fontSize: 20, marginLeft: 15, color: "#efac14" }}
                    />
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Anular</Tooltip>}>
                    <CancelIcon
                        onClick={() => openMx(row)}
                        style={{ fontSize: 20, marginLeft: 15, color: "#950c0c" }}
                    />
                </OverlayTrigger>
            </div>

        );
    }

    const columns = [
        { dataField: 'id', text: 'Id', hidden: true },
        { dataField: 'muestraId', text: 'MuestraId', hidden: true },
        { dataField: 'fechaRegistro', text: '', hidden: true },
        { dataField: 'codigo', text: 'Código', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'fechaToma', text: 'Fecha toma', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'horaToma', text: 'Hora toma', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'consulta', text: 'Consulta', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'tubo', text: 'Tipo tubo', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'estado', text: 'Estado muestra', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        {
            dataField: "", text: "", sort: false, formatter: rankFormatter, headerAttrs: { width: 50 }, attrs: { width: 50, className: "EditRow" }
        }
    ];

    const pagination = paginationFactory({
        firstPageText: 'Primera página',
        prePageText: 'Anterior',
        nextPageText: 'Siguiente',
        lastPageText: 'Última página',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            if (mounted) {
                //cargar la lista
                getMxU01ist();
                getMotivosAnulacion();
            }
        } else {
            props.history.push('/');
        }
        return () => setMounted(false);
    }, [mounted, props])

    const openMx = (row) => {
        setMuestraId(row.muestraId);
        setSelectedMotivo('');
        setDisabledOtroMotivo(true)
        setDisabledOtroMotivoSelected(false);
        setOtroMotivo('');
        setCkOtroMotivo(false);
        if (row.estado === "Activa") {
            const fechaDelDia = moment(new Date(), 'DD-MM-YYYY');
            const fechaRegistro = moment(new Date(row.fechaRegistro), 'DD-MM-YYYY');
            const diff = fechaDelDia.diff(fechaRegistro, 'days');
            if (diff > 5) {
                setShow(false);
                setType("error");
                setMessageAlert("Este registro es de mas de 5 dias, ya no se puede Anular");
                setTimeout(function () {
                    initialStateToast();
                }, 500);
            } else {
                setShow(true);
            }
        }
    }

    const handleClose = () => {
        setShow(false);
        getMxU01ist();
    }

    const handleChangeCkOtroMotivo = (e) => {
        ckOtroMotivo = e.target.checked;
        if (ckOtroMotivo) {
            setDisabledOtroMotivo(false);
            setDisabledOtroMotivoSelected(true);
            setSelectedMotivo('');
            setErrorMessageOtroMotivoSelected('');
            setErrorMessageOtroMotivo('');
        } else {
            setDisabledOtroMotivo(true)
            setDisabledOtroMotivoSelected(false);
            setOtroMotivo('');
            setErrorMessageOtroMotivoSelected('');
            setErrorMessageOtroMotivo('');
        }
        setCkOtroMotivo(ckOtroMotivo);
        //mxCv = e.target.checked;
        //setMxCv(mxCv);
    }

    const handleChangeOtroMotivo = (e) => {
        setOtroMotivo(e.target.value);
        setErrorMessageOtroMotivo('');
    }

    const handleChangeMotivo = (e) => {
        setSelectedMotivo(e.target.value);
        setErrorMessageOtroMotivoSelected('');
    }

    const handleChangeStartDate = (e) => {
        const result = Utils.validateDate(e.target.value);
        if (result) {
            setStartDate(e.target.value);
            setErrorStartDate('La fecha de inicio no puede ser mayor que la fecha de hoy');
        } else {
            setStartDate(e.target.value);
            setErrorStartDate('');
        }
    }

    const handleChangeEndDate = (e) => {
        const result = Utils.validateDate(e.target.value);
        if (result) {
            setEndDate(e.target.value);
            setErrorEndDate('La fecha fin no puede ser mayor que la fecha de hoy');
        } else {
            setEndDate(e.target.value);
            setErrorEndDate('');
        }
    }

    const handleChangeCode = (e) => {
        setCode(e.target.value);
    }

    /**Metodo para obtener todos los registros */
    const getMxU01ist = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getMuestrasU01();
            if (response.status === 200) {
                setExecuteLoading(false);
                const newData = [];
                for (var i = 0; i < response.data.length; i++) {
                    newData.push({
                        "id": response.data[i].id,
                        "muestraId": response.data[i].muestraId.id,
                        "fechaRegistro": response.data[i].muestraId.fechaRegistro,
                        "codigo": response.data[i].muestraId.codigoParticipante,
                        "fechaToma": response.data[i].muestraId.fechaToma,
                        "horaToma": response.data[i].muestraId.horaToma,
                        "consulta": response.data[i].consultaId.descripcion,
                        "tubo": response.data[i].tuboId.descripcion,
                        "estado": response.data[i].muestraId.anulada === true ? "Anulada" : "Activa"
                    });
                }
                setData(newData)
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Metodo para obtener todos los registros por el filtro aplicado*/
    const getMxU01ListByFilter = async (code, startDate, endDate) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.filtroMxU01(code, startDate, endDate);
            if (response.status === 200) {
                setExecuteLoading(false);
                const newData = [];
                if (response.data.length > 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        newData.push({
                            "id": response.data[i].id,
                            "muestraId": response.data[i].muestraId.id,
                            "codigo": response.data[i].muestraId.codigoParticipante,
                            "fechaRegistro": response.data[i].muestraId.fechaRegistro,
                            "fechaToma": response.data[i].muestraId.fechaToma,
                            "horaToma": response.data[i].muestraId.horaToma,
                            "consulta": response.data[i].consultaId.descripcion,
                            "tubo": response.data[i].tuboId.descripcion,
                            //"tipoMuestra": response.data[i].tipoMuestraId.descripcion,
                            "estado": response.data[i].muestraId.anulada === true ? "Anulada" : "Activa"
                        });
                    }
                    setData(newData)
                } else {
                    setData([]);
                    setType("info");
                    setMessageAlert("No se encontraron registros");
                    setTimeout(function () {
                        initialStateToast();
                    }, 500);
                }
                
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Metodo para obtener todos los registros */
    const getMotivosAnulacion = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getMotivosAnulaciones();
            if (response.status === 200) {
                setExecuteLoading(false);
                const multiSelectData = [];
                if (response.data.length > 0) {
                    for (let i = 0; i < response.data.length; i++) {
                        const newObject = {}
                        newObject.id = response.data[i].id;
                        newObject.nombre = response.data[i].nombre
                        multiSelectData.push(newObject);
                    }
                }
                setMotivosAnulacion(multiSelectData);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Metodo para anular la muestra */
    const anularMxUO1 = async () => {
        setExecuteLoading(true);
        try {

            let motivoAnulacionId = {};

            const muestra = {
                id: muestraId,
                otroMotivoAnulacion: ckOtroMotivo,
                motivoAnulacion: otroMotivo,
            }

            if (selectedMotivo !== "" && selectedMotivo !== null && selectedMotivo !== undefined) {
                if ((selectedMotivo > 0 ) && !ckOtroMotivo) {
                    motivoAnulacionId.id = selectedMotivo;
                    muestra.motivoAnulacionId = motivoAnulacionId;
                }
            }

            const response = await DataServices.anularMuestra(muestra);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("La muestra fue anulada");
            }

        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
        initialStateToast();
    }

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    /**Metodo para validar los datos requeridos del motivo de anulacion */
    const validateData = () => {
        if (ckOtroMotivo) {
            if (otroMotivo === '' || otroMotivo === null || otroMotivo === undefined) {
                setErrorMessageOtroMotivo('Debe ingresar el motivo de anulación');
                return false;
            }
        }
        
        if (selectedMotivo !== "" && selectedMotivo !== null && selectedMotivo !== undefined) {
            if ((selectedMotivo <= 0 ) && !ckOtroMotivo) {
                setErrorMessageOtroMotivoSelected('Debe seleccionar el motivo de anulacion');
                return false;
            }
        }

/*         if (selectedMotivo > 0 && ckOtroMotivo) {
            return false;
        } */
        return true
    }


    const editMxU01 = (row) => {
        if (row.estado === "Activa") {
            history.push(`/muestras/editar-muestra-u01/${row.id}`);
        }
    }

    /**Metodo para guardar una muestra anulada */
    const saveData = () => {
        if (validateData()) {
            anularMxUO1();
        }
    }

    /**Metodo para realizar la busqueda */
    const searchData = () => {
        if (validateSearchData()) {
            if (validateDates()) {
                getMxU01ListByFilter(code === '' ? 0 : code, startDate, endDate);
            }

        }
    }

    const onKeyPressCode = (e) => {
        if (code !== '' || code !== null || code !== undefined) {
            if (e.charCode === 13) {
                getMxU01ListByFilter(code === '' ? 0 : code, startDate, endDate);
            }
        }
    }

    /**Metodo para validar la busqueda y no permitirla sino existen ambas fechas o el codigo */
    const validateSearchData = () => {
        if ((code === '' || code === null || code === undefined) &&
            (startDate === '' || startDate === null || startDate === undefined) &&
            (endDate === '' || endDate === null || endDate === undefined)) {
            setType("info");
            setMessageAlert("Debe ingresar el codigo ó las fechas");
            setTimeout(function () {
                initialStateToast();
            }, 500);
            return false
        }

        /*  if ((startDate !== '' || startDate !== null || startDate !== undefined) &&
             (endDate === '' || endDate === null || endDate === undefined)) {
             setType("info");
             setMessageAlert("Debe ingresar la fecha fin");
             setTimeout(function () {
                 initialStateToast();
             }, 500);
             return false
         }
 
         if ((startDate === '' || startDate === null || startDate === undefined) &&
             (endDate !== '' || endDate !== null || endDate !== undefined)) {
             setType("info");
             setMessageAlert("Debe ingresar la fecha inicio");
             setTimeout(function () {
                 initialStateToast();
             }, 500);
             return false
         } */
        return true
    }

    /** Metodo para validar que fecha inicio no sea mayor a la fecha fin*/
    const validateDates = () => {
        const result = Utils.validateStartDateEndDate(startDate, endDate);
        if (result) {
            setType("error");
            setMessageAlert("La fecha inicio no puede ser mayor que la fecha fin");
            setTimeout(function () {
                initialStateToast();
            }, 500);
            return false
        }
        return true
    }

    /**Metodo para linpiar los filtros y cargar la lista de las muestras del dia */
    const clearFilters = () => {
        setStartDate('');
        setEndDate('');
        setCode('');
        setErrorStartDate('');
        setErrorEndDate('');
        getMxU01ist();
    }

    return (
        <>
            <AnularMx
                show={show}
                disabledOtroMotivo={disabledOtroMotivo}
                disabledOtroMotivoSelected={disabledOtroMotivoSelected}
                otroMotivo={otroMotivo}
                ckOtroMotivo={ckOtroMotivo}
                motivosAnulacion={motivosAnulacion}
                selectedMotivo={selectedMotivo}
                handleChangeMotivo={handleChangeMotivo}
                handleClose={handleClose}
                handleChangeCkOtroMotivo={handleChangeCkOtroMotivo}
                handleChangeOtroMotivo={handleChangeOtroMotivo}
                errorMessageOtroMotivo={errorMessageOtroMotivo}
                errorMessageOtroMotivoSelected={errorMessageOtroMotivoSelected}
                saveData={saveData}
            />
            <MxU01List
                titleForm={titleForm}
                data={data}
                columns={columns}
                pagination={pagination}
                executeLoading={executeLoading}
                startDate={startDate}
                endDate={endDate}
                code={code}
                handleChangeStartDate={handleChangeStartDate}
                handleChangeEndDate={handleChangeEndDate}
                handleChangeCode={handleChangeCode}
                errorStartDate={errorStartDate}
                errorEndDate={errorEndDate}
                searchData={searchData}
                clearFilters={clearFilters}
                onKeyPressCode={onKeyPressCode}

            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
}

export default MxU01ListContainer;
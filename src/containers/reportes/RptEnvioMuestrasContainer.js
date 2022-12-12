import React, { useEffect, useState } from "react";
import DataServices from '../../service/Api';
import DataServiceCatalogos from '../../service/ApiCatalogos';
import ToastContainer from '../../components/toast/Toast';
import Utils from '../../utils/Utils';
import GeneratePDFMxEnviadas from "../reportes/RptGeneradorMxEnviadas";
import GeneratePDFMxEnviadasRojo from "../reportes/RptGeneradorMxEnviadasRojo";
import GeneratePDFMxEnviadasHisopados from "../reportes/RptGeneradorMxEnviadasHisopados";
import RptEnvioMuestras from "../../components/reportes/reporteEnvio/RptEnvioMuestras";
//import ToastContainer from '../../components/toast/Toast';

const RptEnvioMuestrasContainer = props => {
    const [titleForm] = useState('Reporte envio muestras');
    const [viaje, setViaje] = useState('');
    let [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [executeLoading, setExecuteLoading] = useState(false);
    const [envioMuestraData, setEnvioMuestraData] = useState([]);
    const [selectedTipoMuestra, setSelectedTipoMuestra] = useState('');

    let [dataPbmc, setDataPbmc] = useState([]);
    const [dataRojo, setDataRojo] = useState([]);
    const [dataHisopados, setDataHisopados] = useState([]);

    const [errorStartDate, setErrorStartDate] = useState('');
    const [errorEndDate, setErrorEndDate] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            getAllEnvioMuestras();
        } else {
            props.history.push('/');
        }

    }, [props]);

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    const getAllEnvioMuestras = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceCatalogos.getAllTipoMuestras();
            if (response.status === 200) {
                setEnvioMuestraData(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    const getMxEnviadasByRangeDateAndTipoMx = async (id) => {
        setExecuteLoading(true);
        setData([]);
        try {
            let response = null;
            /**HISOPADOS */
            if (id === 1 || id === 2 || id === 3 || id === 4 || id === 5 || id === 6) {
                response = await DataServices.muestrasHisopadosEnviadosRangeDateAndViaje(startDate, endDate, viaje);
                if (response !== null) {
                    if (response.status === 200) {
                        setExecuteLoading(false);
                        const getDataHisopados = [];
                        for (var i = 0; i < response.data.length; i++) {
                            getDataHisopados.push({
                                "muestraId": response.data[i].id,
                                "tipo": "HISOPADO",
                                "codigo": response.data[i].codigo,
                                "estudios": response.data[i].estudios,
                                "codigoLab": response.data[i].codigoLab,
                                "fif": response.data[i].fif,
                                "fechaToma": response.data[i].fechaToma,
                                "volumen": response.data[i].volumen,
                                "observacion": response.data[i].observacion
                            });
                        }
                        setDataHisopados([...getDataHisopados]);
                        setData(getDataHisopados);
                    }
                }
            } else if (id === 8) { /**PBMC */
                response = await DataServices.muestrasPbmcEnviadasRangeDateAndViaje(startDate, endDate, viaje);
                if (response !== null) {
                    if (response.status === 200) {
                        setExecuteLoading(false);
                        const getData = [];
                        for (var j = 0; j < response.data.length; j++) {
                            getData.push({
                                "muestraId": response.data[j].id,
                                "tipo": "PBMC",
                                "codigo": response.data[j].codigo,
                                "estudios": response.data[j].estudios,
                                "codigoLab": response.data[j].codigoLab,
                                "fif": response.data[j].fif,
                                "fechaToma": response.data[j].fechaToma,
                                "volumen": response.data[j].volumen,
                                "observacion": response.data[j].observacion
                            });
                        }
                        setDataPbmc([...getData]);
                        setData(getData);
                    }
                }

            } else if (id === 12 || id === 13) { /**ROJO O SEROLOGIA*/
                response = await DataServices.muestrasRojoEnviadasRangeDateAndViaje(startDate, endDate, viaje);
                if (response !== null) {
                    if (response.status === 200) {
                        setExecuteLoading(false);
                        const getDataRojo = [];
                        for (var k = 0; k < response.data.length; k++) {
                            getDataRojo.push({
                                "muestraId": response.data[k].id,
                                "tipo": "ROJO",
                                "codigo": response.data[k].codigo,
                                "estudios": response.data[k].estudios,
                                "codigoLab": response.data[k].codigoLab,
                                "fif": response.data[k].fif,
                                "fechaToma": response.data[k].fechaToma,
                                "volumen": response.data[k].volumen,
                                "observacion": response.data[k].observacion,
                            });
                        }
                        setDataRojo([...getDataRojo]);
                        setData(getDataRojo);
                    }
                }
            } else {
                setType("error");
                setMessageAlert("No se encontraron datos para el tipo de muestra seleccionada");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
                return
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /* const getMuestrasPendientesByIdMuestra = async (id, viaje) => {
        setExecuteLoading(true);
        try {
            let response = null;
            /**DENGUE
            /**BHC
            if (id === 7) {
                setRptTitle("BHC");
                response = await DataServices.muestrasEnviadasBHC(id, viaje, startDate, endDate);
            }
            /**UO1
            else if (id === 1) {
                setRptTitle("Influenza UO1");
                response = await DataServices.muestrasEnviadasUO1(id, viaje, startDate, endDate);
            }
            else if (id === 2) {
                setRptTitle("Influenza UO1 Vacunas");
                response = await DataServices.muestrasEnviadasUO1(id, viaje, startDate, endDate);
            }
            /**TRANSMISION 
            else if (id === 3) {
                setRptTitle("Monitoreo Intensivo PBMC");
                response = await DataServices.muestrasEnviadasTransmision(id, viaje, startDate, endDate);
            }
            else if (id === 4) {
                setRptTitle("Monitoreo Intensivo ROJO");
                response = await DataServices.muestrasEnviadasTransmision(id, viaje, startDate, endDate);
            }
            else if (id === 5) {
                setRptTitle("Covid-19 PBMC");
                response = await DataServices.muestrasEnviadasTransmision(id, viaje, startDate, endDate);
            }
            else if (id === 6) {
                setRptTitle("Covid-19 ROJO");
                response = await DataServices.muestrasEnviadasTransmision(id, viaje, startDate, endDate);
            }
            else if (id === 8) {
                setRptTitle("Hisopados Covid-19");
                response = await DataServices.muestrasEnviadasTransmision(id, viaje, startDate, endDate);
            }
            else if (id === 9) {
                setRptTitle("Hisopados Monitoreo Intensivo");
                response = await DataServices.muestrasEnviadasTransmision(id, viaje, startDate, endDate);
            } else {
                return;
            }

            if (response !== null) {
                if (response.status === 200) {
                    setExecuteLoading(false);
                    console.log(response.data);
                    setData(response.data);
                }
            } else {
                setExecuteLoading(false);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    } */

    const handleChangeTipoMuestra = (e) => {
        setSelectedTipoMuestra(e.target.value);
        clearData();
        //console.log(e.target.value)
    }

    const handleChangeViaje = (e) => {
        setViaje(e.target.value);
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

    const validateData = () => {
        if (selectedTipoMuestra < 0 || selectedTipoMuestra === '0' || selectedTipoMuestra === '') {
            setType("error");
            setMessageAlert("Debe seleccionar el tipo de muestra");
            setTimeout(function () {
                initialStateToast();
            }, 100);
            return false;
        }

        if (viaje <= 0) {
            setType("error");
            setMessageAlert("Número de viaje incorrecto");
            setTimeout(function () {
                initialStateToast();
            }, 100);
            return false;
        }
        return true;
    }

    const searchData = () => {
        if (validateData()) {
            getMxEnviadasByRangeDateAndTipoMx(selectedTipoMuestra);
        }
    }

    const getPdfFile = () => {
        if (validateData()) {
            if (dataPbmc.length > 0) {
                GeneratePDFMxEnviadas(dataPbmc, null, viaje);
            }
            if (dataRojo.length > 0) {
                GeneratePDFMxEnviadasRojo(dataRojo, null, viaje);
            }
            if (dataHisopados.length > 0) {
                GeneratePDFMxEnviadasHisopados(dataHisopados, null, viaje);
            }
        }
    }

    const clearData = () => {
        setViaje('');
        setStartDate('');
        setEndDate('');
        setData([]);
    }

    return (
        <>
            <RptEnvioMuestras
                titleForm={titleForm}
                viaje={viaje}
                data={data}
                startDate={startDate}
                endDate={endDate}
                envioMuestraData={envioMuestraData}
                selectedTipoMuestra={selectedTipoMuestra}
                executeLoading={executeLoading}
                handleChangeTipoMuestra={handleChangeTipoMuestra}
                handleChangeViaje={handleChangeViaje}
                handleChangeStartDate={handleChangeStartDate}
                handleChangeEndDate={handleChangeEndDate}
                searchData={searchData}
                getPdfFile={getPdfFile}
                errorStartDate={errorStartDate}
                errorEndDate={errorEndDate}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
};

export default RptEnvioMuestrasContainer;
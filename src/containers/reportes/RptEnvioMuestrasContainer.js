import React, { useEffect, useState } from "react";
import DataServices from '../../service/Api';
import ToastContainer from '../../components/toast/Toast';
import GeneratePDFMxEnviadas from "./RptGeneradorMxEnviadas";
import RptEnvioMuestras from "../../components/reportes/reporteEnvio/RptEnvioMuestras";
//import ToastContainer from '../../components/toast/Toast';

const RptEnvioMuestrasContainer = props => {
    const [titleForm] = useState('Reportes');
    const [rptTitle, setRptTitle] = useState('');
    const [viaje, setViaje] = useState('');
    const [data, setData] = useState([]);
    const [executeLoading, setExecuteLoading] = useState(false);
    const [envioMuestraData, setEnvioMuestraData] = useState([]);
    const [selectedEnvioMuestra, setSelectedEnvioMuestra] = useState('');

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
            const response = await DataServices.getAllCatEnvioMuestras();
            if (response.status === 200) {
                setEnvioMuestraData(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    const getMuestrasPendientesByIdMuestra = async (id, viaje) => {
        setExecuteLoading(true);
        try {
            let response = null;
            /**DENGUE */
            /**BHC */
            if (id === 7) {
                setRptTitle("BHC");
                response = await DataServices.muestrasEnviadasBHC(id, viaje);
            }
            /**UO1 */
            else if (id === 1) {
                setRptTitle("Influenza UO1");
                response = await DataServices.muestrasEnviadasUO1(id, viaje);
            }
            else if (id === 2) {
                setRptTitle("Influenza UO1 Vacunas");
                response = await DataServices.muestrasEnviadasUO1(id, viaje);
            }
            /**TRANSMISION */
            else if (id === 3) {
                setRptTitle("Monitoreo Intensivo PBMC");
                response = await DataServices.muestrasEnviadasTransmision(id, viaje);
            }
            else if (id === 4) {
                setRptTitle("Monitoreo Intensivo ROJO");
                response = await DataServices.muestrasEnviadasTransmision(id, viaje);
            }
            else if (id === 5) {
                setRptTitle("Covid-19 PBMC");
                response = await DataServices.muestrasEnviadasTransmision(id, viaje);
            }
            else if (id === 6) {
                setRptTitle("Covid-19 ROJO");
                response = await DataServices.muestrasEnviadasTransmision(id, viaje);
            }
            else if (id === 8) {
                setRptTitle("Hisopados Covid-19");
                response = await DataServices.muestrasEnviadasTransmision(id, viaje);
            }
            else if (id === 9) {
                setRptTitle("Hisopados Monitoreo Intensivo");
                response = await DataServices.muestrasEnviadasTransmision(id, viaje);
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
    }

    const handleChangeEnvioMuestra = (e) => {
        setSelectedEnvioMuestra(e.target.value);        
        //console.log(e.target.value)
    }

    const handleChangeViaje = (e) => {
        setViaje(e.target.value);
    } 

    const validateData = () => {
        if (selectedEnvioMuestra < 0 || selectedEnvioMuestra === '0' || selectedEnvioMuestra === '') {
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
            getMuestrasPendientesByIdMuestra(selectedEnvioMuestra, viaje);
        }
    }

    const getPdfFile = () => {
        if (validateData()) {
            if (data.length > 0) {
                GeneratePDFMxEnviadas(rptTitle, data, viaje);
            }
        }
      }

    return (
        <>
            <RptEnvioMuestras
                titleForm={titleForm}
                viaje={viaje}
                data={data}
                envioMuestraData={envioMuestraData}
                selectedEnvioMuestra={selectedEnvioMuestra}
                executeLoading={executeLoading}
                handleChangeEnvioMuestra={handleChangeEnvioMuestra}
                handleChangeViaje={handleChangeViaje}
                searchData={searchData}
                getPdfFile={getPdfFile}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
};

export default RptEnvioMuestrasContainer;
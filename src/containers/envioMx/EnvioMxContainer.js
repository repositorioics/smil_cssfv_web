import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DataServices from '../../service/Api';
import ToastContainer from '../../components/toast/Toast';
import GeneratePDFMxEnviadas from "../reportes/RptGeneradorMxEnviadas";
import EnvioMuestras from '../../components/envioMuestras/EnvioMuestras';
import '../../components/envioMuestras/EnvioMuestras.css';

const EnvioMxContainer = props => {
    const [titleForm] = useState('Envio de muestras');
    let [rptTitle, setRptTitle] = useState('');
    const [envioMuestra, setEnvioMuestra] = useState('');
    let [bioanalistas, setBioanalistas] = useState([]);
    const [data, setData] = useState([]);
    let [listToSave, setListToSave] = useState([]);
    const [muestrasData, setMuestrasData] = useState([]);
    const [envioMuestraData, setEnvioMuestraData] = useState([]);
    const [selectedEnvioMuestra, setSelectedEnvioMuestra] = useState('');
    const [selectedMuestra, setSelectedMuestra] = useState('');
    const [selectedBioanalista, setSelectedBioanalista] = useState('');
    const [executeLoading, setExecuteLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [selectedHora, setSelectedHora] = useState(new Date());
    const [temp, setTemp] = useState('');
    const [viaje, setViaje] = useState('');
    const [disabledPrintDocument, setDisabledPrintDocument] = useState(true);

    const [errorBioanlista, setErrorBioanlista] = useState('');
    const [errorTemp, setErrorTemp] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    let [list, setList] = useState([]);
    const [masterChecked, setMasterChecked] = useState(false);

    //let [temperatureValue, setTemperatureValue] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            getAllMuestras();
            getBionalistas();
            getAllEnvioMuestras();
        } else {
            props.history.push('/');
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    const getMuestrasPendientesByIdMuestra = async (id) => {
        setExecuteLoading(true);
        try {
            let response = null;
            /**DENGUE */
            /**BHC */
            if (id === 7) {
                response = await DataServices.muestrasPendientesBHC(id);
            }
            /**UO1 */
            if (id === 1 || id === 2) {
                response = await DataServices.muestrasPendientesUO1(id);
            }
            /**TRANSMISION */
            if (id === 3 || id === 4 || id === 5 || id === 6 || id === 8 || id === 9) {
                response = await DataServices.muestrasPendientesTransmision(id);
            }

            if (response !== null) {
                if (response.status === 200) {
                    setExecuteLoading(false);
                    const getData = [];
                    console.log(response.data);
                    for (var i = 0; i < response.data.length; i++) {
                        getData.push({
                            //"id": response.data[i].id,
                            "muestraId": response.data[i].muestraId.id,
                            "codigo": response.data[i].muestraId.codigoParticipante,
                            "estudio": response.data[i].muestraId.estudiosParticipante,
                            "codLab": response.data[i].muestraId.codLab,
                            "fechaToma": response.data[i].muestraId.fechaToma,
                            "estado": false
                        });
                    }
                    setData([...getData]);
                    setMasterChecked(false);
                }
            } else {
                setExecuteLoading(false);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Metodo para obtener todas las muestras activas*/
    const getAllMuestras = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllCatMuestasActivas();
            if (response.status === 200) {
                setExecuteLoading(false);
                setMuestrasData(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    const getAllEnvioMuestras = async() => {
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

    /**Metodo para obtener todas las muestras pendientes de Dengue 
    const getAllMxDenguePendientesEnvio = async(id) => {
        try {
            const response = await DataServices.muestrasPendientesDengue(id);
            if (response.status === 200) {
                console.log('Dengue', response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }*/
    /**Metodo para obtener todas las muestras pendientes de BHC 
    const getAllMxBHCPendientesEnvio = async(id) => {
        try {
            const response = await DataServices.muestrasPendientesBHC(id);
            if (response.status === 200) {
                console.log('BHC', response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }*/
    /**Metodo para obtener todas las muestras pendientes de UO1 
    const getAllMxUO1PendientesEnvio = async(id) => {
        try {
            const response = await DataServices.muestrasPendientesUO1(id);
            if (response.status === 200) {
                console.log('UO1', response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }*/
    /**Metodo para obtener todas las muestras pendientes de Vacunas
    const getAllMxUO1VacunasPendientesEnvio = async() =>{
        try {
            const response = await DataServices.muestrasVacunasPendientesUO1();
            if (response.status === 200) {
                console.log('UO1 Vacunas', response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    } */
    /**Metodo para obtener todas las muestras pendientes de Monitoreo Intensivo PBMC 
    const getAllMxMonitoreoIntensivoPBMC = async() => {
        try {
            const response = await DataServices.muestrasPendientesTransmisionMonitoreoIntensivoPbmc();
            if (response.status === 200) {
                console.log('Monitoreo Intensivo PBMC', response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }*/
    /**Metodo para obtener todas las muestras transmision pendientes de envio filtrado por id 
    const getAllMxTransmisionByIdMxEnvio = async(id) => {
        try {
            const response = await DataServices.muestrasPendientesTransmision(id);
            if (response.status === 200) {
                console.log('Transmision', response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }*/

    /**Funcion para obtener los bioanalistas */
    const getBionalistas = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllUserProfileByNombre('Bioanalista');
            if (response.status === 200) {
                setExecuteLoading(false);
                const multiSelectData = [];
                if (response.data.length > 0) {
                    for (let i = 0; i < response.data.length; i++) {
                        const newObject = {}
                        newObject.id = response.data[i].usuarioId.id;
                        newObject.nombre = response.data[i].usuarioId.nombres + " " + response.data[i].usuarioId.apellidos;

                        multiSelectData.push(newObject);
                    }
                }
                bioanalistas = multiSelectData;
                setBioanalistas(bioanalistas);
                const accountData = JSON.parse(localStorage.getItem('accountData'));
                if (accountData !== null) {
                    let result = bioanalistas.filter(item => item.id === accountData.usuarioId);
                    if (result.length > 0) {
                        setSelectedBioanalista(result[0].id);
                    }
                }
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    /* const onSelect = (e) => {
        setSelectedMuestra(e.target.value);
        const id = e.target.value;
        getMuestrasPendientesByIdMuestra(id);
        initialStateToast();
    } */

    const handleChangeBionalista = (e) => {
        setSelectedBioanalista(e.target.value);
        setErrorBioanlista('');
    }

    const handleChangeEnvioMuestra = (e) => {
        setSelectedEnvioMuestra(e.target.value);
        setDisabledPrintDocument(true);
        const id = e.target.value;
        getMuestrasPendientesByIdMuestra(id);
        initialStateToast();
        //console.log(e.target.value)
    }

    const handleChangeDate = (e) => {
        setDate(e);
    }

    const handleChangeHora = (e) => {
        setSelectedHora(e);
    }

    const handleChangeTemp = (e) => {
        setErrorTemp('');
        setTemp(e.target.value);
    }

    const handleChangeViaje = (e) => {
        setViaje(e.target.value);
    }

    // Select/ UnSelect Table rows
    const onMasterCheck = (e) => {
        let tempList = data;
        // Check / UnCheck All Items
        if (e.target.checked) {
            tempList.map((a) => (a.estado = e.target.checked));
            //Update State
            setMasterChecked(e.target.checked);
            setList(tempList);
            setData(tempList);

            //Update List
            if (listToSave.length <= 0) {
                setListToSave(tempList);
            } else {
                const list = [];
                list.push(listToSave);
                for (let i = 0; i < tempList.length; i++) {
                    //Buscamos si ya existe el item
                    const filtro = listToSave.filter((a) => a.muestraId === tempList[i].muestraId);
                    if (filtro.length <= 0) {
                        list[0].push(tempList[i]);
                    }
                }
            }
        } else {
            setMasterChecked(e.target.checked);
            tempList.map((a) => (a.estado = e.target.checked));
        }
    }

    // Update List Item's state and Master Checkbox State
    const onItemCheck = (e, item) => {
        list = data;
        let tempList = list;
        for (let i = 0; i < tempList.length; i++) {
            if (tempList[i].muestraId === item.muestraId) {
                tempList[i].estado = e.target.checked;
            }
        }

        //To Control Master Checkbox State
        const totalItems = list.length;
        const totalCheckedItems = tempList.filter((e) => e.estado).length;

        if (item.estado === true) { //Verificamos que el estado sea verdadero
            if (listToSave.length <= 0) { // Si la lista esta vacia se ingresa el item
                listToSave.push(item);
            } else {
                const filtro = listToSave.filter((a) => a.muestraId === item.muestraId); //Buscamos si ya existe el item
                if (filtro.length > 0) {
                    setType("warning");
                    setMessageAlert("La muestra seleccionada ya fue agregada ");
                    setTimeout(function () {
                        initialStateToast();
                    }, 100);
                    return;
                } else {
                    listToSave.push(item);
                }
            }
        }
        // Update State
        setListToSave(listToSave);
        setMasterChecked(totalItems === totalCheckedItems);
        setList([...list, tempList]);
        setData(list);
    }

    const onItemCheckRemove = (e, item) => {
        let filteredArray = listToSave.filter(a => a.muestraId !== item.muestraId);
        const arrayData = data;
        for (let i = 0; i < arrayData.length; i++) {
            if (arrayData[i].muestraId === item.muestraId) {
                arrayData[i].estado = false;
            }
        }
        setMasterChecked(false);
        setListToSave(filteredArray);
        setData(arrayData);
    }

    const saveData = ()=> {
        if (validateData()) {
            /* if (validateTemp() === null) {
                setErrorTemp('Formato invalido');
                return;
            } */
            if (listToSave.length <= 0) {
                setType("info");
                setMessageAlert("No existen datos seleccionados para guardar");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
                return;
            }
            const bioanalistaEnvia = {};
            let time = null;
            bioanalistaEnvia.id = selectedBioanalista;
            if (selectedHora !== null) {
                time = moment(selectedHora).format("hh:mm A");
            }
            const muestra = [];
            for (let i = 0; i < listToSave.length; i++) {
                muestra.push({
                    'id': listToSave[i].muestraId,
                    'bioanalistaEnvia': bioanalistaEnvia,
                    'fechaEnvio': date,
                    'viaje': viaje,
                    'horaEnvio': time,
                    'tempEnvio': temp
                });
            }
            putMuestras(muestra);
        }
    }

    const printDocument = async() => {
        setExecuteLoading(true);
        try {
            let response = null;
            /**BHC */
            if (selectedEnvioMuestra === 7) {
                rptTitle = "BHC";
                setRptTitle(rptTitle);
                response = await DataServices.muestrasEnviadasBHC(selectedEnvioMuestra, viaje, "", "");
            }
            /**UO1 */
            else if (selectedEnvioMuestra === 1) {
                rptTitle = "Influenza UO1";
                setRptTitle(rptTitle);
                response = await DataServices.muestrasEnviadasUO1(selectedEnvioMuestra, viaje,  "", "");
            }
            else if (selectedEnvioMuestra === 2) {
                rptTitle = "Influenza UO1 Vacunas";
                setRptTitle(rptTitle);
                response = await DataServices.muestrasEnviadasUO1(selectedEnvioMuestra, viaje, "", "");
            }
            /**TRANSMISION */
            else if (selectedEnvioMuestra === 3) {
                rptTitle = "Monitoreo Intensivo PBMC";
                setRptTitle(rptTitle);
                response = await DataServices.muestrasEnviadasTransmision(selectedEnvioMuestra, viaje, "", "");
            }
            else if (selectedEnvioMuestra === 4) {
                rptTitle = "Monitoreo Intensivo ROJO";
                setRptTitle(rptTitle);
                response = await DataServices.muestrasEnviadasTransmision(selectedEnvioMuestra, viaje, "", "");
            }
            else if (selectedEnvioMuestra === 5) {
                rptTitle = "Covid-19 PBMC";
                setRptTitle(rptTitle);
                response = await DataServices.muestrasEnviadasTransmision(selectedEnvioMuestra, viaje, "", "");
            }
            else if (selectedEnvioMuestra === 6) {
                rptTitle = "Covid-19 ROJO";
                setRptTitle(rptTitle);
                response = await DataServices.muestrasEnviadasTransmision(selectedEnvioMuestra, viaje, "", "");
            }
            else if (selectedEnvioMuestra === 8) {
                rptTitle = "Hisopados Covid-19";
                setRptTitle(rptTitle);
                response = await DataServices.muestrasEnviadasTransmision(selectedEnvioMuestra, viaje, "", "");
            }
            else if (selectedEnvioMuestra === 9) {
                rptTitle = "Hisopados Monitoreo Intensivo";
                setRptTitle(rptTitle);
                response = await DataServices.muestrasEnviadasTransmision(selectedEnvioMuestra, viaje, "", "");
            } else {
                return;
            }
            if (response !== null) {
                if (response.status === 200) {
                    setExecuteLoading(false);
                    if (response.data !== null && response.data.length > 0 ) {
                        GeneratePDFMxEnviadas(rptTitle, response.data, viaje);
                    }
                }
            } else {
                setExecuteLoading(false);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
        
    }

    const putMuestras = async (muestra) => {
        setExecuteLoading(true);
        try {
            let result = await DataServices.verificarEnvioSeleccionado(viaje);
            if (result.status === 200) {
                if (result.data > 0) {
                    setExecuteLoading(false);
                    setType("info");
                    setMessageAlert("Ya se realizo el viaje " + viaje + " para dia de hoy");
                    setTimeout(function () {
                        initialStateToast();
                    }, 100);
                    return;
                } 
            }
            const response = await DataServices.enviarMuestras(muestra);
            if (response.status === 200) {
                printDocument();
                setExecuteLoading(false);
                setEnvioMuestra('');
                setData([]);
                setListToSave([]);
                setSelectedMuestra('');
                //setSelectedEnvioMuestra('');
                setSelectedBioanalista('');
                setTemp('');
                //setViaje('');
                setDisabledPrintDocument(false);
                setType("success");
                setMessageAlert("Se guardarón los datos");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para validar la temperatura que debe de ser 
     * Uno o dos enteros con dos decimales o cero decimales
     * Ejemplo: 0.00*/
    /* const validateTemp = () => {
        if (temp !== null && temp !== '' && temp !== undefined) {
            const pattern = "(?<![\\d.])(\\d{1,2}|\\d{0,2}\\.\\d{1,2})?(?![\\d.])"
            const result = temp.match(pattern);
            return result;
            //console.log('resultdo', result);
        }
    } */

    const validateData = () => {
        if (selectedEnvioMuestra === '' || selectedEnvioMuestra === null || selectedEnvioMuestra === undefined
            || selectedEnvioMuestra === '0') {
            setType('error');
            setMessageAlert('Debe seleccionar el tipo de muestra a enviar');
            setTimeout(function () {
                initialStateToast();
            }, 100);
            return false;

        }
        if (selectedBioanalista === '' || selectedBioanalista === null || selectedBioanalista === undefined
            || selectedBioanalista === '0') {
            setType('error');
            setMessageAlert('Debe seleccionar el bionalista');
            setTimeout(function () {
                initialStateToast();
            }, 100);
            return false;
        }

        if (date === '' || date === null || date === undefined) {
            setType('error');
            setMessageAlert('Debe ingresar la fecha');
            setTimeout(function () {
                initialStateToast();
            }, 100);
            return false;
        }

        if (selectedHora === '' || selectedHora === null || selectedHora === undefined) {
            setType('error');
            setMessageAlert('Debe ingresar la hora');
            setTimeout(function () {
                initialStateToast();
            }, 100);
            return false;
        }

        if (temp === '' || temp === null || temp === undefined) {
            setType('error');
            setMessageAlert('Debe ingresar la temperatura');
            setTimeout(function () {
                initialStateToast();
            }, 100);
            return false;
        }

        if (viaje === '' || viaje === null || viaje === undefined) {
            setType('error');
            setMessageAlert('Debe ingresar el viaje');
            setTimeout(function () {
                initialStateToast();
            }, 100);
            return false;
        }
        if (viaje <= 0) {
            setType('error');
            setMessageAlert('No pueder realizar un envio con valor 0');
            setTimeout(function () {
                initialStateToast();
            }, 100);
            return false;
        }
        return true;
    }

    /*const more = (e) => {
        temperatureValue = temperatureValue + 1;
        setTemperatureValue(temperatureValue);
    }
    const minos = () => {
        temperatureValue = temperatureValue - 1;
        setTemperatureValue(temperatureValue);
    }*/

    return (
        <>
            <EnvioMuestras
                titleForm={titleForm}
                envioMuestra={envioMuestra}
                muestrasData={muestrasData}
                envioMuestraData={envioMuestraData}
                bioanalistas={bioanalistas}
                //onSelect={onSelect}
                selectedMuestra={selectedMuestra}
                selectedBioanalista={selectedBioanalista}
                selectedEnvioMuestra={selectedEnvioMuestra}
                data={data}
                listToSave={listToSave}
                executeLoading={executeLoading}
                date={date}
                selectedHora={selectedHora}
                temp={temp}
                viaje={viaje}
                /*temperatureValue={temperatureValue}
                more={more}
                minos={minos}*/
                saveData={saveData}
                printDocument={printDocument}
                handleChangeBionalista={handleChangeBionalista}
                handleChangeEnvioMuestra={handleChangeEnvioMuestra}
                handleChangeDate={handleChangeDate}
                handleChangeHora={handleChangeHora}
                handleChangeTemp={handleChangeTemp}
                handleChangeViaje={handleChangeViaje}
                onMasterCheck={onMasterCheck}
                masterChecked={masterChecked}
                onItemCheck={onItemCheck}
                onItemCheckRemove={onItemCheckRemove}
                disabledPrintDocument={disabledPrintDocument}
                errorBioanlista={errorBioanlista}
                errorTemp={errorTemp}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
}

export default EnvioMxContainer;
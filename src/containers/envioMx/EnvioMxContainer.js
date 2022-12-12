import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DataServices from '../../service/Api';
//import DataServiceCatalogos from '../../service/ApiCatalogos';
import DataServiceSeguridad from '../../service/ApiSeguridad';
import ToastContainer from '../../components/toast/Toast';
import GeneratePDFMxEnviadas from "../reportes/RptGeneradorMxEnviadas";
import GeneratePDFMxEnviadasRojo from "../reportes/RptGeneradorMxEnviadasRojo";
import GeneratePDFMxEnviadasHisopados from "../reportes/RptGeneradorMxEnviadasHisopados";
import EnvioMuestras from '../../components/envioMuestras/EnvioMuestras';
import '../../components/envioMuestras/EnvioMuestras.css';

const EnvioMxContainer = props => {
    const [titleForm] = useState('Muestras pendientes de envio');
    const [envioMuestra, setEnvioMuestra] = useState('');
    let [bioanalistas, setBioanalistas] = useState([]);
    let [dataPbmc, setDataPbmc] = useState([]);
    const [dataRojo, setDataRojo] = useState([]);
    const [dataHisopados, setDataHisopados] = useState([]);
    let [listToSave, setListToSave] = useState([]);
    //const [muestrasData, setMuestrasData] = useState([]);
    //const [envioMuestraData, setEnvioMuestraData] = useState([]);
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

    let [chkAllPbmc, setChkAllPbmc] = useState(false);
    let [chkAllTRojo, setChkAllTRojo] = useState(false);
    let [chkAllHisopados, setChkAllHisopados] = useState(false);
    let [checkAddMxEnvio, setCheckAddMxEnvio] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            getBionalistas();
            getMuestrasPBMCPendientesEnvio();
            getMuestrasTuboRojoPendientesEnvio();
            getHisopadosPendientesEnvio();
            //getAllMuestras();
            //getAllEnvioMuestras();
        } else {
            props.history.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    /**Metodo para obtener todas las muestras pbmc pendientes de envio */
    const getMuestrasPBMCPendientesEnvio = async () => {
        try {
            const response = await DataServices.getAllMxPBMCPendientesEnvio();
            if (response !== null) {
                if (response.status === 200) {
                    setExecuteLoading(false);
                    const getData = [];
                    for (var i = 0; i < response.data.length; i++) {
                        getData.push({
                            "muestraId": response.data[i].id,
                            "tipo": "PBMC",
                            "codigo": response.data[i].codigo,
                            "estudio": response.data[i].estudios,
                            "codLab": response.data[i].codigoLab,
                            "fechaToma": response.data[i].fechaToma,
                            "estado": false
                        });
                    }
                    setDataPbmc([...getData]);
                }
            } else {
                setExecuteLoading(false);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Metodo para obtener todas las muestras de tubo rojo pendientes de envio */
    const getMuestrasTuboRojoPendientesEnvio = async () => {
        try {
            const response = await DataServices.getAllMxRojoPendientesEnvio();
            if (response !== null) {
                if (response.status === 200) {
                    setExecuteLoading(false);
                    const getDataRojo = [];
                    for (var i = 0; i < response.data.length; i++) {
                        getDataRojo.push({
                            "muestraId": response.data[i].id,
                            "tipo": "ROJO",
                            "codigo": response.data[i].codigo,
                            "estudio": response.data[i].estudios,
                            "codLab": response.data[i].codigoLab,
                            "fechaToma": response.data[i].fechaToma,
                            "estado": false
                        });
                    }
                    setDataRojo([...getDataRojo]);
                }
            } else {
                setExecuteLoading(false);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Metodo para obtener todos los hisopados pendientes de envio */
    const getHisopadosPendientesEnvio = async () => {
        try {
            const response = await DataServices.getAllHisopadosPendientesEnvio();
            if (response !== null) {
                if (response.status === 200) {
                    setExecuteLoading(false);
                    const getDataHisopados = [];
                    for (var i = 0; i < response.data.length; i++) {
                        getDataHisopados.push({
                            "muestraId": response.data[i].id,
                            "tipo": "HISOPADO",
                            "codigo": response.data[i].codigo,
                            "estudio": response.data[i].estudios,
                            "codLab": response.data[i].codigoLab,
                            "fechaToma": response.data[i].fechaToma,
                            "estado": false
                        });
                    }
                    setDataHisopados([...getDataHisopados]);
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
    /* const getAllMuestras = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceCatalogos.getAllCatMuestasActivas();
            if (response.status === 200) {
                setExecuteLoading(false);
                setMuestrasData(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    } */

    /* const getAllEnvioMuestras = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceCatalogos.getAllCatEnvioMuestras();
            if (response.status === 200) {
                setEnvioMuestraData(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    } */

    /**Funcion para obtener los bioanalistas */
    const getBionalistas = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceSeguridad.getAllUserProfileByNombre('Bioanalista');
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

    const handleChangeBionalista = (e) => {
        setSelectedBioanalista(e.target.value);
        setErrorBioanlista('');
    }

    const handleChangeEnvioMuestra = (e) => {
        setSelectedEnvioMuestra(e.target.value);
        setDisabledPrintDocument(true);
        initialStateToast();
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

    /**Seleccionar todos los pbmc a enviar */
    const onCheckAllPbmc = (e) => {
        let tempListDataPbmc = dataPbmc;
        setChkAllPbmc(e.target.checked);
        if (e.target.checked) {
            tempListDataPbmc.map((a) => (a.estado = e.target.checked));
            if (listToSave.length <= 0) {
                for (let i = 0; i < tempListDataPbmc.length; i++) {
                    listToSave.push(tempListDataPbmc[i]);
                }
            } else {
                for (let i = 0; i < tempListDataPbmc.length; i++) {
                    //Verificamos si ya existe la muestra en la lista a enviar
                    const filtro = listToSave.filter((a) => a.muestraId === tempListDataPbmc[i].muestraId);
                    if (filtro.length <= 0) {
                        listToSave.push(tempListDataPbmc[i]);
                    }
                }
            }
        } else {
            tempListDataPbmc.map((a) => (a.estado = e.target.checked));
            listToSave = listToSave.filter(a => !dataPbmc.find(b => (b.muestraId === a.muestraId) ));
        }
        setListToSave(listToSave);
        setDataPbmc(tempListDataPbmc);
    }

    /**Seleccionar todos los tubos rojo a enviar */
    const onCheckAllTRojo = (e) => {
        let tempListDataRojo = dataRojo;
        setChkAllTRojo(e.target.checked);
        if (e.target.checked) {
            tempListDataRojo.map((a) => (a.estado = e.target.checked));
            if (listToSave.length <= 0) {
                for (let i = 0; i < tempListDataRojo.length; i++) {
                    listToSave.push(tempListDataRojo[i]);
                }
            } else {
                for (let i = 0; i < tempListDataRojo.length; i++) {
                    //Verificamos si ya existe la muestra en la lista a enviar
                    const filtro = listToSave.filter((a) => a.muestraId === tempListDataRojo[i].muestraId);
                    if (filtro.length <= 0) {
                        listToSave.push(tempListDataRojo[i]);
                    }
                }
            }
        } else {
            tempListDataRojo.map((a) => (a.estado = e.target.checked));
            listToSave = listToSave.filter(a => !dataRojo.find(b => (b.muestraId === a.muestraId) ));
        }
        setListToSave(listToSave);
        setDataRojo(tempListDataRojo);
    }

    /**Seleccionar todos los hisopados */
    const onCheckAllHisopados = (e) => {
        let tempListDataHisopados = dataHisopados;
        setChkAllHisopados(e.target.checked);
        if (e.target.checked) {
            tempListDataHisopados.map((a) => (a.estado = e.target.checked));
            if (listToSave.length <= 0) {
                for (let i = 0; i < tempListDataHisopados.length; i++) {
                    listToSave.push(tempListDataHisopados[i]);
                }
            } else {
                for (let i = 0; i < tempListDataHisopados.length; i++) {
                    //Verificamos si ya existe la muestra en la lista a enviar
                    const filtro = listToSave.filter((a) => a.muestraId === tempListDataHisopados[i].muestraId);
                    if (filtro.length <= 0) {
                        listToSave.push(tempListDataHisopados[i]);
                    }
                }
            }
        } else {
            tempListDataHisopados.map((a) => (a.estado = e.target.checked));
            listToSave = listToSave.filter(a => !dataHisopados.find(b => (b.muestraId === a.muestraId) ));
        }
        setListToSave(listToSave);
        setDataHisopados(tempListDataHisopados);
    }

    const handleChangeAddMxEnvio = (e) => {
        checkAddMxEnvio = e.target.checked;
        console.log(checkAddMxEnvio);
        setCheckAddMxEnvio(checkAddMxEnvio);
    }

    // actualizar la lista listToSave(agregar y remover el registro)
    const onItemCheck = (e, item) => {
        if (e.target.checked) {
            addListToSave(e, item);
        } else {
            removeListToSave(item);
        }
    }

    /**Agregar el registro a la lista a enviar */
    const addListToSave = (e, item) => {
        if (item.tipo !== null && item.tipo !== '' && item.tipo !== undefined) {
            if (item.tipo === 'PBMC') {
                let tempList = [];
                tempList = dataPbmc;
                for (let i = 0; i < tempList.length; i++) {
                    if (tempList[i].muestraId === item.muestraId) {
                        tempList[i].estado = e.target.checked;
                    }
                }
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
                let newArr = [...tempList];
                setDataPbmc(newArr);
            } else if (item.tipo === 'ROJO') {
                let tempList = [];
                tempList = dataRojo;
                for (let i = 0; i < tempList.length; i++) {
                    if (tempList[i].muestraId === item.muestraId) {
                        tempList[i].estado = e.target.checked;
                    }
                }
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
                let newArr = [...tempList];
                setDataRojo(newArr);
            } else {
                let tempList = [];
                tempList = dataHisopados;
                for (let i = 0; i < tempList.length; i++) {
                    if (tempList[i].muestraId === item.muestraId) {
                        tempList[i].estado = e.target.checked;
                    }
                }
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
                let newArr = [...tempList];
                setDataHisopados(newArr);
            }
            setListToSave(listToSave);
        }
    }

    /**Remover el registro de la lista a enviar */
    const removeListToSave = (item) => {
        let filteredArray = listToSave.filter(a => a.muestraId !== item.muestraId);
        if (item.tipo === 'PBMC') {
            const arrayData = dataPbmc;
            for (let i = 0; i < arrayData.length; i++) {
                if (arrayData[i].muestraId === item.muestraId) {
                    arrayData[i].estado = false;
                }
            }
            setDataPbmc(arrayData);
            setChkAllPbmc(false);
        } else if (item.tipo === 'ROJO') {
            const arrayData = dataRojo;
            for (let i = 0; i < arrayData.length; i++) {
                if (arrayData[i].muestraId === item.muestraId) {
                    arrayData[i].estado = false;
                }
            }
            setDataRojo(arrayData);
            setChkAllTRojo(false);
        } else {
            const arrayData = dataHisopados;
            for (let i = 0; i < arrayData.length; i++) {
                if (arrayData[i].muestraId === item.muestraId) {
                    arrayData[i].estado = false;
                }
            }
            setDataHisopados(arrayData);
            setChkAllHisopados(false);
        }
        listToSave = filteredArray;
        setListToSave(listToSave);
    }

    const saveData = () => {
        console.log(listToSave);
         if (validateData()) {
            /*if (validateTemp() === null) {
                setErrorTemp('Formato invalido');
                return;
            }*/
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

    /**Metodo para imprimir el documento una ves se realiza el envio */
    const printDocument = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getMuestrasEnviadasDelDiaYEnvio(viaje);
            if (response.status === 200) {
                setExecuteLoading(false);
                if (response.data !== null && response.data.length > 0) {
                    const arrayPBMC = [];
                    const arrayTRojo = [];
                    const arrayHisopados = [];
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].tipoTuboTransm === null && response.data[i].tipoTuboUO1 === null) {
                            arrayHisopados.push(response.data[i]);
                        }
                        if (response.data[i].tipoTuboTransm !== null) {
                            if (response.data[i].tipoTuboTransm === 'ROJO') {
                                arrayTRojo.push(response.data[i]);
                            }
                            if (response.data[i].tipoTuboTransm === 'LEUCOSEP') {
                                arrayPBMC.push(response.data[i]);
                            }
                        }
                        if (response.data[i].tipoTuboUO1 !== null) {
                            if (response.data[i].tipoTuboUO1 === 'ROJO') {
                                arrayTRojo.push(response.data[i]);
                            }
                            if (response.data[i].tipoTuboUO1 === 'LEUCOSEP') {
                                arrayPBMC.push(response.data[i]);
                            }
                        }
                    }
                    if (arrayPBMC.length > 0) {
                        GeneratePDFMxEnviadas(arrayPBMC, response.data, viaje);
                    }
                    if (arrayTRojo.length > 0) {
                        GeneratePDFMxEnviadasRojo(arrayTRojo, response.data, viaje);
                    }
                    if (arrayHisopados.length > 0) {
                        GeneratePDFMxEnviadasHisopados(arrayHisopados, response.data, viaje);
                    }

                }
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    const putMuestras = async (muestra) => {
        setExecuteLoading(true);
        try {
            if (!checkAddMxEnvio) {
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
            }
            
            const response = await DataServices.enviarMuestras(muestra);
            if (response.status === 200) {
                setExecuteLoading(false);
                await printDocument();
                clearData();
                await getMuestrasPBMCPendientesEnvio();
                await getMuestrasTuboRojoPendientesEnvio();
                await getHisopadosPendientesEnvio();
                //setDisabledPrintDocument(false);
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

    const clearData = () => {
        setEnvioMuestra('');
        //setData([]);
        setListToSave([]);
        setSelectedMuestra('');
        //setSelectedEnvioMuestra('');
        setViaje('');
        //setSelectedBioanalista('');
        setTemp('');
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

    return (
        <>
            <EnvioMuestras
                titleForm={titleForm}
                envioMuestra={envioMuestra}
                //muestrasData={muestrasData}
                //envioMuestraData={envioMuestraData}
                bioanalistas={bioanalistas}
                selectedMuestra={selectedMuestra}
                selectedBioanalista={selectedBioanalista}
                selectedEnvioMuestra={selectedEnvioMuestra}
                dataPbmc={dataPbmc}
                dataRojo={dataRojo}
                dataHisopados={dataHisopados}
                listToSave={listToSave}
                executeLoading={executeLoading}
                date={date}
                selectedHora={selectedHora}
                temp={temp}
                viaje={viaje}
                chkAllPbmc={chkAllPbmc}
                chkAllTRojo={chkAllTRojo}
                chkAllHisopados={chkAllHisopados}
                checkAddMxEnvio={checkAddMxEnvio}
                saveData={saveData}
                handleChangeBionalista={handleChangeBionalista}
                handleChangeEnvioMuestra={handleChangeEnvioMuestra}
                handleChangeDate={handleChangeDate}
                handleChangeHora={handleChangeHora}
                handleChangeTemp={handleChangeTemp}
                handleChangeViaje={handleChangeViaje}
                onCheckAllPbmc={onCheckAllPbmc}
                onCheckAllTRojo={onCheckAllTRojo}
                onCheckAllHisopados={onCheckAllHisopados}
                handleChangeAddMxEnvio={handleChangeAddMxEnvio}
                onItemCheck={onItemCheck}
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
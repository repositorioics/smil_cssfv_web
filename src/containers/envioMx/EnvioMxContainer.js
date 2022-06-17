import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DataServices from '../../service/Api';
import ToastContainer from '../../components/toast/Toast';
import EnvioMuestras from '../../components/envioMuestras/EnvioMuestras';
import '../../components/envioMuestras/EnvioMuestras.css';

const EnvioMxContainer = props => {
    const [titleForm] = useState('Envio de muestras');
    const [envioMuestra, setEnvioMuestra] = useState('');
    const [bioanalistas, setBioanalistas] = useState([]);
    const [data, setData] = useState([]);
    let [listToSave, setListToSave] = useState([]);
    const [muestrasData, setMuestrasData] = useState([]);
    const [selectedMuestra, setSelectedMuestra] = useState('');
    const [selectedBioanalista, setSelectedBioanalista] = useState('');
    const [executeLoading, setExecuteLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [selectedHora, setSelectedHora] = useState(new Date());
    const [temp, setTemp] = useState('');
    const [viaje, setViaje] = useState('');
    const [mounted, setMounted] = useState(true);

    const [errorBioanlista, setErrorBioanlista] = useState('');
    const [errorTemp, setErrorTemp] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    let [list, setList] = useState([]);
    const [masterChecked, setMasterChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            if (mounted) {
                getAllMuestras();
                getBionalistas();
            }
        } else {
            props.history.push('/');
        }
        return () => setMounted(false);
    }, [mounted, props]);

    const getMuestrasPendientesByIdMuestra = async (id) => {
        setExecuteLoading(true);
        try {
            let response = null;
            /**Influenza */
            if (id === 1) {
                response = await DataServices.muestrasPendientesInfluenza(id);
            }

            /**Dengue */
            if (id === 2) {
                response = await DataServices.muestrasPendientesDengue(id);
            }

            /**UO1 */
            if (id === 3) {
                response = await DataServices.muestrasPendientesUO1(id);
            }

            /**Transmision y Transmisión lavado nasal */
            if (id === 4 || id === 5) {
                response = await DataServices.muestrasPendientesTransmision(id);
            }

            /**Bhc */
            if (id === 6) {
                response = await DataServices.muestrasPendientesBHC(id);
            }

            if (response.status === 200) {
                setExecuteLoading(false);
                const getData = [];
                for (var i = 0; i < response.data.length; i++) {
                    getData.push({
                        //"id": response.data[i].id,
                        "muestraId": response.data[i].muestraId.id,
                        "muestra": response.data[i].muestraId.mxId.nombre,
                        "codLab": response.data[i].codLab,
                        "fechaToma": response.data[i].muestraId.fechaToma,
                        "estado": false
                    });
                }
                setData([...getData]);
                setMasterChecked(false);
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
                setBioanalistas(multiSelectData);
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

    const onSelect = (e) => {
        setSelectedMuestra(e.target.value);
        const id = e.target.value;
        getMuestrasPendientesByIdMuestra(id);
        initialStateToast();
    }

    const handleChangeBionalista = (e) => {
        setSelectedBioanalista(e.target.value);
        setErrorBioanlista('');
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

    const saveData = () => {
        if (validateData()) {
            if (validateTemp() === null) {
                setErrorTemp('Formato invalido');
                return;
            }
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

    const putMuestras = async (muestra) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.enviarMuestras(muestra);
            if (response.status === 200) {
                setEnvioMuestra('');
                setExecuteLoading(false);
                setData([]);
                setListToSave([]);
                setSelectedMuestra('');
                setSelectedBioanalista('');
                setTemp('');
                setViaje('');
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
    const validateTemp = () => {
        if (temp !== null && temp !== '' && temp !== undefined) {
            const pattern = "(?<![\\d.])(\\d{1,2}|\\d{0,2}\\.\\d{1,2})?(?![\\d.])"
            const result = temp.match(pattern);
            return result;
            //console.log('resultdo', result);
        }
    }

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
        return true;
    }

    return (
        <>
            <EnvioMuestras
                titleForm={titleForm}
                envioMuestra={envioMuestra}
                muestrasData={muestrasData}
                bioanalistas={bioanalistas}
                onSelect={onSelect}
                selectedMuestra={selectedMuestra}
                selectedBioanalista={selectedBioanalista}
                data={data}
                listToSave={listToSave}
                executeLoading={executeLoading}
                date={date}
                selectedHora={selectedHora}
                temp={temp}
                viaje={viaje}
                saveData={saveData}
                handleChangeBionalista={handleChangeBionalista}
                handleChangeDate={handleChangeDate}
                handleChangeHora={handleChangeHora}
                handleChangeTemp={handleChangeTemp}
                handleChangeViaje={handleChangeViaje}
                onMasterCheck={onMasterCheck}
                masterChecked={masterChecked}
                onItemCheck={onItemCheck}
                onItemCheckRemove={onItemCheckRemove}
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
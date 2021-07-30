import React, { useState, useEffect } from 'react';
//import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MxTransmisionLn from '../../components/mxTransmisionLn/MxTransmisionLn';
import DataServices from '../../service/Api';
import moment from 'moment';
import ToastContainer from '../../components/toast/Toast';
import AlertDialogText from '../../components/alertDialog/AlertDialogText';
import * as Constants from '../../Constants';
import Utils from '../../utils/Utils';
import AlertDialog from '../../components/alertDialog/AlertDialog';

const MxTransmisionLnContainer = props => {
    let history = useHistory();
    const [title, setTitle] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(0);
    const [mxTransmisionLnId] = useState(Constants.ID_MUESTRA_TRANSMISION_LN); // Id de la muestra de transmision lavado nasal
    const [code, setCode] = useState('');
    const [idMx, setIdMx] = useState(0);
    const [idMxTransmision, setIdMxTransmision] = useState(0)
    const [codLab, setCodLab] = useState('');
    //const [codLabScan, setCodLabScan] = useState('');
    let [transmision, setTransmision] = useState(false);
    const [selectedTipoPrueba, setSelectedTipoPrueba] = useState('');
    const [tipoPrueba, setTipoPrueba] = useState([]);
    const [tipoMuestra, setTipoMuestra] = useState([]);
    //const [selectedConsulta, setSelectedConsulta] = useState('');
    //const [consultas, setConsultas] = useState([]);
    const [selectedTipoMuestra, setSelectedTipoMuestra] = useState('');
    const [selectedMedico, setSelectedMedico] = useState('');
    const [medicos, setMedicos] = useState([]);
    const [name, setName] = useState('');
    const [study, setStudy] = useState('');
    const [age, setAge] = useState('');
    const [fif, setFif] = useState(null);
    //const [fis, setFis] = useState(null);
    const [fechaToma, setFechaToma] = useState(new Date());
    const [bioanalistas, setBioanalistas] = useState([]);
    const [selectedBioanalista, setSelectedBioanalista] = useState('');
    const [estudiosParticipante, setEstudiosParticipante] = useState('');
    const [houseCode, setHouseCode] = useState('');
    const [motivoNoMx, setMotivoNoMx] = useState('');
    const [observations, setObservations] = useState('');
    let [mxTomada, setMxTomada] = useState(false);
    let [mxNoTomada, setMxNoTomada] = useState(false);
    const [disabledMotivoNoMx, setDisabledMotivoNoMx] = useState(true);
    const [selectedHoraToma, setSelectedHoraToma] = useState(null);
    const [selectedHoraRefrigeracion, setSelectedHoraRefrigeracion] = useState(null);
    const [volSangre, setVolSangre] = useState('');
    const [registerDate, setRegisterDate] = useState(null);
    const [motivoNoFif, setMotivoNoFif] = useState('');
    const [existenDatosGenerales, setExistenDatosGenerales] = useState(false);
    //const [fechaEnvio, setFechaEnvio] = useState(null);
    //const [horaEnvio, setHoraEnvio] = useState(null);
    //const [viaje, setViaje] = useState(0);
    const [disableCode, setDisableCode] = useState(false);
    const [disableMxNoTomada, setDisableMxNoTomada] = useState(false);

    const [executeLoading, setExecuteLoading] = useState(false);
    const [disabledMotivoNoFif, setDisabledMotivoNoFif] = useState(true);

    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);

    const [errorCode, setErrorCode] = useState('');
    const [errorTipoPrueba, setErrorTipoPrueba] = useState('');
    //const [errorConsulta, setErrorConsulta] = useState('');
    const [errorMedico, setErrorMedico] = useState('');

    //const [errorFis, setErrorFis] = useState('');
    const [errorFif, setErrorFif] = useState('');
    const [errorFechaToma, setErrorFechaToma] = useState('');
    const [errorBioanlista, setErrorBioanlista] = useState('');
    const [errorMotivoNoMx, setErrorMotivoNoMx] = useState('');
    const [errorVolSangre, setErrorVolSangre] = useState('');
    const [errorHoraToma, setErrorHoraToma] = useState('');
    const [errorHoraRefrigeracion, setErrorHoraRefrigeracion] = useState('');
    const [errorMotivoSinFif, setErrorMotivoSinFif] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    /**Alert Dialog */
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [alertMessageDialog, setAlertMessageDialog] = useState('');

    /**Alert Dialog Text */
    const [openAlertDialogText, setOpenAlertDialogText] = useState(false);
    const [alertMessageDialogText, setAlertMessageDialogText] = useState('');
    const [errorAlertMotivoNoFif, setErrorAlertMotivoNoFif] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            getListTipoPruebas();
            //getListConsultasActivos();
            getMedicos();
            getBionalistas();
            getTypeOfMx();
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setExecuteLoading(true);
                setTitle('Editar muestra de lavado nasal');
                const getMxUO1ById = async() => {
                    try {
                        const response = await DataServices.getMuestrasTransmisionById(props.match.params.id);
                        if (response.status === 200) {
                            //console.log('Data', response.data);
                            setIdMx(response.data.muestraId.id);
                            setIdMxTransmision(response.data.id);
                            setCode(response.data.muestraId.codigoParticipante);
                            setCodLab(response.data.codLab);
                            setSelectedTipoPrueba(response.data.tipoPruebaId.id);
                            setSelectedTipoMuestra(response.data.tipoMuestraId.id);
                            //setSelectedConsulta(response.data.consultaId.id);
                            if (response.data.muestraId.fif !== null) {
                                let dateVar = moment(response.data.muestraId.fif);
                                let newDateVar = dateVar.utc().format();
                                setFif(newDateVar);
                            }
                            /*if (response.data.muestraId.fis !== null) {
                                let dateVar = moment(response.data.muestraId.fis);
                                let newDateVar = dateVar.utc().format();
                                setFis(newDateVar);
                            }*/
                            if (response.data.muestraId.fechaToma !== null) {
                                let dateVar = moment(response.data.muestraId.fechaToma);
                                let newDateVar = dateVar.utc().format();
                                setFechaToma(newDateVar);
                            }
                            if (response.data.muestraId.bioanalistaId !== null) {
                                setSelectedBioanalista(response.data.muestraId.bioanalistaId.id);
                                setDisableMxNoTomada(true);
                            }
                            medicoById(response.data.muestraId.quienOrdena);
                            setMxTomada(response.data.muestraId.mxTomada);
                            setMxNoTomada(response.data.mxNoTomada);
                            setMotivoNoMx(response.data.muestraId.motivoNoMx);
                            setTransmision(response.data.transmision);
                            if (response.data.mxNoTomada) {}

                            if (response.data.muestraId.horaToma !== null) {
                                const time = response.data.muestraId.horaToma;
                                let today = new Date().toISOString().slice(0, 10)
                                const dateTime = moment(`${today} ${time}`, 'YYYY-MM-DD hh:mm').format();
                                setSelectedHoraToma(dateTime);
                            } else {
                                setSelectedHoraToma(null);
                            }
                            if (response.data.horaRefrigeracion !== null) {
                                const time = response.data.horaRefrigeracion;
                                let today = new Date().toISOString().slice(0, 10)
                                const dateTime = moment(`${today} ${time}`, 'YYYY-MM-DD hh:mm').format();
                                setSelectedHoraRefrigeracion(dateTime);
                            } else {
                                setSelectedHoraRefrigeracion(null);
                            }
                            if (response.data.muestraId.volumen !== null) {
                                setVolSangre(response.data.muestraId.volumen);
                            } else {
                                setVolSangre('');
                            }
                            if (response.data.motivoSinFif !== '' && response.data.motivoSinFif !== null && response.data.motivoSinFif !== undefined) {
                                setDisabledMotivoNoFif(false);
                            }
                            setMotivoNoFif(response.data.motivoSinFif);
                            setLoggedInUser(response.data.muestraId.usuarioId.id);
                            setRegisterDate(response.data.muestraId.fechaRegistro);
                            setObservations(response.data.muestraId.observacion);
                            getParticipante(response.data.muestraId.codigoParticipante);
                            setDisableCode(true);
                            setExistenDatosGenerales(true);
                        }
                    } catch (error) {
                        setExecuteLoading(false);
                        console.log('error', error);
                    }
                }
                getMxUO1ById();
            } else {
                setTitle('Muestra lavado nasal');
            }
        } else {
            props.history.push('/');
        }
    }, [props.history, props.match.params])

    /**Metodo para obtener todos los tubos activos */
    const getListTipoPruebas = async () => {
        setExecuteLoading(true);
        try {
            //const response = await DataServices.getAllTipoPruebas();
            const response = await DataServices.getAllTipoPruebasByMuestraIdAndNivel(1, Constants.NIVEL_TIPO_PRUEBA);
            if (response.status === 200) {
                setExecuteLoading(false);
                setTipoPrueba(response.data);
                const filter = response.data.filter((a) => a.nombre === 'PCR');
                setSelectedTipoPrueba(filter[0].id);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para obtener todas las consultas activas */
    /* const getListConsultasActivos = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllConsultasActivas();
            if (response.status === 200) {
                setExecuteLoading(false);
                setConsultas(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    } */

    /**Funcion para obtener los medicos */
    const getMedicos = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllUserProfileByNombre('Medico');
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
                setMedicos(multiSelectData);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
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

     /**Funcion para obtener los tipos de muestras */
     const getTypeOfMx = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllTipoMuestrasActivas();
            if (response.status === 200) {
                setExecuteLoading(false);
                const multiSelectData = [];
                if (response.data.length > 0) {
                    for (let i = 0; i < response.data.length; i++) {
                        const newObject = {}
                        newObject.id = response.data[i].id;
                        newObject.nombre = response.data[i].descripcion

                        multiSelectData.push(newObject);
                    }
                }
                const filter = response.data.filter((a) => a.nombre === 'LN');
                setSelectedTipoMuestra(filter[0].id);
                setTipoMuestra(multiSelectData);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Funcion para obtener los datos del participante */
    const getParticipante = async (code) => {
        //event.preventDefault();
        setExecuteLoading(true);
        try {
            const response = await DataServices.getParticipanteByCode(code);
            if (response.status === 200) {
                setExecuteLoading(false);
                if (response.data !== '') {
                    /**Validando que el participante no sea solo del estudio de dengue */
                    const estudiosP = response.data.estudiosparticipante.includes('UO1');
                    //console.log('estudiosP', estudiosP);
                    if (!estudiosP) {
                        setCodLab('');
                        setOpenAlertDialog(true);
                        setAlertMessageDialog("El participante no pertenece al estudio UO1, no se puede tomar muestra.");
                    } else {
                        setOpenAlertDialog(false);
                        setName(response.data.nombre1 + " " + response.data.nombre2 + " " + response.data.apellido1 + " " + response.data.apellido2);
                        setStudy(response.data.estudiosparticipante !== '' ? response.data.estudiosparticipante : '');
                        if (response.data.fechanac !== '' && response.data.fechanac !== null) {
                            const edad = Utils.obtenerEdad(response.data.fechanac);
                            setAge(edad)
                        }
                        setHouseCode(response.data.codigocasa);
                        setEstudiosParticipante(response.data.estudiosparticipante);
                        //setData(response.data);
                    }
                } else {
                    setOpenAlertDialog(true);
                    setAlertMessageDialog("No existe información para el código ingresado");
                    setCodLab('');
                    //console.log('Limpiar datos');
                }
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Funcion para obtener la cantidad de muestras tomadas de UO1 para el codigo ingresado */
    const getMuestrasByCodExpedienteAndCatMxId = async (event) => {
        event.preventDefault();
        setExecuteLoading(true);
        try {
            const response = await DataServices.getCountMuestrasByCodigoParticipanteYCatMuestraId(code, mxTransmisionLnId);
            if (response.status === 200) {
                setExecuteLoading(false);
                let count = response.data + 1;
                if (count <= 9) {
                    count = `${code}.0${count}`
                    setCodLab(count);
                } else {
                    count = `${code}.${count}`
                    setCodLab(count);
                }
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Metodo para obtener el medico seleccionado */
    const medicoById = async (id) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getUserById(id);
            if (response.status === 200) {
                setSelectedMedico(response.data.id);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Funcion para obtener los bioanalistas */
    /* const getBionalistas = async () => {
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
    } */

    /* const handleNext = () => {
        setExecuteLoading(true);
        if (activeStep === 0 && activeStep < 3) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

        if (activeStep === 1 && activeStep < 3) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        setExecuteLoading(false);
    }; */

    const handleChangeCode = (e) => {
        setErrorCode('');
        setCode(e.target.value);
    }

    const onKeyPressCode = (e) => {
        if (e.charCode === 13) {
            if (validateCode()) {
                e.preventDefault();
                getParticipante(code);
                getMuestrasByCodExpedienteAndCatMxId(e);
                setName('');
                setStudy('');
                setAge('');
            }
        }
    }

    const handleChangeTipoPrueba = (e) => {
        setErrorTipoPrueba('');
        setSelectedTipoPrueba(e.target.value);
    }

    /*const handleChangeConsulta = (e) => {
        setErrorConsulta('');
        setSelectedConsulta(e.target.value);
    }*/

    const handleChangeTransmision = (e) => {
        transmision = e.target.checked;
        setTransmision(transmision);
    }

    const handleChangeMedico = (e) => {
        setErrorMedico('');
        setSelectedMedico(e.target.value);
    }

    const handleChangeBionalista = (e) => {
        setSelectedBioanalista(e.target.value);
        setErrorBioanlista('');
    }

    const handleChangeTipoMuestra = (e) => {
        setSelectedTipoMuestra(e.target.value);
    }

    const handleChangeFif = (selectedDate) => {
        const result = Utils.validateDate(selectedDate);
        let isValidDate = true;
        if (result) {
            isValidDate = false
            setFif(null);
            setErrorFif('La FIF no puede ser mayor que la fecha de hoy');
        }
        if (isValidDate) {
            setFif(selectedDate);
            setErrorFif('');
        }
    }

    /*const handleChangeFis = (selectedDate) => {
        const result = Utils.validateDate(selectedDate);
        const diff = Utils.CalculateDifferenceDates(selectedDate, new Date());
        let isValidDate = true;
        if (result) {
            setFis(null);
            isValidDate = false;
            setErrorFis('La FIS no puede ser mayor que la fecha de hoy');
            return false;
        }

        if (diff > 28) {
            setFis(null);
            isValidDate = false;
            setErrorFis('FIS debe ser menor o igual a 28 dias');
            return false;
        }

        if (fif !== '' && fif !== null && fif !== undefined) {
            const difFis = Utils.validateStartDateEndDate(selectedDate, fif);
            if (difFis) {
                setFis(null);
                isValidDate = false;
                setErrorFis('La FIS no puede ser mayor que la FIF');
                return false;
            }
        }

        if (isValidDate) {
            setFis(selectedDate);
            setErrorFis('');
        }
    }*/

    const handleChangeFtoma = (selectedDate) => {
        const ftoma = moment(selectedDate, 'YYYY-MM-DD');
        let isValidDate = true;
        const result = Utils.validateDate(selectedDate);

        if (result) {
            isValidDate = false
            setFechaToma(null);
            setErrorFechaToma('La fecha de toma no puede ser mayor que la fecha actual');
        }

        if (fif !== '' && fif !== null && fif !== undefined) {
            const fFif = moment(fif, 'YYYY-MM-DD');
            if (ftoma.isBefore(fFif, 'days')) {
                isValidDate = false;
                setFechaToma(null);
                setErrorFechaToma('La fecha de toma no puede ser antes que la fecha de inicio de fiebre');
            }
        }

        if (isValidDate) {
            setErrorFechaToma('');
            setFechaToma(selectedDate);
        }
    }

    const handleChangeMotivoNoMx = (e) => {
        setMotivoNoMx(e.target.value);
        setErrorMotivoNoMx('');
    }

    const handleChangeObservations = (e) => {
        setObservations(e.target.value);
    }

    const handleChangeMxTomada = (e) => {
        mxTomada = e.target.checked;
        setMxTomada(mxTomada);
        setMxNoTomada(false);
        setMotivoNoMx('');
        setErrorMotivoNoMx('');
        setDisabledMotivoNoMx(true);
        if (!mxTomada) {
            clearAllMxTomada();
        }
    }

    const handleChangeMxNoTomada = (e) => {
        mxNoTomada = e.target.checked;
        if (mxNoTomada) {
            setDisabledMotivoNoMx(false);
            clearAllMxTomada();
        } else {
            setDisabledMotivoNoMx(true);
            setMotivoNoMx('');
        }
        setMxNoTomada(mxNoTomada);
        setMxTomada(false);
    }

    const handleChangeHoraToma = (e) => {
        setSelectedHoraToma(e);
        setErrorHoraToma('');
    }

    const handleChangeHoraRefrigeracion = (e) => {
        setSelectedHoraRefrigeracion(e);
        setErrorHoraRefrigeracion('');
    }

    const handleChangeVolSangre = (e) => {
        setVolSangre(e.target.value)
        setErrorVolSangre('');
    }

    const handleChangePanel1 = (panel) => (event, isExpanded) => {
        setExpanded1(isExpanded ? panel : false);
    };

    const handleChangePanel2 = (panel) => (event, isExpanded) => {
        if (existenDatosGenerales) {
            setExpanded2(isExpanded ? panel : false);
        }
    };

    /**Funcion para validar que el codigo este ingresado para que funcione la busqueda 
     * del participante
    */
    const validateCode = () => {
        if (code === '' || code === undefined || code === null) {
            setErrorCode('El código es requerido');
            return false
        }
        return true;
    }

    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
        setAlertMessageDialog('');
    }

    const handleChangeAlertMotivoNoFif = (e) => {
        setMotivoNoFif(e.target.value);
        setErrorAlertMotivoNoFif('');
        setErrorMotivoSinFif('');
        setDisabledMotivoNoFif(false);
        /* if (e.target.value > 0) {
            setDisabledMotivoNoFif(false);
        } else {
            setDisabledMotivoNoFif(true);
        } */

    }

    const handleChangeMotivoNoFif = (e) => {
        setMotivoNoFif(e.target.value);
        setErrorMotivoSinFif('');
    }

    const cancelAlertDialogText = () => {
        setOpenAlertDialogText(false);
        setMotivoNoFif('');
        setDisabledMotivoNoFif(true);
    }

    const acceptAlertDialogText = () => {
        let validatedDialog = true;
        if (motivoNoFif === '' || motivoNoFif === null || motivoNoFif === undefined) {
            setErrorAlertMotivoNoFif('Debe ingresar el motivo');
            validatedDialog = false;
        } else {
            validatedDialog = true;
        }
        if (validatedDialog) {
            setOpenAlertDialogText(false);
        }
    }

    const saveDatosGenerales = () => {
        if (validateGeneralData()) {
            //console.log('Enviar a guardar');
            saveData();
        }
    }
    
    const saveMxTomada = () => {
        if (validateMxTomada()) {
            //console.log('Enviar a guardar');
            saveData();
        }
    }

    const validateGeneralData = () => {
        if (code === '' || code === null || code === undefined) {
            setErrorCode('El código es requerido');
            return false;
        }
        if (codLab === '' || codLab === undefined || codLab === null) {
            return false;
        }

        if (selectedMedico === '' || selectedMedico === null || selectedMedico === undefined || selectedMedico === '0') {
            setErrorMedico('Debe seleccionar el médico');
            return false;
        }

        if (fechaToma === '' || fechaToma === undefined || fechaToma === null) {
            setErrorFechaToma('Debe ingresar la fecha de toma de muestra');
            return false;
        }
        if (fif === '' || fif === null || fif === undefined) {
            if (motivoNoFif === '' || motivoNoFif === null || motivoNoFif === undefined) {
                setOpenAlertDialogText(true);
                setErrorAlertMotivoNoFif('');
                setAlertMessageDialogText('FIF es requerida, si necesita ingresar un regitro sin FIF ingrese el motivo');
                return false;
            }
        }
        return true;
    }

   /*  const validateSelectedConsulta = () => {
        if (selectedConsulta === 'Inicial') {
            if (selectedTubo === 'LEUCOSEP') {}
            if (selectedTubo === 'ROJO') {}
            return false;
        }
        if (selectedConsulta === 'Convaleciente') {
            if (selectedTubo === 'LEUCOSEP') {}
            if (selectedTubo === 'ROJO') {}
            return false;
        }
        return true;
    } */

    const validateMxTomada = () => {
        if (mxTomada) {
            if (selectedHoraToma === '' || selectedHoraToma === undefined || selectedHoraToma === null) {
                setErrorHoraToma('Debe seleccionar la hora');
                return false
            }
            if (volSangre === '' || volSangre === undefined || volSangre === null) {
                setErrorVolSangre('Debe ingrese el volumen');
                return false
            }
            if (selectedHoraRefrigeracion === '' || selectedHoraRefrigeracion === undefined || selectedHoraRefrigeracion === null) {
                setErrorHoraRefrigeracion('Debe seleccionar la hora');
                return false;
            }
            if (selectedBioanalista === '' || selectedBioanalista === undefined || selectedBioanalista === null || selectedBioanalista === '0') {
                setErrorBioanlista('Debe seleccionar quien solicito la muestra');
                return false;
            }
        }
        if (mxNoTomada) {
            if (motivoNoMx === '' || motivoNoMx === undefined || motivoNoMx === null) {
                setErrorMotivoNoMx('Ingrese el motivo por el cual no se tomo la muestra');
                return false
            }
        }
        if (fif === '' || fif === null || fif === undefined) {
            if (motivoNoFif === '' || motivoNoFif === null || motivoNoFif === undefined) {
                setDisabledMotivoNoFif(false);
                setErrorMotivoSinFif('Ingrese el Motivo del registro sin FIF');
                return false;
            }
        }
        return true;
    }

    const clearAllMxTomada = () => {
        setSelectedHoraToma(null);
        setVolSangre('');
        setSelectedHoraRefrigeracion(null);
        setSelectedBioanalista('');
        setObservations('');
    }

    const goBackListMxTransmision = () => {
        history.push(`/muestras/transmision/lavado-nasal`);
    }

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

     /**Funcion para guardar los datos */
     const postMxTransmision = async(muestra) => {
        setExecuteLoading(true);
         try {
             const response = await DataServices.postMuestraTransmision(muestra);
             if (response.status === 200) {
                setExecuteLoading(false);
                setIdMx(response.data.muestraId.id);
                setIdMxTransmision(response.data.id);
                setExistenDatosGenerales(true);
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

      /**Funcion para actualizar los datos */
      const putMxTransmision = async(muestra) => {
        setExecuteLoading(true);
          try {
              const response = await DataServices.putMuestraTransmision(muestra);
              if (response.status === 200) {
                setExecuteLoading(false);
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

    const saveData = () => {
        const accountData = JSON.parse(localStorage.getItem('accountData'));
        let usuarioId = {};
        //let consultaId = {};
        let bioanalistaId = {};
        let tipoPruebaId = {}
        let tipoMuestraId = {};
        let time = null;
        let timeRefrigeracion =  null

        if (selectedHoraToma !== null) {
            time = moment(selectedHoraToma).format("hh:mm A");
        }

        if (selectedHoraRefrigeracion !== null) {
            timeRefrigeracion = moment(selectedHoraRefrigeracion).format("hh:mm A");
        }

        const muestra = {
            codLab: codLab,
            codLabM: '',
            codLabScan: '',
            fechaEnvio: '',
            horaEnvio: '',
            horaRefrigeracion: timeRefrigeracion,
            transmision: transmision,
            //"id": 0,
            motivoSinFif: motivoNoFif,
            muestraId: {
                anulada: false,
                codigoCasa: houseCode,
                codigoParticipante: code,
                estudiosParticipante: estudiosParticipante,
                fechaRegistro: registerDate === null ? new Date() : registerDate, //Fecha del día,
                fechaToma: fechaToma,
                fif: fif,
                fis: null,
                horaToma: time,
                //"id": 0,
                motivoAnulacion: '',
                /* "motivoAnulacionId": {
                    "activo": true,
                    "descripcion": "string",
                    "id": 0,
                    "nombre": "string"
                }, */
                motivoNoMx: motivoNoMx,
                mxCompartida: false, //
                mxEnviada: false, //
                mxId: {
                    id: mxTransmisionLnId,
                },
                mxTomada: mxTomada,
                observacion: observations,
                otroMotivoAnulacion: false,
                quienOrdena: selectedMedico,
                //"usuarioAnulacion": 0,
                volumen: volSangre
            },
            mxFinalInicial: false,
            mxNoTomada: mxNoTomada,
            viaje: ''
        }
        
        if (idMx > 0 && idMx !== undefined) {
            muestra.muestraId.id = idMx;
        }

        if (idMxTransmision > 0 && idMxTransmision !== undefined) {
            muestra.id = idMxTransmision;
        }


        usuarioId.id = loggedInUser <= 0 ? accountData.usuarioId : loggedInUser
        //consultaId.id = selectedConsulta;
        //bioanalistaId.id = selectedBioanalista;
        tipoPruebaId.id = selectedTipoPrueba;
        tipoMuestraId.id = selectedTipoMuestra;

        muestra.muestraId.usuarioId = usuarioId;
        //muestra.consultaId = consultaId;
        if (selectedBioanalista !== '' && selectedBioanalista !== null && selectedBioanalista !== undefined && selectedBioanalista) {
            if (selectedBioanalista > 0) {
                bioanalistaId.id = selectedBioanalista;
                muestra.muestraId.bioanalistaId = bioanalistaId;
            }
        }
        muestra.tipoPruebaId = tipoPruebaId;
        muestra.tipoMuestraId = tipoMuestraId;

        if (idMx > 0) {
            if (fif !== null) {
                muestra.muestraId.fif = fif;
            }
            /* if (fis !== null) {
                muestra.muestraId.fis = fis;
            } */
            if (fechaToma !== null) {
                muestra.muestraId.fechaToma = fechaToma;
            }
            /**Actualizando la muestra de transmision*/
            putMxTransmision(muestra);
            //console.log('put', muestra);
        } else {
            /**Nueva muestra de transmision*/
            postMxTransmision(muestra);
            //console.log('post', muestra);
        }
    }

    return (
        <>
            <MxTransmisionLn
                title={title}
                //activeStep={activeStep}
                //handleNext={handleNext}
                //handleBack={handleBack}
                code={code}
                codLab={codLab}

                selectedTipoPrueba={selectedTipoPrueba}
                tipoPrueba={tipoPrueba}
                tipoMuestra={tipoMuestra}
                //selectedConsulta={selectedConsulta}
                //consultas={consultas}
                transmision={transmision}
                selectedMedico={selectedMedico}
                medicos={medicos}
                name={name}
                study={study}
                age={age}
                bioanalistas={bioanalistas}
                fif={fif}
                //fis={fis}
                fechaToma={fechaToma}
                selectedBioanalista={selectedBioanalista}
                selectedTipoMuestra={selectedTipoMuestra}
                motivoNoMx={motivoNoMx}
                observations={observations}
                mxTomada={mxTomada}
                mxNoTomada={mxNoTomada}
                selectedHoraToma={selectedHoraToma}
                selectedHoraRefrigeracion={selectedHoraRefrigeracion}
                volSangre={volSangre}
                disabledMotivoNoMx={disabledMotivoNoMx}
                disableCode={disableCode}
                expanded1={expanded1}
                expanded2={expanded2}
                executeLoading={executeLoading}
                motivoNoFif={motivoNoFif}
                disableMxNoTomada={disableMxNoTomada}
                disabledMotivoNoFif={disabledMotivoNoFif}
                houseCode={houseCode}
                handleChangeCode={handleChangeCode}
                onKeyPressCode={onKeyPressCode}
                handleChangePanel1={handleChangePanel1}
                handleChangePanel2={handleChangePanel2}
                handleChangeBionalista={handleChangeBionalista}
                handleChangeTipoPrueba={handleChangeTipoPrueba}
                //handleChangeConsulta={handleChangeConsulta}
                handleChangeMedico={handleChangeMedico}
                handleChangeFif={handleChangeFif}
                //handleChangeFis={handleChangeFis}
                handleChangeFtoma={handleChangeFtoma}
                handleChangeObservations={handleChangeObservations}
                handleChangeMotivoNoMx={handleChangeMotivoNoMx}
                handleChangeMxTomada={handleChangeMxTomada}
                handleChangeMxNoTomada={handleChangeMxNoTomada}
                handleChangeHoraToma={handleChangeHoraToma}
                handleChangeHoraRefrigeracion={handleChangeHoraRefrigeracion}
                handleChangeVolSangre={handleChangeVolSangre}
                goBackListMxTransmision={goBackListMxTransmision}
                handleChangeMotivoNoFif={handleChangeMotivoNoFif}
                handleChangeTransmision={handleChangeTransmision}
                handleChangeTipoMuestra={handleChangeTipoMuestra}
                //saveData={saveData}
                saveDatosGenerales={saveDatosGenerales}
                saveMxTomada={saveMxTomada}
                errorCode={errorCode}
                errorTipoPrueba={errorTipoPrueba}
                //errorConsulta={errorConsulta}
                errorMedico={errorMedico}
                //errorFis={errorFis}
                errorFif={errorFif}
                errorFechaToma={errorFechaToma}
                errorBioanlista={errorBioanlista}
                errorMotivoNoMx={errorMotivoNoMx}
                errorHoraToma={errorHoraToma}
                errorVolSangre={errorVolSangre}
                errorHoraRefrigeracion={errorHoraRefrigeracion}
                errorMotivoSinFif={errorMotivoSinFif}
            />
            <AlertDialog
                openAlertDialog={openAlertDialog}
                alertMessageDialog={alertMessageDialog}
                handleCloseAlertDialog={handleCloseAlertDialog}
            />
            <AlertDialogText
                motivoNoFif={motivoNoFif}
                alertMessageDialogText={alertMessageDialogText}
                openAlertDialogText={openAlertDialogText}
                handleChangeAlertMotivoNoFif={handleChangeAlertMotivoNoFif}
                cancelAlertDialogText={cancelAlertDialogText}
                acceptAlertDialogText={acceptAlertDialogText}
                errorAlertMotivoNoFif={errorAlertMotivoNoFif}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );

}
export default MxTransmisionLnContainer;
import React, { useState, useEffect } from 'react';
//import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MxBhc from '../../components/mxBhc/MxBhc';
import DataServices from '../../service/Api';
import DataServiceSeguridad from '../../service/ApiSeguridad';
import moment from 'moment';
import ToastContainer from '../../components/toast/Toast';
import AlertDialogText from '../../components/alertDialog/AlertDialogText';
import * as Constants from '../../Constants';
import Utils from '../../utils/Utils';
import AlertDialog from '../../components/alertDialog/AlertDialog';
import AlertDialogMxDuplicada from '../../components/alertDialog/AlertDialogMxDuplicada';
import utils from '../../utils/Utils';

const MxBhcContainer = props => {
    let history = useHistory();
    const [title, setTitle] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(0);
    const [mxBhcId] = useState(Constants.ID_MUESTRA_BHC); // Id de la muestra de transmision
    const [code, setCode] = useState('');
    const [idMx, setIdMx] = useState(0);
    const [idMxBhc, setIdMxBhc] = useState(0)
    const [codLab, setCodLab] = useState('');
    let [codLabScan, setCodLabScan] = useState('');
    let [catRecepcionId, setCatRecepcionId] = useState(0);
    //const [selectedConsulta, setSelectedConsulta] = useState('');
    //const [consultas, setConsultas] = useState([]);
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
    const [volSangre, setVolSangre] = useState('');
    const [registerDate, setRegisterDate] = useState(null);
    const [motivoNoFif, setMotivoNoFif] = useState('');
    const [existenDatosGenerales, setExistenDatosGenerales] = useState(false);
    const [disableCode, setDisableCode] = useState(false);
    const [disableMxNoTomada, setDisableMxNoTomada] = useState(false);

    const [executeLoading, setExecuteLoading] = useState(false);
    const [disabledMotivoNoFif, setDisabledMotivoNoFif] = useState(true);
    const [disablePacienteMenor, setDisablePacienteMenor] = useState(false);

    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);

    const [errorCode, setErrorCode] = useState('');
    const [errorMedico, setErrorMedico] = useState('');

    const [errorFif, setErrorFif] = useState('');
    const [errorFechaToma, setErrorFechaToma] = useState('');
    const [errorBioanlista, setErrorBioanlista] = useState('');
    const [errorMotivoNoMx, setErrorMotivoNoMx] = useState('');
    const [errorVolSangre, setErrorVolSangre] = useState('');
    const [errorHoraToma, setErrorHoraToma] = useState('');
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

    /**Alert Dialog Recepcion*/
    const [openAlertDialogRecep, setOpenAlertDialogRecep] = useState(false);
    const [alertMessageDialogRecep, setAlertMessageDialogRecep] = useState('');
    const [valorDetalle, setValorDetalle] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            getMedicos();
            getBionalistas();
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setExecuteLoading(true);
                setTitle('Editar muestra BHC');
                const getMxBhcById = async() => {
                    try {
                        const response = await DataServices.muestrasBhcById(props.match.params.id);
                        if (response.status === 200) {
                            //console.log('Data', response.data);
                            setIdMx(response.data.muestraId.id);
                            setIdMxBhc(response.data.id);
                            setCode(response.data.muestraId.codigoParticipante);
                            setCodLab(response.data.muestraId.codLab);
                            setCodLabScan(response.data.muestraId.codLabScan);
                            //setSelectedConsulta(response.data.consultaId.id);
                            setCatRecepcionId(response.data.muestraId.catRecepcionId.id);
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
                            if (response.data.mxNoTomada) {}

                            if (response.data.muestraId.horaToma !== null) {
                                const time = response.data.muestraId.horaToma;
                                let today = new Date().toISOString().slice(0, 10)
                                const dateTime = moment(`${today} ${time}`, 'YYYY-MM-DD hh:mm a').format();
                                setSelectedHoraToma(dateTime);
                            } else {
                                setSelectedHoraToma(null);
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
                getMxBhcById();
            } else {
                setTitle('Muestra BHC');
            }
        } else {
            props.history.push('/');
        }
    }, [props.history, props.match.params])

    /**Funcion para obtener los medicos */
    const getMedicos = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceSeguridad.getAllUserProfileByNombre('Medico');
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
                setBioanalistas(multiSelectData);
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
                    //const estudiosP = response.data.estudiosparticipante.includes('UO1');
                    //console.log('estudiosP', estudiosP);
                    /* if (!estudiosP) {
                        setCodLab('');
                        setOpenAlertDialog(true);
                        setAlertMessageDialog("El participante no pertenece al estudio UO1, no se puede tomar muestra.");
                    } else { */
                        setOpenAlertDialog(false);
                        setName(response.data.nombre1 + " " + response.data.nombre2 + " " + response.data.apellido1 + " " + response.data.apellido2);
                        setStudy(response.data.estudiosparticipante !== '' ? response.data.estudiosparticipante : '');
                        if (response.data.fechanac !== '' && response.data.fechanac !== null) {
                            const edad = Utils.obtenerEdad(response.data.fechanac);
                            //console.log(edad);
                            if (edad.years <= 2) {
                                setAge(`${edad.years} A??os | ${edad.months} Meses | ${edad.days} D??as`);
                                setDisablePacienteMenor(false);
                                
                            } else {
                                setOpenAlertDialog(true);
                                setAlertMessageDialog("El participante es mayor de 2 a??os, no puede tomar la muestra.");
                                setDisablePacienteMenor(true);
                            }
                            
                        }
                        setHouseCode(response.data.codigocasa);
                        setEstudiosParticipante(response.data.estudiosparticipante);
                        //setData(response.data);
                    //}
                } else {
                    setOpenAlertDialog(true);
                    setAlertMessageDialog("No existe informaci??n para el c??digo ingresado");
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
            const response = await DataServices.codigoLabUltimaMxBHCPorCodigo(code);
            if (response.status === 200) {
                setExecuteLoading(false);
                if (response.data !== '') {
                    const resultado = response.data.toString().split('.');
                    const result = utils.obtenerConsecutivo(resultado[1].substr(0, 2));
                    setCodLab(`${resultado[0]}.${result}${'BHC'}`);
                } else {
                    const result = utils.obtenerConsecutivo('');
                    setCodLab(`${code}.${result}${'BHC'}`);
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
            const response = await DataServiceSeguridad.getUserById(id);
            if (response.status === 200) {
                setSelectedMedico(response.data.id);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

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

    const handleChangeMedico = (e) => {
        setErrorMedico('');
        setSelectedMedico(e.target.value);
    }

    const handleChangeBionalista = (e) => {
        setSelectedBioanalista(e.target.value);
        setErrorBioanlista('');
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
            setErrorCode('El c??digo es requerido');
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

    const handleCloseAlertDialogRecep = () => {
        setOpenAlertDialogRecep(false);
        setAlertMessageDialogRecep('');
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
            saveData();
        }
    }
    
    const saveMxTomada = () => {
        if (validateMxTomada()) {
            saveData();
        }
    }

    const validateGeneralData = () => {
        if (code === '' || code === null || code === undefined) {
            setErrorCode('El c??digo es requerido');
            return false;
        }
        if (codLab === '' || codLab === undefined || codLab === null) {
            return false;
        }
       
        if (selectedMedico === '' || selectedMedico === null || selectedMedico === undefined || selectedMedico === '0') {
            setErrorMedico('Debe seleccionar el m??dico');
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
        setSelectedBioanalista('');
        setObservations('');
    }

    const goBackListMxTransmision = () => {
        history.push(`/muestras/bhc`);
    }

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

     /**Funcion para guardar los datos */
     const postMxBhc = async(muestra) => {
        setExecuteLoading(true);
         try {
             const response = await DataServices.postMuestraBhc(muestra);
             if (response.status === 200) {
                setExecuteLoading(false);
                setIdMx(response.data.muestraId.id);
                setIdMxBhc(response.data.id);
                setExistenDatosGenerales(true);
                setType("success");
                setMessageAlert("Se guardar??n los datos");
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
      const putMxBhc = async(muestra) => {
        setExecuteLoading(true);
          try {
              const response = await DataServices.putMuestraBhc(muestra);
              if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Se guardar??n los datos");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
              }
          } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
          }
      }

    const saveData = async() => {

        /**Creando el codigo lab scan a guardar */
        if (codLabScan === '') {
            codLabScan = Utils.createCodLabScan(fif, fechaToma, codLab);
            //console.log(codLabScan);
            setCodLabScan(codLabScan);
        }

        /**Verificamos si el codigo tiene el formato correcto*/
        if (catRecepcionId <= 0) { // se evalua que sea un registro nuevo
            const response = await DataServices.getCatRecepcionByCodLabScan(codLabScan);
            if (response.status === 200) {
                if (response.data !== "") {
                    catRecepcionId = response.data.id;
                    setCatRecepcionId(catRecepcionId);
                } else {
                    setType("error");
                    setMessageAlert("C??digo lab scan no valido");
                    setTimeout(function () {
                        initialStateToast();
                    }, 100);
                    return;
                }
            }
        }

        /**Verificamos si existe el codigo lab scan */
        if (idMx <= 0) {
            const result = await Utils.obtenerMuestraByCodLabScan('Bhc', codLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                const mensaje = {
                    codigoLab: result.muestraId.codLab,
                    codigoLabScan: result.muestraId.codLabScan,
                    fechaTomaMx: result.muestraId.fechaToma
                };
                setValorDetalle(mensaje);
                setAlertMessageDialogRecep("Ya existe una muestra con el c??digo lab scan ingresado");
                setOpenAlertDialogRecep(true);
                //console.log(result)
                return;
            }

            const result2 = await DataServices.mxByCodLab(codLab);
            if (result2.data !== '') {
                setExecuteLoading(false);
                const mensaje = {
                    codigoLab: result2.data.codLab,
                    codigoLabScan: result2.data.codLabScan,
                    fechaTomaMx: result2.data.fechaToma
                };
                setValorDetalle(mensaje);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el c??digo lab ingresado");
                return;
            }
        }

        const accountData = JSON.parse(localStorage.getItem('accountData'));
        let usuarioId = {};
        //let consultaId = {};
        let bioanalistaId = {};
        let time = null;

        if (selectedHoraToma !== null) {
            time = moment(selectedHoraToma).format("hh:mm A");
        }

        const muestra = {
            codLabM: '',
            //"id": 0,
            motivoSinFif: motivoNoFif,
            muestraId: {
                codLab: codLab,
                codLabScan: codLabScan,
                anulada: false,
                codigoCasa: houseCode,
                codigoParticipante: code,
                estudiosParticipante: estudiosParticipante,
                fechaRegistro: registerDate === null ? new Date() : registerDate, //Fecha del d??a,
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
                    id: mxBhcId,
                },
                mxTomada: mxTomada,
                observacion: observations,
                otroMotivoAnulacion: false,
                quienOrdena: selectedMedico,
                //"usuarioAnulacion": 0,
                volumen: volSangre,
                catRecepcionId: {
                    id: catRecepcionId
                }
            },
            mxFinalInicial: false,
            mxNoTomada: mxNoTomada,
        }
        
        if (idMx > 0 && idMx !== undefined) {
            muestra.muestraId.id = idMx;
        }

        if (idMxBhc > 0 && idMxBhc !== undefined) {
            muestra.id = idMxBhc;
        }


        usuarioId.id = loggedInUser <= 0 ? accountData.usuarioId : loggedInUser

        muestra.muestraId.usuarioId = usuarioId;
        //muestra.consultaId = consultaId;
        if (selectedBioanalista !== '' && selectedBioanalista !== null && selectedBioanalista !== undefined) {
            if (selectedBioanalista > 0) {
                bioanalistaId.id = selectedBioanalista;
                muestra.muestraId.bioanalistaId = bioanalistaId;
            }
        }

        if (idMx > 0) {
            if (fif !== null) {
                muestra.muestraId.fif = fif;
            }
            if (fechaToma !== null) {
                muestra.muestraId.fechaToma = fechaToma;
            }
            /**Actualizando la muestra de transmision*/
            putMxBhc(muestra);
            //console.log('put', muestra);
        } else {
            /**Nueva muestra de transmision*/
            postMxBhc(muestra);
            //console.log('post', muestra);
        }
    }

    return (
        <>
            <MxBhc
                title={title}
                code={code}
                codLab={codLab}
                selectedMedico={selectedMedico}
                medicos={medicos}
                name={name}
                study={study}
                age={age}
                bioanalistas={bioanalistas}
                fif={fif}
                fechaToma={fechaToma}
                selectedBioanalista={selectedBioanalista}
                motivoNoMx={motivoNoMx}
                observations={observations}
                mxTomada={mxTomada}
                mxNoTomada={mxNoTomada}
                selectedHoraToma={selectedHoraToma}
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
                disablePacienteMenor={disablePacienteMenor}

                handleChangeCode={handleChangeCode}
                onKeyPressCode={onKeyPressCode}
                handleChangePanel1={handleChangePanel1}
                handleChangePanel2={handleChangePanel2}
                handleChangeBionalista={handleChangeBionalista}
                handleChangeMedico={handleChangeMedico}
                handleChangeFif={handleChangeFif}
                //handleChangeFis={handleChangeFis}
                handleChangeFtoma={handleChangeFtoma}
                handleChangeObservations={handleChangeObservations}
                handleChangeMotivoNoMx={handleChangeMotivoNoMx}
                handleChangeMxTomada={handleChangeMxTomada}
                handleChangeMxNoTomada={handleChangeMxNoTomada}
                handleChangeHoraToma={handleChangeHoraToma}
                handleChangeVolSangre={handleChangeVolSangre}
                goBackListMxTransmision={goBackListMxTransmision}
                handleChangeMotivoNoFif={handleChangeMotivoNoFif}
                //saveData={saveData}
                saveDatosGenerales={saveDatosGenerales}
                saveMxTomada={saveMxTomada}
                errorCode={errorCode}
                //errorConsulta={errorConsulta}
                errorMedico={errorMedico}
                errorFif={errorFif}
                errorFechaToma={errorFechaToma}
                errorBioanlista={errorBioanlista}
                errorMotivoNoMx={errorMotivoNoMx}
                errorHoraToma={errorHoraToma}
                errorVolSangre={errorVolSangre}
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
            <AlertDialogMxDuplicada
                valorDetalle={valorDetalle}
                openAlertDialogRecep={openAlertDialogRecep}
                alertMessageDialogRecep={alertMessageDialogRecep}
                handleCloseAlertDialogRecep={handleCloseAlertDialogRecep}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );

}
export default MxBhcContainer;
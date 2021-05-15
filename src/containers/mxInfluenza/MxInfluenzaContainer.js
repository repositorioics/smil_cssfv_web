import React, { useState, useEffect } from 'react';
//import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MxInfluenza from '../../components/mxInfluenza/MxInfluenza';
import DataServices from '../../service/Api';
import DataServicePrintCode from '../../service/ApiPrintCode';
import Utils from '../../utils/Utils';
import moment from 'moment';
import ToastContainer from '../../components/toast/Toast';
import AlertDialog from '../../components/alertDialog/AlertDialog';
import AlertDialogText from '../../components/alertDialog/AlertDialogText';
import AlertDialogMismoEF from '../../components/alertDialog/AlertDialogMismoEF';
import * as Constants from '../../Constants';

const MxInfluenzaContainer = props => {
    let history = useHistory();
    const [title, setTitle] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [mxFluId] = useState(Constants.ID_MUESTRA_INFLUENZA); // Id de la muestra de influenza
    const [idMx, setIdMx] = useState(0);
    const [idMxFlu, setIdMxFlu] = useState(0)
    const [houseCode, setHouseCode] = useState('');
    const [code, setCode] = useState('');
    const [data, setData] = useState({});
    const [medicos, setMedicos] = useState([]);
    const [codeLab, setCodLab] = useState('');
    const [codeLabScan, setCodeLabScan] = useState('');
    const [estudiosParticipante, setEstudiosParticipante] = useState('');
    const [bioanalistas, setBioanalistas] = useState([]);
    const [name, setName] = useState('');
    const [study, setStudy] = useState('');
    const [age, setAge] = useState('');
    const [registerDate, setRegisterDate] = useState(null);
    let [mxCv, setMxCv] = useState(false);
    let [positivoMi, setPositivoMi] = useState(false);
    const [fif, setFif] = useState(null);
    const [fis, setFis] = useState(null);
    const [fechaToma, setFechaToma] = useState(null);
    let [mxTomada, setMxTomada] = useState(false);
    let [mxNoTomada, setMxNoTomada] = useState(false);
    let [esRetoma, setEsRetoma] = useState(false);
    let [prFlu, setPrFlu] = useState(false);
    let [prVsr, setPrVsr] = useState(false);
    const [volMedioMl, setVolMedioMl] = useState('');
    const [observations, setObservations] = useState('');
    const [testNumberFlu, setTestNumberFlu] = useState('');
    //const [testResultFlu, setTestResultFlu] = useState('');
    const [testNumberVsr, setTestNumberVsr] = useState('');
    const [testResultVsr, setTestResultVsr] = useState('');
    const [observationsPr, setObservationsPr] = useState('');
    const [observationsPrVsr, setObservationsPrVsr] = useState('');
    const [selectedHoraToma, setSelectedHoraToma] = useState(null);
    const [dataTypeOfTest, setDataTypeOfTest] = useState([]);
    const [selectedMedico, setSelectedMedico] = useState('');
    //const [selectedTypeOfTest, setSelectedTypeOfTest] = useState([]);
    const [selectedTypeOfTest, setSelectedTypeOfTest] = useState('');
    const [selectedBioanalista, setSelectedBioanalista] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(0);
    const [selectedTypeOfMx, setSelectedTypeOfMx] = useState('');
    const [selectedMismoEpFif, setSelectedMismoEpFif] = useState('');
    const [typeMx, setTypeMx] = useState([]);
    const [mismoEpFif, setMismoEpFif] = useState([]);
    const [motivoNoFif, setMotivoNoFif] = useState('');
    const [motivoNoMx, setMotivoNoMx] = useState('');
    //const [mounted, setMounted] = useState(true);
    const [errorCode, setErrorCode] = useState('');
    const [errorMedico, setErrorMedico] = useState('');
    const [errorFis, setErrorFis] = useState('');
    const [errorFif, setErrorFif] = useState('');
    const [errorFechaToma, setErrorFechaToma] = useState('');
    const [errorTypeOfTest, setErrorTypeOfTest] = useState('');
    const [errorBioanlista, setErrorBioanlista] = useState('');
    const [errorTypeOfMx, setErrorTypeOfMx] = useState('');
    const [errorHoraToma, setErrorHoraToma] = useState('');
    const [errorVolMedio, setErrorVolMedio] = useState('');
    const [errorMessageResult, setErrorMessageResult] = useState('');
    const [errorMotivoSinFif, setErrorMotivoSinFif] = useState('');
    const [errorTestNumberFlu, setErrorTestNumberFlu] = useState('');
    const [errorMotivoNoMx, setErrorMotivoNoMx] = useState('');
    const [errorTestNumberFluVsr, setErrorTestNumberFluVsr] = useState('');
    const [errorMessageResultVsr, setErrorMessageResultVsr] = useState('');
    const [isMxCv, setIsMxCv] = useState(false);
    const [disableTypeOfTest, setDisableTypeOfTest] = useState(false);
    const [lastRecordMxFlu, setLastRecordMxFlu] = useState({})

    const [selectedResult, setSelectedResult] = useState('');
    const [dataResult, setDataResult] = useState([]);
    const [dataResultVsr, setDataResultVsr] = useState([]);

    const [executeLoading, setExecuteLoading] = useState(false);

    const [disableCode, setDisableCode] = useState(false);
    const [disabledMotivoNoFif, setDisabledMotivoNoFif] = useState(true);
    const [disabledMismoEpFebril, setDisabledMismoEpFebril] = useState(true);
    const [disabledMotivoNoMx, setDisabledMotivoNoMx] = useState(true);
    const [disableMxNoTomada, setDisableMxNoTomada] = useState(false);
    const [disabledEsRetoma, setDisabledEsRetoma] = useState(false);


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

    /**Alert Dialog mismo episodio febril */
    const [openAlertDialogMismoEF, setOpenAlertDialogMismoEF] = useState(false);
    const [alertMessageDialogMismoEF, setAlertMessageDialogMismoEF] = useState('');
    const [alertMessageDifFif, setAlertMessageDifFif] = useState('');
    const [errorMismoEpFifDialog, setErrorMismoEpFifDialog] = useState('');
    const [fifUltMxTomada, setFifUltMxTomada] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            getTypeOfTest(mxFluId);
            getMedicos();
            getBionalistas();
            getTypeOfMx();
            getMismoEpFif();
            getAllResultPRI();
            getAllResultPRVSR();
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setTitle('Editar muestra de influenza');
                /**Funcion para obtener los datos de la muestra por id */
                const getMxInfluenzaById = async () => {
                    try {
                        setExecuteLoading(true);
                        const response = await DataServices.getMuestraInfluenzaById(props.match.params.id);
                        if (response.status === 200) {
                            setIdMx(response.data.muestraId.id);
                            setIdMxFlu(props.match.params.id);
                            setCode(response.data.muestraId.codigoParticipante);
                            setMxCv(response.data.mxCovid);
                            if (response.data.mxCovid) {
                                setIsMxCv(true);
                            } else {
                                setIsMxCv(false);
                            }
                            setPositivoMi(response.data.covidPositivo);
                            setCodeLabScan(response.data.codLabScan);
                            setCodLab(response.data.codLab);
                            if (response.data.motivoSinFif !== '' && response.data.motivoSinFif !== null && response.data.motivoSinFif !== undefined) {
                                setDisabledMotivoNoFif(false);
                            }
                            setMotivoNoFif(response.data.motivoSinFif);
                            if (response.data.muestraId.fif !== null) {
                                //const dateFif = moment(response.data.muestraId.fif).format('DD MMM, YYYY');
                                let dateVar = moment(response.data.muestraId.fif);
                                let newDateVar = dateVar.utc().format();
                                setFif(newDateVar);
                            }
                            if (response.data.muestraId.fis !== null) {
                                //const dateFis = moment.utc(response.data.muestraId.fis).format('llll');
                                let dateVar = moment(response.data.muestraId.fis);
                                let newDateVar = dateVar.utc().format();
                                setFis(newDateVar);
                            }
                            if (response.data.muestraId.fechaToma !== null) {
                                //const dateFToma = moment(response.data.muestraId.fechaToma).format('llll');
                                let dateVar = moment(response.data.muestraId.fechaToma);
                                let newDateVar = dateVar.utc().format();
                                setFechaToma(newDateVar);
                            }
                            setRegisterDate(response.data.muestraId.fechaRegistro);
                            setSelectedTypeOfTest(response.data.tipoPruebaId.id);
                            getParticipante(response.data.muestraId.codigoParticipante);
                            medicoById(response.data.muestraId.quienOrdena);
                            setMxTomada(response.data.muestraId.mxTomada);
                            setLoggedInUser(response.data.muestraId.usuarioId.id);
                            if (response.data.muestraId.bioanalistaId !== null) {
                                setSelectedBioanalista(response.data.muestraId.bioanalistaId.id);
                                setDisableMxNoTomada(true);
                                setDisabledEsRetoma(true);
                            }
                            if (response.data.tipoMuestraId !== null) {
                                setSelectedTypeOfMx(response.data.tipoMuestraId.id);
                            }
                            if (response.data.muestraId.horaToma !== null) {
                                const date = new Date();
                                const dateStr = date.toISOString().split('T').shift();
                                const time = response.data.muestraId.horaToma;
                                const newDate = dateStr + ' ' + time
                                const result = new Date(newDate).getTime();
                                date.setTime(result);
                                setSelectedHoraToma(date);
                            } else {
                                setSelectedHoraToma(null);
                            }
                            if (response.data.muestraId.volumen !== null) {
                                setVolMedioMl(response.data.muestraId.volumen);
                            } else {
                                setVolMedioMl('');
                            }
                            setObservations(response.data.muestraId.observacion);
                            setPrFlu(response.data.pruebaRapida);
                            if (response.data.numeroPruebasPr !== null) {
                                setTestNumberFlu(response.data.numeroPruebasPr);
                            } else {
                                setTestNumberFlu('');
                            }

                            if (response.data.motivoMismoEf !== '' && response.data.motivoMismoEf !== null
                                && response.data.motivoMismoEf !== undefined) {
                                setSelectedMismoEpFif(response.data.motivoMismoEf);
                                setDisabledMismoEpFebril(false);
                            }
                            setObservationsPr(response.data.observacionesPr);
                            setPrVsr(response.data.pruebaRapidaVsr);
                            if (response.data.numeroPruebasPrVsr) {
                                setTestNumberVsr(response.data.numeroPruebasPrVsr);
                            } else {
                                setTestNumberVsr();
                            }

                            if (response.data.resultadoPrVsr !== null) {
                                setTestResultVsr(response.data.resultadoPrVsr);
                            } else {
                                setTestResultVsr('');
                            }
                            if (response.data.resultadoPr) {
                                setSelectedResult(response.data.resultadoPr);
                            } else {
                                setSelectedResult('');
                            }

                            setObservationsPrVsr(response.data.observacionesPrVsr);
                            /**Deshabilitando controles */
                            setDisableCode(true);
                        }
                    } catch (error) {
                        setExecuteLoading(false);
                        console.log('error', error);
                    }
                }
                getMxInfluenzaById();
            } else {
                setTitle('Agregar muestra de influenza');
            }
            /* if (mounted) {
                getTypeOfTest();
                getMedicos();
                getBionalistas();
                getTypeOfMx();
            } */
        } else {
            props.history.push('/');
            //return <Redirect to='/login' />
        }
        //return () => setMounted(false);
    }, [mxFluId, props.history, props.match.params])

    /**Metodo para obtener el medico seleccionado */
    const medicoById = async (id) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getUserById(id);
            if (response.status === 200) {
                /* const result = [{
                    id: response.data.id,
                    name: response.data.nombres + " " + response.data.apellidos
                }] */
                setSelectedMedico(response.data.id);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    const handleChangeCode = (e) => {
        setCode(e.target.value);
        setErrorCode('');
    }

    const onKeyPressCode = (e) => {
        if (e.charCode === 13) {
            if (validateCode()) {
                e.preventDefault();
                getParticipante(code);
                getLastRecordFlu(code);
                getMuestrasByCodExpedienteAndCatMxId(e);
                setName('');
                setStudy('');
                setAge('');
            }
        }
    }

    const handleChangeMxCv = (e) => {
        mxCv = e.target.checked;
        if (mxCv) {
            setIsMxCv(true);
            const filterTypeOfTestByName = dataTypeOfTest.filter(a => a.nombre === 'PCR');
            setSelectedTypeOfTest(filterTypeOfTestByName[0].id);
            setDisableTypeOfTest(true);
        } else {
            setIsMxCv(false);
            setDisableTypeOfTest(false);
            setSelectedTypeOfTest('');
            setMotivoNoFif('');
        }
        setMxCv(mxCv);
        setPositivoMi(false);
    }

    const handleChangepositivoMi = (e) => {
        positivoMi = e.target.checked;
        setPositivoMi(positivoMi);
        setMxCv(false);
    }

    const handleChangeFif = (selectedDate) => {
        const result = Utils.validateDate(selectedDate);
        let isValidDate = true;
        if (mxCv) {
            const diffDay = diffDayFif(selectedDate);
            if (diffDay > 28) {
                isValidDate = false;
                setOpenAlertDialog(true);
                setAlertMessageDialog('La FIF ' + moment(selectedDate).format('YYYY-MM-DD')
                    + ' debe ser menor o igual a 28 dias');
                setFif(null);
            }
        }
        if (!mxCv) {
            const diffDay = diffDayFif(selectedDate);
            if (diffDay > 10) {
                isValidDate = false;
                setOpenAlertDialog(true);
                setAlertMessageDialog('La FIF ' + moment(selectedDate).format('YYYY-MM-DD')
                    + ' debe ser menor o igual a 10 días');
                setFif(null);
            }
        }
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

    const handleChangeFis = (selectedDate) => {
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
            if (ftoma.isBefore(fif)) {
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

    const handleChangeMxTomada = (e) => {
        mxTomada = e.target.checked;
        setMxTomada(mxTomada);
        setMxNoTomada(false);
        setEsRetoma(false);
    }

    const handleChangeMxNoTomada = (e) => {
        mxNoTomada = e.target.checked;
        if (mxNoTomada) {
            setDisabledMotivoNoMx(false);
        } else {
            setDisabledMotivoNoMx(true);
        }
        setMxNoTomada(mxNoTomada);
        setMxTomada(false);
        setEsRetoma(false);
    }

    const handleChangeEsRetoma = (e) => {
        esRetoma = e.target.checked;
        setEsRetoma(esRetoma);
        setMxTomada(false);
        setMxNoTomada(false);
    }

    const onSelectRequestBy = (e) => {
        setSelectedMedico(e.target.value);
        //console.log(selectedList);
        setErrorMedico('');
    }

    const handleChangeTypeOfTest = (e) => {
        setSelectedTypeOfTest(e.target.value);
        setErrorTypeOfTest('');
    }

    const handleChangeBionalista = (e) => {
        setSelectedBioanalista(e.target.value);
        setErrorBioanlista('');
    }

    const onSelectTypeOfMx = (e) => {
        setSelectedTypeOfMx(e.target.value);
        setErrorTypeOfMx('');
    }

    const onSelectMismoEpFif = (e) => {
        setSelectedMismoEpFif(e.target.value);
    }

    const handleChangeMismoEpFifDialog = (e) => {
        setSelectedMismoEpFif(e.target.value);
        setErrorMismoEpFifDialog('');
    }

    const handleChangeHoraToma = (e) => {
        setSelectedHoraToma(e);
        setErrorHoraToma('');
    }

    const handleChangePrFlu = (e) => {
        prFlu = e.target.checked;
        setPrFlu(prFlu);
    }

    const handleChangePrVsr = (e) => {
        prVsr = e.target.checked;
        setPrVsr(prVsr);
    }

    const handleChangeVolMedioMl = (e) => {
        setVolMedioMl(e.target.value);
        setErrorVolMedio('');
    }

    const handleChangeObservations = (e) => {
        setObservations(e.target.value);
    }

    const handleChangeTestNumberFlu = (e) => {
        setTestNumberFlu(e.target.value);
        setErrorTestNumberFlu('');
    }

    /* const handleChangeTesResultFlu = (e) => {
        setTestResultFlu(e.target.value);
    } */

    const handleChangeTestNumberVsr = (e) => {
        setTestNumberVsr(e.target.value);
        setErrorTestNumberFluVsr('');
    }

    const handleChangeTesResultVsr = (e) => {
        setTestResultVsr(e.target.value);
        setErrorMessageResultVsr('');
    }

    const handleChangeObservationsPr = (e) => {
        setObservationsPr(e.target.value);
    }

    const handleChangeObservationsPrVsr = (e) => {
        setObservationsPrVsr(e.target.value);
    }

    const handleChangeMotivoNoFif = (e) => {
        setMotivoNoFif(e.target.value);
        setErrorMotivoSinFif('');
    }

    const handleChangeMotivoNoMx = (e) => {
        setMotivoNoMx(e.target.value);
        setErrorMotivoNoMx('');
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

    const handleChangeResult = (e) => {
        setSelectedResult(e.target.value);
        setErrorMessageResult('');
    }
    /* const handleChangeCodeLabScan = (e) => {
        setCodeLabScan(e.target.value);
    }

    const handleChangeCodeLab = (e) => {
        setCodLab(e.target.value);
    } */

    const handleNext = () => {
        setExecuteLoading(true);
        if (activeStep === 0 && activeStep < 3) {
            if (validateGeneralData()) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                saveData(activeStep);
            }
        }

        if (activeStep === 1 && activeStep < 3) {
            if (validateMxFlu()) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                saveData(activeStep);
            }
        }

        if (activeStep === 2 && activeStep < 3) {
            if (validatePrFlu()) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                saveData(activeStep);
            }
        }

        if (activeStep === 3 && activeStep <= 3) {
            if (validatePrVsr()) {
                setActiveStep((prevActiveStep) => prevActiveStep + 0);
                saveData(activeStep);
            }
        }
        setExecuteLoading(false);
    };

    const handleBack = () => {
        setExecuteLoading(true);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setExecuteLoading(false);
    };

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
                    if (response.data.estudiosparticipante === 'Dengue') {
                        setCodLab('');
                        setOpenAlertDialog(true);
                        setAlertMessageDialog("El participante solo pertenece al estudio de Dengue, no se puede tomar muestra de Influenza.");
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
                        setData(response.data);
                    }
                } else {
                    console.log('Limpiar datos');
                }
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Funcion para obtener la cantidad de muestras tomadas de influenza */
    const getMuestrasByCodExpedienteAndCatMxId = async (event) => {
        event.preventDefault();
        setExecuteLoading(true);
        try {
            const response = await DataServices.getCountMuestrasByCodigoParticipanteYCatMuestraId(code, mxFluId);
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

    /**Funcion para obtener los tipos de pruebas */
    const getTypeOfTest = async (mxFluId) => {
        setExecuteLoading(true);
        try {
            //const response = await DataServices.getAllTiposPruebasByMuestraId(mxFluId);
            const response = await DataServices.getAllTipoPruebasByMuestraIdAndNivel(mxFluId, Constants.NIVEL_TIPO_PRUEBA);
            if (response.status === 200) {
                setExecuteLoading(false);
                setDataTypeOfTest(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

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
                setTypeMx(multiSelectData);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Funcion para obtener todos los episodios febriles */
    const getMismoEpFif = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllEpFebriles();
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
                setMismoEpFif(multiSelectData);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Funcion para obtener los resultados para la prueba rapida de influenza */
    const getAllResultPRI = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllResultMxByTipoPrueba(Constants.RESULT_BY_TIPO_PRUEBA_ID);
            if (response.status === 200) {
                setExecuteLoading(false);
                setDataResult(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Funcion para obtener los resultados para la prueba rapida de influenza VSR */
    const getAllResultPRVSR = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllResultMxByTipoPrueba(Constants.RESULT_BY_TIPO_PRUEBA_ID_VSR);
            if (response.status === 200) {
                setExecuteLoading(false);
                setDataResultVsr(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Funcion para obtener el ultimo registro ingresado para la muestra de influenza */
    const getLastRecordFlu = async (codigo) => {
        const response = await DataServices.getUltimoRegistroMuestraInfluenza(codigo);
        if (response.status === 200) {
            setLastRecordMxFlu(response.data);
        }
    }

    /**Funcion para validar que la fif sea menor o igual a 10 dias con 
     * respecto a la fecha de toma y que este marcado MxCovid = true
     */
    const diffDayFif = (fif) => {
        const currentDate = registerDate === null ? new Date() : registerDate; //Fecha del día;
        const result = Utils.CalculateDifferenceDates(fif, currentDate);
        return result;

    }

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

    /**Funcion para validar los datos requeridos de datos generales */
    const validateGeneralData = () => {
        //setValidMEF(false);
        const filterTypeOfTest = dataTypeOfTest.filter(a => a.id === selectedTypeOfTest);

        if (code === '' || code === undefined || code === null) {
            setErrorCode('El código es requerido');
            return false
        }

        if (codeLab === '' || codeLab === undefined || codeLab === null) {
            return false;
        }

        if (selectedMedico.length <= 0) {
            setErrorMedico('Debe seleccionar quien solicito la muestra');
            return false;
        }

        /* if (fis === '' || fis === undefined || fis === null) {
            setErrorFis('Debe ingresar la FIS');
            return false
        } */

        if (fechaToma === '' || fechaToma === undefined || fechaToma === null) {
            setErrorFechaToma('Debe ingresar la fecha de toma de muestra');
            return false;
        }

        if (selectedTypeOfTest.length <= 0) {
            setErrorTypeOfTest('Debe seleccionar el tipo de prueba');
            return false;
        }
        if (filterTypeOfTest.length > 0) {
            if (filterTypeOfTest[0].nombre !== 'PRI' && (fif === '' || fif === null || fif === undefined)) {
                if (mxCv) {
                    if (motivoNoFif === '' || motivoNoFif === null || motivoNoFif === undefined) {
                        setMotivoNoFif("HCV");
                        setDisabledMotivoNoFif(false);
                    }
                    if (fis === '' || fis === null || fis === undefined) {
                        setErrorFis('Debe ingresar la FIS para esta muestra');
                        return false;
                    }
                } else {
                    if (fif === '' || fif === null || fif === undefined) {
                        if (motivoNoFif === '' || motivoNoFif === null || motivoNoFif === undefined) {
                            setOpenAlertDialogText(true);
                            setErrorAlertMotivoNoFif('');
                            setAlertMessageDialogText('FIF es requerida, si necesita ingresar un regitro sin FIF ingrese el motivo');
                            return false;
                            //setAlertMessageDialog("La FIF es requerida, Ingrese la FIF o Ingrese el Motivo del registro sin FIF");
                        }
                    }
                }
            }
        }

        if (idMx <= 0 && (fif !== '' && fif !== null && fif !== undefined && (selectedMismoEpFif <= 0))) {
            //getLastRecordFlu()
            if (lastRecordMxFlu !== '' && lastRecordMxFlu !== null && lastRecordMxFlu !== undefined) {
                if (lastRecordMxFlu.muestraId.fif !== null) {
                    const diff = Utils.CalculateDifferenceDates(new Date(lastRecordMxFlu.muestraId.fif), new Date(fif));
                    if (diff <= 3 && selectedMismoEpFif <= 0) {
                        setFifUltMxTomada(lastRecordMxFlu.muestraId.fif);
                        setOpenAlertDialogMismoEF(true);
                        //setErrorMismoEpFifDialog('');
                        setAlertMessageDialogMismoEF('Ya tiene muestra en este episodio febril, ' +
                            'Revise la FIF que esta ingresando o Documente porque tomará la muestra.');
                        const date2 = moment(fis).format('YYYY-MM-DD');
                        if (lastRecordMxFlu.muestraId.fif !== date2) {
                            setAlertMessageDifFif(' La ultima FIF es diferente a la que esta digitando, Se reemplazará con la FIF inicial, Verifique.');
                        }
                        return false;

                    }
                }
            }
        }

        return true;
    }

    /**Funcion para validar la toma de muerstra */
    const validateMxFlu = () => {
        const filterTypeOfTest = dataTypeOfTest.filter(a => a.id === selectedTypeOfTest);
        if (mxTomada) {

            if (selectedBioanalista <= 0) {
                setErrorBioanlista('Debe seleccionar el bioanalista');
                return false;
            }

            if (selectedTypeOfMx <= 0) {
                setErrorTypeOfMx('Debe seleccionar el tipo de muestra');
                return false
            }

            if (selectedHoraToma === '' || selectedHoraToma === undefined || selectedHoraToma === null) {
                setErrorHoraToma('Debe seleccionar la hora');
                return false
            }

            if (volMedioMl === '' || volMedioMl === undefined || volMedioMl === null) {
                setErrorVolMedio('Debe de ingresar el volumen');
                return false;
            }
            if (filterTypeOfTest[0].nombre !== 'PRI' && (fif === '' || fif === null || fif === undefined)) {
                if (!mxCv) {
                    if (fif === '' || fif === null || fif === undefined) {
                        if (motivoNoFif === '' || motivoNoFif === null || motivoNoFif === undefined) {
                            setErrorMotivoSinFif('Ingrese el Motivo del registro sin FIF');
                            return false;
                            //setAlertMessageDialog("La FIF es requerida, Ingrese la FIF o Ingrese el Motivo del registro sin FIF");
                        }
                    }
                }
            }
            return true;
        }
        return true;
    }

    const validatePrFlu = () => {
        if (prFlu) {
            if (testNumberFlu === '' || testNumberFlu === null || testNumberFlu === undefined) {
                setErrorTestNumberFlu('Debe ingresar el número de prueba');
                return false;
            }
            if (selectedResult <= 0) {
                setErrorMessageResult('Debe seleccionar el resultado');
                return false;
            }
        } else {
            if ((testNumberFlu !== '' || testNumberFlu !== null || testNumberFlu !== undefined) ||
                (selectedResult > 0)) {
                setType("error");
                setMessageAlert("Marcar, Se Realiza prueba rápida de Influenza?");
                setTimeout(function () {
                    initialStateToast();
                }, 500);
                return false;
            }
        }
        return true;
    }

    const validatePrVsr = () => {
        if (prVsr) {
            if (testNumberVsr === '' || testNumberVsr === null || testNumberVsr === undefined) {
                setErrorTestNumberFluVsr('Debe ingresar el número de prueba');
                return false;
            }
            if (testResultVsr <= 0) {
                setErrorMessageResultVsr('Debe seleccionar el resultado');
                return false;
            }            
        } else {
            if ((testNumberVsr !== '' || testNumberVsr !== null || testNumberVsr !== undefined) ||
                (testResultVsr > 0)) {
                setType("error");
                setMessageAlert("Marcar, Se Realiza prueba rápida para VSR?");
                setTimeout(function () {
                    initialStateToast();
                }, 500);
                return false;
            }
        }
        return true;
    }

    /**Metodo para imprimir el código */
    const printCode = () => {
        if (validateCreateBarCode()) {
            const barCode = createBarCodeInfluenza();
            console.log(barCode);
            DataServicePrintCode.printCodeMxInfluenza(barCode);
            //const url = 'http://localhost:13001/print?barcodes='+barCode;
            //console.log(url);
            //window.open(url);
        }
    }
    /** */

    /**Creando el String para el código de barra */
    const createBarCodeInfluenza = () => {
        let barCode = '';
        let barCodeFif = '';
        let barCodeFechaToma = '';
        let barCodeSpace = '  ';
        if (fif === null || fif === undefined || fif === '') {
            barCodeFif = '10-10-3000'
        } else {
            const now = new moment(fif);
            barCodeFif = now.format("DD-MM-YYYY");
        }
        if (fechaToma !== null || fechaToma !== undefined || fechaToma !== '') {
            const now = new moment(fechaToma);
            barCodeFechaToma = now.format("DD-MM-YYYY");
        }
        barCode = barCodeFif + barCodeFechaToma + barCodeSpace + codeLab;
        return barCode;
    }

    /**Validando los datos requeridos para crear el String del codigo de barra */
    const validateCreateBarCode = () => {
        if (fechaToma === null || fechaToma === undefined || fechaToma === '') {
            setType("info");
            setMessageAlert("No esta ingresada la fecha de toma");
            setTimeout(function () {
                initialStateToast();
            }, 500);
            return false;
        }
        if (codeLab === '' || codeLab === undefined || codeLab === null) {
            setType("info");
            setMessageAlert("No existe código lab");
            setTimeout(function () {
                initialStateToast();
            }, 500);
            return false
        }
        return true;
    }

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    /**Funcion para guardar los datos */
    const postMxInfluenza = async (muestra, activeStep) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.postMuestraInfluenza(muestra);
            if (response.status === 200) {
                setExecuteLoading(false);
                setIdMx(response.data.muestraId.id);
                setIdMxFlu(response.data.id);
                switch (activeStep) {
                    case 0:
                        setType("success");
                        setMessageAlert("Se guardarón los datos generales");
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            setExecuteLoading(false);
            if (error.response !== undefined && error.response !== null && error.response !== '') {
                switch (error.response.data.message) {
                    case "MX_DUPLICATED": // Ya existe se ha registrado una muestra para ese codigo
                        setActiveStep((prevActiveStep) => prevActiveStep - 1);
                        setOpenAlertDialog(true);
                        setAlertMessageDialog("Ya existe una muestra de influenza para el código ingresado.");
                        break;
                    default:
                        break;
                }
            }
        }
        initialStateToast();
    }

    /**Funcion para editar los datos */
    const putMxInfluenza = async (muestra) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.putMuestraInfluenza(muestra);
            if (response.status === 200) {
                setExecuteLoading(false);
                switch (activeStep) {
                    case 0:
                        setType("success");
                        setMessageAlert("Se Modificarón los datos generales");
                        break;
                    case 1:
                        setType("success");
                        setMessageAlert("Se guardo la información de la muestra tomada");
                        break;
                    case 2:
                        setType("success");
                        setMessageAlert("La prueba rápida influenza se a guardado");
                        break;
                    case 3:
                        setType("success");
                        setMessageAlert("La prueba rápida VSR se a guardado");
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
        initialStateToast();
    }

    const saveData = (activeStep) => {
        let tipoMuestraId = {};
        let usuarioId = {};
        let bioanalistaId = {};
        let time = null;

        if (selectedHoraToma !== null) {
            time = moment(selectedHoraToma).format("hh:mm A");
        }

        const muestra = {
            casoIndiceEstTransm: 0,
            codLab: codeLab,
            codLabScan: codeLabScan,
            covidPositivo: false, //Pendiente
            motivoMismoEf: selectedMismoEpFif !== null ? selectedMismoEpFif : null,
            motivoSinFif: motivoNoFif,
            muestraId: {
                anulada: false,
                codigoCasa: houseCode,
                codigoParticipante: code,
                estudiosParticipante: estudiosParticipante,
                fechaRegistro: registerDate === null ? new Date() : registerDate, //Fecha del día
                fechaToma: fechaToma,
                fif: fif,
                fis: fis,
                horaToma: time, //selectedHoraToma,
                motivoAnulacion: '',
                /* motivoAnulacionId: {
                  id: null, //Pendiente
                }, */
                motivoNoMx: '',
                mxCompartida: false, //Pendiente
                mxEnviada: false, //Pendiente
                mxId: {
                    id: mxFluId,
                },
                mxTomada: mxTomada,
                observacion: observations,
                otroMotivoAnulacion: false,
                quienOrdena: selectedMedico,
                //usuarioAnulacion: null, //Pendiente
                /* usuarioId: {
                  id: 10, //Pendiente
                }, */
                volumen: volMedioMl
            },
            mxCovid: mxCv,
            mxNoTomada: mxNoTomada,
            numeroPruebas: '',
            numeroPruebasPr: testNumberFlu,
            numeroPruebasPrVsr: testNumberVsr,
            observacionesPr: observationsPr,
            observacionesPrVsr: observationsPrVsr,

            resultadoPr: selectedResult,
            resultadoPrVsr: testResultVsr,
            ///perteneceEstTransm: null, //Pendiente
            positivoMi: positivoMi,
            //procPri: '', //Pendiente
            pruebaRapida: prFlu,
            pruebaRapidaVsr: prVsr,
            //resultado: '', //Pendiente
            //retEstTransm: '', //Pendiente
            retoma: esRetoma,
            tipoPruebaId: {
                id: selectedTypeOfTest,
            }
        }

        if (selectedBioanalista !== '' && selectedBioanalista !== null && selectedBioanalista !== undefined) {
            if (selectedBioanalista > 0) {
                bioanalistaId.id = selectedBioanalista;
                muestra.muestraId.bioanalistaId = bioanalistaId;
            }
        }

        usuarioId.id = loggedInUser <= 0 ? 10 : loggedInUser
        muestra.muestraId.usuarioId = usuarioId;

        if (selectedTypeOfMx > 0) {
            tipoMuestraId.id = selectedTypeOfMx;
            muestra.tipoMuestraId = tipoMuestraId;
        }

        if (idMx > 0 && idMx !== undefined) {
            muestra.muestraId.id = idMx;
        }

        if (idMxFlu > 0 && idMxFlu !== undefined) {
            muestra.id = idMxFlu;
        }

        if (selectedResult !== '' || selectedResult !== null || selectedResult !== undefined) {
            if (selectedResult > 0) {
                muestra.resultadoPrId = {
                    id: selectedResult,
                }
            }
        }

        if (idMx > 0) {
            /**Actualizar muestra influenza*/
            if (fif !== null) {
                muestra.muestraId.fif = fif;
            }
            if (fis !== null) {
                muestra.muestraId.fis = fis;
            }
            if (fechaToma !== null) {
                muestra.muestraId.fechaToma = fechaToma;
            }
            /**Actualizando la muestra de influenza*/ 
            putMxInfluenza(muestra, activeStep);
        } else {
            /**Nueva muestra de influenza*/
            postMxInfluenza(muestra, activeStep);
        }
    }

    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
        setAlertMessageDialog('');
    }

    const cancelAlertDialogText = () => {
        setOpenAlertDialogText(false);
        setMotivoNoFif('');
        setDisabledMotivoNoFif(true);
    }

    const cancelAlertDialogMismoEF = () => {
        setOpenAlertDialogMismoEF(false);
        setSelectedMismoEpFif('');
        setErrorMismoEpFifDialog('');
        //setValidMEF(false);
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

    const acceptAlertDialogMismoEF = () => {
        let validatedDialogEF = true;
        if (selectedMismoEpFif === '' || selectedMismoEpFif === null || selectedMismoEpFif === undefined) {
            setErrorMismoEpFifDialog('Debe ingrese el motivo');
            validatedDialogEF = false;
            //setValidMEF(false);
        }

        /**Cambiando la fif ingresada por la fif que tiene el ultimo registro
         * Esto funciona solo cuando se presenta un mismo episodio febril
         */

        if (lastRecordMxFlu !== '' && lastRecordMxFlu !== null && lastRecordMxFlu !== undefined) {
            if (lastRecordMxFlu.muestraId.fif !== null && fis !== null) {
                const date2 = moment(fis).format('YYYY-MM-DD');
                if (lastRecordMxFlu.muestraId.fif !== date2) {
                    let dateVar = moment(lastRecordMxFlu.muestraId.fif);
                    let newDateVar = dateVar.utc().format();
                    setFif(newDateVar);
                }
            }
        }
    
        /**------------------------------------- */

        if (validatedDialogEF) {
            //setValidMEF(true);
            setOpenAlertDialogMismoEF(false);
        }
    }

    const goBackListMxInfluenza = () => {
        history.push(`/muestras/influenza`);
    }

    return (
        <>
            <MxInfluenza
                title={title}
                activeStep={activeStep}
                data={data}
                code={code}
                name={name}
                study={study}
                age={age}
                mxCv={mxCv}
                positivoMi={positivoMi}
                fif={fif}
                fis={fis}
                fechaToma={fechaToma}
                mxTomada={mxTomada}
                mxNoTomada={mxNoTomada}
                esRetoma={esRetoma}
                dataTypeOfTest={dataTypeOfTest}
                medicos={medicos}
                codeLabScan={codeLabScan}
                codeLab={codeLab}
                bioanalistas={bioanalistas}
                typeMx={typeMx}
                prFlu={prFlu}
                prVsr={prVsr}
                volMedioMl={volMedioMl}
                observations={observations}
                testNumberFlu={testNumberFlu}
                //testResultFlu={testResultFlu}
                testNumberVsr={testNumberVsr}
                testResultVsr={testResultVsr}
                observationsPr={observationsPr}
                observationsPrVsr={observationsPrVsr}
                mismoEpFif={mismoEpFif}
                onKeyPressCode={onKeyPressCode}
                executeLoading={executeLoading}
                onSelectRequestBy={onSelectRequestBy}
                selectedMedico={selectedMedico}
                handleChangeTypeOfTest={handleChangeTypeOfTest}
                selectedTypeOfTest={selectedTypeOfTest}
                selectedHoraToma={selectedHoraToma}
                selectedBioanalista={selectedBioanalista}
                handleChangeBionalista={handleChangeBionalista}
                selectedTypeOfMx={selectedTypeOfMx}
                selectedMismoEpFif={selectedMismoEpFif}
                motivoNoFif={motivoNoFif}
                motivoNoMx={motivoNoMx}
                onSelectTypeOfMx={onSelectTypeOfMx}
                onSelectMismoEpFif={onSelectMismoEpFif}
                handleChangeCode={handleChangeCode}
                handleChangeMxCv={handleChangeMxCv}
                handleChangepositivoMi={handleChangepositivoMi}
                handleChangeFif={handleChangeFif}
                handleChangeFis={handleChangeFis}
                handleChangeFtoma={handleChangeFtoma}
                handleChangeMxTomada={handleChangeMxTomada}
                handleChangeMxNoTomada={handleChangeMxNoTomada}
                handleChangeEsRetoma={handleChangeEsRetoma}
                handleChangeHoraToma={handleChangeHoraToma}
                handleChangePrFlu={handleChangePrFlu}
                handleChangePrVsr={handleChangePrVsr}
                handleChangeVolMedioMl={handleChangeVolMedioMl}
                handleChangeObservations={handleChangeObservations}
                handleChangeTestNumberFlu={handleChangeTestNumberFlu}
                //handleChangeTesResultFlu={handleChangeTesResultFlu}
                handleChangeTestNumberVsr={handleChangeTestNumberVsr}
                handleChangeTesResultVsr={handleChangeTesResultVsr}
                handleChangeObservationsPr={handleChangeObservationsPr}
                handleChangeObservationsPrVsr={handleChangeObservationsPrVsr}
                handleChangeMotivoNoFif={handleChangeMotivoNoFif}
                handleChangeMotivoNoMx={handleChangeMotivoNoMx}
                /* handleChangeCodeLabScan={handleChangeCodeLabScan}
                handleChangeCodeLab={handleChangeCodeLab} */
                handleNext={handleNext}
                handleBack={handleBack}
                errorCode={errorCode}
                errorMedico={errorMedico}
                errorFis={errorFis}
                errorFif={errorFif}
                errorFechaToma={errorFechaToma}
                errorTypeOfTest={errorTypeOfTest}
                errorBioanlista={errorBioanlista}
                errorTypeOfMx={errorTypeOfMx}
                errorHoraToma={errorHoraToma}
                errorVolMedio={errorVolMedio}
                errorMotivoSinFif={errorMotivoSinFif}
                errorTestNumberFlu={errorTestNumberFlu}
                errorMotivoNoMx={errorMotivoNoMx}
                saveData={saveData}
                printCode={printCode}
                disableCode={disableCode}
                isMxCv={isMxCv}
                disableTypeOfTest={disableTypeOfTest}
                disabledMotivoNoFif={disabledMotivoNoFif}
                disabledMismoEpFebril={disabledMismoEpFebril}
                disabledMotivoNoMx={disabledMotivoNoMx}
                disableMxNoTomada={disableMxNoTomada}
                disabledEsRetoma={disabledEsRetoma}
                dataResult={dataResult}
                dataResultVsr={dataResultVsr}
                selectedResult={selectedResult}
                handleChangeResult={handleChangeResult}
                errorMessageResult={errorMessageResult}
                errorTestNumberFluVsr={errorTestNumberFluVsr}
                errorMessageResultVsr={errorMessageResultVsr}
                goBackListMxInfluenza={goBackListMxInfluenza}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
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
            <AlertDialogMismoEF
                mismoEpFif={mismoEpFif}
                fifUltMxTomada={fifUltMxTomada}
                fif={fif}
                alertMessageDialogMismoEF={alertMessageDialogMismoEF}
                openAlertDialogMismoEF={openAlertDialogMismoEF}
                selectedMismoEpFif={selectedMismoEpFif}
                handleChangeMismoEpFifDialog={handleChangeMismoEpFifDialog}
                cancelAlertDialogMismoEF={cancelAlertDialogMismoEF}
                acceptAlertDialogMismoEF={acceptAlertDialogMismoEF}
                errorMismoEpFifDialog={errorMismoEpFifDialog}
                alertMessageDifFif={alertMessageDifFif}
            />
        </>
    );

}
export default MxInfluenzaContainer;
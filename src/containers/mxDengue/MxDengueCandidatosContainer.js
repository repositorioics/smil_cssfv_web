import React, { useState, useEffect } from 'react';
//import { Redirect } from "react-router-dom";
//import axios from 'axios';
import { useHistory } from 'react-router-dom';
import MxDengue from '../../components/mxDengue/MxDengue';
import DataServices from '../../service/Api';
import Utils from '../../utils/Utils';
import moment from 'moment';
import ToastContainer from '../../components/toast/Toast';
import AlertDialog from '../../components/alertDialog/AlertDialog';
import DialogImprimirFormatoCodigos from '../../components/alertDialog/DialogImprimirFormatoCodigos';
import AlertDialogMxDuplicada from '../../components/alertDialog/AlertDialogMxDuplicada';
import MxDengueUtils from './MxDengueUtils';
import * as Constants from '../../Constants';

const MxDengueCandidatosContainer = props => {

    let history = useHistory();
    const [mxDengueId] = useState(Constants.ID_MUESTRA_DENGUE); // Id de la muestra de Dengue
    const [idMx, setIdMx] = useState(0);
    const [idMxDengue, setIdMxDengue] = useState(0)
    const [title, setTitle] = useState('');
    const [titleChkZkDen, setTitleChkZkDen] = useState('');
    let [code, setCode] = useState('');
    let [codLab, setCodLab] = useState('');
    let [codLabScan, setCodLabScan] = useState('');
    const [houseCode, setHouseCode] = useState('');
    const [estudiosParticipante, setEstudiosParticipante] = useState('');
    const [data, setData] = useState({});
    const [selectedTypeOfTest, setSelectedTypeOfTest] = useState('');
    const [dataTypeOfTest, setDataTypeOfTest] = useState([]);
    const [selectedTubo, setSelectedTubo] = useState('');
    const [tipoTubo, setTipoTubo] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [selectedConsulta, setSelectedConsulta] = useState('');
    const [categoria, setCategoria] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [medicos, setMedicos] = useState([]);
    const [selectedMedico, setSelectedMedico] = useState('');
    const [bioanalistas, setBioanalistas] = useState([]);
    const [selectedBioanalista, setSelectedBioanalista] = useState('');
    //const [bioanalistasVial, setBioanalistasVial] = useState([]);
    let [catRecepcionId, setCatRecepcionId] = useState(0);
    const [selectedBioanalistaVial, setSelectedBioanalistaVial] = useState('');
    const [fif, setFif] = useState(null);
    const [fis, setFis] = useState(null);
    const [fechaToma, setFechaToma] = useState(new Date());
    const [name, setName] = useState('');
    const [study, setStudy] = useState('');
    const [age, setAge] = useState('');
    const [selectedCambCat, setSelectedCambCat] = useState('');
    const [cambiosCategorias, setCambiosCategorias] = useState([]);
    const [executeLoading, setExecuteLoading] = useState(false);
    let [mxTomada, setMxTomada] = useState(false);
    let [mxPapelFiltro, setMxPapelFiltro] = useState(false);
    let [mxNoTomada, setMxNoTomada] = useState(false);
    const [motivoNoMx, setMotivoNoMx] = useState('');
    const [selectedHoraToma, setSelectedHoraToma] = useState(null);
    const [selectedHoraRefrigeracion, setSelectedHoraRefrigeracion] = useState(null);
    const [volMedioMl, setVolMedioMl] = useState('');
    const [observations, setObservations] = useState('');
    let [mxSeparada, setMxSeparada] = useState(false);
    const [fechaSeparacion, setFechaSeparacion] = useState(null);
    const [selectedHoraSeparacion, setSelectedHoraSeparacion] = useState(null);
    const [viales, setViales] = useState('');
    const [volumenSuero, setVolumenSuero] = useState('');
    const [selectedHoraRefVial, setSelectedHoraRefVial] = useState(null);
    const [observationsMxSeparada, setObservationsMxSeparada] = useState('');
    const [dataResult, setDataResult] = useState([]);
    const [selectedResult, setSelectedResult] = useState('');
    //const [loggedInUser, setLoggedInUser] = useState(0);
    //const [registerDate, setRegisterDate] = useState(null);
    const [numPrueba, setNumPrueba] = useState('');
    let [mxPrDengue, setMxPrDengue] = useState(false);
    let [procInmediato, setProcInmediato] = useState(false);
    const [observationsPrDengue, setObservationsPrDengue] = useState('');
    const [lastCodeLab, setLastCodeLab] = useState('');
    const [lastRecordMxDengue, setLastRecordMxDengue] = useState({});
    const [lastAnioEstudio, setLastAnioEstudio] = useState({});
    let [orina, setOrina] = useState(false);
    let [saliva, setSaliva] = useState(false);
    let [positvoZika, setPositvoZika] = useState(false);

    const [disabledMotivoNoMx, setDisabledMotivoNoMx] = useState(true);
    const [disableFif, setDisableFif] = useState(false);
    const [disableCode, setDisableCode] = useState(false);
    const [metabolomicaHide, setMetabolomicaHide] = useState(true);
    const [positivoZkDenHide, setPositivoZkDenHide] = useState(true);
    const [disableTypeOfTest, setDisableTypeOfTest] = useState(false);
    const [disableTubo, setDisableTubo] = useState(false);
    const [disableCambioCategoria, setDisableCambioCategoria] = useState(false);
    const [disableGeneralData, setDisableGeneralData] = useState(false);

    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);

    const [accordionPanel3, setAccordionPanel3] = useState(false);
    const [accordionPanel4, setAccordionPanel4] = useState(false);

    const [errorCode, setErrorCode] = useState('');
    const [errorTypeOfTest, setErrorTypeOfTest] = useState('');
    const [errorTubo, setErrorTubo] = useState('');
    const [errorConsulta, setErrorConsulta] = useState('');
    const [errorCategoria, setErrorCategoria] = useState('');
    const [errorMedico, setErrorMedico] = useState('');
    const [errorFis, setErrorFis] = useState('');
    const [errorFif, setErrorFif] = useState('');
    const [errorFechaToma, setErrorFechaToma] = useState('');
    const [errorCambCategoria, setErrorCambCategoria] = useState('');
    const [errorBioanlista, setErrorBioanlista] = useState('');
    const [errorBioanlistaVial, setErrorBioanlistaVial] = useState('');
    const [errorMotivoNoMx, setErrorMotivoNoMx] = useState('');
    const [errorHoraToma, setErrorHoraToma] = useState('');
    const [errorHoraRefrigeracion, setErrorHoraRefrigeracion] = useState('');
    const [errorVolMedio, setErrorVolMedio] = useState('');
    const [errorFechaSeparacion, setErrorFechaSeparacion] = useState('');
    const [errorHoraSeparacion, setErrorHoraSeparacion] = useState('');
    const [errorViales, setErrorViales] = useState('');
    const [errorVolumenSuero, setErrorVolumenSuero] = useState('');
    const [errorHoraRefVial, setErrorHoraRefVial] = useState('');
    const [errorMessageResult, setErrorMessageResult] = useState('');
    const [errorNumPrueba, setErrorNumPrueba] = useState('');
    const [mxParam, setMxParam] = useState('');

    /**Alert Dialog */
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [alertMessageDialog, setAlertMessageDialog] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    const [existenDatosGenerales, setExistenDatosGenerales] = useState(false);

    /**Imprimir codigos QR, CodaBar, Etc */
    const [openFormatoCodigos, setOpenFormatoCodigos] = useState(false);
    const [formatoCodigo, setFormatoCodigo] = useState(1);
    const [cantidadCopiasCod, setCantidadCopiasCod] = useState('');
    const [errorFormatoCodigo, setErrorFormatoCodigo] = useState('');
    const [errorCantidadCopiasCod, setErrorCantidadCopiasCod] = useState('');

    /**Alert Dialog Recepcion*/
    const [openAlertDialogRecep, setOpenAlertDialogRecep] = useState(false);
    const [alertMessageDialogRecep, setAlertMessageDialogRecep] = useState('');
    const [valorDetalle, setValorDetalle] = useState({});

    const handleChangePanel1 = (panel) => (event, isExpanded) => {
        setExpanded1(isExpanded ? panel : false);
    };

    const handleChangePanel2 = (panel) => (event, isExpanded) => {
        if (existenDatosGenerales) {
            setExpanded2(isExpanded ? panel : false);
        }
    };

    const handleChangePanel3 = (panel) => (event, isExpanded) => {
        if (existenDatosGenerales) {
            setExpanded3(isExpanded ? panel : false);
        }
    };

    const handleChangePanel4 = (panel) => (event, isExpanded) => {
        if (existenDatosGenerales) {
            setExpanded4(isExpanded ? panel : false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            loadData();
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                //setExecuteLoading(true);
                setMxParam(props.match.params.mx);
                if (props.match.params.mx.trim() === 'metabolomica') {
                    setTitle('Agregar muestra dengue metabolomica');
                    setTitleChkZkDen('Positivo Zika');
                    setMetabolomicaHide(false);
                    setPositivoZkDenHide(false);
                    setAccordionPanel3(true);
                    setAccordionPanel4(true);
                    /* setOrina(false);
                    setSaliva(false); */
                    setDisableTypeOfTest(true);
                    setDisableTubo(true);
                    setDisableCambioCategoria(true);
                    /**Crear y mndar a activar los checks de orina y saliva si se necesitan */
                } else if (props.match.params.mx.trim() === 'bhc') {
                    setTitle('Agregar muestra dengue bhc');
                    setMetabolomicaHide(true);
                    setPositivoZkDenHide(true);
                    setAccordionPanel3(true);
                    setAccordionPanel4(true);
                    /* setOrina(false);
                    setSaliva(false); */
                    setDisableTypeOfTest(true);
                    setDisableTubo(true);
                    setDisableCambioCategoria(true);
                } else if (props.match.params.mx.trim() === 'paxgene') {
                    setTitle('Agreagar muestra dengue paxgene');
                    setTitleChkZkDen('Positivo Zika o Dengue');
                    setMetabolomicaHide(true);
                    setPositivoZkDenHide(false);
                    setAccordionPanel3(true);
                    setAccordionPanel4(true);
                    /* setOrina(false);
                    setSaliva(false); */
                    setDisableTypeOfTest(true);
                    setDisableTubo(true);
                    setDisableCambioCategoria(true);
                } else if (props.match.params.mx.trim() === 'pbmc') {
                    setTitle('Agregar muestra dengue pbmc');
                    setAccordionPanel3(true);
                    setAccordionPanel4(true);
                    setMetabolomicaHide(true);
                    setPositivoZkDenHide(true);
                    /* setOrina(false);
                    setSaliva(false); */
                    setDisableTypeOfTest(true);
                    setDisableTubo(true);
                    setDisableCambioCategoria(true);
                } else {
                    setMetabolomicaHide(true);
                    setPositivoZkDenHide(true);
                    /* setOrina(false);
                    setSaliva(false); */
                    setTitle('Agregar muestra de dengue');
                }
            }
        } else {
            props.history.push('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.history, props.location.state, props.match.params]);

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    const loadData = async() => {
        await getTypeOfTest(mxDengueId);
        await getListTubosActivos();
        await getListConsultasActivos();
        await getListCategoriasActivas();
        await getMedicos();
        await getListCambCategoriasActivas();
        await getBionalistas();
        await getAllResultPRD();
        await getUltimoAnioEstudio();
        if (props.match.params && Object.keys(props.match.params).length > 0) {
            await getMxDengueById(props.match.params.id);
        }
    }

    /**Funcion para obtener los datos de la muestra por id */
    const getMxDengueById = async(id) => {
        const response = await DataServices.getMuestraDengueById(id);
        if (response.status === 200) {
            //console.log(response.data);
            setIdMx(response.data.muestraId.id);
            setIdMxDengue(response.data.id);
            setCode(response.data.muestraId.codigoParticipante);
            //setCodLab(response.data.muestraId.codLab !== null ? response.data.muestraId.codLab : '');
            //setCodLabScan(response.data.muestraId.codLabScan !== null ? response.data.muestraId.codLabScan : '');
            if (response.data.muestraId.fif !== null) {
                let dateVar = moment(response.data.muestraId.fif);
                let newDateVar = dateVar.utc().format();
                setFif(newDateVar);
            }
            if (response.data.muestraId.fis !== null) {
                let dateVar = moment(response.data.muestraId.fis);
                let newDateVar = dateVar.utc().format();
                setFis(newDateVar);
            }
            /*if (response.data.muestraId.fechaToma !== null) {
                let dateVar = moment(response.data.muestraId.fechaToma);
                let newDateVar = dateVar.utc().format();
                setFechaToma(newDateVar);
            }*/
            /*if (response.data.tipoPruebaId !== null) {
                setSelectedTypeOfTest(response.data.tipoPruebaId.id);
            } else {
                setSelectedTypeOfTest('');
            }*/
            if (response.data.tuboId !== null) {
                setSelectedTubo(response.data.tuboId.id);
            } else {
                setSelectedTubo('');
            }
            
            if (response.data.consultaId !== null) {
                setSelectedConsulta(response.data.consultaId.id);
            } else {
                setSelectedConsulta('');
            }
            if (response.data.categoriaId !== null) {
                setSelectedCategoria(response.data.categoriaId.id);
            } else {
                setSelectedCategoria('');
            }
            if (response.data.cambioCategoriaId !== null) {
                setSelectedCambCat(response.data.cambioCategoriaId.id);
            } else {
                setSelectedCambCat('');
            }
            //setLoggedInUser(response.data.muestraId.usuarioId.id);
            //setRegisterDate(response.data.muestraId.fechaRegistro);
            getParticipante(response.data.muestraId.codigoParticipante);
            getLastRecordMxDengue(response.data.muestraId.codigoParticipante);
            obtenerUltimoCodigoLab(response.data.muestraId.codigoParticipante);
            //medicoById(response.data.muestraId.quienOrdena);
            //setVolMedioMl(response.data.muestraId.volumen !== null ? response.data.muestraId.volumen : '');
            //setObservations(response.data.muestraId.observacion);
            /*if (response.data.motivoMismoEf !== null) {
                setSelectedMismoEpFif(response.data.motivoMismoEf.id);
            } else {
                setSelectedMismoEpFif('');
            }*/
            //setCatRecepcionId(response.data.muestraId.catRecepcionId.id);
            //setOrina(response.data.orina);
            //setSaliva(response.data.saliva);
            /**Parte 2 */
            //setMxTomada(response.data.muestraId.mxTomada);
            //setMxPapelFiltro(response.data.mxPapelFiltroEnviada);
            //setMxNoTomada(response.data.mxNoTomada);
            //setMotivoNoMx(response.data.muestraId.motivoNoMx);
            /*if (response.data.muestraId.bioanalistaId !== null) {
                setSelectedBioanalista(response.data.muestraId.bioanalistaId.id);
            }
            if (response.data.muestraId.horaToma !== null) {
                const time = response.data.muestraId.horaToma;
                let today = new Date().toISOString().slice(0, 10)
                const dateTime = moment(`${today} ${time}`, 'YYYY-MM-DD hh:mm a').format();
                setSelectedHoraToma(dateTime);
            } else {
                setSelectedHoraToma(null);
            }
            if (response.data.horaRefrigeracion !== null) {
                const time = response.data.horaRefrigeracion;
                let today = new Date().toISOString().slice(0, 10)
                const dateTime = moment(`${today} ${time}`, 'YYYY-MM-DD hh:mm a').format();
                setSelectedHoraRefrigeracion(dateTime);
            } else {
                setSelectedHoraRefrigeracion(null);
            }*/
            /**Parte 3*/
            /*setMxSeparada(response.data.mxSeparada);
            if (response.data.fechaSeparacion !== null) {
                let dateVar = moment(response.data.fechaSeparacion);
                let newDateVar = dateVar.utc().format();
                setFechaSeparacion(newDateVar);
            } else {
                setFechaSeparacion(null);
            }*/
            /*if (response.data.horaSeparacion !== null) {
                const time = response.data.horaSeparacion;
                let today = new Date().toISOString().slice(0, 10)
                const dateTime = moment(`${today} ${time}`, 'YYYY-MM-DD hh:mm').format();
                setSelectedHoraSeparacion(dateTime);
            } else {
                setSelectedHoraSeparacion(null);
            }/*
            setViales(response.data.numViales !== null ? response.data.numViales : '');
            setVolumenSuero(response.data.volumenSuero);
            if (response.data.horaRefrigeracionVial !== null) {
                const time = response.data.horaRefrigeracionVial;
                let today = new Date().toISOString().slice(0, 10)
                const dateTime = moment(`${today} ${time}`, 'YYYY-MM-DD hh:mm').format();
                setSelectedHoraRefVial(dateTime);
            } else {
                setSelectedHoraRefVial(null);
            }
            if (response.data.bioanalistaVialId !== null) {
                setSelectedBioanalistaVial(response.data.bioanalistaVialId.id);
            } else {
                setSelectedBioanalistaVial('');
            }
            setObservationsMxSeparada(response.data.observacionMxSeparada);
            /**Parte 4*/
            //setMxPrDengue(response.data.pruebaRapida);
            //setProcInmediato(response.data.procInmediato);
            //setNumPrueba(response.data.numeroPruebas !== null ? response.data.numeroPruebas : '');
            /*if (response.data.resultado !== null) {
                setSelectedResult(response.data.resultado);
            } else {
                setSelectedResult(null);
            }*/
            setObservationsPrDengue(response.data.observacionPrRapida !== null ? response.data.observacionPrRapida : '');
            /*----*/
            setDisableCode(true);
            //setExistenDatosGenerales(true);
        }
    }

    /**Funcion para obtener los tipos de pruebas */
    const getTypeOfTest = async (mxDengueId) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllTipoPruebasByMuestraIdAndNivel(mxDengueId, Constants.NIVEL_TIPO_PRUEBA);
            if (response.status === 200) {
                setExecuteLoading(false);
                setDataTypeOfTest(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para obtener todos los tubos activos */
    const getListTubosActivos = async () => {
        //setExecuteLoading(true);
        try {
            const response = await DataServices.getAllTubosActivos();
            if (response.status === 200) {
                setExecuteLoading(false);
                setTipoTubo(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para obtener todas las categorias activas */
    const getListCategoriasActivas = async () => {
        //setExecuteLoading(true);
        try {
            const response = await DataServices.getAllCategoriasActivas();
            if (response.status === 200) {
                setExecuteLoading(false);
                setCategoria(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para obtener todas las consultas activas */
    const getListConsultasActivos = async () => {
        //setExecuteLoading(true);
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
    }

    /**Funcion para obtener los medicos */
    const getMedicos = async () => {
        //setExecuteLoading(true);
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

    /**Metodo para obtener todas las categorias activas */
    const getListCambCategoriasActivas = async () => {
        //setExecuteLoading(true);
        try {
            const response = await DataServices.getAllCambiosCategoriasActivas();
            if (response.status === 200) {
                setExecuteLoading(false);
                setCambiosCategorias(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Funcion para obtener los bioanalistas */
    const getBionalistas = async () => {
        //setExecuteLoading(true);
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

    /**Funcion para obtener los datos del participante */
    const getParticipante = async (code) => {
        //event.preventDefault();
        //setExecuteLoading(true);
        try {
            const response = await DataServices.getParticipanteByCode(code);
            if (response.status === 200) {
                setExecuteLoading(false);
                if (response.data !== '') {
                    /**Validando que el participante este en el estudio de dengue */
                    const estudiosP = response.data.estudiosparticipante.includes('Dengue');
                    if (!estudiosP) {
                        setCodLab('');
                        setOpenAlertDialog(true);
                        setAlertMessageDialog("Sin Consentimiento de Dengue.");
                    } else {
                        setOpenAlertDialog(false);
                        setName(response.data.nombre1 + " " + response.data.nombre2 + " " + response.data.apellido1 + " " + response.data.apellido2);
                        setStudy(response.data.estudiosparticipante !== '' ? response.data.estudiosparticipante : '');
                        if (response.data.fechanac !== '' && response.data.fechanac !== null) {
                            const edad = Utils.obtenerEdad(response.data.fechanac);
                            setAge(`${edad.years} Años | ${edad.months} Meses | ${edad.days} Días`);
                        }
                        setHouseCode(response.data.codigocasa);
                        setEstudiosParticipante(response.data.estudiosparticipante);
                        setData(response.data);
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

    /**Metodo para obtener el medico seleccionado 
    const medicoById = async (id) => {
        //setExecuteLoading(true);
        try {
            const response = await DataServices.getUserById(id);
            if (response.status === 200) {
                setSelectedMedico(response.data.id);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }*/

    /**Funcion para obtener los resultados para la prueba rapida Dengue */
    const getAllResultPRD = async () => {
        //setExecuteLoading(true);
        try {
            const response = await DataServices.getAllResultMxByTipoPrueba(Constants.RESULT_BY_TIPO_PRUEBA_ID_DENGUE);
            if (response.status === 200) {
                setExecuteLoading(false);
                setDataResult(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Funcion para obtener el ultimo año del estudio */
    const getUltimoAnioEstudio = async () => {
        //setExecuteLoading(true);
        try {
            const response = await DataServices.getLastAnioEstudio();
            if (response.status === 200) {
                setExecuteLoading(false);
                setLastAnioEstudio(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    const handleChangeTypeOfTest = (e) => {
        setSelectedTypeOfTest(e.target.value);
        setErrorTypeOfTest('');
    }

    const handleChangeTipoTubo = (e) => {
        setErrorTubo('');
        setSelectedTubo(e.target.value);
    }

    const handleChangeConsulta = (e) => {
        setErrorConsulta('');
        let consul = e.target.value
        if (selectedCategoria !== '' && selectedCategoria !== null && selectedCategoria !== undefined && selectedCategoria !== '0') {
            if (selectedCategoria === 3 && consul !== 1) {
                setOpenAlertDialog(true);
                setSelectedConsulta('');
                setAlertMessageDialog("Solamente podemos ingresar consultas iniciales para Categorias C");
                return;
            }
        }
        setSelectedConsulta(e.target.value);
    }

    const onSelectRequestBy = (e) => {
        setSelectedMedico(e.target.value);
        setErrorMedico('');
    }

    const handleChangeCategoria = (e) => {
        setErrorCategoria('');
        const cat = e.target.value
        if ((selectedTypeOfTest === '' || selectedTypeOfTest === null || selectedTypeOfTest === undefined || selectedTypeOfTest === '0') && !disableTypeOfTest) {
            setOpenAlertDialog(true);
            setSelectedCategoria('');
            setAlertMessageDialog("Debe seleccionar el tipo de prueba");
            return;
        }
        if ((selectedTubo === '' || selectedTubo === null || selectedTubo === undefined || selectedTubo === '0') && !disableTubo) {
            setOpenAlertDialog(true);
            setSelectedCategoria('');
            setAlertMessageDialog("Debe seleccionar el tipo de tubo");
            return;
        }
        if (selectedTypeOfTest !== 7 && selectedTubo !== 2 && cat === 3) {
            setOpenAlertDialog(true);
            setSelectedCategoria('');
            setAlertMessageDialog("Para Categorias C solo esta permitido tomar en Tubo Rojo");
            return;
        }

        if (selectedConsulta !== '' && selectedConsulta !== null && selectedConsulta !== undefined && selectedConsulta !== '0') {
            if (cat === 3 && selectedConsulta !== 1) {
                setOpenAlertDialog(true);
                setSelectedCategoria('');
                setAlertMessageDialog("Solamente podemos ingresar consultas iniciales para Categorias C");
                return;
            }
        }
        
        if (selectedTypeOfTest === 7 && selectedTubo !== 2 && cat === 3) {
            setOpenAlertDialog(true);
            setSelectedCategoria('');
            setAlertMessageDialog("Para categorias C solo esta permitido tomar Tubo Rojo");
            return;
        }
        
        if (cat === 4) {
            setFif(null);
            setDisableFif(true);
        } else {
            setDisableFif(false);
        }
        setSelectedCategoria(e.target.value);

    }

    const handleChangeCambCategoria = (e) => {
        setErrorCambCategoria('');
        if (selectedCategoria === '' || selectedCategoria === null || selectedCategoria === undefined || selectedCategoria === '0') {
            setOpenAlertDialog(true);
            setSelectedCambCat('');
            setAlertMessageDialog("Debe ingresar la categoría");
            return;
        }
        setSelectedCambCat(e.target.value);
    }

    const handleChangeFif = (selectedDate) => {
        const result = Utils.validateDate(selectedDate);
        //const fifIngresada = moment(selectedDate).format('DD/MM/YYYY');
        let isValidDate = true;
        if (result) {
            isValidDate = false;
            setFif(null);
            setErrorFif('La FIF no puede ser mayor que la fecha de hoy');
        }
        if (selectedConsulta === 1) {
            const diff = Utils.CalculateDifferenceDates(selectedDate, new Date());
            if (diff >= 6) { // >= 10 es el valor que tiene en access
                isValidDate = false;
                setFif(null);
                setOpenAlertDialog(true);
                setAlertMessageDialog("Para las consultas Iniciales, FIF debe ser menor o igual a 5 dias");
            }
        }
        if (isValidDate) {
            setFif(selectedDate);
            setErrorFif('');
        }
    }

    const handleChangeFis = (selectedDate) => {
        const result = Utils.validateDate(selectedDate);
        let isValidDate = true;
        if (result) {
            setFis(null);
            isValidDate = false;
            setErrorFis('La FIS no puede ser mayor que la fecha de hoy');
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
        setErrorFechaToma('');
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

        if (selectedConsulta === 2 || selectedConsulta === 3) {
            const diffDay = diffDayFToma(selectedDate);
            if (diffDay < 14) {
                isValidDate = false;
                setOpenAlertDialog(true);
                setAlertMessageDialog("Fecha de toma de muestra invalida");
                return;
            }
        }

        if (isValidDate) {
            //setErrorFechaToma('');
            setFechaToma(selectedDate);
        }
    }

    const diffDayFToma = (ftoma) => {
        const result = Utils.CalculateDifferenceDates(fif, ftoma);
        return result;

    }

    const handleChangeBionalista = (e) => {
        setSelectedBioanalista(e.target.value);
        setErrorBioanlista('');
    }

    const handleChangeBionalistaVial = (e) => {
        setSelectedBioanalistaVial(e.target.value);
        setErrorBioanlistaVial('');
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
                //getLastRecordMxDengue(code);
                //getMuestrasByCodExpedienteAndCatMxId(e);
                //obtenerUltimoCodigoLab(e);
                setName('');
                setStudy('');
                setAge('');
                //setCodeLabScan('');
            }
        }
    }

    /**Metodo para obtener el ultimo registro ingresado para la muestra de dengue */
    const getLastRecordMxDengue = async (codigo) => {
        let response = {};
        /* if (props.match.params.mx.trim() === 'metabolomica') {
            response = await DataServices.mxDengueMetabolomicaPorCodigo(codigo);
            if (response.status === 200) {
                setLastRecordMxDengue(response.data);
                //console.log('Data', response.data);
            }
        } else if (props.match.params.mx.trim() === 'bhc') {
            response = await DataServices.mxDengueBhcPorCodigo(codigo);
            if (response.status === 200) {
                setLastRecordMxDengue(response.data);
                //console.log('Data', response.data);
            }
        } else if (props.match.params.mx.trim() === 'paxgene') {
            response = await DataServices.mxDenguePaxGenePorCodigo(codigo);
            if (response.status === 200) {
                setLastRecordMxDengue(response.data);
                //console.log('Data', response.data);
            }
        } else if (props.match.params.mx.trim() === 'pbmc') {
            response = await DataServices.mxDenguePbmcPorCodigo(codigo);
            if (response.status === 200) {
                setLastRecordMxDengue(response.data);
                //console.log('Data', response.data);
            }
        } else { */
        response = await DataServices.mxDengueHematicaPorCodigo(codigo);
        if (response.status === 200) {
            if (response.data !== '') {
                console.log('ultimo registro', response.data);
                setLastRecordMxDengue(response.data);
            } else {
                setDisableGeneralData(false);
            }
        }
        //}
    }

    /**Metodo para obtener el ultimo codigo lab */
    const obtenerUltimoCodigoLab = async (code) => {
        //event.preventDefault();
        setExecuteLoading(true);
        setCodLab('');
        const result = await MxDengueUtils.obtenerUltimoCodigoLabMxDengue('dengue', code);
        
        console.log('ulimo cod lab', result);
        if (result !== '') {
            setLastCodeLab(result);
            //console.log('valor: ', location, result);
        } else {
            setLastCodeLab(result);
        }
    }


    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
        setAlertMessageDialog('');
    }

    const handleChangeMxTomada = (e) => {
        mxTomada = e.target.checked;
        setMxTomada(mxTomada);
        setMxPapelFiltro(false);
        setMxNoTomada(false);
        setMotivoNoMx('');
        setErrorMotivoNoMx('');
        setDisabledMotivoNoMx(true);
        if (!mxTomada) {
            clearMxTomada();
        }
    }

    const handleChangeMxPapelFiltro = (e) => {
        mxPapelFiltro = e.target.checked;
        setMxPapelFiltro(mxPapelFiltro);
        setMxTomada(false);
        setMxNoTomada(false);
        setErrorMotivoNoMx('');
        setDisabledMotivoNoMx(true);
    }

    const handleChangeMxNoTomada = (e) => {
        mxNoTomada = e.target.checked;
        if (mxNoTomada) {
            setMxNoTomada(mxNoTomada);
            setMxTomada(false);
            setDisabledMotivoNoMx(false);
            setMxTomada(false);
            setMxPapelFiltro(false);
            clearMxTomada();
        } else {
            setDisabledMotivoNoMx(true);
            setMotivoNoMx('');
        }
    }

    const clearMxTomada = () => {
        setSelectedBioanalista('');
        setMxTomada(false);
        setMxPapelFiltro(false);
        setSelectedHoraToma(null);
        setSelectedHoraRefrigeracion(null);
        setVolMedioMl('');

    }

    const handleChangeMotivoNoMx = (e) => {
        setMotivoNoMx(e.target.value);
        setErrorMotivoNoMx('');
    }

    const handleChangeHoraToma = (e) => {
        setSelectedHoraToma(e);
        setErrorHoraToma('');
    }

    const handleChangeHoraRefrigeracion = (e) => {
        setSelectedHoraRefrigeracion(e);
        setErrorHoraRefrigeracion('');
    }

    const handleChangeVolMedioMl = (e) => {
        setVolMedioMl(e.target.value);
        setErrorVolMedio('');
    }

    const handleChangeObservations = (e) => {
        setObservations(e.target.value);
    }

    const handleChangeMxSeparada = (e) => {
        mxSeparada = e.target.checked;
        setMxSeparada(mxSeparada);
    }

    const handleChangeFSeparacion = (selectedDate) => {
        setFechaSeparacion(selectedDate);
        setErrorFechaSeparacion('');
    }

    const handleChangeHoraSeparacion = (e) => {
        setSelectedHoraSeparacion(e);
        setErrorHoraSeparacion('');
    }

    const handleChangeViales = (e) => {
        setViales(e.target.value);
        setErrorViales('');
    }

    const handleChangeVolumenSuero = (e) => {
        setVolumenSuero(e.target.value);
        setErrorVolumenSuero('');
    }

    const handleChangeHoraRefVial = (e) => {
        setSelectedHoraRefVial(e);
        setErrorHoraRefVial('');
    }

    const handleChangeObservationsMxSeparada = (e) => {
        setObservationsMxSeparada(e.target.value);
    }

    const handleChangeResult = (e) => {
        setSelectedResult(e.target.value);
        setErrorMessageResult('');
    }

    const handleChangeNumPrueba = (e) => {
        setErrorNumPrueba('');
        setNumPrueba(e.target.value);
    }

    const handleChangeMxPrDengue = (e) => {
        mxPrDengue = e.target.checked;
        setMxPrDengue(mxPrDengue);
    }

    const handleChangeProcInmediato = (e) => {
        procInmediato = e.target.checked;
        setProcInmediato(procInmediato);
    }

    const handleChangeObservationsPrDengue = (e) => {
        setObservationsPrDengue(e.target.value);
    }

    const handleChangeOrina = (e) => {
        orina = e.target.checked;
        if (orina) {
            setSaliva(false);
        }
        setOrina(orina);        
    }
    const handleChangeSaliva = (e) => {
        saliva = e.target.checked;
        if (saliva) {
            setOrina(false);
        }
        setSaliva(saliva);
    }

    const handleChangePositvoZika = (e) => {
        positvoZika = e.target.checked;
        setPositvoZika(positvoZika);
    }

    const handleCloseFormatoCodigos = () => {
        setOpenFormatoCodigos(false);
        setErrorFormatoCodigo('');
        setErrorCantidadCopiasCod('');
        //setFormatoCodigo('');
        //setCantidadCopiasCod('');
    }

    const handleChangeFormatoCodigo = (e) => {
        setFormatoCodigo(e.target.value);
        setErrorFormatoCodigo('');
    }

    const handleChangeCantCopiasCod = (e) => {
        setCantidadCopiasCod(e.target.value);
        setErrorCantidadCopiasCod('');
    }

 
    const handleCloseAlertDialogRecep = () => {
        setOpenAlertDialogRecep(false);
        setAlertMessageDialogRecep('');
    }

    const goBackListMxDengue = () => {
        if (mxParam !== '' && mxParam !== null && mxParam !== undefined) {
            if (mxParam.trim() === 'dengue') {
                history.push(`/muestras/dengue`);
            }
            if (mxParam.trim() === 'metabolomica') {
                history.push(`/muestras/dengue/metabolomicas`);
            }
            if (mxParam.trim() === 'bhc') {
                history.push(`/muestras/dengue/bhc`);
            }
            if (mxParam.trim() === 'paxgene') {
                history.push(`/muestras/dengue/paxgene`);
            }
            if (mxParam.trim() === 'pbmc') {
                history.push(`/muestras/dengue/pbmc`);
            }
        }
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

    /**Funcion para validar los datos generales */
    const validateGeneralData = () => {
        if (code === '' || code === null || code === undefined) {
            setErrorCode('El código es requerido');
            return false;
        }
        if (mxParam.trim() === 'metabolomica') {
            const result = MxDengueUtils.validateMetabolomica(orina, saliva)
            if (result.valor) {
                setType("error");
                setMessageAlert(result.mensaje);
                setTimeout(function () {
                    initialStateToast();
                }, 100);
                return false;
            }
        }

        /* if (mxParam !== 'pbmc') {
            if (selectedTypeOfTest === '' || selectedTypeOfTest === null || selectedTypeOfTest === undefined || selectedTypeOfTest === '0') {
                setErrorTypeOfTest('Debe seleccionar el tipo de prueba');
                return false;
            }
        }
        
        if (mxParam !== 'pbmc') {
            if (selectedTubo === '' || selectedTubo === null || selectedTubo === undefined || selectedTubo === '0') {
                setErrorTubo('Debe seleccionar el tipo de tubo');
                return false;
            }
        } */
        
        if (selectedConsulta === '' || selectedConsulta === null || selectedConsulta === undefined || selectedConsulta === '0') {
            setErrorConsulta('Debe seleccionar la consulta');
            return false;
        }

        if (selectedCategoria === '' || selectedCategoria === null || selectedCategoria === undefined || selectedCategoria === '0') {
            setErrorCategoria('Debe seleccionar la categoría');
            return false;
        }

        if (selectedMedico === '' || selectedMedico === null || selectedMedico === undefined || selectedMedico === '0') {
            setErrorMedico('Debe seleccionar el médico');
            return false;
        }

        /* if (mxParam !== 'pbmc') {
            if (selectedCambCat === '' || selectedCambCat === null || selectedCambCat === undefined || selectedCambCat === '0') {
                setErrorCambCategoria('Debe indicar si hubo cambio de categoría');
                return false;
            }
        } */

        if (fechaToma === '' || fechaToma === undefined || fechaToma === null) {
            setErrorFechaToma('Debe ingresar la fecha de toma de muestra');
            return false;
        }

        if (selectedCategoria !== 4 && (fif === '' || fif === null || fif === undefined)) {
            setOpenAlertDialog(true);
            setAlertMessageDialog("Debe ingresar la FIF");
            return false;
        }
        return true;
    }

    const validateMxTomada = () => {
        if (mxTomada) {
            if (selectedBioanalista === '' || selectedBioanalista === null || selectedBioanalista === undefined || selectedBioanalista === '0') {
                setErrorBioanlista('Debe seleccionar quien tomo la muestra');
                return false;
            }
            if (selectedHoraToma === '' || selectedHoraToma === undefined || selectedHoraToma === null) {
                setErrorHoraToma('Debe seleccionar la hora');
                return false
            }
            if (volMedioMl === '' || volMedioMl === undefined || volMedioMl === null) {
                setErrorVolMedio('Debe ingrese el volumen');
                return false
            }
        }
        if (mxNoTomada) {
            if (motivoNoMx === '' || motivoNoMx === null || motivoNoMx === undefined) {
                setErrorMotivoNoMx('Debe ingresar el motivo');
                return false;
            }
        }
        return true;
    }

    const validateMxSeparada = () => {
        if (mxSeparada) {
            if (fechaSeparacion === '' || fechaSeparacion === undefined || fechaSeparacion === null) {
                setErrorFechaSeparacion('Debe ingresar la fecha de separación de muestra');
                return false;
            }
            if (selectedHoraSeparacion === '' || selectedHoraSeparacion === undefined || selectedHoraSeparacion === null) {
                setErrorHoraSeparacion('Debe seleccionar la hora');
                return false
            }
        }
        return true;
    }

    const validatePrDengue = () => {
        if (mxPrDengue) {
            if (numPrueba === '' || numPrueba === undefined || numPrueba === undefined) {
                setErrorNumPrueba('Debe ingresar el número de prueba');
                return false;
            }
            if (selectedResult === '' || selectedResult === null || selectedResult === undefined || selectedResult === '0') {
                setErrorMessageResult('Debe seleccionar el resultado');
                return false;
            }
        }
        return true;
    }

    const saveMxTomada = () => {
        if (validateMxTomada()) {
            saveData();
        }
    }

    const saveMxSeparada = () => {
        if (validateMxSeparada()) {
           // saveData();
        }
    }

    const savePRDengue = () => {
        if (validatePrDengue()) {
            //saveData();
        }
    }

    /**Metodo para imprimir el código */
    const abrirImpresion = () => {
        if (validatePrintCode()) {
            //generarCodLabScan();
            setOpenFormatoCodigos(true);
            //setFormatoCodigo('');
            setCantidadCopiasCod('');
        }
    }

    const validatePrintCode = () => {
        if (selectedConsulta === '' || selectedConsulta === null || selectedConsulta === undefined || selectedConsulta === '0') {
            setType("info");
            setMessageAlert("Debe seleccionar la consulta");
            setTimeout(function () {
                initialStateToast();
            }, 100);
            return false;
        }
        if (selectedCategoria === '' || selectedCategoria === null || selectedCategoria === undefined || selectedCategoria === '0') {
            setType("info");
            setMessageAlert("Debe seleccionar la categoría");
            setTimeout(function () {
                initialStateToast();
            }, 100);
            return false;
        }

        if (fechaToma === '' || fechaToma === undefined || fechaToma === null) {
            setType("info");
            setMessageAlert("Debe ingresar la fecha de toma de muestra");
            setTimeout(function () {
                initialStateToast();
            }, 100);
            return false;
        }
        if (mxParam === 'metabolomica') {
            if (!orina && !saliva) {
                setType("info");
                setMessageAlert("Debe indicar si la muestra es Orina o Saliva");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
                return false;
            }
        }
        return true;
    }

    const generarCodLabScan = async () => {
        const result =  MxDengueUtils.generarCodigoLabScanDengue(selectedConsulta, fif, fechaToma, selectedCategoria, 
            code, positvoZika, mxParam, lastAnioEstudio, lastCodeLab,
            orina, saliva, lastRecordMxDengue);
        //setCodLabScan(codLabScan);
        //console.log('Codigo Lab Scan Generado', result);
        if (result.error === 'Error') {
            setOpenAlertDialog(true);
            setAlertMessageDialog(result.mensajeError);
            return;
        }
        if (result.resultado !== '') {
            codLabScan = result.resultado
            setCodLabScan(codLabScan);
        }
        //if (codLab === '') {
            if (result.resultado2 !== '') {
                codLab = result.resultado2
                setCodLab(codLab);
            }
        //}
        /*axios.post(Constants.URL_PRINT_CODES + codLabScan)
                .then((response) => {
                    //console.log('response', response);
                    //setOpenFormatoCodigos(false);
                }, (error) => {
                    //console.log('error', error);
                    //setOpenFormatoCodigos(false);
                });
            setOpenFormatoCodigos(false);*/
    }

    const imprimir = () => {
        generarCodLabScan();
    }

    const saveData = async() => {
        setDisableGeneralData(false);
        codLab = '';
        codLabScan = '';
        setCodLab(codLab);
        setCodLabScan(codLabScan);
        let dengueDetalle = {};
        let tipoMuestraId = {};

        if (codLabScan === '') {
            generarCodLabScan();
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
                    setMessageAlert("Código lab scan no valido");
                    setTimeout(function () {
                        initialStateToast();
                    }, 100);
                    return;
                }
            }
        }

        /**Verificamos si existe el codigo lab scan */
        const result = await Utils.obtenerMuestraByCodLabScan('Dengue', codLabScan);
        if (result !== '') {
            setExecuteLoading(false);
            const mensaje = {
                codigoLab: result.muestraId.codLab,
                codigoLabScan: result.muestraId.codLabScan,
                fechaTomaMx: result.muestraId.fechaToma
            };
            setValorDetalle(mensaje);
            setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
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
            setAlertMessageDialogRecep("Ya existe una muestra con el código lab ingresado");
            return;
        }
        
        
        let cambioCategoriaId = {};
        let categoriaId = {};
        let consultaId = {};
        let bioanalistaId = {};
        let bioanalistaVialId = {};
        let usuarioId = {};
        let tipoPruebaId = {};
        let tuboId = {};

        const accountData = JSON.parse(localStorage.getItem('accountData'));

        const muestra = {
            //"anioEstSegunFif": 0,
            completarVol: false,
            fechaSeparacion: fechaSeparacion,
            horaRefrigeracion: selectedHoraRefrigeracion !== null ? moment(selectedHoraRefrigeracion).format("hh:mm A") : null,
            horaRefrigeracionVial: selectedHoraRefVial !== null ? moment(selectedHoraRefVial).format("hh:mm A") : null,
            horaSeparacion: selectedHoraSeparacion !== null ? moment(selectedHoraSeparacion).format("hh:mm A") : null,
            muestraId: {
                codLab: codLab,
                codLabScan: codLabScan,
                anulada: false,
                codigoCasa: houseCode,
                codigoParticipante: code,
                estudiosParticipante: estudiosParticipante,
                fechaRegistro: new Date(), //Fecha del día,
                fechaToma: fechaToma,
                fif: fif,
                fis: fis,
                horaToma: selectedHoraToma !== null ? moment(selectedHoraToma).format("hh:mm A") : null,
                motivoAnulacion: '',
                motivoNoMx: motivoNoMx,
                mxCompartida: false,
                mxEnviada: false,
                mxId: {
                    id: mxDengueId
                },
                mxTomada: mxTomada,
                observacion: observations,
                otroMotivoAnulacion: false,
                quienOrdena: selectedMedico,
                catRecepcionId: {
                    id: catRecepcionId
                },
                volumen: volMedioMl
            },
            mxNoTomada: mxNoTomada,
            mxPapelFiltro: mxPapelFiltro,
            mxPapelFiltroEnviada: false,
            mxSeparada: mxSeparada,
            numViales: viales,
            numeroPruebas: numPrueba,
            pruebaRapida: true,
            resultado: selectedResult !== null ? selectedResult : '',
            retoma: false,
            procInmediato: procInmediato,
            volumenSuero: volumenSuero,
            observacionMxSeparada: observationsMxSeparada,
            observacionPrRapida: observationsPrDengue,
            orina: orina,
            saliva: saliva,
            positvoZika: positvoZika
        }

        /*if (idMx > 0 && idMx !== undefined) {
            muestra.muestraId.id = idMx;
        }

        if (idMxDengue > 0 && idMxDengue !== undefined) {
            muestra.id = idMxDengue;
        }*/

        if (selectedCambCat !== '' && selectedCambCat !== null && selectedCambCat !== undefined) {
            if (selectedCambCat > 0) {
                cambioCategoriaId.id = selectedCambCat;
                muestra.cambioCategoriaId = cambioCategoriaId;
            }
        }

        if (selectedCategoria !== '' && selectedCategoria !== null && selectedCategoria !== undefined) {
            if (selectedCategoria > 0) {
                categoriaId.id = selectedCategoria;
                muestra.categoriaId = categoriaId;
            }
        }

        if (selectedConsulta !== '' && selectedConsulta !== null && selectedConsulta !== undefined) {
            if (selectedConsulta > 0) {
                consultaId.id = selectedConsulta;
                muestra.consultaId = consultaId;
            }
        }

        if (selectedBioanalista !== '' && selectedBioanalista !== null && selectedBioanalista !== undefined) {
            if (selectedBioanalista > 0) {
                bioanalistaId.id = selectedBioanalista;
                muestra.muestraId.bioanalistaId = bioanalistaId;
            }
        }

        if (selectedBioanalistaVial !== '' && selectedBioanalistaVial !== null && selectedBioanalistaVial !== undefined) {
            if (selectedBioanalistaVial > 0) {
                bioanalistaVialId.id = selectedBioanalistaVial;
                muestra.bioanalistaVialId = bioanalistaVialId;
            }
        }

        usuarioId.id = accountData.usuarioId;
        muestra.muestraId.usuarioId = usuarioId;

        if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
            if (selectedTypeOfTest > 0) {
                tipoPruebaId.id = selectedTypeOfTest;
                muestra.tipoPruebaId = tipoPruebaId;
            }
        }

        if (selectedTubo !== '' && selectedTubo !== null && selectedTubo !== undefined) {
            if (selectedTubo > 0) {
                tuboId.id = selectedTubo;
                muestra.tuboId = tuboId;
            }
        }
        debugger
        if (idMx > 0) {
            /**Nueva muestra*/
            if (props.match.params.mx.trim() === 'metabolomica') {
                if (orina) {
                    tipoMuestraId.id = 10;
                }
                if (saliva) {
                    tipoMuestraId.id = 11;
                }
            }
            if (props.match.params.mx.trim() === 'pbmc') {
                tipoMuestraId.id = 8;
            }
            if (props.match.params.mx.trim() === 'paxgene') {
                tipoMuestraId.id = 7;
            }
            if (props.match.params.mx.trim() === 'bhc') {
                tipoMuestraId.id = 9;
            }
            dengueDetalle.muestraDengueDetalleId = muestra;
            dengueDetalle.tipoMuestraId = tipoMuestraId;
            console.log('dengueDetalle', dengueDetalle);
            postMxDengueDetalle(dengueDetalle);
        }
    }

    /**Funcion para guardar los datos */
    const postMxDengueDetalle = async (dengueDetalle) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.postMuestraDengueDetalle(idMxDengue, dengueDetalle);
            if (response.status === 200) {
                setExecuteLoading(false);
                setIdMx(response.data.muestraDengueDetalleId.muestraId.id);
                setIdMxDengue(response.data.id);
                setExistenDatosGenerales(false);
                setType("success");
                setMessageAlert("Se guardarón los datos");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
            }
        } catch (error) {
            setExecuteLoading(false);
            setDisableGeneralData(false);
            console.log('error', error);
        }
        initialStateToast();
    }

    const saveGeneralData = () => {
        if (validateGeneralData()) {
            saveData();
        }
    }

    return (
        <>
            <MxDengue
                title={title}
                dataTypeOfTest={dataTypeOfTest}
                selectedTypeOfTest={selectedTypeOfTest}
                executeLoading={executeLoading}
                selectedTubo={selectedTubo}
                selectedConsulta={selectedConsulta}
                consultas={consultas}
                tipoTubo={tipoTubo}
                categoria={categoria}
                selectedCategoria={selectedCategoria}
                selectedMedico={selectedMedico}
                medicos={medicos}
                fif={fif}
                fis={fis}
                fechaToma={fechaToma}
                name={name}
                study={study}
                age={age}
                codeLab={codLab}
                code={code}
                selectedCambCat={selectedCambCat}
                cambiosCategorias={cambiosCategorias}
                bioanalistas={bioanalistas}
                selectedBioanalista={selectedBioanalista}
                selectedBioanalistaVial={selectedBioanalistaVial}
                data={data}
                expanded1={expanded1}
                expanded2={expanded2}
                expanded3={expanded3}
                expanded4={expanded4}
                mxTomada={mxTomada}
                mxPapelFiltro={mxPapelFiltro}
                mxNoTomada={mxNoTomada}
                motivoNoMx={motivoNoMx}
                selectedHoraToma={selectedHoraToma}
                selectedHoraRefrigeracion={selectedHoraRefrigeracion}
                volMedioMl={volMedioMl}
                observations={observations}
                mxSeparada={mxSeparada}
                fechaSeparacion={fechaSeparacion}
                selectedHoraSeparacion={selectedHoraSeparacion}
                viales={viales}
                volumenSuero={volumenSuero}
                orina={orina}
                saliva={saliva}
                positvoZika={positvoZika}
                selectedHoraRefVial={selectedHoraRefVial}
                observationsMxSeparada={observationsMxSeparada}
                selectedResult={selectedResult}
                dataResult={dataResult}
                disabledMotivoNoMx={disabledMotivoNoMx}
                disableFif={disableFif}
                metabolomicaHide={metabolomicaHide}
                positivoZkDenHide={positivoZkDenHide}
                disableTypeOfTest={disableTypeOfTest}
                disableTubo={disableTubo}
                disableCambioCategoria={disableCambioCategoria}
                disableGeneralData={disableGeneralData}
                numPrueba={numPrueba}
                mxPrDengue={mxPrDengue}
                procInmediato={procInmediato}
                titleChkZkDen={titleChkZkDen}
                observationsPrDengue={observationsPrDengue}
                disableCode={disableCode}
                accordionPanel3={accordionPanel3}
                accordionPanel4={accordionPanel4}
                handleChangeCode={handleChangeCode}
                onKeyPressCode={onKeyPressCode}
                onSelectRequestBy={onSelectRequestBy}
                handleChangeTypeOfTest={handleChangeTypeOfTest}
                handleChangeTipoTubo={handleChangeTipoTubo}
                handleChangeConsulta={handleChangeConsulta}
                handleChangeCategoria={handleChangeCategoria}
                handleChangeFif={handleChangeFif}
                handleChangeFis={handleChangeFis}
                handleChangeCambCategoria={handleChangeCambCategoria}
                handleChangeBionalista={handleChangeBionalista}
                handleChangeBionalistaVial={handleChangeBionalistaVial}
                handleChangeFtoma={handleChangeFtoma}
                handleChangeMxTomada={handleChangeMxTomada}
                handleChangeMxPapelFiltro={handleChangeMxPapelFiltro}
                handleChangeMxNoTomada={handleChangeMxNoTomada}
                handleChangeMotivoNoMx={handleChangeMotivoNoMx}
                handleChangeHoraToma={handleChangeHoraToma}
                handleChangeHoraRefrigeracion={handleChangeHoraRefrigeracion}
                handleChangeVolMedioMl={handleChangeVolMedioMl}
                handleChangeObservations={handleChangeObservations}
                handleChangeMxSeparada={handleChangeMxSeparada}
                handleChangeFSeparacion={handleChangeFSeparacion}
                handleChangeHoraSeparacion={handleChangeHoraSeparacion}
                handleChangeVolumenSuero={handleChangeVolumenSuero}
                handleChangeHoraRefVial={handleChangeHoraRefVial}
                handleChangeObservationsMxSeparada={handleChangeObservationsMxSeparada}
                handleChangeNumPrueba={handleChangeNumPrueba}
                handleChangeMxPrDengue={handleChangeMxPrDengue}
                handleChangeProcInmediato={handleChangeProcInmediato}
                handleChangeObservationsPrDengue={handleChangeObservationsPrDengue}
                handleChangeOrina={handleChangeOrina}
                handleChangeSaliva={handleChangeSaliva}
                handleChangePositvoZika={handleChangePositvoZika}
                
                handleChangeResult={handleChangeResult}
                handleChangeViales={handleChangeViales}
                handleChangePanel1={handleChangePanel1}
                handleChangePanel2={handleChangePanel2}
                handleChangePanel3={handleChangePanel3}
                handleChangePanel4={handleChangePanel4}
                goBackListMxDengue={goBackListMxDengue}
                saveGeneralData={saveGeneralData}
                saveMxTomada={saveMxTomada}
                saveMxSeparada={saveMxSeparada}
                savePRDengue={savePRDengue}
                abrirImpresion={abrirImpresion}
                errorCode={errorCode}
                errorTypeOfTest={errorTypeOfTest}
                errorTubo={errorTubo}
                errorConsulta={errorConsulta}
                errorCategoria={errorCategoria}
                errorMedico={errorMedico}
                errorFis={errorFis}
                errorFif={errorFif}
                errorFechaToma={errorFechaToma}
                errorCambCategoria={errorCambCategoria}
                errorBioanlista={errorBioanlista}
                errorBioanlistaVial={errorBioanlistaVial}
                errorMotivoNoMx={errorMotivoNoMx}
                errorHoraToma={errorHoraToma}
                errorHoraRefrigeracion={errorHoraRefrigeracion}
                errorVolMedio={errorVolMedio}
                errorFechaSeparacion={errorFechaSeparacion}
                errorHoraSeparacion={errorHoraSeparacion}
                errorViales={errorViales}
                errorVolumenSuero={errorVolumenSuero}
                errorHoraRefVial={errorHoraRefVial}
                errorMessageResult={errorMessageResult}
                errorNumPrueba={errorNumPrueba}
            />
            <AlertDialog
                openAlertDialog={openAlertDialog}
                alertMessageDialog={alertMessageDialog}
                handleCloseAlertDialog={handleCloseAlertDialog}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
            <DialogImprimirFormatoCodigos
                formatoCodigo={formatoCodigo}
                openFormatoCodigos={openFormatoCodigos}
                cantidadCopiasCod={cantidadCopiasCod}
                handleChangeFormatoCodigo={handleChangeFormatoCodigo}
                handleCloseFormatoCodigos={handleCloseFormatoCodigos}
                handleChangeCantCopiasCod={handleChangeCantCopiasCod}
                errorFormatoCodigo={errorFormatoCodigo}
                errorCantidadCopiasCod={errorCantidadCopiasCod}
                imprimir={imprimir}
            />
            <AlertDialogMxDuplicada
                valorDetalle={valorDetalle}
                openAlertDialogRecep={openAlertDialogRecep}
                alertMessageDialogRecep={alertMessageDialogRecep}
                handleCloseAlertDialogRecep={handleCloseAlertDialogRecep}
            />
        </>
    );
}

export default MxDengueCandidatosContainer;


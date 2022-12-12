import React, { useState, useEffect } from 'react';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import RecepcionMx from '../../components/recepcionMx/RecepcionMx';
import DataServices from '../../service/Api';
import DataServiceCatalogos from '../../service/ApiCatalogos';
import DataServiceSeguridad from '../../service/ApiSeguridad';
import Utils from '../../utils/Utils';
import moment from 'moment';
import ToastContainer from '../../components/toast/Toast';
import * as Constants from '../../Constants';
import AlertDialog from '../../components/alertDialog/AlertDialog';
import AlertDialogMxDuplicada from '../../components/alertDialog/AlertDialogMxDuplicada';
import RecepcionMxSearchByCode from '../../components/recepcionMx/RecepcionMxSearchByCode';
import AlertDialogConfirmation from '../../components/alertDialog/AlertDialogConfirmation';
import UtilRecepcionMx from './UtilRecepcionMx';

const RecepcionMxContainer = props => {
    const [title, setTitle] = useState('');
    const [subTitle1, setSubTitle1] = useState('');
    const [subTitle2, setSubTitle2] = useState('');
    const [codLabScan, setCodLabScan] = useState('');
    const [codLab, setCodLab] = useState('');
    let [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [study, setStudy] = useState('');
    const [age, setAge] = useState('');
    const [houseCode, setHouseCode] = useState('');
    const [houseCodeChf, setHouseCodeChf] = useState('');
    const [selectedMedico, setSelectedMedico] = useState('');
    let [medicos, setMedicos] = useState([]);
    let [bioanalistas, setBioanalistas] = useState([]);
    let [selectedRequestBy, setSelectedRequestBy] = useState('');
    const [typeMx, setTypeMx] = useState([]);
    const [tipoTubo, setTipoTubo] = useState([]);
    const [classification, setClassification] = useState([]);
    const [selectedBioanalista, setSelectedBioanalista] = useState('');
    const [selectedTypeOfMxRecep, setSelectedTypeOfMxRecep] = useState('');
    const [selectedTuboRecep, setSelectedTuboRecep] = useState('');
    const [selectedBioanalistaRecepciona, setSelectedBioanalistaRecepciona] = useState('');
    const [selectedHoraToma, setSelectedHoraToma] = useState(null);
    const [selectedHoraRefrigeracion, setSelectedHoraRefrigeracion] = useState(null);
    const [selectedClassification, setSelectedClassification] = useState('');
    const [volMedioMl, setVolMedioMl] = useState('');
    const [data, setData] = useState({});
    const [category, setCategory] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedConsulta, setSelectedConsulta] = useState('');
    const [observations, setObservations] = useState('');
    const [idStudy, setIdStudy] = useState(0);
    const [catRecepcionId, setCatRecepcionId] = useState(0);
    let [orina, setOrina] = useState(false);
    let [saliva, setSaliva] = useState(false);
    let [positivoDengZika, setPositivoDengZika] = useState(false);

    const [fif, setFif] = useState(null);
    const [fis, setFis] = useState(null);
    const [fechaToma, setFechaToma] = useState(new Date());
    let [plasma, setPlasma] = useState(false);
    const [selectedVisita, setSelectedVisita] = useState('');
    const [dataVisita, setDataVisita] = useState([]);
    const [dataParametroSistemas, setDataParametroSistemas] = useState({});
    const [disableFIF, setDisableFIF] = useState(true);
    const [volumenLabel, setVolumenLabel] = useState('Vol. del medio(ml)');

    const [selectedTypeOfTest, setSelectedTypeOfTest] = useState('');
    const [dataTypeOfTest, setDataTypeOfTest] = useState([]);
    const [listMxByCode, setListMxByCode] = useState([]);
    const [isNew, setIsNew] = useState(true);
    const [fechaRegistro, setFechaRegistro] = useState(null);
    const [idMxToModify, setIdMxToModify] = useState(0);
    const [idMuestra, setIdMuestra] = useState(0);
    const [openEventButtons, setOpenEventButtons] = useState(false);
    const [tempRecepcion, setTempRecepcion] = useState('');
    const [tempAlmacen, setTempAlmacen] = useState('');
 
    const [hideHouseCHF, setHideHouseCHF] = useState(true);
    const [hideCategoria, setHideCategoria] = useState(true);
    const [hideConsulta, setHideConsulta] = useState(true);
    const [hideTypeOfMx, setHideTypeOfMx] = useState(true);
    const [hideTypeOfTest, setHideTypeOfTest] = useState(true);
    const [hideClasificacion, setHideClasificacion] = useState(false);

    const [executeLoading, setExecuteLoading] = useState(false);

    const [errorFis, setErrorFis] = useState('');
    const [errorFif, setErrorFif] = useState('');
    const [errorFechaToma, setErrorFechaToma] = useState('');
    const [errorHoraToma, setErrorHoraToma] = useState('');
    const [errorHoraRefrigeracion, setErrorHoraRefrigeracion] = useState('');
    const [errorVolMedio, setErrorVolMedio] = useState('');
    const [errorRequestBy, setErrorRequestBy] = useState('');
    const [errorBioanlista, setErrorBioanlista] = useState('');
    const [errorBioanlistaRecepciona, setErrorBioanlistaRecepciona] = useState('');
    const [errorTypeOfTest, setErrorTypeOfTest] = useState('');
    const [errorTempRecepcion, setErrorTempRecepcion] = useState('');
    const [errorTempAlmacen, setErrorTempAlmacen] = useState('');

    /**Alert Dialog*/
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [alertMessageDialog, setAlertMessageDialog] = useState('');

    /**Alert Dialog Recepcion*/
    const [openAlertDialogRecep, setOpenAlertDialogRecep] = useState(false);
    const [alertMessageDialogRecep, setAlertMessageDialogRecep] = useState('');
    let [valorDetalle, setValorDetalle] = useState({});

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    /** */
    const [searchCode, setSearchCode] = useState('');
    let [openModal, setOpenModal] = useState(false);
    let [openChildModal, setOpenChildModal] = useState(false);

    /** */
    const [openAlertDialogConfirm, setOpenAlertDialogConfirm] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            getMedicos();
            getBionalistas();
            getTypeOfMx();
            getListTubosActivos();
            getCategories();
            getConsultas();
            getListClassification();
            getAllVisitas();
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setExecuteLoading(true);
            } else {
                setTitle('Recepción muestras de terreno');
            }
        } else {
            props.history.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.history, props.match.params]);

    const columns = [
        { dataField: 'id', text: 'Id', hidden: true },
        { dataField: 'codLabScan', text: 'codLabScan', hidden: true },
        { dataField: 'idStudy', text: 'idStudy', hidden: true },
        { dataField: 'codigo', text: 'Código', sort: true, filter: textFilter({ placeholder: 'Código' }) },
        { dataField: 'codLab', text: 'Cod Lab', sort: true, filter: textFilter({ placeholder: 'Cod Lab' }) },
        { dataField: 'estudios', text: 'Estudios', sort: true, filter: textFilter({ placeholder: 'Estudios' }) },
        { dataField: 'fechaToma', text: 'Fecha Toma', sort: true, filter: textFilter({ placeholder: 'Fecha Toma' }) }
    ];

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectAll: true,
        style: { background: '#b6dcdd'},
        onSelect: (row, isSelect) => {
            //console.log('row', row);
            if (row.idStudy === 3) { //Inica que es dengue
                //console.log('Dengue');
                getTypeOfTest(Constants.ID_MUESTRA_DENGUE, Constants.NIVEL_TIPO_PRUEBA);
                muestraByIdMuestra(row.id, 'Dengue');
            } else {
                let result = '';
                result = Utils.viewTextToSaveData(row.codLabScan);
                getTypeOfTest(Constants.ID_MUESTRA_INFLUENZA, Constants.NIVEL_TIPO_PRUEBA);
                if (result === 'BHC') {
                    muestraByIdMuestra(row.id, 'BHC');
                }
                if (result === 'TransmisionLN') {
                    muestraByIdMuestra(row.id, 'Transmision');
                }
                if (result === 'TransmisionResp') {
                    muestraByIdMuestra(row.id, 'Transmision');
                }
                if (result === 'TransmisionSero') {
                    muestraByIdMuestra(row.id, 'Transmision');
                }
                if (result === 'U01') {
                    muestraByIdMuestra(row.id, 'U01');
                }
                if (result === 'Influenza') {
                   muestraByIdMuestra(row.id, 'Influenza');
                }
            }
        }
    };

    const pagination = paginationFactory({
        firstPageText: 'Primera página',
        prePageText: 'Anterior',
        nextPageText: 'Siguiente',
        lastPageText: 'Última página',
    });

    /**Metodo para oberner los datos de la muestra seleccionada */
    const muestraByIdMuestra = async (idMuestra, param) => {
        setExecuteLoading(true);
        let response = {};
        try {
            response = await UtilRecepcionMx.getMxByIdMuestra(idMuestra, param);
            if (Object.keys(response.data).length > 0) {
                console.log('resultado obtenido', response.data);
                setDisableFIF(false);
                setIsNew(false);
                getParticipante(response.data.muestraId.codigoParticipante);
                setIdMxToModify(response.data.id);
                setIdMuestra(response.data.muestraId.id);
                setIdStudy(response.data.muestraId.catRecepcionId.estudio);
                setCatRecepcionId(response.data.muestraId.catRecepcionId.id);
                setCodLabScan(response.data.muestraId.codLabScan);
                setCodLab(response.data.muestraId.codLab);
                if (response.data.muestraId.catRecepcionId.descripcion !== null) {
                    if (response.data.muestraId.catRecepcionId.descripcion === response.data.muestraId.catRecepcionId.catTipoMuestraId.descripcion) {
                        setSubTitle1(response.data.muestraId.catRecepcionId.catTipoMuestraId.descripcion);
                    } else {
                        setSubTitle1(response.data.muestraId.catRecepcionId.descripcion + ' ' + response.data.muestraId.catRecepcionId.catTipoMuestraId.descripcion);
                    }
                } else {
                    setSubTitle1(response.data.muestraId.catRecepcionId.catTipoMuestraId.descripcion);
                }
                setSubTitle2(response.data.muestraId.catRecepcionId.nombreEstudio);
                setCode(response.data.muestraId.codigoParticipante);
                setStudy(response.data.muestraId.estudiosParticipante);
                setSelectedBioanalista(response.data.muestraId.bioanalistaId.id);
                if (response.data.muestraId.fis !== null) {
                    let dateVar = moment(response.data.muestraId.fis);
                    let newDateVar = dateVar.utc().format();
                    setFis(newDateVar);
                } else {
                    setFis(null);
                }
                if (response.data.muestraId.fechaToma !== null) {
                    let dateVar = moment(response.data.muestraId.fechaToma);
                    let newDateVar = dateVar.utc().format();
                    setFechaToma(newDateVar);
                } else {
                    setFechaToma(null);
                }
                if (response.data.muestraId.fif !== null) {
                    let dateVar = moment(response.data.muestraId.fif);
                    let newDateVar = dateVar.utc().format();
                    setFif(newDateVar);
                } else {
                    setFif(null);
                }
                if (response.data.muestraId.horaToma !== null) {
                    const time = response.data.muestraId.horaToma;
                    let today = new Date().toISOString().slice(0, 10)
                    const dateTime = moment(`${today} ${time}`, 'YYYY-MM-DD hh:mm a').format();
                    setSelectedHoraToma(dateTime);
                } else {
                    setSelectedHoraToma(null);
                }
                if (response.data.tuboId !== null && response.data.tuboId !== undefined) {
                    setSelectedTuboRecep(response.data.tuboId.id);
                } else {
                    setSelectedTuboRecep('');
                }
                if (response.data.visitaId !== null && response.data.visitaId !== undefined) {
                    setSelectedVisita(response.data.visitaId.id);
                } else {
                    setSelectedVisita('');
                }
                if (response.data.clasificacionId !== null && response.data.clasificacionId !== undefined) {
                    setSelectedClassification(response.data.clasificacionId.id);
                } else {
                    setSelectedClassification('');
                }
                if (response.data.tipoPruebaId !== null && response.data.tipoPruebaId !== undefined) {
                    setHideTypeOfTest(false);
                    setSelectedTypeOfTest(response.data.tipoPruebaId.id );
                } else {
                    setHideTypeOfTest(true);
                    setSelectedTypeOfTest('');
                }
                if (response.data.muestraId.horaRefrigeracion !== null && response.data.muestraId.horaRefrigeracion !== undefined) {
                    const time = response.data.muestraId.horaRefrigeracion;
                    let today = new Date().toISOString().slice(0, 10)
                    const dateTime = moment(`${today} ${time}`, 'YYYY-MM-DD hh:mm a').format();
                    setSelectedHoraRefrigeracion(dateTime);
                } else {
                    setSelectedHoraRefrigeracion(null);
                }
                if (response.data.categoriaId !== null && response.data.categoriaId !== undefined) {
                    setSelectedCategory(response.data.categoriaId.id);
                    setHideCategoria(false);
                } else {
                    setHideCategoria(true);
                    setSelectedCategory('');
                }
                if (response.data.consultaId !== null && response.data.consultaId !== undefined) {
                    setSelectedConsulta(response.data.consultaId.id);
                    setHideConsulta(false);
                } else {
                    setSelectedConsulta('');
                    setHideConsulta(true);
                }
                if (response.data.tipoMuestraId !== null && response.data.tipoMuestraId !== undefined) {
                    setSelectedTypeOfMxRecep(response.data.tipoMuestraId.id);
                    setHideTypeOfMx(false);
                } else {
                    setSelectedTypeOfMxRecep('');
                    setHideTypeOfMx(true);
                }
                
                setTempAlmacen(response.data.muestraId.tempAlmacenamiento);
                setTempRecepcion(response.data.muestraId.tempRecepcion);
                setFechaRegistro(response.data.muestraId.fechaRegistro);
                setVolMedioMl(response.data.muestraId.volumen);
                setObservations(response.data.muestraId.observacion);
                
                setOpenEventButtons(false);
                setOpenChildModal(false);
                setOpenModal(false);
                setExecuteLoading(false);
            } else {
                setExecuteLoading(false);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para obtener los medicos */
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
                medicos = multiSelectData;
                setMedicos(medicos);
                const filterMedico = medicos.find(a => a.nombre.trim() === 'Miguel Plazaola');
                setSelectedRequestBy(filterMedico.id);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para obtener los bioanalistas */
    const getBionalistas = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceSeguridad.getAllUserProfileByNombre('Bioanalista');
            if (response.status === 200) {
                setExecuteLoading(false);
                const accountData = JSON.parse(localStorage.getItem('accountData'));
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
                if (accountData !== null) {
                    let result = bioanalistas.filter(item => item.id === accountData.usuarioId);
                    if (result.length > 0) {
                        setSelectedBioanalistaRecepciona(result[0].id);
                    }
                }
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para obtener los tipos de muestras */
    const getTypeOfMx = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceCatalogos.getAllTipoMuestrasActivas();
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

    /**Metodo para obtener todos los tubos activos */
    const getListTubosActivos = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceCatalogos.getAllTubosActivos();
            if (response.status === 200) {
                setExecuteLoading(false);
                setTipoTubo(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para obtener todas las clasificaciones */
    const getListClassification = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceCatalogos.getAllClasificaciones();
            if (response.status === 200) {
                setExecuteLoading(false);
                setClassification(response.data);

            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Metodo para obtener las categorias */
    const getCategories = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceCatalogos.getAllCategoriasActivas();
            if (response.status === 200) {
                setExecuteLoading(false);
                setCategory(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para obtener las consultas */
    const getConsultas = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceCatalogos.getAllConsultasActivas();
            if (response.status === 200) {
                setExecuteLoading(false);
                setConsultas(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para obtener todas las visitas */
    const getAllVisitas = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceCatalogos.getAllVisitas();
            if (response.status === 200) {
                setExecuteLoading(false);
                setDataVisita(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    const getParametrosSistemaByName = async(nombre) => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceSeguridad.getParametrosSistemaByNombre(nombre);
            if (response.status === 200) {
                setExecuteLoading(false);
                setDataParametroSistemas(response.data);
                if (nombre === 'TEMP_RECEPCION_ROJO') {
                    setTempRecepcion(response.data.valor);
                    setTempAlmacen(response.data.valor);
                }
                if (nombre === 'TEMP_RECEPCION_PBMC') {
                    setTempRecepcion(response.data.valor);
                    setTempAlmacen(response.data.valor);
                }
                if (nombre === 'TEMP_RECEPCION_HISOPADOS') {
                    setTempRecepcion(response.data.valor);
                    setTempAlmacen(response.data.valor);
                }
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Funcion para obtener los tipos de pruebas para la muestra de Dengue */
    const getTypeOfTest = async (idMuestra, nivel) => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceCatalogos.getAllTipoPruebasByMuestraIdAndNivel(idMuestra, nivel);
            if (response.status === 200) {
                setExecuteLoading(false);
                setDataTypeOfTest(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para obtener todas consultas por codigo participante */
    const getListMxByCode = async (valor) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllMxByCode(valor);
            if (response.status === 200) {
                if (response.data.length > 0) {
                    setExecuteLoading(false);
                    console.log('response', response.data);
                    const newData = [];
                    for (var i = 0; i < response.data.length; i++) {
                        //let estadoMx = '';
                        /*if (!response.data[0].anulada) {
                            estadoMx = 'Activa'
                        }*/
                        newData.push({
                            "id": response.data[i].id,
                            "codLabScan": response.data[i].codLabScan,
                            "idStudy": response.data[i].catRecepcionId.estudio,
                            "codigo": response.data[i].codigoParticipante,
                            "codLab": response.data[i].codLab,
                            "estudios": response.data[i].estudiosParticipante,
                            "fechaToma": response.data[i].fechaToma,
                            //"estado": estadoMx
                        });
                    }
                    setListMxByCode(newData);
                    setOpenChildModal(true);
                } else {
                    clearData(true);
                    setExecuteLoading(false);
                    setListMxByCode([]);
                    setType("error");
                    setMessageAlert("No existen datos para el código ingresado");
                    setTimeout(function () {
                        initialStateToast();
                    }, 100);
                }

            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Metodo para obtener los datos del participante */
    const getParticipante = async (code) => {
        //event.preventDefault();
        setExecuteLoading(true);
        try {
            const response = await DataServices.getParticipanteByCode(code);
            if (response.status === 200) {
                setExecuteLoading(false);
                if (response.data !== '') {
                    setOpenAlertDialog(false);
                    setName(response.data.nombre1.trim() + " " + 
                        ((response.data.nombre2 !== null && response.data.nombre2 !== '') ? response.data.nombre2.trim() + " " : '') + 
                        response.data.apellido1.trim() + " " + 
                        ((response.data.apellido2 !== null && response.data.apellido2 !== '') ? response.data.apellido2.trim() + " " : ''));
                    setStudy(response.data.estudiosparticipante !== '' ? response.data.estudiosparticipante : '');
                    setHouseCode(response.data.codigocasa);
                    if (response.data.casachf !== '' && response.data.casachf !== null && response.data.casachf !== undefined) {
                        setHouseCodeChf(response.data.casachf);
                    } else {
                        setHouseCodeChf('');
                    }
                    if (response.data.fechanac !== '' && response.data.fechanac !== null) {
                        const edad = Utils.obtenerEdad(response.data.fechanac);
                        setAge(`${edad.years} Años | ${edad.months} Meses | ${edad.days} Días`);
                    }
                    if (response.data.estudiosparticipante !== "") {
                        if (response.data.estudiosparticipante.includes('CH Familia')) {
                            setHideHouseCHF(false)
                        } else {
                            setHideHouseCHF(true);
                        }
                    }
                    //setStudy(response.data.estudiosparticipante);
                    setData(response.data);
                } else {
                    clearData(false);
                    setOpenAlertDialog(true);
                    setAlertMessageDialog("No existe información para el código ingresado");
                }
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para verificar si el codigo lab scan es valido */
    const getFormatCodeLabScanByCod = async (valor, event) => {
        setExecuteLoading(true);
        try {
            const response = await DataServiceCatalogos.getCatRecepcionByCodLabScan(valor);
            if (response.status === 200) {
                setExecuteLoading(false);
                if (response.data !== "") {
                    setCodLabScan(valor);
                    console.log("Resultado Cod Lab Scan: ", response.data);
                    if (response.data.descripcion !== null) {
                        if (response.data.descripcion === response.data.catTipoMuestraId.descripcion) {
                            setSubTitle1(response.data.catTipoMuestraId.descripcion);
                        } else {
                            setSubTitle1(response.data.descripcion + ' ' + response.data.catTipoMuestraId.descripcion);
                        }
                    } else {
                        setSubTitle1(response.data.catTipoMuestraId.descripcion);
                    }

                    if (response.data.catTipoMuestraId !== null && response.data.catTipoMuestraId !== '' && response.data.catTipoMuestraId !== undefined) {
                        if (response.data.catTipoMuestraId.nombre === 'ORINA') {
                            setOrina(true);
                        } else {
                            setOrina(false);
                        }
                        if (response.data.catTipoMuestraId.nombre === 'SALIVA') {
                            setSaliva(true);
                        } else {
                            setSaliva(false);
                        }
                    }
                    setSubTitle2(response.data.nombreEstudio);
                    setIdStudy(response.data.estudio);
                    setCatRecepcionId(response.data.id);
                    /**Cargar toda la informacion */
                    let partes = null;
                    switch (response.data.estudio) {
                        case 1: // Cohorte de Familia tiene 2 espacios
                            partes = valor.split('  ');
                            loadDataByCodLabScan(partes);
                            break;
                        case 3: // Cohorte Pediatrica Dengue no tiene espacios
                            loadDataDengueByCodLabScan(valor);
                            break;
                        case 4: // Cohorte Pediatrica Influenza tiene 2 espacios
                            partes = valor.split('  ');
                            loadDataByCodLabScan(partes);
                            break;
                        case 5: // Cohorte Pediatrica Influenza/UO1 tiene 1 espacio
                            const result = valor.replaceAll('  ', ' ');
                            partes = result.split(' ');
                            loadDataByCodLabScan(partes);
                            break;
                        default:
                        // code block
                    }

                } else {
                    const form = event.target.form;
                    const index = [...form].indexOf(event.target);
                    form.elements[index + 0].focus();
                    event.preventDefault();
                    setSubTitle1("");
                    setSubTitle2("");
                    clearData(false);
                    setType("error");
                    setMessageAlert("Código lab scan no valido");
                }

            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
        initialStateToast();
    }

    /**Metodo para obtener todo la informacion del participante a traves del codigo lab scan 
     * valido para los codigos que tienen 2 y 1 espacio
    */
    const loadDataByCodLabScan = async (partes) => {
        if (partes !== undefined) {
            setSelectedConsulta('');
            setHideConsulta(true);
            if (partes.length > 0) {
                const codigo = partes[1].substring(0, partes[1].indexOf("."));
                const parteFif = partes[0].substring(0, 10);
                if (parteFif !== '10/10/3000' && parteFif !== '10-10-3000') {
                    let formatFif = parteFif.replaceAll('/', '-');
                    let resultFormat = formatFif.split("-").reverse().join("-");
                    let dateFif = moment(resultFormat, "YYYY-MM-DD");
                    let newDateFif = dateFif.utc().format();
                    setFif(newDateFif);
                } else {
                    setFif(null);
                }
                const parteFechaToma = partes[0].substring(10, 20);
                let formatFechaToma = parteFechaToma.replaceAll('/', '-');
                let resultFormat = formatFechaToma.split("-").reverse().join("-");
                let dateFechaToma = moment(resultFormat, "YYYY-MM-DD");
                let newDateFechaToma = dateFechaToma.utc().format();
                const resultTuboRojo = codLabScan.includes('R');
                const res = codLabScan.includes('SR1') || codLabScan.includes('SR2') || codLabScan.includes('SR3')
                    || codLabScan.includes('SR4') || codLabScan.includes('SR5') || codLabScan.includes('SR6');

                const res2 = codLabScan.includes('TR1') || codLabScan.includes('TR2') || codLabScan.includes('TR3')
                    || codLabScan.includes('TR4') || codLabScan.includes('TR5') || codLabScan.includes('TR6');

                const res3 = codLabScan.includes('TL1') || codLabScan.includes('TL2');
                const resultTuboPBMC = codLabScan.includes('P');
                if (res || res2 || res3) {
                    (async () => {
                        await getParametrosSistemaByName('TEMP_RECEPCION_HISOPADOS');
                    })();
                    setSelectedTypeOfMxRecep(4);
                    setHideTypeOfTest(false);
                    setHideClasificacion(true);
                    (async () => {
                        await getTypeOfTest(Constants.ID_MUESTRA_INFLUENZA, Constants.NIVEL_TIPO_PRUEBA);
                        setSelectedTypeOfTest(1);
                    })();
                }
                
                if (resultTuboRojo && !res && !res2) {
                    (async () => {
                        await getParametrosSistemaByName('TEMP_RECEPCION_ROJO');
                    })();
                    setSelectedTuboRecep(2);
                    setHideTypeOfTest(true);
                    setSelectedTypeOfTest('');
                    setSelectedTypeOfMxRecep(13);
                    setVolumenLabel('Volumen de la muestra');
                }
                if (resultTuboPBMC && !res && !res2) {
                    (async () => {
                        await getParametrosSistemaByName('TEMP_RECEPCION_PBMC');
                    })();
                    setSelectedTuboRecep(1);
                    setHideTypeOfTest(true);
                    setSelectedTypeOfTest('');
                    setSelectedTypeOfMxRecep(8);
                    setVolumenLabel('Volumen de la muestra');
                }
                if (partes[1].includes('TL1')) {
                    setHideConsulta(false);
                    setSelectedConsulta(1);
                }
                if (partes[1].includes('TL2')) {
                    setHideConsulta(false);
                    setSelectedConsulta(2);
                }
                if (codLabScan.includes('VPI') || codLabScan.includes('VRI') || codLabScan.includes('VPF') || codLabScan.includes('VRF')) {
                    setSelectedClassification(2);
                }
                if (codLabScan.includes('UPI') || codLabScan.includes('URI') || codLabScan.includes('UPF') || codLabScan.includes('URF')) {
                    setSelectedClassification(1);
                }
                if (partes[1] !== undefined) {
                    if (partes[1].includes('I')) {
                        const filterByName = dataVisita.filter(a => a.nombre.trim() === 'Inicial');
                        setSelectedVisita(filterByName[0].id);
                    }
                }
                if (partes[1] !== undefined) {
                    if (partes[1].includes('F')) {
                        const filterByName = dataVisita.filter(a => a.nombre.trim() === 'Final');
                        setSelectedVisita(filterByName[0].id);
                    }
                }

                setSelectedCategory('');
                setHideCategoria(true);
                setFechaToma(newDateFechaToma);
                setCode(codigo);
                getParticipante(codigo);
                setCodLab(partes[1]);
                setHideTypeOfMx(false);
                setSelectedTypeOfTest('');
            }
        }

    }

    /**Metodo para obtener todo la informacion del participante a traves del codigo lab scan 
     * para el estudio de Dengue este codigo no contiene espacios
    */
    const loadDataDengueByCodLabScan = (valor) => {
        getTypeOfTest(Constants.ID_MUESTRA_DENGUE, Constants.NIVEL_TIPO_PRUEBA);
        if (valor !== undefined) {
            const parteFif = valor.substring(1, 11);
            const parteFechaToma = valor.substring(11, 21);
            const codigo = valor.substring(22, valor.indexOf("."));
            if (parteFif !== '10/10/3000' && parteFif !== '10-10-3000') {
                let formatFif = parteFif.replaceAll('/', '-');
                let resultFormat = formatFif.split("-").reverse().join("-");
                let dateFif = moment(resultFormat, "YYYY-MM-DD");
                let newDateFif = dateFif.utc().format();
                setFif(newDateFif);
            } else {
                setFif(null);
            }
            let formatFechaToma = parteFechaToma.replaceAll('/', '-');
            let resultFormat = formatFechaToma.split("-").reverse().join("-");
            let dateFechaToma = moment(resultFormat, "YYYY-MM-DD");
            let newDateFechaToma = dateFechaToma.utc().format();
            const categoriaA = valor.substring(21, valor.length).includes('A');
            const categoriaB = valor.substring(21, valor.length).includes('B');
            const categoriaC = valor.substring(21, valor.length).includes('C');
            const categoriaD = valor.substring(21, valor.length).includes('D');
            const consultaInicial = valor.substring(0, 1).includes('I');
            const consultaConvaleciente = valor.substring(0, 1).includes('C');
            if (valor.substr(33) === 'Z1' || valor.substr(33) === 'Z2') {
                positivoDengZika = true;
                setPositivoDengZika(positivoDengZika);
            } else {
                setPositivoDengZika(false);
            }
            if (categoriaA || categoriaB || categoriaC || categoriaD) {
                setHideCategoria(false);
            } else {
                setHideCategoria(true);
                setSelectedCategory('');
            }
            //SELECCIONAR SI ES VACUNA O ENFERMO SEGUN EL CODIGO LAB VPI ETC ETC
            if (categoriaA) {
                setSelectedCategory(1);
            }
            if (categoriaB) {
                setSelectedCategory(2);
            }
            if (categoriaC) {
                setSelectedCategory(3);
            }
            if (categoriaD) {
                setSelectedCategory(4);
            }
            if (consultaInicial) {
                setHideConsulta(false);
                setSelectedConsulta(1);
            }
            if (consultaConvaleciente) {
                setHideConsulta(false);
                setSelectedConsulta(2);
            }
            setHouseCode('');
            setHouseCodeChf('');
            setHideHouseCHF(true);
            setFechaToma(newDateFechaToma);
            setCode(codigo);
            getParticipante(codigo);
            setCodLab(valor.substring(22));
            setHideTypeOfTest(false);
            setHideTypeOfMx(true);
            setSelectedTypeOfMxRecep('');
        }
    }

    const handleChangeMedico = (e) => {
        setSelectedMedico(e.target.value);
    }

    const handleChangeBionalista = (e) => {
        setErrorBioanlista('');
        setSelectedBioanalista(e.target.value);
    }

    const handleChaneSelectRequestBy = (e) => {
        setErrorRequestBy('');
        setSelectedRequestBy(e.target.value);
    }

    const handleChangeSelectTypeOfMxRecep = (e) => {
        setSelectedTypeOfMxRecep(e.target.value);
    }

    const handleChangeTipoTuboRecep = (e) => {
        setSelectedTuboRecep(e.target.value);
    }

    const handleChangeBionalistaRecepciona = (e) => {
        setErrorBioanlistaRecepciona('');
        setSelectedBioanalistaRecepciona(e.target.value);
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

    const onKeyFis = (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 4].focus();
            event.preventDefault();
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

    const handleChangeHoraToma = (e) => {
        setSelectedHoraToma(e);
        setErrorHoraToma('');
    }

    const onKeyHoraToma = (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 2].focus();
            event.preventDefault();
        }
    }

    const handleChangeHoraRefrigeracion = (e) => {
        setSelectedHoraRefrigeracion(e);
        setErrorHoraRefrigeracion('');
    }

    const onKeyHoraRefrigeracion = (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 2].focus();
            event.preventDefault();
        }
    }

    const handleChangeVolMedioMl = (e) => {
        setVolMedioMl(e.target.value);
        setErrorVolMedio('');
    }

    const onKeyVolumen = (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 2].focus();
            event.preventDefault();
        }
    }

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
    }

    const handleChangeConsulta = (e) => {
        setSelectedConsulta(e.target.value);
    }

    const onChangeBarcode = (event) => {
        setCodLabScan(event.target.value)
    }

    const onKeyPressBarcode = (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            setCodLabScan(event.target.value)
            const result = event.target.value;
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 5].focus();
            clearData(true);
            event.preventDefault();
            getFormatCodeLabScanByCod(result, event);
        }
    }

    const handleChangeObservations = (e) => {
        setObservations(e.target.value);
    }

    const handleChangeClassification = (e) => {
        setSelectedClassification(e.target.value);
    }

    const handleChangePlasma = (e) => {
        plasma = e.target.checked;
        setPlasma(plasma);
    }

    const handleChangeVisita = (e) => {
        setSelectedVisita(e.target.value);
    }

    const handleChangeTypeOfTest = (e) => {
        setSelectedTypeOfTest(e.target.value);
        setErrorTypeOfTest('');
    }

    const handleChangeTempRecep = (e) => {
        setTempRecepcion(e.target.value);
        setErrorTempRecepcion('');
    }

    const handleChangeTempAlmacen = (e) => {
        setTempAlmacen(e.target.value);
        setErrorTempAlmacen('');
    }

    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
        setAlertMessageDialog('');
    }

    const handleCloseAlertDialogRecep = () => {
        setOpenAlertDialogRecep(false);
        setAlertMessageDialogRecep('');
    }

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    /**Metodo para validar los datos requeridos */
    const validateData = () => {
        if (selectedRequestBy === '' || selectedRequestBy <= 0) {
            setErrorRequestBy('Debe seleccionar quien solicito la muestra');
            return false;
        }
        if (selectedBioanalista === '' || selectedBioanalista <= 0) {
            setErrorBioanlista('Debe de seleccionar al bioanalista');
            return false;
        }
        if (selectedHoraToma === null) {
            setErrorHoraToma('Debe ingresar la hora de la toma de muestra');
            return false;
        }
        if (volMedioMl === '' || volMedioMl === null || volMedioMl === undefined) {
            setErrorVolMedio('Debe ingresar el volumen de la muestra');
            return false;
        }

        if (volMedioMl < 2 || volMedioMl > 15) {
            setErrorVolMedio('El volumen esta fuera de rango => (2 - 15)');
            return false;
        }

        if (selectedBioanalistaRecepciona === '' || selectedBioanalistaRecepciona <= 0) {
            setErrorBioanlistaRecepciona('Debe seleccionar quien recepciona la muestra');
            return false;
        }
        
        /**Validando la temperatura de almacenamiento y la temperatura de recepcion */
        if (Object.keys(dataParametroSistemas).length > 0) {
            if (dataParametroSistemas.nombre.trim() === 'TEMP_RECEPCION_ROJO') {
                /**ROJO */
                if (selectedTuboRecep === 2) {
                    if (tempAlmacen === '' || tempAlmacen === null || tempAlmacen === undefined) {
                        setErrorTempAlmacen('Debe ingresar la temp almacen');
                        return false;
                    } else {
                        if (tempAlmacen < 2 || tempAlmacen > 8) {
                            setErrorTempAlmacen('La temp debe estar entre 2 - 8 °C');
                            return false;
                        }
                    }
                    if (tempRecepcion === '' || tempRecepcion === null || tempRecepcion === undefined) {
                        setErrorTempRecepcion('Debe ingresar la temp recepcion');
                        return false;
                    } else {
                        if (tempAlmacen < 2 || tempAlmacen > 8) {
                            setErrorTempRecepcion('La temp debe estar entre 2 - 8 °C');
                            return false;
                        }
                    }
                }
                /**PBMC */
                if (dataParametroSistemas.nombre.trim() === 'TEMP_RECEPCION_PBMC') {
                    if (tempAlmacen === '' || tempAlmacen === null || tempAlmacen === undefined) {
                        setErrorTempAlmacen('Debe ingresar la temp almacen');
                        return false;
                    } else {
                        if (tempAlmacen < 12 || tempAlmacen > 18) {
                            setErrorTempAlmacen('La temp debe estar entre 12 - 18 °C');
                            return false;
                        }
                    }
                    if (tempRecepcion === '' || tempRecepcion === null || tempRecepcion === undefined) {
                        setErrorTempRecepcion('Debe ingresar la temp recepcion');
                        return false;
                    } else {
                        if (tempAlmacen < 12 || tempAlmacen > 18) {
                            setErrorTempRecepcion('La temp debe estar entre 12 - 18 °C');
                            return false;
                        }
                    }
                }
                /**HISOPADOS */
                if (dataParametroSistemas.nombre.trim() === 'TEMP_RECEPCION_HISOPADOS') {
                    if (tempAlmacen === '' || tempAlmacen === null || tempAlmacen === undefined) {
                        setErrorTempAlmacen('Debe ingresar la temp almacen');
                        return false;
                    } else {
                        if (tempAlmacen < 2 || tempAlmacen > 8) {
                            setErrorTempAlmacen('La temp debe estar entre 2 - 8 °C');
                            return false;
                        }
                    }
                    if (tempRecepcion === '' || tempRecepcion === null || tempRecepcion === undefined) {
                        setErrorTempRecepcion('Debe ingresar la temp recepcion');
                        return false;
                    } else {
                        if (tempAlmacen < 2 || tempAlmacen > 8) {
                            setErrorTempRecepcion('La temp debe estar entre 12 - 18 °C');
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    const nuevaRecepcion = () => {
        if (codLabScan !== null && codLabScan !== '' && codLabScan !== undefined ) {
            setConfirmationMessage('Esta seguro de crear una nueva recepción? Si hace click en Confirmar, se eliminaran todos los datos ingresados');
            setOpenAlertDialogConfirm(true);
        } else {
            clearData(false);
        }
    }

    const clearData = (esNuevaRecepcion) => {
        setCodLab('');
        setCode('');
        setName('');
        setAge('');
        setStudy('');
        setSelectedBioanalista('');
        setSelectedTypeOfMxRecep('');
        setSelectedTuboRecep('');
        setFis(null);
        setFif(null);
        setFechaToma(new Date());
        setSelectedHoraToma(null);
        setSelectedHoraRefrigeracion(null);
        setVolMedioMl('');
        setHouseCode('');
        setHouseCodeChf('');
        setSelectedCategory('');
        setSelectedConsulta('');
        setSelectedVisita('');
        setObservations('');
        setSelectedTypeOfTest('');
        setHideTypeOfMx(true);
        setHideTypeOfTest(true);
        setErrorBioanlista('');
        setErrorBioanlistaRecepciona('');
        setErrorFechaToma('');
        setErrorHoraToma();
        setErrorFis('');
        setErrorFif('');
        setErrorHoraRefrigeracion('');
        setErrorRequestBy('');
        setErrorTypeOfTest('');
        setErrorVolMedio('');
        setSelectedClassification('');
        setVolumenLabel('Vol. del medio(ml)');
        setTempAlmacen('');
        setTempRecepcion('');
        setErrorTempAlmacen('');
        setErrorTempRecepcion('');
        if (esNuevaRecepcion) {
            setCodLabScan('');
            setSelectedConsulta('');
            setSelectedCategory('');
            setPlasma(false);
            setSubTitle1('');
            setSubTitle2('');
        }
        setOpenEventButtons(false);
    }

    const saveRecepcion = () => {
        if (validateData()) {
            /**Objeto que contien la informacion para la tabla maestra 'muestras' */
            const accountData = JSON.parse(localStorage.getItem('accountData'));
            let time = null;
            let timeHRef = null;
            if (selectedHoraToma !== null) {
                time = moment(selectedHoraToma).format("hh:mm A");
            }
            if (selectedHoraRefrigeracion !== null) {
                timeHRef = moment(selectedHoraRefrigeracion).format("hh:mm A");
            }
            const muestraId = {
                anulada: false,
                codigoCasa: houseCode,
                codigoParticipante: code,
                estudiosParticipante: study,
                fechaRegistro: fechaRegistro === null ? new Date() : fechaRegistro,
                fechaToma: fechaToma,
                fif: fif,
                fis: fis,
                horaToma: time, //
                horaRefrigeracion: timeHRef,
                motivoAnulacion: '',
                codLab: codLab,
                codLabScan: codLabScan,
                motivoNoMx: '',
                mxCompartida: false,
                mxEnviada: false,
                retoma: false,
                mxTomada: true,
                observacion: observations,
                otroMotivoAnulacion: false,
                quienOrdena: selectedRequestBy,
                usuarioId: {
                    id: accountData.usuarioId
                },
                usuarioRecepciona: {
                    id: selectedBioanalistaRecepciona
                },
                bioanalistaId: {
                    id: selectedBioanalista
                },
                catRecepcionId: {
                    id: catRecepcionId
                },
                volumen: volMedioMl,
                tempAlmacenamiento: tempAlmacen,
                tempRecepcion: tempRecepcion
            }

            /**Cohorte de Familia, Cohorte Pediatrica Influenza, Cohorte Pediatrica Influenza/UO1 */
            if (idStudy === 1 || idStudy === 4 || idStudy === 5) {
                saveDataByStudyFlu(muestraId)
            }

            /**Cohorte Pediatrica Dengue */
            if (idStudy === 3) {
                if (isNew) {
                    saveDataDengueStudy(muestraId);
                } else {
                    updateDataDengueStudy(muestraId);
                }
                
            }
        }
    }

    /**Metodo para validar si el participante pertenece al estudio al que esta asociado el codigo lab scan 
    const validateStudy = () => {
        let result = false;
        const partes = subTitle2.split(' ');
        for (let i = 0; i < partes.length; i++) {
            result = study.trim().trimLeft().includes(partes[i]);
            if (result) {
                return result;
            }
        }
        //const result = subTitle2.indexOf(study.trim());
    }*/

    const saveDataByStudyFlu = (muestraId) => {
        const result = Utils.viewTextToSaveData(codLabScan);
        if (result === 'BHC') {
            if (isNew) {
                postMxBhc(muestraId);
            } else {
                console.log('Update', 'BHC');
                updateMxBhc(muestraId);
            }
        }
        if (result === 'TransmisionLN') {
            if (isNew) {
                postMxTransmisionLn(muestraId);
            } else {
                updateMxTransmisionLn(muestraId);
            }
        }
        if (result === 'TransmisionResp') {
            if (isNew) {
                postMxTransmisionResp(muestraId);
            } else {
                updateMxTransmisionResp(muestraId);
            }
        }
        if (result === 'TransmisionSero') {
            if (isNew) {
                postMxTransmisionSerologia(muestraId);
            } else {
                updateMxTransmisionSerologia(muestraId);
            }
        }
        if (result === 'U01') {
            if (isNew) {
                postMxUO1(muestraId);
            } else {
                updateMxUO1(muestraId);
                
            }
        }
        if (result === 'Influenza') {
            if (isNew) {
                postMxInfluenza(muestraId);
            } else {
                updateMxInfluenza(muestraId);
            }
        }
    }

    /**Metodo para guardar los datos de la muestra de Dengue */
    const saveDataDengueStudy = async (muestraId) => {
        setExecuteLoading(true);
        try {
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

            let categoriaId = {};
            let consultaId = {};
            let tipoPruebaId = {};
            //let tipoMuestraId = {};
            const mxId = {};
            /* let timeHRef = null;
            if (selectedHoraRefrigeracion !== null) {
                timeHRef = moment(selectedHoraRefrigeracion).format("hh:mm A");
            } */

            const muestra = {
                mxNoTomada: false,
                mxPapelFiltro: false,
                mxPapelFiltroEnviada: false,
                mxSeparada: false,
                numViales: '',
                numeroPruebas: '',
                pruebaRapida: false,
                resultado: '',
                completarVol: false,
                procInmediato: false,
                volumenSuero: '',
                observacionMxSeparada: '',
                observacionPrRapida: '',
                observacion: observations,
                tienePaxGene: false,
                tienePbmc: false,
                tieneBhc: false,
                orina: orina,
                saliva: saliva,
                positivoZika: positivoDengZika,
                muestraId: muestraId,
                //horaRefrigeracion: timeHRef !== null ? timeHRef : null,
            };

            mxId.id = 2; //Dengue
            muestra.muestraId.mxId = mxId;

            if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
                if (selectedTypeOfTest > 0) {
                    tipoPruebaId.id = selectedTypeOfTest;
                    muestra.tipoPruebaId = tipoPruebaId;
                }
            }
            if (selectedCategory !== '' && selectedCategory !== null && selectedCategory !== undefined) {
                if (selectedCategory > 0) {
                    categoriaId.id = selectedCategory;
                    muestra.categoriaId = categoriaId;
                }
            }

            if (selectedConsulta !== '' && selectedConsulta !== null && selectedConsulta !== undefined) {
                if (selectedConsulta > 0) {
                    consultaId.id = selectedConsulta;
                    muestra.consultaId = consultaId;
                }
            }

            /*if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }*/

            const response = await DataServices.postMuestraDengue(muestra);
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

    /**Metodo para actualizar los datos de la muestra de Dengue */
    const updateDataDengueStudy = async (muestraId) => {
        setExecuteLoading(true);
        try {
            let categoriaId = {};
            let consultaId = {};
            let tipoPruebaId = {};
            //let tipoMuestraId = {};
            const mxId = {};
            //let timeHRef = null;
            /* if (selectedHoraRefrigeracion !== null) {
                timeHRef = moment(selectedHoraRefrigeracion).format("hh:mm A");
            } */
            muestraId.id = idMuestra;
            const muestra = {
                id: idMxToModify,
                mxNoTomada: false,
                mxPapelFiltro: false,
                mxPapelFiltroEnviada: false,
                mxSeparada: false,
                numViales: '',
                numeroPruebas: '',
                pruebaRapida: false,
                resultado: '',
                completarVol: false,
                procInmediato: false,
                volumenSuero: '',
                observacionMxSeparada: '',
                observacionPrRapida: '',
                observacion: observations,
                tienePaxGene: false,
                tienePbmc: false,
                tieneBhc: false,
                orina: orina,
                saliva: saliva,
                positivoZika: positivoDengZika,
                muestraId: muestraId,
                //horaRefrigeracion: timeHRef !== null ? timeHRef : null,
            };

            mxId.id = 2; //Dengue
            muestra.muestraId.mxId = mxId;

            if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
                if (selectedTypeOfTest > 0) {
                    tipoPruebaId.id = selectedTypeOfTest;
                    muestra.tipoPruebaId = tipoPruebaId;
                }
            }
            if (selectedCategory !== '' && selectedCategory !== null && selectedCategory !== undefined) {
                if (selectedCategory > 0) {
                    categoriaId.id = selectedCategory;
                    muestra.categoriaId = categoriaId;
                }
            }

            if (selectedConsulta !== '' && selectedConsulta !== null && selectedConsulta !== undefined) {
                if (selectedConsulta > 0) {
                    consultaId.id = selectedConsulta;
                    muestra.consultaId = consultaId;
                }
            }

            /* if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            } */
            const response = await DataServices.putMuestraDengue(muestra);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se modificarón correctamente");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
            }

        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para guardar los datos de la muestra Influenza */
    const postMxInfluenza = async (muestraId) => {
        setExecuteLoading(true);
        try {

            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('Influenza', codLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                const mensaje = {
                    codigoLab: result.muestraId.codLab,
                    codigoLabScan: result.muestraId.codLabScan,
                    fechaTomaMx: result.muestraId.fechaToma
                };
                setValorDetalle(mensaje);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
                return;
            }

            const result2 = await DataServices.mxByCodLab(codLab);
            setExecuteLoading(false);
            if (result2.data !== '') {
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

            const mxId = {};
            let tipoMuestraId = {};
            let tipoPruebaId = {};
            const muestra = {
                covidPositivo: false,
                mxCovid: false,
                mxNoTomada: false,
                positivoMi: false,
                pruebaRapida: false,
                pruebaRapidaVsr: false,
                muestraId: muestraId
            };
            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }
            if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
                if (selectedTypeOfTest > 0) {
                    tipoPruebaId.id = selectedTypeOfTest;
                    muestra.tipoPruebaId = tipoPruebaId;
                }
            }
            mxId.id = 1; //Influenza
            muestra.muestraId.mxId = mxId;
            const response = await DataServices.postMuestraInfluenza(muestra);
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
        }
        initialStateToast();
    }

    /**Metodo para actualizar los datos de la muestra Influenza */
    const updateMxInfluenza = async (muestraId) => {
        setExecuteLoading(true);
        try {
            const mxId = {};
            let tipoMuestraId = {};
            let tipoPruebaId = {};
            muestraId.id = idMuestra;
            const muestra = {
                id: idMxToModify,
                covidPositivo: false,
                mxCovid: false,
                mxNoTomada: false,
                positivoMi: false,
                pruebaRapida: false,
                pruebaRapidaVsr: false,
                muestraId: muestraId
            };
            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }
            if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
                if (selectedTypeOfTest > 0) {
                    tipoPruebaId.id = selectedTypeOfTest;
                    muestra.tipoPruebaId = tipoPruebaId;
                }
            }
            mxId.id = 1; //Influenza
            muestra.muestraId.mxId = mxId;
            const response = await DataServices.putMuestraInfluenza(muestra);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se modificarón correctamente");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
            }
        } catch (error) {
            setExecuteLoading(false);
        }
        initialStateToast();
    }

    /**Metodo para guardar los datos de la muestra Influenza BHC < 2 años */
    const postMxBhc = async (muestraId) => {
        setExecuteLoading(true);
        try {

            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('Bhc', codLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                const mensaje = {
                    codigoLab: result.muestraId.codLab,
                    codigoLabScan: result.muestraId.codLabScan,
                    fechaTomaMx: result.muestraId.fechaToma
                };
                setValorDetalle(mensaje);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
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

            const mxId = {};
            const muestra = {
                motivoSinFif: '',
                mxNoTomada: false,
                muestraId: muestraId
            }
            mxId.id = 1; //Influenza
            muestra.muestraId.mxId = mxId;
            const response = await DataServices.postMuestraBhc(muestra);
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

    /**Metodo para actualizar las muestras BHC */
    const updateMxBhc = async (muestraId) => {
        setExecuteLoading(true);
        try {

            const mxId = {};
            const muestra = {
                id: idMxToModify,
                motivoSinFif: '',
                mxNoTomada: false,
                muestraId: muestraId
            }
            muestraId.id = idMuestra;
            mxId.id = 1; //Influenza
            muestra.muestraId.mxId = mxId;
            const response = await DataServices.putMuestraBhc(muestra);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se modificarón correctamente");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para guardar los datos de transmision lavado nasal */
    const postMxTransmisionLn = async (muestraId) => {
        setExecuteLoading(true);
        try {

            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('Transmision', codLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                const mensaje = {
                    codigoLab: result.muestraId.codLab,
                    codigoLabScan: result.muestraId.codLabScan,
                    fechaTomaMx: result.muestraId.fechaToma
                };
                setValorDetalle(mensaje);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
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

            const mxId = {};
            let tipoPruebaId = {}
            let tipoMuestraId = {};
            const muestra = {
                codLabM: '',
                fechaEnvio: '',
                horaEnvio: '',
                transmision: false,
                mxNoTomada: false,
                consultaId: {
                    id: selectedConsulta
                },
                motivoSinFif: '',
                muestraId: muestraId
            }
            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }
            if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
                if (selectedTypeOfTest > 0) {
                    tipoPruebaId.id = selectedTypeOfTest;
                    muestra.tipoPruebaId = tipoPruebaId;
                }
            }
            mxId.id = 4; //Transmision
            muestra.muestraId.mxId = mxId;
            const response = await DataServices.postMuestraTransmision(muestra);
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

    /**Metodo para actualizar los datos de transmision lavado nasal */
    const updateMxTransmisionLn = async (muestraId) => {
        setExecuteLoading(true);
        try {
            const mxId = {};
            let tipoPruebaId = {}
            let tipoMuestraId = {};
            muestraId.id = idMuestra;
            const muestra = {
                id: idMxToModify,
                codLabM: '',
                fechaEnvio: '',
                horaEnvio: '',
                transmision: false,
                mxNoTomada: false,
                consultaId: {
                    id: selectedConsulta
                },
                motivoSinFif: '',
                muestraId: muestraId
            }
            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }
            if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
                if (selectedTypeOfTest > 0) {
                    tipoPruebaId.id = selectedTypeOfTest;
                    muestra.tipoPruebaId = tipoPruebaId;
                }
            }
            mxId.id = 4; //Transmision
            muestra.muestraId.mxId = mxId;
            const response = await DataServices.putMuestraTransmision(muestra);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se modificarón correctamente");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para guardar los datos de transmision respiratoria TR1, TR2, TR3, TR4, TR5, TR6 */
    const postMxTransmisionResp = async (muestraId) => {
        setExecuteLoading(true);
        try {

            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('Transmision', codLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                const mensaje = {
                    codigoLab: result.muestraId.codLab,
                    codigoLabScan: result.muestraId.codLabScan,
                    fechaTomaMx: result.muestraId.fechaToma
                };
                setValorDetalle(mensaje);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
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

            const mxId = {};
            let tipoPruebaId = {}
            let tipoMuestraId = {};
            const muestra = {
                codLabM: '',
                fechaEnvio: '',
                horaEnvio: '',
                transmision: false,
                mxNoTomada: false,
                motivoSinFif: '',
                muestraId: muestraId
            }
            mxId.id = 4; //Transmision
            //tipoPruebaId.id = 1; //PCR
            muestra.muestraId.mxId = mxId;
            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }
            if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
                if (selectedTypeOfTest > 0) {
                    tipoPruebaId.id = selectedTypeOfTest;
                    muestra.tipoPruebaId = tipoPruebaId;
                }
            }
            const response = await DataServices.postMuestraTransmision(muestra);
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

    /**Metodo para actualizar los datos de transmision respiratoria TR1, TR2, TR3, TR4, TR5, TR6 */
    const updateMxTransmisionResp = async (muestraId) => {
        setExecuteLoading(true);
        try {
            const mxId = {};
            let tipoPruebaId = {}
            let tipoMuestraId = {};
            muestraId.id = idMuestra;
            const muestra = {
                id: idMxToModify,
                codLabM: '',
                fechaEnvio: '',
                horaEnvio: '',
                transmision: false,
                mxNoTomada: false,
                motivoSinFif: '',
                muestraId: muestraId
            }
            mxId.id = 4; //Transmision
            //tipoPruebaId.id = 1; //PCR
            muestra.muestraId.mxId = mxId;
            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }
            if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
                if (selectedTypeOfTest > 0) {
                    tipoPruebaId.id = selectedTypeOfTest;
                    muestra.tipoPruebaId = tipoPruebaId;
                }
            }
            const response = await DataServices.putMuestraTransmision(muestra);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se modificarón correctamente");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para guardar los datos de transmision de serologia TRI, TRF, TPI, TPF */
    const postMxTransmisionSerologia = async (muestraId) => {
        setExecuteLoading(true);
        try {
            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('Transmision', codLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                const mensaje = {
                    codigoLab: result.muestraId.codLab,
                    codigoLabScan: result.muestraId.codLabScan,
                    fechaTomaMx: result.muestraId.fechaToma
                };
                setValorDetalle(mensaje);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
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

            const mxId = {};
            let tipoPruebaId = {}
            let tipoMuestraId = {};
            let tuboId = {};
            /* let timeHRef = null;
            if (selectedHoraRefrigeracion !== null) {
                timeHRef = moment(selectedHoraRefrigeracion).format("hh:mm A");
            } */
            if (selectedTuboRecep !== null && selectedTuboRecep !== '' && selectedTuboRecep !== undefined) {
                if (selectedTuboRecep > 0) {
                    tuboId.id = selectedTuboRecep;
                }
            }
            
            const muestra = {
                codLabM: '',
                fechaEnvio: '',
                horaEnvio: '',
                transmision: false,
                mxNoTomada: false,
                //horaRefrigeracion: timeHRef !== null ? timeHRef : null,
                plasma: plasma,
                visitaId: {
                    id: selectedVisita
                },
                motivoSinFif: '',
                muestraId: muestraId
            }
            mxId.id = 4; //Transmision
            if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
                if (selectedTypeOfTest > 0) {
                    tipoPruebaId.id = selectedTypeOfTest;
                    muestra.tipoPruebaId = tipoPruebaId;
                }
            }

            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }
            muestra.muestraId.mxId = mxId;
            muestra.tuboId = tuboId;
            const response = await DataServices.postMuestraTransmision(muestra);
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

    /**Metodo para actualizar los datos de transmision de serologia TRI, TRF, TPI, TPF */
    const updateMxTransmisionSerologia = async (muestraId) => {
        setExecuteLoading(true);
        try {
            const mxId = {};
            let tipoPruebaId = {}
            let tipoMuestraId = {};
            let tuboId = {};
            /* let timeHRef = null;
            muestraId.id = idMuestra;
            if (selectedHoraRefrigeracion !== null) {
                timeHRef = moment(selectedHoraRefrigeracion).format("hh:mm A");
            } */
            if (selectedTuboRecep !== null && selectedTuboRecep !== '' && selectedTuboRecep !== undefined) {
                if (selectedTuboRecep > 0) {
                    tuboId.id = selectedTuboRecep;
                }
            }
            const muestra = {
                id: idMxToModify,
                codLabM: '',
                fechaEnvio: '',
                horaEnvio: '',
                transmision: false,
                mxNoTomada: false,
                //horaRefrigeracion: timeHRef !== null ? timeHRef : null,
                plasma: plasma,
                visitaId: {
                    id: selectedVisita
                },
                motivoSinFif: '',
                muestraId: muestraId
            }
            mxId.id = 4; //Transmision
            //tipoPruebaId.id = 1; //PCR
            if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
                if (selectedTypeOfTest > 0) {
                    tipoPruebaId.id = selectedTypeOfTest;
                    muestra.tipoPruebaId = tipoPruebaId;
                }
            }
            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }
            muestra.muestraId.mxId = mxId;
            muestra.tuboId = tuboId;
            const response = await DataServices.putMuestraTransmision(muestra);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se modificarón correctamente");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para guardar los datos de transmision de UO1 */
    const postMxUO1 = async (muestraId) => {
        setExecuteLoading(true);
        try {
            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('UO1', codLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                const mensaje = {
                    codigoLab: result.muestraId.codLab,
                    codigoLabScan: result.muestraId.codLabScan,
                    fechaTomaMx: result.muestraId.fechaToma
                };
                setValorDetalle(mensaje);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
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

            const mxId = {};
            let tipoPruebaId = {};
            let clasificacionId = {};
            let tipoMuestraId = {};
            let tuboId = {};
            
            if (selectedTuboRecep !== null && selectedTuboRecep !== '' && selectedTuboRecep !== undefined) {
                if (selectedTuboRecep > 0) {
                    tuboId.id = selectedTuboRecep;
                }
            }
            const muestra = {
                codLabM: '',
                visitaId: {
                    id: selectedVisita
                },
                motivoSinFif: '',
                muestraId: muestraId
            }
            mxId.id = 3;
            //tipoPruebaId.id = 1; //PCR
            if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
                if (selectedTypeOfTest > 0) {
                    tipoPruebaId.id = selectedTypeOfTest;
                    muestra.tipoPruebaId = tipoPruebaId;
                }
            }
            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }

            muestra.muestraId.mxId = mxId;
            muestra.tuboId = tuboId;
            if (selectedClassification !== '' && selectedClassification !== null && selectedClassification !== undefined) {
                clasificacionId.id = selectedClassification;
                muestra.clasificacionId = clasificacionId;
            }
            const response = await DataServices.postMuestraU01(muestra);
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

    /**Metodo para actulizar las muestras de U01 */
    const updateMxUO1 = async (muestraId) => {
        setExecuteLoading(true);
        try {
            
            const mxId = {};
            let tipoPruebaId = {};
            let tipoMuestraId = {};
           /*  let timeHRef = null;
            if (selectedHoraRefrigeracion !== null) {
                timeHRef = moment(selectedHoraRefrigeracion).format("hh:mm A");
            } */

            muestraId.id = idMuestra;
            const muestra = {
                id: idMxToModify,
                codLabMi: '',
                mxFinalInicial: false,
                //horaRefrigeracion: timeHRef,
                tuboId: {
                    id: selectedTuboRecep
                },
                visitaId: {
                    id: selectedVisita
                },
                clasificacionId: {
                    id: selectedClassification,
                },
                motivoSinFif: '',
                muestraId: muestraId
            }
            mxId.id = 3;
            muestra.muestraId.mxId = mxId;
            if (selectedTypeOfTest !== '' && selectedTypeOfTest !== null && selectedTypeOfTest !== undefined) {
                if (selectedTypeOfTest > 0) {
                    tipoPruebaId.id = selectedTypeOfTest;
                    muestra.tipoPruebaId = tipoPruebaId;
                }
            }
            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }
            const response = await DataServices.putMuestraU01(muestra);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se modificarón correctamente");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    const search = () => {
        setSearchCode('');
        setOpenModal(true);
    }

    const onClickEventButtons = () => {
        setOpenEventButtons(!openEventButtons);
    }

    const handleChangeSearchCode = (e) => {
        setSearchCode(e.target.value);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleOpenChild = () => {
        if (searchCode === '' || searchCode === null || searchCode === undefined) {
            setType("info");
            setMessageAlert("Debe ingresar el código");
            setTimeout(function () {
                initialStateToast();
            }, 100);
        } else {
            getListMxByCode(searchCode);
            //setOpenChildModal(true);
        }

    }

    const onKeySearchCode = (e) => {
        if (e.keyCode === 13 || e.key === 'Enter') {
            if (searchCode === '' || searchCode === null || searchCode === undefined) {
                setType("info");
                setMessageAlert("Debe ingresar el código");
                setTimeout(function () {
                    initialStateToast();
                }, 100);
            } else {
                getListMxByCode(searchCode);
                //setOpenChildModal(true);
            }
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleCloseChild = () => {
        setOpenChildModal(false);
    }

    const handleConfirmationAlertDialog = () => {
        clearData(true);
        setOpenAlertDialogConfirm(false);
    }

    const handleCloseAlertDialogConfirm = () => {
        setOpenAlertDialogConfirm(false);
    }

    return (
        <>
            <RecepcionMx
                title={title}
                subTitle1={subTitle1}
                subTitle2={subTitle2}
                codeLabScan={codLabScan}
                name={name}
                study={study}
                age={age}
                code={code}
                codLab={codLab}
                houseCode={houseCode}
                houseCodeChf={houseCodeChf}
                selectedMedico={selectedMedico}
                medicos={medicos}
                bioanalistas={bioanalistas}
                selectedBioanalista={selectedBioanalista}
                selectedRequestBy={selectedRequestBy}
                selectedTypeOfMxRecep={selectedTypeOfMxRecep}
                selectedTuboRecep={selectedTuboRecep}
                selectedBioanalistaRecepciona={selectedBioanalistaRecepciona}
                selectedClassification={selectedClassification}
                typeMx={typeMx}
                tipoTubo={tipoTubo}
                classification={classification}
                fif={fif}
                fis={fis}
                fechaToma={fechaToma}
                selectedHoraToma={selectedHoraToma}
                selectedHoraRefrigeracion={selectedHoraRefrigeracion}
                volMedioMl={volMedioMl}
                data={data}
                executeLoading={executeLoading}
                category={category}
                consultas={consultas}
                selectedCategory={selectedCategory}
                selectedConsulta={selectedConsulta}
                selectedVisita={selectedVisita}
                observations={observations}
                plasma={plasma}
                dataVisita={dataVisita}
                selectedTypeOfTest={selectedTypeOfTest}
                dataTypeOfTest={dataTypeOfTest}
                tempRecepcion={tempRecepcion}
                tempAlmacen={tempAlmacen}
                hideHouseCHF={hideHouseCHF}
                hideCategoria={hideCategoria}
                hideConsulta={hideConsulta}
                hideTypeOfMx={hideTypeOfMx}
                hideTypeOfTest={hideTypeOfTest}
                hideClasificacion={hideClasificacion}
                disableFIF={disableFIF}
                volumenLabel={volumenLabel}
                handleChangeBionalista={handleChangeBionalista}
                handleChangeMedico={handleChangeMedico}
                handleChaneSelectRequestBy={handleChaneSelectRequestBy}
                handleChangeSelectTypeOfMxRecep={handleChangeSelectTypeOfMxRecep}
                handleChangeTipoTuboRecep={handleChangeTipoTuboRecep}
                handleChangeBionalistaRecepciona={handleChangeBionalistaRecepciona}
                handleChangeFif={handleChangeFif}
                handleChangeFis={handleChangeFis}
                onKeyFis={onKeyFis}
                handleChangeFtoma={handleChangeFtoma}
                handleChangeHoraToma={handleChangeHoraToma}
                onKeyHoraToma={onKeyHoraToma}
                handleChangeHoraRefrigeracion={handleChangeHoraRefrigeracion}
                onKeyHoraRefrigeracion={onKeyHoraRefrigeracion}
                handleChangeVolMedioMl={handleChangeVolMedioMl}
                onKeyVolumen={onKeyVolumen}
                handleChangeCategory={handleChangeCategory}
                handleChangeConsulta={handleChangeConsulta}
                handleChangeObservations={handleChangeObservations}
                handleChangeClassification={handleChangeClassification}
                handleChangePlasma={handleChangePlasma}
                handleChangeVisita={handleChangeVisita}
                handleChangeTypeOfTest={handleChangeTypeOfTest}
                handleChangeTempRecep={handleChangeTempRecep}
                handleChangeTempAlmacen={handleChangeTempAlmacen}
                onChangeBarcode={onChangeBarcode}
                onKeyPressBarcode={onKeyPressBarcode}
                saveRecepcion={saveRecepcion}
                nuevaRecepcion={nuevaRecepcion}
                search={search}
                openEventButtons={openEventButtons}
                onClickEventButtons={onClickEventButtons}
                errorFis={errorFis}
                errorFif={errorFif}
                errorFechaToma={errorFechaToma}
                errorHoraToma={errorHoraToma}
                errorHoraRefrigeracion={errorHoraRefrigeracion}
                errorVolMedio={errorVolMedio}
                errorRequestBy={errorRequestBy}
                errorBioanlista={errorBioanlista}
                errorBioanlistaRecepciona={errorBioanlistaRecepciona}
                errorTypeOfTest={errorTypeOfTest}
                errorTempRecepcion={errorTempRecepcion}
                errorTempAlmacen={errorTempAlmacen}
            />
            <AlertDialog
                openAlertDialog={openAlertDialog}
                alertMessageDialog={alertMessageDialog}
                handleCloseAlertDialog={handleCloseAlertDialog}
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
            <RecepcionMxSearchByCode
                searchCode={searchCode}
                openModal={openModal}
                openChildModal={openChildModal}
                listMxByCode={listMxByCode}
                columns={columns}
                pagination={pagination}
                selectRow={selectRow}
                handleChangeSearchCode={handleChangeSearchCode}
                onKeySearchCode={onKeySearchCode}
                handleOpenModal={handleOpenModal}
                handleOpenChild={handleOpenChild}
                handleCloseModal={handleCloseModal}
                handleCloseChild={handleCloseChild}
            />
            <AlertDialogConfirmation
                confirmationMessage={confirmationMessage}
                openAlertDialogConfirm={openAlertDialogConfirm}
                handleConfirmationAlertDialog={handleConfirmationAlertDialog}
                handleCloseAlertDialogConfirm={handleCloseAlertDialogConfirm}
            />

        </>
    );

}
export default RecepcionMxContainer;
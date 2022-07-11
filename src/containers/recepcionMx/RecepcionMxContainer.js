import React, { useState, useEffect } from 'react';
//import { Redirect } from "react-router-dom";
//import { useHistory } from "react-router-dom";
import RecepcionMx from '../../components/recepcionMx/RecepcionMx';
import DataServices from '../../service/Api';
import Utils from '../../utils/Utils';
import moment from 'moment';
import ToastContainer from '../../components/toast/Toast';
//import AlertDialogText from '../../components/alertDialog/AlertDialogText';
import * as Constants from '../../Constants';
import AlertDialog from '../../components/alertDialog/AlertDialog';
import AlertDialogMxDuplicada from '../../components/alertDialog/AlertDialogMxDuplicada';

const RecepcionMxContainer = props => {
    //let history = useHistory();
    const [title, setTitle] = useState('');
    const [subTitle1, setSubTitle1] = useState('');
    const [subTitle2, setSubTitle2] = useState('');
    const [codeLabScan, setCodeLabScan] = useState('');
    const [codLab, setCodLab] = useState('');
    let [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [study, setStudy] = useState('');
    const [age, setAge] = useState('');
    const [houseCode, setHouseCode] = useState('');
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
    
    const [selectedTypeOfTest, setSelectedTypeOfTest] = useState('');
    const [dataTypeOfTest, setDataTypeOfTest] = useState([]);

    const [hideHouseCHF, setHideHouseCHF] = useState(true);
    const [hideCategoria, setHideCategoria] = useState(true);
    const [hideConsulta, setHideConsulta] = useState(true);
    const [hideTypeOfMx, setHideTypeOfMx] = useState(true);
    const [hideTypeOfTest, setHideTypeOfTest] = useState(true);

    //const [disabledCodeLabScan, setDisabledCodeLabScan] = useState(false);

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

    /**Alert Dialog */
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [alertMessageDialog, setAlertMessageDialog] = useState('');

    /**Alert Dialog Recepcion*/
    const [openAlertDialogRecep, setOpenAlertDialogRecep] = useState(false);
    const [alertMessageDialogRecep, setAlertMessageDialogRecep] = useState('');
    let [valorDetalle, setValorDetalle] = useState({});

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

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
            getTypeOfTest();
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setExecuteLoading(true);
            } else {
                setTitle('Recepción de muestras');
            }
        } else {
            props.history.push('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.history, props.match.params])

    /**Metodo para obtener los medicos */
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
                /*const filterMedico = multiSelectData.filter(function(item) {
                    return item.nombre === 'Miguel Plazaola';
                }).map(function(item) {
                    return item.id;
                });*/
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
            const response = await DataServices.getAllUserProfileByNombre('Bioanalista');
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

    /**Metodo para obtener todos los tubos activos */
    const getListTubosActivos = async () => {
        setExecuteLoading(true);
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

    /**Metodo para obtener todas las clasificaciones */
    const getListClassification = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllClasificaciones();
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
            const response = await DataServices.getAllCategoriasActivas();
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

    /**Metodo para obtener todas las visitas */
    const getAllVisitas = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllVisitas();
            if (response.status === 200) {
                setExecuteLoading(false);
                setDataVisita(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    /**Funcion para obtener los tipos de pruebas para la muestra de Dengue */
    const getTypeOfTest = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllTipoPruebasByMuestraIdAndNivel(Constants.ID_MUESTRA_DENGUE, Constants.NIVEL_TIPO_PRUEBA);
            if (response.status === 200) {
                setExecuteLoading(false);
                setDataTypeOfTest(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
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
                    setName(response.data.nombre1 + " " + response.data.nombre2 + " " + response.data.apellido1 + " " + response.data.apellido2);
                    setStudy(response.data.estudiosparticipante !== '' ? response.data.estudiosparticipante : '');
                    setHouseCode(response.data.codigocasa);
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
                    setStudy(response.data.estudiosparticipante);
                    setData(response.data);
                } else {
                    clearData();
                    setOpenAlertDialog(true);
                    setAlertMessageDialog("No existe información para el código ingresado");
                    //setCode('');
                    //setCodLab('');
                    //setSelectedConsulta('');
                    //console.log('Limpiar datos');
                }
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para verificar si el codigo lab scan es valido */
    const getFormatCodeLabScanByCod = async (valor) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getCatRecepcionByCodLabScan(valor);
            if (response.status === 200) {
                setExecuteLoading(false);
                if (response.data !== "") {
                    setCodeLabScan(valor);
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
                            //console.log('ORINA', true);
                        } else {
                            setOrina(false);
                            //console.log('ORINA', false);
                        }
                        if (response.data.catTipoMuestraId.nombre === 'SALIVA') {
                            setSaliva(true);
                            //console.log('SALIVA', true);
                        } else {
                            setSaliva(false);
                            //console.log('SALIVA', false);
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
                    setSubTitle1("");
                    setSubTitle2("");
                    clearData();
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
    const loadDataByCodLabScan = (partes) => {
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
                const resultTuboRojo = codeLabScan.includes('R');
                const res = codeLabScan.includes('SR1') || codeLabScan.includes('SR2') || codeLabScan.includes('SR3')
                    || codeLabScan.includes('SR4') || codeLabScan.includes('SR5') || codeLabScan.includes('SR6');

                const res2 = codeLabScan.includes('TR1') || codeLabScan.includes('TR2') || codeLabScan.includes('TR3')
                    || codeLabScan.includes('TR4') || codeLabScan.includes('TR5') || codeLabScan.includes('TR6');

                const res3 = codeLabScan.includes('TL1') || codeLabScan.includes('TL2');
                const resultTuboPBMC = codeLabScan.includes('P');
                if (res || res2 || res3) {
                    setSelectedTypeOfMxRecep(4);
                }
                if (resultTuboRojo && !res && !res2) {
                    setSelectedTuboRecep(2);
                }
                if (resultTuboPBMC && !res && !res2) {
                    setSelectedTuboRecep(1);
                }
                if (partes[1].includes('TL1')) {
                    setHideConsulta(false);
                    setSelectedConsulta(1);
                }
                if (partes[1].includes('TL2')) {
                    setHideConsulta(false);
                    setSelectedConsulta(2);
                }
                if (codeLabScan.includes('VPI') || codeLabScan.includes('VRI') || codeLabScan.includes('VPF') || codeLabScan.includes('VRF')) {
                    setSelectedClassification(2);
                }
                if (codeLabScan.includes('UPI') || codeLabScan.includes('URI') || codeLabScan.includes('UPF') || codeLabScan.includes('URF')) {
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
                //setSelectedConsulta('');
                setHideCategoria(true);

                setFechaToma(newDateFechaToma);
                setCode(codigo);
                getParticipante(codigo);
                setCodLab(partes[1]);
                setHideTypeOfMx(false);
                setHideTypeOfTest(true);
                setSelectedTypeOfTest('');
            }
        }

    }

    /**Metodo para obtener todo la informacion del participante a traves del codigo lab scan 
     * para el estudio de Dengue este codigo no contiene espacios
    */
    const loadDataDengueByCodLabScan = (valor) => {
        //console.log('Code Lab Scan', valor);
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
            //console.log('positivoDengZika', positivoDengZika, valor.substr(33));
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
            if (valor.substr(-5).includes('I')) {
                const filterByName = dataVisita.filter(a => a.nombre.trim() === 'Inicial');
                setSelectedVisita(filterByName[0].id);
            }
            if (valor.substr(-5).includes('F')) {
                const filterByName = dataVisita.filter(a => a.nombre.trim() === 'Final');
                setSelectedVisita(filterByName[0].id);
            }
            /** */
            setHouseCode('');
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

    const handleChangeFis = (selectedDate) => {
        const result = Utils.validateDate(selectedDate);
        //const diff = Utils.CalculateDifferenceDates(selectedDate, new Date());
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

    const handleChangeHoraRefrigeracion = (e) => {
        setSelectedHoraRefrigeracion(e);
        setErrorHoraRefrigeracion('');
    }

    const handleChangeVolMedioMl = (e) => {
        setVolMedioMl(e.target.value);
        setErrorVolMedio('');
    }

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
    }

    const handleChangeConsulta = (e) => {
        setSelectedConsulta(e.target.value);
    }

    const onChangeBarcode = (event) => {
        setCodeLabScan(event.target.value)
        //console.log(event.target.value);    
    }

    const onKeyPressBarcode = (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            setCodeLabScan(event.target.value)
            //setDisabledCodeLabScan(true);
            const result = event.target.value;
            console.log('result', result);
            getFormatCodeLabScanByCod(result);
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
        /*if (selectedHoraRefrigeracion === null) {
            setErrorHoraRefrigeracion('Debe ingresar la hora de refrigeración');
            return false;
        }*/
        if (volMedioMl === '' || volMedioMl === null || volMedioMl === undefined) {
            setErrorVolMedio('Debe ingresar el volumen de la muestra');
            return false;
        }

        if (volMedioMl < 2 || volMedioMl > 15) {
            setErrorVolMedio('El volumen esta fuera de rango => (2 - 15)' );
            return false;
        }

        if (selectedBioanalistaRecepciona === '' || selectedBioanalistaRecepciona <= 0) {
            setErrorBioanlistaRecepciona('Debe seleccionar quien recepciona la muestra');
            return false;
        }
        /*if (selectedTypeOfMxRecep === '' || selectedTypeOfMxRecep <= 0) { Tipo de muestra
            
        }*/
        return true;
    }

    const saveRecepcion = () => {
        if (validateData()) {
            /**Objeto que contien la informacion para la tabla maestra 'muestras' */
            const accountData = JSON.parse(localStorage.getItem('accountData'));
            let time = null;
            if (selectedHoraToma !== null) {
                time = moment(selectedHoraToma).format("hh:mm A");
            }

            const muestraId = {
                anulada: false,
                codigoCasa: houseCode,
                codigoParticipante: code,
                estudiosParticipante: study,
                fechaRegistro: new Date(),
                fechaToma: fechaToma,
                fif: fif,
                fis: fis,
                horaToma: time,
                motivoAnulacion: '',
                codLab: codLab,
                codLabScan: codeLabScan,
                motivoNoMx: '',
                mxCompartida: false,
                mxEnviada: false,
                /*mxId: {
                    id: 1, /**Muestra Influeza 
                },*/
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
                volumen: volMedioMl
            }

            /**Cohorte de Familia, Cohorte Pediatrica Influenza, Cohorte Pediatrica Influenza/UO1 */
            if (idStudy === 1 || idStudy === 4 || idStudy === 5) {
                saveDataByStudyFlu(muestraId)
            }

            /**Cohorte Pediatrica Dengue */
            if (idStudy === 3) {
                saveDataDengueStudy(muestraId);
            }

            /* switch (idStudy) {
                case 1: // Cohorte de Familia
                    break;
                case 3: // Cohorte Pediatrica Dengue
                    break;
                case 4: // Cohorte Pediatrica Influenza
                    saveDataByStudyFlu(muestraId);
                    break;
                case 5: // Cohorte Pediatrica Influenza/UO1
                    saveDataByStudyFlu(muestraId);
                    break;
                default:
                // code block
            } */
        }
    }

    /**Metodo para validar si el participante pertenece al estudio al que esta asociado el codigo lab scan */
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
    }

    const saveDataByStudyFlu = (muestraId) => {
        //if (validateStudy()) {
            //console.log(codeLabScan);
            const isMxBHC = codeLabScan.includes('BHC');
            const isTransLN = codeLabScan.includes('TL1') || codeLabScan.includes('TL2');

            const isTransResp = codeLabScan.includes('TR1') || codeLabScan.includes('TR2') ||
                codeLabScan.includes('TR3') || codeLabScan.includes('TR4') || codeLabScan.includes('TR5') || codeLabScan.includes('TR6');

            const isTransSerologia = codeLabScan.includes('TRI') || codeLabScan.includes('TRF') ||
                codeLabScan.includes('TPI') || codeLabScan.includes('TPF');

            const isCVInfluenza = codeLabScan.includes('IPI') || codeLabScan.includes('IPF') ||
                codeLabScan.includes('IRI') || codeLabScan.includes('IRF');

            const isCVUO1 = codeLabScan.includes('CPI') || codeLabScan.includes('CPF') ||
                codeLabScan.includes('CRI') || codeLabScan.includes('CRF');

            const isCHFMxResp = codeLabScan.includes('SR1') || codeLabScan.includes('SR2') ||
                codeLabScan.includes('SR3') || codeLabScan.includes('SR4') || codeLabScan.includes('SR5') || codeLabScan.includes('SR6');

            const isCHFMxSerologia = codeLabScan.includes('SPI') || codeLabScan.includes('SPF') ||
                codeLabScan.includes('SRI') || codeLabScan.includes('SRF');

            const isPostivoInfluenzaUO1 = codeLabScan.includes('UPI') || codeLabScan.includes('UPF') ||
                codeLabScan.includes('URI') || codeLabScan.includes('URF');

            const isPostInfluenzaUO1PrePostVacuna = codeLabScan.includes('VPI') || codeLabScan.includes('VPF') ||
                codeLabScan.includes('VRI') || codeLabScan.includes('VRF');

            if (isMxBHC) {
                postMxBhc(muestraId);
            }

            if (isTransLN) {
                postMxTransmisionLn(muestraId);
            }

            if (isTransResp || isCHFMxResp) {
                postMxTransmisionResp(muestraId);
            }

            if (isTransSerologia || isCHFMxSerologia || isCVInfluenza) {
                postMxTransmisionSerologia(muestraId);
            }

            if (isCVUO1 || isPostivoInfluenzaUO1 || isPostInfluenzaUO1PrePostVacuna) {
                postMxUO1(muestraId);
            } 

            if (!isMxBHC && !isTransLN && !isTransResp && !isCHFMxResp &&
                !isTransSerologia && !isCHFMxSerologia && !isCVInfluenza &&
                !isCVUO1 && !isPostivoInfluenzaUO1 && !isPostInfluenzaUO1PrePostVacuna) {
                    postMxInfluenza(muestraId);
                }
        //} else {
           // setOpenAlertDialog(true);
           // setAlertMessageDialog('Los estudios del participante no coinciden con el estudio requerido para la muertra');
        //}
        //console.log('Muestra', muestra);
        //postMxInfluenza(muestra);
    }

    /**Metodo para guardar los datos de la muestra de Dengue */
    const saveDataDengueStudy = async(muestraId) => {
        setExecuteLoading(true);
        //let tuboId = {};
        try {
            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('Dengue', codeLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                setValorDetalle(result);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
                setOpenAlertDialogRecep(true);
                //console.log(result)
                return;
            }
            let categoriaId = {};
            let consultaId = {};
            let tipoPruebaId = {};
            let tipoMuestraId = {};
            const mxId = {};
            let timeHRef = null;
            if (selectedHoraRefrigeracion !== null) {
                timeHRef = moment(selectedHoraRefrigeracion).format("hh:mm A");
            }

            const muestra = {
                //codLab: codLab,
                //codLabScan: codeLabScan,
                mxNoTomada: false,
                mxPapelFiltro: false,
                mxPapelFiltroEnviada: false,
                mxSeparada: false,
                numViales: '',
                numeroPruebas: '',
                pruebaRapida: true,
                resultado: '',
                retoma: false,
                procInmediato: false,
                volumenSuero: volMedioMl,
                observacionMxSeparada: '',
                observacionPrRapida: '',
                observacion: observations,
                orina: orina,
                saliva: saliva,
                positivoZika: positivoDengZika,
                muestraId: muestraId,
                horaRefrigeracion: timeHRef !== null ? timeHRef : null,
            };

            mxId.id = 2;
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

            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }

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

    /**Metodo para guardar los datos de la muestra Influenza */
    const postMxInfluenza = async (muestraId) => {
        setExecuteLoading(true);
        try {

            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('Influenza', codeLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                //valorDetalle = result
                setValorDetalle(result);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
                return;
            }

            const mxId = {};
            let tipoMuestraId = {};
            const muestra = {
                //codLab: codLab,
                //codLabScan: codeLabScan,
                covidPositivo: false,
                mxCovid: false,
                mxNoTomada: false,
                positivoMi: false,
                pruebaRapida: false,
                pruebaRapidaVsr: false,
                retoma: false,
                muestraId: muestraId
            };
            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }
            mxId.id = 1;
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

    /**Metodo para guardar los datos de la muestra Influenza BHC < 2 años */
    const postMxBhc = async (muestraId) => {
        setExecuteLoading(true);
        try {

            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('Bhc', codeLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                //valorDetalle = result
                setValorDetalle(result);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
                return;
            }

            const mxId = {};
            const muestra = {
                motivoSinFif: '',
                mxNoTomada: false,
                muestraId: muestraId
            }
            mxId.id = 1;
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

    /**Metodo para guardar los datos de transmision lavado nasal */
    const postMxTransmisionLn = async (muestraId) => {
        setExecuteLoading(true);
        try {

            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('Transmision', codeLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                //valorDetalle = result
                setValorDetalle(result);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
                return;
            }

            const mxId = {};
            let tipoPruebaId = {}
            let tipoMuestraId = {};
            const muestra = {
                //codLab: codLab,
                codLabM: '',
                //codLabScan: codeLabScan,
                fechaEnvio: '',
                horaEnvio: '',
                transmision: false,
                mxNoTomada: false,
                consultaId: {
                    id: selectedConsulta
                },
                //"id": 0,
                motivoSinFif: '',
                muestraId: muestraId
            }
            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
                }
            }
            mxId.id = 5;
            tipoPruebaId.id = 1; //PCR
            muestra.muestraId.mxId = mxId;
            muestra.tipoPruebaId = tipoPruebaId;
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

    /**Metodo para guardar los datos de transmision respiratoria TR1, TR2, TR3, TR4, TR5, TR6 */
    const postMxTransmisionResp = async (muestraId) => {
        setExecuteLoading(true);
        try {

            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('Transmision', codeLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                //valorDetalle = result
                setValorDetalle(result);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
                return;
            }

            const mxId = {};
            let tipoPruebaId = {}
            let tipoMuestraId = {};
            const muestra = {
                //codLab: codLab,
                codLabM: '',
                //codLabScan: codeLabScan,
                fechaEnvio: '',
                horaEnvio: '',
                transmision: false,
                mxNoTomada: false,
                /*consultaId: {
                    id: selectedConsulta
                },*/
                //"id": 0,
                motivoSinFif: '',
                muestraId: muestraId
            }
            mxId.id = 5;
            tipoPruebaId.id = 1; //PCR
            muestra.muestraId.mxId = mxId;
            muestra.tipoPruebaId = tipoPruebaId;
            if (selectedTypeOfMxRecep !== '' && selectedTypeOfMxRecep !== null && selectedTypeOfMxRecep !== undefined) {
                if (selectedTypeOfMxRecep > 0) {
                    tipoMuestraId.id = selectedTypeOfMxRecep;
                    muestra.tipoMuestraId = tipoMuestraId;
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

    /**Metodo para guardar los datos de transmision de serologia TRI, TRF, TPI, TPF */
    const postMxTransmisionSerologia = async (muestraId) => {
        setExecuteLoading(true);
        try {
            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('Transmision', codeLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                //valorDetalle = result
                setValorDetalle(result);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
                return;
            }

            const mxId = {};
            let tipoPruebaId = {}
            let tuboId = {};
            let timeHRef = null;
            if (selectedHoraRefrigeracion !== null) {
                timeHRef = moment(selectedHoraRefrigeracion).format("hh:mm A");
            }
            if (selectedTuboRecep !== null && selectedTuboRecep !== '' && selectedTuboRecep !== undefined) {
                if (selectedTuboRecep > 0) {
                    tuboId.id = selectedTuboRecep;
                }
            }
            const muestra = {
                //codLab: codLab,
                codLabM: '',
                //codLabScan: codeLabScan,
                fechaEnvio: '',
                horaEnvio: '',
                transmision: false,
                mxNoTomada: false,
                horaRefrigeracion: timeHRef !== null ? timeHRef : null,
                plasma: plasma,
                /* tuboId: {
                    id: selectedTuboRecep
                }, */
                visitaId: {
                    id: selectedVisita
                },
                //"id": 0,
                motivoSinFif: '',
                muestraId: muestraId
            }
            mxId.id = 4;
            tipoPruebaId.id = 1; //PCR
            muestra.muestraId.mxId = mxId;
            muestra.tipoPruebaId = tipoPruebaId;
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

    /**Metodo para guardar los datos de transmision de UO1 */
    const postMxUO1 = async (muestraId) => {
        setExecuteLoading(true);
        try {
            /**Verificamos si existe el codigo lab scan */
            const result = await Utils.obtenerMuestraByCodLabScan('UO1', codeLabScan);
            if (result !== '') {
                setExecuteLoading(false);
                //valorDetalle = result
                setValorDetalle(result);
                setOpenAlertDialogRecep(true);
                setAlertMessageDialogRecep("Ya existe una muestra con el código lab scan ingresado");
                return;
            }

            const mxId = {};
            let tipoPruebaId = {};
            let clasificacionId = {};
            let timeHRef = null;
            let tuboId = {};
            if (selectedHoraRefrigeracion !== null) {
                timeHRef = moment(selectedHoraRefrigeracion).format("hh:mm A");
            }

            if (selectedTuboRecep !== null && selectedTuboRecep !== '' && selectedTuboRecep !== undefined) {
                if (selectedTuboRecep > 0) {
                    tuboId.id = selectedTuboRecep;
                }
            }
            const muestra = {
                //codLab: codLab,
                codLabM: '',
                //codLabScan: codeLabScan,
                fechaEnvio: '',
                horaEnvio: '',
                horaRefrigeracion: timeHRef,
                plasma: plasma,
                /* tuboId: {
                    id: selectedTuboRecep
                }, */
                visitaId: {
                    id: selectedVisita
                },
                motivoSinFif: '',
                muestraId: muestraId
            }
            mxId.id = 3;
            tipoPruebaId.id = 1; //PCR
            muestra.muestraId.mxId = mxId;
            muestra.tipoPruebaId = tipoPruebaId;
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

    const clearData = () => {
        //setCodeLabScan('');
        setCodLab('');
        setCode('');
        setName('');
        setAge('');
        setStudy('');
        setSelectedRequestBy('');
        setSelectedBioanalista('');
        setSelectedTypeOfMxRecep('');
        setSelectedTuboRecep('');
        setFis(null);
        setFif(null);
        setFechaToma(new Date());
        setSelectedHoraToma(null);
        setSelectedHoraRefrigeracion(null);
        setVolMedioMl('');
        setSelectedBioanalistaRecepciona('');
        setHouseCode('');
        setSelectedCategory('');
        setSelectedConsulta('');
        setSelectedVisita('');
        setObservations('');
        setSelectedTypeOfTest('');
        setHideTypeOfMx(true);
        setHideTypeOfTest(true);
    }

    return (
        <>
            <RecepcionMx
                title={title}
                subTitle1={subTitle1}
                subTitle2={subTitle2}
                codeLabScan={codeLabScan}
                name={name}
                study={study}
                age={age}
                code={code}
                codLab={codLab}
                houseCode={houseCode}
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
                //disabledCodeLabScan={disabledCodeLabScan}

                hideHouseCHF={hideHouseCHF}
                hideCategoria={hideCategoria}
                hideConsulta={hideConsulta}
                hideTypeOfMx={hideTypeOfMx}
                hideTypeOfTest={hideTypeOfTest}

                handleChangeBionalista={handleChangeBionalista}
                handleChangeMedico={handleChangeMedico}
                handleChaneSelectRequestBy={handleChaneSelectRequestBy}
                handleChangeSelectTypeOfMxRecep={handleChangeSelectTypeOfMxRecep}
                handleChangeTipoTuboRecep={handleChangeTipoTuboRecep}
                handleChangeBionalistaRecepciona={handleChangeBionalistaRecepciona}
                handleChangeFif={handleChangeFif}
                handleChangeFis={handleChangeFis}
                handleChangeFtoma={handleChangeFtoma}
                handleChangeHoraToma={handleChangeHoraToma}
                handleChangeHoraRefrigeracion={handleChangeHoraRefrigeracion}
                handleChangeVolMedioMl={handleChangeVolMedioMl}
                handleChangeCategory={handleChangeCategory}
                handleChangeConsulta={handleChangeConsulta}
                handleChangeObservations={handleChangeObservations}
                handleChangeClassification={handleChangeClassification}
                handleChangePlasma={handleChangePlasma}
                handleChangeVisita={handleChangeVisita}
                handleChangeTypeOfTest={handleChangeTypeOfTest}
                onChangeBarcode={onChangeBarcode}
                onKeyPressBarcode={onKeyPressBarcode}
                saveRecepcion={saveRecepcion}

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
        </>
    );

}
export default RecepcionMxContainer;
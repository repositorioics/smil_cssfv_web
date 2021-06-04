import React, { useState, useEffect } from 'react';
//import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MxU01 from '../../components/mxU01/MxU01';
import DataServices from '../../service/Api';
//import Utils from '../../utils/Utils';
//import moment from 'moment';
import ToastContainer from '../../components/toast/Toast';
import * as Constants from '../../Constants';
import Utils from '../../utils/Utils';
import AlertDialog from '../../components/alertDialog/AlertDialog';

const MxU01Container = props => {
    let history = useHistory();
    const [title, setTitle] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [mxU01Id] = useState(Constants.ID_MUESTRA_U01); // Id de la muestra de influenza
    const [code, setCode] = useState('');
    const [codLab, setCodLab] = useState('');
    const [selectedTubo, setSelectedTubo] = useState('');
    const [tipoTubo, setTipoTubo] = useState([]);
    const [selectedConsulta, setSelectedConsulta] = useState('');
    const [consultas, setConsultas] = useState([]);
    const [selectedClasificacion, setSelectedClasificacion] = useState('');
    const [clasificacion, setClasificacion] = useState([]);
    const [selectedMedico, setSelectedMedico] = useState('');
    const [medicos, setMedicos] = useState([]);
    const [name, setName] = useState('');
    const [study, setStudy] = useState('');
    const [age, setAge] = useState('');
    const [estudiosParticipante, setEstudiosParticipante] = useState('');
    const [houseCode, setHouseCode] = useState('');
    //const [data, setData] = useState({});

    const [bioanalistas, setBioanalistas] = useState([]);

    const [errorCode, setErrorCode] = useState('');

    const [executeLoading, setExecuteLoading] = useState(false);

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    /**Alert Dialog */
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [alertMessageDialog, setAlertMessageDialog] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            getListTubosActivos();
            getListConsultasActivos();
            getListClasificacionesActivas();
            getMedicos();
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setTitle('Editar muestra U01');

            } else {
                setTitle('Agregar muestra U01');
            }
        } else {
            props.history.push('/');
            //return <Redirect to='/login' />
        }
        //return () => setMounted(false);
    }, [props.history, props.match.params])

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

    /**Metodo para obtener todas las consultas activas */
    const getListConsultasActivos = async () => {
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

    /**Metodo para obtener todas las clasificaciones activas */
    const getListClasificacionesActivas = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllClasificacionesActivas();
            if (response.status === 200) {
                setExecuteLoading(false);
                setClasificacion(response.data);
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
                        //setData(response.data);
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
            const response = await DataServices.getCountMuestrasByCodigoParticipanteYCatMuestraId(code, mxU01Id);
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

    const handleNext = () => {
        setExecuteLoading(true);
        if (activeStep === 0 && activeStep < 3) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

        if (activeStep === 1 && activeStep < 3) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        setExecuteLoading(false);
    };

    const handleChangeCode = (e) => {
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

    const handleChangeTipoTubo = (e) => {
        setSelectedTubo(e.target.value);
    }

    const handleChangeConsulta = (e) => {
        setSelectedConsulta(e.target.value);
    }

    const handleChangeClasificacion = (e) => {
        setSelectedClasificacion(e.target.value);
    }

    const handleChangeMedico = (e) => {
        setSelectedMedico(e.target.value);
    }

    const handleBack = () => {
        setExecuteLoading(true);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setExecuteLoading(false);
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

    /*const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }*/

    /**Funcion para guardar los datos */
    /*const postMxInfluenza = async (muestra, activeStep) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.postMuestraInfluenza(muestra);
            if (response.status === 200) {
                /* setExecuteLoading(false);
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
        }
        initialStateToast();
    }*/

    /**Funcion para editar los datos */
    /*const putMxInfluenza = async (muestra) => {
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
    }*/

    const saveData = (activeStep) => {
    }

    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
        setAlertMessageDialog('');
    }


    const goBackListMxU01 = () => {
        history.push(`/muestras/influenza`);
    }

    return (
        <>
            <MxU01
                title={title}
                activeStep={activeStep}
                handleNext={handleNext}
                handleBack={handleBack}
                code={props.code}
                codLab={codLab}

                selectedTubo={selectedTubo}
                tipoTubo={tipoTubo}
                selectedConsulta={selectedConsulta}
                consultas={consultas}
                selectedClasificacion={selectedClasificacion}
                clasificacion={clasificacion}
                selectedMedico={selectedMedico}
                medicos={medicos}
                name={name}
                study={study}
                age={age}
                bioanalistas={bioanalistas}

                handleChangeCode={handleChangeCode}
                onKeyPressCode={onKeyPressCode}
                handleChangeTipoTubo={handleChangeTipoTubo}
                handleChangeConsulta={handleChangeConsulta}
                handleChangeClasificacion={handleChangeClasificacion}
                handleChangeMedico={handleChangeMedico}
                //disableCode={disableCode}

                errorCode={errorCode}



                executeLoading={executeLoading}
                goBackListMxU01={goBackListMxU01}
                saveData={saveData}
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
        </>
    );

}
export default MxU01Container;
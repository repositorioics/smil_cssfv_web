import React, { useState, useEffect } from 'react';
//import { Redirect } from "react-router-dom";
//import { useHistory } from "react-router-dom";
import RecepcionMx from '../../components/recepcionMx/RecepcionMx';
import DataServices from '../../service/Api';
//import moment from 'moment';
//import ToastContainer from '../../components/toast/Toast';
//import AlertDialogText from '../../components/alertDialog/AlertDialogText';
//import * as Constants from '../../Constants';
//import Utils from '../../utils/Utils';
//import AlertDialog from '../../components/alertDialog/AlertDialog';

const RecepcionMxContainer = props => {
    //let history = useHistory();
    const [title, setTitle] = useState('');
    //const [codeLabScan, setCodeLabScan] = useState('');
    //const [codLab, setCodLab] = useState('');
    //let [code, setCode] = useState('');
    //const [name, setName] = useState('');
    //const [study, setStudy] = useState('');
    //const [age, setAge] = useState('');
    //const [estudiosParticipante, setEstudiosParticipante] = useState('');
    //const [houseCode, setHouseCode] = useState('');
    const [selectedMedico, setSelectedMedico] = useState('');
    const [medicos, setMedicos] = useState([]);
    const [bioanalistas, setBioanalistas] = useState([]);
    const [selectedBioanalista, setSelectedBioanalista] = useState('');


    const [executeLoading, setExecuteLoading] = useState(false);

    //const [errorMedico, setErrorMedico] = useState('');
    //const [errorBioanlista, setErrorBioanlista] = useState('');

    /**Variables de los mensajes de alerta */
    //const [type, setType] = useState(null);
    //const [messageAlert, setMessageAlert] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            getMedicos();
            getBionalistas();
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setExecuteLoading(true);
                //setTitle('Editar muestra bhc');
            } else {
                setTitle('Recepción de muestras');
            }
        } else {
            props.history.push('/');
        }
    }, [props.history, props.match.params])

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

    /**Funcion para obtener los datos del participante 
    const getParticipante = async (code) => {
        //event.preventDefault();
        setExecuteLoading(true);
        try {
            const response = await DataServices.getParticipanteByCode(code);
            if (response.status === 200) {
                setExecuteLoading(false);
                if (response.data !== '') {

                    setName(response.data.nombre1 + " " + response.data.nombre2 + " " + response.data.apellido1 + " " + response.data.apellido2);
                    setStudy(response.data.estudiosparticipante !== '' ? response.data.estudiosparticipante : '');
                    if (response.data.fechanac !== '' && response.data.fechanac !== null) {
                        const edad = Utils.obtenerEdad(response.data.fechanac);
                        setAge(edad)

                        //setHouseCode(response.data.codigocasa);
                        //setEstudiosParticipante(response.data.estudiosparticipante);
                        //setData(response.data);
                    }
                }
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }*/

    const handleChangeMedico = (e) => {
        //setErrorMedico('');
        setSelectedMedico(e.target.value);
    }

    const handleChangeBionalista = (e) => {
        setSelectedBioanalista(e.target.value);
        //setErrorBioanlista('');
    }

    /*const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }*/

    return (
        <>
            <RecepcionMx
                title={title}
                //codeLabScan={codeLabScan}
                //name={name}
                //study={study}
                //age={age}
                //code={code}
                selectedMedico={selectedMedico}
                medicos={medicos}
                bioanalistas={bioanalistas}
                selectedBioanalista={selectedBioanalista}
                executeLoading={executeLoading}

                handleChangeBionalista={handleChangeBionalista}
                handleChangeMedico={handleChangeMedico}
            />
            {/* <ToastContainer
                type={type}
                messageAlert={messageAlert}
            /> */}
        </>
    );

}
export default RecepcionMxContainer;
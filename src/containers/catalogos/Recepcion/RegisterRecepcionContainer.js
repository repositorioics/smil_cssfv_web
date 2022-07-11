import React, { useState, useEffect } from 'react';
import AddRecepcion from '../../../components/catalogo/recepcion/AddRecepcion';
import DataServices from '../../../service/Api';
import ToastContainer from '../../../components/toast/Toast';

const RegisterRecepcionContainer = props => {
    const [title, setTitle] = useState('');
    const [study, setStudy] = useState([]);
    let [selectedStudy, setSelectedStudy] = useState('');
    const [typeMx, setTypeMx] = useState([]);
    let [selectedTypeMx, setSelectedTypeMx] = useState('');
    const [description, setDescription] = useState('');
    const [criteriosEvaluar, setCriteriosEvaluar] = useState('');
    const [charactersString, setCharactersString] = useState('');
    const [regex, setRegex] = useState('');
    const [descriptionString, setDescriptionString] = useState('');
    const [id, setId] = useState(0);
    let [isActive, setIsActive] = useState(false);
    const [disableBtnSave, setDisableBtnSave] = useState(false);
    const [disableBtnLimpiar, setDisableBtnLimpiar] = useState(false);
    const [executeLoading, setExecuteLoading] = useState(false);

    const [errorMessageStudy, setErrorMessageStudy] = useState('');
    const [errorMessageTypeMx, setErrorMessageTypeMx] = useState('');
    const [errorMessageCriteriosEvaluar, setErrorMessageCriteriosEvaluar] = useState('');
    const [errorMessageCharactersString, setErrorMessageCharactersString] = useState('');
    const [errorMessageRegex, setErrorMessageRegex] = useState('');
    const [errorMessageDescriptionString, setErrorMessageDescriptionString] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    useEffect(() => {
        getAllEstudios();
        getTypeOfMx();
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setTitle('Editar formato para la recepción');
                setDisableBtnLimpiar(true);
                setId(props.match.params.id);
                getById(props.match.params.id);
            } else {
                setTitle('Registrar formato para la recepción');
            }
        } else {
            props.history.push('/');
        }
    }, [props]);

    /**Metodo para obtener todos los estudios */
    const getAllEstudios = async() => {
        setExecuteLoading(false);
        try {
            const response = await DataServices.getEstudios();
            if (response.status === 200) {
                setExecuteLoading(false);
                setStudy(response.data);
                //console.log("Estudios", response.data)
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
                /* const multiSelectData = [];
                if (response.data.length > 0) {
                    for (let i = 0; i < response.data.length; i++) {
                        const newObject = {}
                        newObject.id = response.data[i].id;
                        newObject.nombre = response.data[i].descripcion

                        multiSelectData.push(newObject);
                    }
                } */
                //console.log(response);
                setTypeMx(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    const handleChangeStudy = (e) => {
        setErrorMessageStudy('');
        setSelectedStudy(e.target.value)
        //console.log(e.target.value);
    }

    const handleChangeTypeMx = (e) => {
        setErrorMessageTypeMx('');
        //console.log(e.target.value);
        setSelectedTypeMx(e.target.value);
    }

    const handleChangeDescripcion = (e) => {
        setDescription(e.target.value);
    }

    const handleChangeCriteriosEvaluar = (e) => {
        setErrorMessageCriteriosEvaluar('');
        setCriteriosEvaluar(e.target.value);
    }

    const handleChangeCharactersString = (e) => {
        setErrorMessageCharactersString('');
        setCharactersString(e.target.value);
    }

    const handleChangeRegex = (e) => {
        setErrorMessageRegex('');
        setRegex(e.target.value);
    }

    const handleChangeDescriptionString = (e) => {
        setErrorMessageDescriptionString('');
        setDescriptionString(e.target.value);
    }

    const handleChangeIsActive = (e) => {
        isActive = e.target.checked;
        setIsActive(isActive);
    }

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    const saveData = (e) => {
        e.preventDefault();
        if (validateData()) {
            if (parseInt(id) > 0) {
                editCatRecepcion();
            } else {
                saveCatRecepcion();
            }
        }
    }

    /**Metodo para obtener el registro a modificar */
    const getById = async (id) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getCatRecepcionById(id);
            if (response.status === 200) {
                setExecuteLoading(false);
                setSelectedStudy(response.data.estudio);
                setDescription(response.data.descripcion);
                setCriteriosEvaluar(response.data.criteriosEvaluar);
                setCharactersString(response.data.cadenaCaracteresCodigo);
                setRegex(response.data.expresionRegular);
                setDescriptionString(response.data.descripcionCadena);
                setSelectedTypeMx(response.data.catTipoMuestraId.id);
                setIsActive(response.data.activo);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
    }

    /**Metodo para guardar */
    const saveCatRecepcion = async() => {
        setExecuteLoading(true);
        setDisableBtnSave(true);
        try {
            const filtro = study.filter(a => a.codigo === selectedStudy)
            const catRecepcion = {
                estudio: selectedStudy,
                //tipo: typeMx.toUpperCase(),
                catTipoMuestraId: {
                    id: selectedTypeMx
                },
                descripcion: description,
                cadenaCaracteresCodigo: charactersString,
                criteriosEvaluar: criteriosEvaluar,
                descripcionCadena: descriptionString,
                expresionRegular: regex,
                activo: isActive,
                nombreEstudio: filtro.length > 0 ? filtro[0].nombre : ""
            };
            const response = await DataServices.postCatRecepcion(catRecepcion);

            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se guardaron correctamente");
            }
        } catch (error) {
            setExecuteLoading(false);
            setDisableBtnSave(false);
            console.log('error', error);
        }
        initialStateToast();
    }

    /**Metodo mara modificar */
    const editCatRecepcion = async () => {
        setExecuteLoading(true);
        try {

            const filtro = study.filter(a => a.codigo === selectedStudy);
            console.log(filtro[0].nombre);

            const catRecepcion = {
                id: id,
                estudio: selectedStudy,
                catTipoMuestraId: {
                    id: selectedTypeMx
                },
                descripcion: description,
                cadenaCaracteresCodigo: charactersString,
                criteriosEvaluar: criteriosEvaluar,
                descripcionCadena: descriptionString,
                expresionRegular: regex,
                activo: isActive,
                nombreEstudio: filtro.length > 0 ? filtro[0].nombre : ""
            }

            const response = await DataServices.putCatRecepcion(catRecepcion);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se modificaron correctamente");
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
        initialStateToast();
    }

    /**Metodo para validar los campos requeridos */
    const validateData = () => {
        if (selectedStudy === '' || selectedStudy === null || selectedStudy === undefined) {
            setErrorMessageStudy('El estudio es requerido');
            return false;
        }
        if (selectedTypeMx === '' || selectedTypeMx === null || selectedTypeMx === undefined) {
            setErrorMessageTypeMx('Debe ingresar el tipo de muestra');
            return false;
        }
        if (criteriosEvaluar === '' || criteriosEvaluar === null || criteriosEvaluar === undefined) {
            setErrorMessageCriteriosEvaluar('Debe ingresar los criterios a evaluar');
            return false;
        }
        if (charactersString === '' || charactersString === null || charactersString === undefined) {
            setErrorMessageCharactersString('La cadena de caracteres para el código del laboratorio es requerida');
            return false
        }
        if (regex === '' || regex === null || regex === undefined) {
            setErrorMessageRegex('Debe ingresar la expresión regular')
            return false;
        }
        /*if (descriptionString === '' || descriptionString === null || descriptionString === undefined) {
            setErrorMessageDescriptionString('La descripción de la cadena del código es requerida');
            return false;
        }*/
        return true;
    }

    const clearData = (e) => {
        e.preventDefault();
        setSelectedStudy('');
        setSelectedTypeMx('');
        setCriteriosEvaluar('');
        setCharactersString('');
        setRegex('');
        setDescriptionString('');
        setDescription('');
        setErrorMessageStudy('');
        setErrorMessageTypeMx('');
        setErrorMessageCriteriosEvaluar('');
        setErrorMessageCharactersString('');
        setErrorMessageRegex('');
        setErrorMessageDescriptionString('');
        setDisableBtnSave(false);
        setIsActive(false);
    }

    const goBack = () => {
        props.history.push(`/catalogo/recepcion`);
    }

    return (
        <>
            <AddRecepcion 
                title={title}
                study={study}
                selectedStudy={selectedStudy}
                typeMx={typeMx}
                selectedTypeMx={selectedTypeMx}
                description={description}
                criteriosEvaluar={criteriosEvaluar}
                charactersString={charactersString}
                regex={regex}
                descriptionString={descriptionString}
                isActive={isActive}
                disableBtnSave={disableBtnSave}
                disableBtnLimpiar={disableBtnLimpiar}
                executeLoading={executeLoading}
                saveData={saveData}
                goBack={goBack}
                clearData={clearData}
                handleChangeStudy={handleChangeStudy}
                handleChangeTypeMx={handleChangeTypeMx}
                handleChangeDescripcion={handleChangeDescripcion}
                handleChangeCriteriosEvaluar={handleChangeCriteriosEvaluar}
                handleChangeCharactersString={handleChangeCharactersString}
                handleChangeRegex={handleChangeRegex}
                handleChangeDescriptionString={handleChangeDescriptionString}
                handleChangeIsActive={handleChangeIsActive}
                errorMessageStudy={errorMessageStudy}
                errorMessageTypeMx={errorMessageTypeMx}
                errorMessageCriteriosEvaluar={errorMessageCriteriosEvaluar}
                errorMessageCharactersString={errorMessageCharactersString}
                errorMessageRegex={errorMessageRegex}
                errorMessageDescriptionString={errorMessageDescriptionString}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
}

export default RegisterRecepcionContainer;
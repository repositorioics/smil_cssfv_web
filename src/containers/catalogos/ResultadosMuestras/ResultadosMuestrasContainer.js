import React, { useState, useEffect } from 'react';
//import Header from '../../../components/header/Header';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ResultadosMuestras from '../../../components/catalogo/resultados-muestras/ResultadosMuestras';
import DataServices from '../../../service/Api';
import ToastContainer from '../../../components/toast/Toast';
//import { useHistory } from 'react-router-dom';
//import { useAuth } from '../../../context/Auth';

const ResultadosMuestrasContainer = props => {

    const [title, setTitle] = useState('Agregar resultado MX');
    const [titleForm] = useState('Lista de resultados para las muestras');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState ('');
    const [isNew, setIsNew] = useState(true);
    const [id, setId] = useState(0);
    const [executeLoading, setExecuteLoading] = useState(false);
    const [dataTypeOfTest, setDataTypeOfTest] = useState([]);
    const [selectedTypeOftest, setSelectedTypeOftest] = useState('');

    let [isChecked, setIsChecked] = useState(false);

    const [errorMessageCode, setErrorMessageCode] = useState('');
    const [errorMessageDescription, setErrorMessageDescription] = useState('');
    const [errorMessageTypeOfTest, setErrorMessageTypeOfTest] = useState('');
    

    const [show, setShow] = useState(false);

    const [data, setData] = useState([]);

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    const [mounted, setMounted] = useState(true);

    //const { authToken } = useAuth();

    const handleShow = () => {
        setShow(true);
        setIsNew(true);
        setTitle('Agregar resultado MX');
        setCode('');
        setDescription('');
        setErrorMessageCode('');
        setErrorMessageDescription('');
        
        setIsChecked(false);
    }

    const columns = [
        { dataField: 'id', text: 'Id', hidden: true },
        { dataField: 'idTipoPrueba', text: 'IdTipoPrueba', hidden: true },
        { dataField: 'codigo', text: 'Código', sort: true, filter: textFilter({ placeholder: 'Ingrese el código' }) },
        { dataField: 'resultado', text: 'Resultado', sort: true, filter: textFilter({ placeholder: 'Ingrese el resultado' }) },
        { dataField: 'tipoPrueba', text: 'Tipo prueba', sort: true, filter: textFilter({ placeholder: 'Ingrese el tipo de prueba' }) },
        { dataField: 'muestra', text: 'Muestra', sort: true, filter: textFilter({ placeholder: 'Ingrese la muestra' }) },
        { dataField: 'estado', text: 'Estado', sort: true, filter: textFilter({ placeholder: 'Ingrese el estado' }) }
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            if (mounted) {
                getAll();
                getAllTypeOfTest();
                
            }
        } else {
            props.history.push('/');
        }
        return () => setMounted(false);
    }, [mounted, props])

    /**Metodo para obtener todos los registros */
    const getAll = async () => {
        try {
            setExecuteLoading(true);
            const response = await DataServices.getAllResultMx();
            if (response.status === 200) {
                setExecuteLoading(false);
                const newData = [];
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    newData.push({
                        "id": response.data[i].id,
                        "idTipoPrueba": response.data[i].idCatTipoPrueba.id,
                        "codigo": response.data[i].codigo,
                        "resultado": response.data[i].descripcion,
                        "tipoPrueba": response.data[i].idCatTipoPrueba.nombre,
                        "muestra": response.data[i].idCatTipoPrueba.idCatMuestra.nombre,
                        "estado": response.data[i].activo === true ? "Activo" : "Inactivo"
                    });
                }
                setData(newData);
                setShow(false);
                //history.push('/home');
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    const getAllTypeOfTest = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllTipoPruebas();
            if (response.status === 200) {
                setExecuteLoading(false);
                setDataTypeOfTest(response.data);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    const pagination = paginationFactory({
        firstPageText: 'Primera página',
        prePageText: 'Anterior',
        nextPageText: 'Siguiente',
        lastPageText: 'Última página',
    });

    const handleClose = () => {
        setShow(false);
    }

    const handleChangeCode = (e) => {
        if (e.target.validity.valid) {
            setCode(e.target.value);
        }
        setErrorMessageCode('');
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
        setErrorMessageDescription('');
    }

    const onChangeCheckbox = (e) => {
        isChecked = e.target.checked;
        setIsChecked(isChecked);
    }

    const handleChangeTypeOfTest = (e) => {
        setSelectedTypeOftest(e.target.value)
        setErrorMessageTypeOfTest('');
    }

    const tableRowEvents = {
        onClick: (e, row, rowIndex) => {
            setTitle('Editar resultado MX');
            setCode(row.codigo);
            setDescription(row.resultado);
            setSelectedTypeOftest(row.idTipoPrueba);
            setId(row.id)
            
            if (row.estado === "Activo" ) {
                setIsChecked(true);
            }
            if (row.estado === "Inactivo") {
                setIsChecked(false);
            }
            setShow(true);
            setIsNew(false);
        },
    }

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    const saveData = (event) => {
        //validateData();
        event.preventDefault();
        if (isNew) {
            if (validateData()) {
                saveResultMx();
            }
        } else {
            if (validateData()) {
                editResultMx();
            }
        }

    };

    /**Metodo para enviar a guardar los registros */
    const saveResultMx = async () => {
        setExecuteLoading(true);
        try {
            const catResultadosMuestras = {
                codigo: code,
                descripcion: description,
                activo: isChecked,
                idCatTipoPrueba: {
                    id: selectedTypeOftest,
                },
            }
            const response = await DataServices.postResulMx(catResultadosMuestras);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se guardaron correctamente");
                setTimeout(function () {
                    setShow(false);
                }, 6000);
            }
        } catch (error) {
            console.log('error', error)
            setExecuteLoading(false);
        }
        initialStateToast();
    }

    /**Metodo para Editar un registro */
    const editResultMx = async () => {
        setExecuteLoading(true);
        try {
            const catResultadosMuestras = {
                id: id,
                codigo: code,
                descripcion: description,
                activo: isChecked,
                /* idCatMuestra: {
                    id: selectedMx,
                } */
            }
            
            const response = await DataServices.putResultMx(catResultadosMuestras);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se modificaron correctamente");
                setTimeout(function () {
                    setShow(false);
                }, 6000);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
        initialStateToast();
    }
    /**Validando los datos requeridos */
    const validateData = () => {
        if (code === '' || code === null || code === undefined) {
            setErrorMessageCode('El código es requerido');
            return false;
        }
        if (description === '' || description === null || description === undefined) {
            setErrorMessageDescription('La descripción es requerida');
            return false;
        }
        if (selectedTypeOftest <= 0) {
            setErrorMessageTypeOfTest('Debe seleccionar el tipo de prueba');
            return false;
        }
        return true;
    }

    const refreshPage = ()=> {
        window.location.reload();
     }

    return (
        <>
            {/* <Header /> */}
            <ResultadosMuestras
                title={title}
                saveData={saveData}
                code={code}
                description={description}
                isChecked={isChecked}
                show={show}
                titleForm={titleForm}
                data={data}
                selectedTypeOftest={selectedTypeOftest}
                
                columns={columns}
                pagination={pagination}
                tableRowEvents={tableRowEvents}
                refreshPage={refreshPage}
                executeLoading={executeLoading}
                dataTypeOfTest={dataTypeOfTest}
                
                handleChangeCode={handleChangeCode}
                handleDescription={handleDescription}
                handleChangeTypeOfTest={handleChangeTypeOfTest}
                
                handleShow={handleShow}
                handleClose={handleClose}
                onChangeCheckbox={onChangeCheckbox}
                errorMessageCode={errorMessageCode}
                errorMessageDescription={errorMessageDescription}
                errorMessageTypeOfTest={errorMessageTypeOfTest}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>

    );
}
export default ResultadosMuestrasContainer;
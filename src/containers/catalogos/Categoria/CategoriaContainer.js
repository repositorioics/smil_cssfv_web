import React, { useState, useEffect } from 'react';
//import Header from '../../../components/header/Header';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Categoria from '../../../components/catalogo/categoria/Categoria';
import DataServices from '../../../service/Api';
import ToastContainer from '../../../components/toast/Toast';
//import { useHistory } from 'react-router-dom';
//import { useAuth } from '../../../context/Auth';

const CategoriaContainer = props => {

    const [title, setTitle] = useState('Agregar categoría');
    const [titleForm] = useState('Lista de categorias');
    const [name, setName] = useState('');
    const [description, setDescription] = useState ('');
    const [isNew, setIsNew] = useState(true);
    const [id, setId] = useState(0);
    const [executeLoading, setExecuteLoading] = useState(false);

    let [isChecked, setIsChecked] = useState(false);

    const [errorMessageName, setErrorMessageName] = useState('');

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
        setTitle('Agregar categoría');
        setErrorMessageName('');
        setName('');
        setDescription('');
        setIsChecked(false);
    }

    const columns = [
        { dataField: 'id', text: 'Id', hidden: true },
        { dataField: 'nombre', text: 'Nombre', sort: true, filter: textFilter({ placeholder: 'Ingrese el nombre' }) },
        { dataField: 'descripcion', text: 'Descripción', sort: true, filter: textFilter({ placeholder: 'Ingrese la descripción' }) },
        { dataField: 'estado', text: 'Estado', sort: true, filter: textFilter({ placeholder: 'Ingrese el estado' }) }
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            if (mounted) {
                getAllCat();
            }
            //getAllCat()
        } else {
            props.history.push('/');
        }
        return () => setMounted(false);
    }, [mounted, props])

/*     useEffect(() => {
        let mounted = true;
        if (pets.selectedPet) {
          dispatch({ type: "FETCH_PET" });
          getPet(pets.selectedPet).then(data => {
            if(mounted){
              dispatch({ type: "FETCH_PET_SUCCESS", payload: data });
            }
          });
        } else {
          dispatch({ type: "RESET" });
        }
    
        return () => mounted = false;
    
      }, [pets.selectedPet]); */

    /**Metodo para obtener todos los registros */
    const getAllCat = async () => {
        try {
            setExecuteLoading(true);
            const response = await DataServices.getAllCategorias();
            if (response.status === 200) {
                setExecuteLoading(false);
                const newData = [];
                for (var i = 0; i < response.data.length; i++) {
                    newData.push({
                        "id": response.data[i].id,
                        "nombre": response.data[i].nombre,
                        "descripcion": response.data[i].descripcion,
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

    /* const data = [
        { id: 1, nombre: 'A', descripcion: 'Indica que es categoria A', estado: 'Activo' },
        { id: 2, nombre: 'B', descripcion: 'Indica que es categoria B', estado: 'Activo' },
        { id: 3, nombre: 'C', descripcion: 'Indica que es categoria C', estado: 'Inactivo' }
    ] */

    const pagination = paginationFactory({
        firstPageText: 'Primera página',
        prePageText: 'Anterior',
        nextPageText: 'Siguiente',
        lastPageText: 'Última página',
    });

    const handleClose = () => {
        setShow(false);
    }

    const handleChangeName = (e) => {
        if (e.target.validity.valid) {
            setName(e.target.value);
        }
        setErrorMessageName('');
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeCheckbox = (e) => {
        isChecked = e.target.checked;
        setIsChecked(isChecked);
    }

    const tableRowEvents = {
        onClick: (e, row, rowIndex) => {
            setTitle('Editar categoría');
            setName(row.nombre);
            setDescription(row.descripcion);
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
                saveCat();
            }
        } else {
            if (validateData()) {
                editCat();
            }
        }

    };

    /**Metodo para enviar a guardar la categoria */
    const saveCat = async () => {
        setExecuteLoading(true);
        try {
            const catCategoria = {
                nombre: name,
                descripcion: description,
                activo: isChecked
            }
            
            const response = await DataServices.postCategoria(catCategoria);
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
    const editCat = async () => {
        setExecuteLoading(true);
        try {
            const catCategoria = {
                id: id,
                nombre: name,
                descripcion: description,
                activo: isChecked
            }
            
            const response = await DataServices.putCategoria(catCategoria);
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
        if (name === '' || name === null || name === undefined) {
            setErrorMessageName('El nombre es requerido');
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
            <Categoria
                title={title}
                errorMessageName={errorMessageName}
                handleChangeName={handleChangeName}
                handleDescription={handleDescription}
                onChangeCheckbox={onChangeCheckbox}
                saveData={saveData}
                name={name}
                description={description}
                isChecked={isChecked}
                show={show}
                handleShow={handleShow}
                handleClose={handleClose}
                titleForm={titleForm}
                data={data}
                columns={columns}
                pagination={pagination}
                tableRowEvents={tableRowEvents}
                refreshPage={refreshPage}
                executeLoading={executeLoading}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>

    );
}
export default CategoriaContainer;
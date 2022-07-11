import React, { useEffect, useState } from "react";
import GeneratePDF from "./ReportDengueGenerator";
import DataServices from "../../service/Api"
import MxTomadasDengue from "../../components/reportDengue/MxTomadasDengue";
import Utils from '../../utils/Utils';
import ToastContainer from '../../components/toast/Toast';
import * as Constants from '../../Constants';

const MxTomadasDengueContainer = props => {

  const [title] = useState('Muestras de dengue tomadas');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //const [tickets, setTickets] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [data, setData] = useState([]);
  const [dataResult, setDataResult] = useState([]);

  const [errorStartDate, setErrorStartDate] = useState('');
  const [errorEndDate, setErrorEndDate] = useState('');

  const [executeLoading, setExecuteLoading] = useState(false);

  /**Variables de los mensajes de alerta */
  const [type, setType] = useState(null);
  const [messageAlert, setMessageAlert] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
          getMedicos();
          getAllResultPRD();
        } else {
          props.history.push('/');
          //return <Redirect to='/login' />
      }
  }, [props.history]);

  const initialStateToast = () => {
    setType(null);
    setMessageAlert(null);
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

/**Funcion para obtener los resultados para la prueba rapida Dengue */
const getAllResultPRD = async () => {
  setExecuteLoading(true);
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

  /**Metodo para obtener todos los registros por el filtro aplicado*/
  const getMxDengueListByFilter = async (startDate, endDate) => {
    setExecuteLoading(true);
    try {
        const response = await DataServices.getAllMxDengueRangoFecha(startDate, endDate);
        if (response.status === 200) {
            setExecuteLoading(false);
            if (response.data.length > 0) {
                setData(response.data)
            } else {
                setData([]);
                setType("info");
                setMessageAlert("No se encontraron registros");
                setTimeout(function () {
                    initialStateToast();
                }, 500);
            }
            
        }
    } catch (error) {
        setExecuteLoading(false);
        console.log('error', error)
    }
}

  const handleChangeStartDate = (e) => {
    const result = Utils.validateDate(e.target.value);
    if (result) {
      setStartDate(e.target.value);
      setErrorStartDate('La fecha de inicio no puede ser mayor que la fecha de hoy');
    } else {
      setStartDate(e.target.value);
      setErrorStartDate('');
    }
  }

  const handleChangeEndDate = (e) => {
    const result = Utils.validateDate(e.target.value);
    if (result) {
      setEndDate(e.target.value);
      setErrorEndDate('La fecha fin no puede ser mayor que la fecha de hoy');
    } else {
      setEndDate(e.target.value);
      setErrorEndDate('');
    }
  }

  /**Metodo para realizar la busqueda */
  const searchData = () => {
    if (validateSearchData()) {
      if (validateDates()) {
        getMxDengueListByFilter(startDate, endDate);
      }

    }
  }

  const getPdfFile = () => {
    if (data.length > 0) {
      GeneratePDF(data, medicos, dataResult, startDate, endDate)
    }
  }

  /**Metodo para validar la busqueda y no permitirla sino existen ambas fechas o el codigo */
  const validateSearchData = () => {
    if ((startDate === '' || startDate === null || startDate === undefined) &&
      (endDate === '' || endDate === null || endDate === undefined)) {
      setType("info");
      setMessageAlert("Debe ingresar el codigo ó las fechas");
      setTimeout(function () {
        initialStateToast();
      }, 500);
      return false
    }
    return true
  }

  /** Metodo para validar que fecha inicio no sea mayor a la fecha fin*/
  const validateDates = () => {
    const result = Utils.validateStartDateEndDate(startDate, endDate);
    if (result) {
      setType("error");
      setMessageAlert("La fecha inicio no puede ser mayor que la fecha fin");
      setTimeout(function () {
        initialStateToast();
      }, 500);
      return false
    }
    return true
  }

  //const reportTickets = tickets.filter(ticket => ticket.status === "completed");

  return (
    <>
      {/* <div className="container mb-4 mt-4 p-3" style={{boxShadow: 'none'}}>
        <div className="row">
            <button
              className="btn btn-primary"
              onClick={() => GeneratePDF(tickets)}
            >
              Generate monthly report
            </button>
        </div>
      </div> */}
      <MxTomadasDengue
        title={title}
        data={data}
        medicos={medicos}
        startDate={startDate}
        endDate={endDate}
        executeLoading={executeLoading}
        handleChangeStartDate={handleChangeStartDate}
        handleChangeEndDate={handleChangeEndDate}
        searchData={searchData}
        getPdfFile={getPdfFile}
        errorStartDate={errorStartDate}
        errorEndDate={errorEndDate}
      />
      <ToastContainer
        type={type}
        messageAlert={messageAlert}
      />
    </>
  );
};

export default MxTomadasDengueContainer;
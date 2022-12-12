import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import MxDengueListRetoma from '../../components/mxDengue/MxDengueListRetoma';
import Add from '@material-ui/icons/AddCircle';
import DataServices from '../../service/Api';
import ToastContainer from '../../components/toast/Toast';

const MxDengueRetomaListContainer = props => {
    const [titleForm] = useState('Retoma / Completar volumen - Muestras Dengue');
    const [data, setData] = useState([]);
    const [executeLoading, setExecuteLoading] = useState(false);
    const [mounted, setMounted] = useState(true);

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);


    const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div
                style={{
                    textAlign: "center",
                    cursor: "pointer",
                    lineHeight: "normal",
                    display: "flex"
                }}>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Retoma</Tooltip>}>
                    <Add
                        onClick={() => retomaMxDengue(row)}
                        style={{ fontSize: 20, marginLeft: 15, color: "#2a6e78" }}
                    />
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Completar Volumen</Tooltip>}>
                    <Add
                        onClick={() => completarMxDengue(row)}
                        style={{ fontSize: 20, marginLeft: 15, color: "#4d6160" }}
                    />
                </OverlayTrigger>
            </div>
        );
    }

    const columns = [
        { dataField: 'id', text: 'Id', hidden: true },
        { dataField: 'muestraId', text: 'MuestraId', hidden: true },
        { dataField: 'fechaRegistro', text: '', hidden: true },
        { dataField: 'codigo', text: 'Código', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'codLab', text: 'Cod-lab', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'consulta', text: 'Consulta', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'fif', text: 'FIF', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'fechaToma', text: 'Fecha toma', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'categoria', text: 'Categoría', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'cambCategoria', text: 'Cambio categoría', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'estado', text: 'Estado muestra',  hidden: true },
        {
            dataField: "", text: "", sort: false, formatter: rankFormatter, headerAttrs: { width: 50 }, attrs: { width: 50, className: "EditRow" }
        },
        { dataField: 'retoma', text: 'retoma', hidden: true },
        { dataField: 'completarVol', text: 'completarVol', hidden: true }
    ];

    const pagination = paginationFactory({
        firstPageText: 'Primera página',
        prePageText: 'Anterior',
        nextPageText: 'Siguiente',
        lastPageText: 'Última página',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            if (mounted) {
                //cargar la lista
                getMxDengueRetomaYCompletarVolList();
            }
        } else {
            props.history.push('/');
        }
        return () => setMounted(false);
    }, [mounted, props])

    /**Metodo para obtener todos los registros */
    const getMxDengueRetomaYCompletarVolList = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getMuestrasDengueRetomaYCompletarVol();
            if (response.status === 200) {
                setExecuteLoading(false);
                const newData = [];
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    newData.push({
                        "id": response.data[i].id,
                        "muestraId": response.data[i].muestraId.id,
                        "fechaRegistro": response.data[i].muestraId.fechaRegistro,
                        "codigo": response.data[i].muestraId.codigoParticipante,
                        "codLab": response.data[i].muestraId.codLab,
                        "consulta": response.data[i].consultaId.descripcion,
                        "fif": response.data[i].muestraId.fif,
                        "fechaToma": response.data[i].muestraId.fechaToma,
                        "horaToma": response.data[i].muestraId.horaToma,
                        "categoria": response.data[i].categoriaId.nombre,
                        "cambCategoria": response.data[i].cambioCategoriaId !== null ? response.data[i].cambioCategoriaId.cambioCat : "",
                        "estado": response.data[i].muestraId.anulada === true ? "Anulada" : "Activa",
                        "retoma": response.data[i].muestraId.retoma,
                        "completarVol": response.data[i].completarVol
                    });
                }
                setData(newData)
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }



    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }


    const retomaMxDengue = (row) => {
        if (!row.retoma) {
            console.log(row);
            //history.push(`/muestras/editar-muestra-influenza/${row.id}`);
        } else {
            setType("info");
            setMessageAlert("Codigo seleccionado ya se realizo retoma");
            setTimeout(function () {
                initialStateToast();
            }, 100);
        }
    }

    const completarMxDengue = (row) => {
        if (!row.completarVol) {
            console.log(row);
            //history.push(`/muestras/editar-muestra-influenza/${row.id}`);
        } else {
            setType("info");
            setMessageAlert("Codigo seleccionado ya se completo el volumen");
            setTimeout(function () {
                initialStateToast();
            }, 100);
        }
    }

    return (
        <>
            <MxDengueListRetoma
                titleForm={titleForm}
                data={data}
                columns={columns}
                pagination={pagination}
                executeLoading={executeLoading}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
}

export default MxDengueRetomaListContainer;
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import MxInfluenzaListRetoma from '../../components/mxInfluenza/MxInfluenzaListRetoma';
import Add from '@material-ui/icons/AddCircle';
import DataServices from '../../service/Api';
import ToastContainer from '../../components/toast/Toast';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    retomaColor: {
        color: red[900],
        '&:hover': {
            color: red[600],
        },
    }
}));

const MxInfluenzaRetomaListContainer = props => {
    const classes = useStyles();
    const [titleForm] = useState('Retoma Muestras Influenza');
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
                        onClick={() => retomaInfluenza(row)}
                        style={{ fontSize: 20, marginLeft: 15, color: "#2a6e78" }}
                    />
                </OverlayTrigger>
            </div>
        );
    }

    const columns = [
        { dataField: 'id', text: 'Id', hidden: true },
        { dataField: 'fechaRegistro', text: '', hidden: true },
        { dataField: 'codigo', text: 'Código', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'codLab', text: 'Cod-lab', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'fif', text: 'FIF', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'fechaToma', text: 'Fecha toma', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'horaToma', text: 'Hora toma', sort: true, filter: textFilter({ placeholder: 'Ingrese' }) },
        { dataField: 'retoma', text: 'Retoma', sort: true, filter: textFilter({ placeholder: 'Ingrese' }), attrs: { className: classes.retomaColor } },
        {
            dataField: "", text: "", sort: false, formatter: rankFormatter, headerAttrs: { width: 50 }, attrs: { width: 50, className: "EditRow" }
        }
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
                getMxInfluenzaRetomaList();
            }
        } else {
            props.history.push('/');
        }
        return () => setMounted(false);
    }, [mounted, props])

    const retomaInfluenza = (row) => {
        if (row.retoma === 'No') {
            console.log(row);
        } else {
            setType("info");
            setMessageAlert("Codigo seleccionado ya se realizo retoma");
            setTimeout(function () {
                initialStateToast();
            }, 100);
        }
    }


    /**Metodo para obtener todos los registros */
    const getMxInfluenzaRetomaList = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getMuestrasInfluenzaRetoma();
            //console.log('Retoma influenza', );
            if (response.status === 200) {
                setExecuteLoading(false);
                const newData = [];
                for (var i = 0; i < response.data.length; i++) {
                    newData.push({
                        "id": response.data[i].id,
                        "fechaRegistro": response.data[i].fechaRegistro,
                        "codigo": response.data[i].codigoParticipante,
                        "codLab": response.data[i].codLab,
                        "fif": response.data[i].fif,
                        "fechaToma": response.data[i].fechaToma,
                        "horaToma": response.data[i].horaToma,
                        "retoma": response.data[i].retoma === true ? "Si" : "No"
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

    return (
        <>
            <MxInfluenzaListRetoma
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

export default MxInfluenzaRetomaListContainer;
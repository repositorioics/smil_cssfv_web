import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
//import Header from '../../../components/header/Header';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Edit from '@material-ui/icons/Edit';
import RecepcionList from '../../../components/catalogo/recepcion/RecepcionList';
import DataServices from '../../../service/Api';

const RecepcionListContainer = props => {

    const [titleForm] = useState('Formatos para realizar una recepción');
    const [data, setData] = useState([]);
    const [executeLoading, setExecuteLoading] = useState(false);
    const [mounted, setMounted] = useState(true);

    const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            < div
                style={{
                    textAlign: "center",
                    cursor: "pointer",
                    lineHeight: "normal",
                    display: "flex"
                }}>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Editar</Tooltip>}>
                    <Edit
                        onClick={() => editCatRecepcion(row)}
                        style={{ fontSize: 20, marginLeft:15, color: "#efac14" }}
                    />
                </OverlayTrigger>
                {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Cambiar contraseña</Tooltip>}>
                    <VpnKeyIcon
                        onClick={() => editPwd(row)}
                        style={{ fontSize: 20,marginLeft:15, color: "#950c0c" }}
                    />
                </OverlayTrigger> */}
            </div>
            
        );
    } 

    const columns = [
        { dataField: 'id', text: 'Id', hidden: true },
        { dataField: 'estudio', text: 'Estudio', sort: true, filter: textFilter({ placeholder: 'Ingrese el estudio' }) },
        { dataField: 'tipo', text: 'Tipo', sort: true, filter: textFilter({ placeholder: 'Ingrese el tipo' }) },
        { dataField: 'cadena', text: 'Cadena de Caracteres', sort: true, filter: textFilter({ placeholder: 'Ingrese la cadena' }) },
        { dataField: 'estado', text: 'Estado', sort: true, filter: textFilter({ placeholder: 'Ingrese el estado' }) },
        { dataField: "", text: "", sort: false, formatter: rankFormatter, headerAttrs: { width: 50 }, attrs: { width: 50, className: "EditRow" } 
      }
    ];

    const pagination = paginationFactory({
        firstPageText: 'Primera página',
        prePageText: 'Anterior',
        nextPageText: 'Siguiente',
        lastPageText: 'Última página',
    });

    /* const tableRowEvents = {
        onClick: (e, row, rowIndex) => {
            console.log(row);
            props.history.push(`/seguridad/editar-usuario/${row.id}`);
        },
    } */

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            if (mounted) {
                getRecepcionList();
            }
        } else {
            props.history.push('/');
        }
        return () => setMounted(false);
    }, [mounted ,props])

    /**Metodo para obtener todos los registros */
    const getRecepcionList = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllCatRecepcion();
            if (response.status === 200) {
                setExecuteLoading(false);
                const newData = [];
                for (var i = 0; i < response.data.length; i++) {
                    //console.log(response.data);
                    newData.push({
                        "id": response.data[i].id,
                        "estudio": response.data[i].nombreEstudio,
                        "tipo": response.data[i].tipo,
                        "cadena": response.data[i].cadenaCaracteresCodigo,
                        "estado": response.data[i].activo === true ? "Activo" : "Inactivo"
                    });
                }
                setData(newData);
                //history.push('/home');
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    const editCatRecepcion = (row) => {
        props.history.push(`/catalogo/editar-recepcion/${row.id}`);
    }

    /*const editPwd = (row) => {
        props.history.push(`/seguridad/cambiar-clave/${row.id}`);
    }*/


    return (
        <>
            <RecepcionList 
                titleForm={titleForm}
                data={data}
                columns={columns}
                pagination={pagination}
                executeLoading={executeLoading}
            />
        </>
    );

}

export default RecepcionListContainer;
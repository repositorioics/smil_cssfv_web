import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
//import Header from '../../../components/header/Header';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Edit from '@material-ui/icons/Edit';
import UserProfileList from '../../../components/security/usersRoles/UserProfileList';
import DataServices from '../../../service/Api';

const UserProfileListContainer = props => {

    const [titleForm] = useState('Lista perfiles usuarios');
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
                        onClick={() => editProfile(row)}
                        style={{ fontSize: 20, marginLeft:15, color: "#efac14" }}
                    />
                </OverlayTrigger>
                {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Cambiar contraseña</Tooltip>}>
                    <KeyFill
                        onClick={() => editPwd(row)}
                        style={{ fontSize: 20,marginLeft:15 }}
                        color="#800000"
                    />
                </OverlayTrigger> */}
            </div>
            
        );
    } 

    const columns = [
        { dataField: 'id', text: 'Id', hidden: true },
        { dataField: 'usuario', text: 'Usuario', sort: true, filter: textFilter({ placeholder: 'Ingrese el usuario' }) },
        { dataField: 'perfil', text: 'Perfil', sort: true, filter: textFilter({ placeholder: 'Ingrese el perfil' }) },
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
                getUserProfileList();
            }
        } else {
            props.history.push('/');
        }
        return () => setMounted(false);
    }, [mounted, props])

    /**Metodo para obtener todos los registros */
    const getUserProfileList = async () => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getAllUserProfile();
            if (response.status === 200) {
                setExecuteLoading(false);
                const newData = [];
                for (var i = 0; i < response.data.length; i++) {
                    newData.push({
                        "id": response.data[i].id,
                        "usuario": response.data[i].usuarioId.usuario,
                        "perfil": response.data[i].perfilId.nombre,
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

    const editProfile = (row) => {
        props.history.push(`/seguridad/editar-perfil-usuario/${row.id}`);
    }

    return (
        <>
            {/* <Header /> */}
            <UserProfileList 
                titleForm={titleForm}
                data={data}
                columns={columns}
                pagination={pagination}
                executeLoading={executeLoading}
                //tableRowEvents={tableRowEvents}
            />
        </>
    );

}

export default UserProfileListContainer;
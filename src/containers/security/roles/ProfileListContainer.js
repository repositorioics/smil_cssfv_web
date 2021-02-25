import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
//import Header from '../../../components/header/Header';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Edit from '@material-ui/icons/Edit';
import ProfileList from '../../../components/security/roles/ProfileList';
import DataServices from '../../../service/Api';

const ProfileListContainer = props => {

    const [titleForm] = useState('Lista de perfiles');
    const [data, setData] = useState([]);

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
        { dataField: 'nombre', text: 'Nombre', sort: true, filter: textFilter({ placeholder: 'Ingrese el nombre' }) },
        { dataField: 'descripcion', text: 'Descripción', sort: true, filter: textFilter({ placeholder: 'Ingrese la descripción' }) },
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
            getProfileList();
        } else {
            props.history.push('/');
        }
    }, [props])

    /**Metodo para obtener todos los registros */
    const getProfileList = async () => {
        try {
            const response = await DataServices.getAllProfiles();
            if (response.status === 200) {
                const newData = [];
                for (var i = 0; i < response.data.length; i++) {
                    newData.push({
                        "id": response.data[i].id,
                        "nombre": response.data[i].nombre,
                        "descripcion": response.data[i].descripcion
                    });
                }
                setData(newData);
                //history.push('/home');
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const editProfile = (row) => {
        props.history.push(`/seguridad/editar-perfil/${row.id}`);
    }

    return (
        <>
           {/* <Header /> */}
            <ProfileList 
                titleForm={titleForm}
                data={data}
                columns={columns}
                pagination={pagination}
                //tableRowEvents={tableRowEvents}
            />
        </>
    );

}

export default ProfileListContainer;
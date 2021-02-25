import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Edit from '@material-ui/icons/Edit';
//import Header from '../../../components/header/Header';
import { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DataServices from '../../../service/Api';
import MenuList from '../../../components/security/menus/MenuList';


const MenuListContainer = props => {

    const [titleForm] = useState('Lista menú');
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
                        onClick={() => editMenu(row)}
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
        { dataField: 'orden', text: 'Orden', sort: true, filter: textFilter({ placeholder: 'Ingrese el orden' }) },
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
            getMenuList();
        } else {
            props.history.push('/');
        }
    }, [props])

    /**Metodo para obtener todos los registros */
    const getMenuList = async () => {
        try {
            const response = await DataServices.getAllMenu();
            if (response.status === 200) {
                const newData = [];
                for (var i = 0; i < response.data.length; i++) {
                    newData.push({
                        "id": response.data[i].id,
                        "nombre": response.data[i].nombre,
                        "descripcion": response.data[i].descripcion,
                        "orden": response.data[i].orden,
                        "estado": response.data[i].activo === true ? "Activo" : "Inactivo"
                    });
                }
                setData(newData);
                //history.push('/home');
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const editMenu = (row) => {
        props.history.push(`/seguridad/editar-menu/${row.id}`);
    }

    return (
        <>
            {/* <Header /> */}
            <MenuList 
                titleForm={titleForm}
                data={data}
                columns={columns}
                pagination={pagination}
                //tableRowEvents={tableRowEvents}
            />
        </>
    );

}

export default MenuListContainer;
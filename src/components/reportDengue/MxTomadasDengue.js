import React from "react";
//import { Link } from "react-router-dom";
import { Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const MxTomadasDengue = props => {
  const classes = useStyles();
  
  const findMedicalName = (id) => {
    //console.log('data', props.data);
    if (props.medicos.length > 0) {
      const result = props.medicos.filter(item => item.id === id);
      return result[0].nombre;
    }
  }
  return (
    <>
      <Paper className="container" elevation={3} >
        <div style={{ boxShadow: "none" }}>
          <div className="hdr, row, m-top">
            <div className="title">
              {props.title}
            </div>
          </div>
          <div className="input-group row" style={{ marginTop: 15, marginLeft: 10 }}>
            <div>
              <TextField
                id="startDate"
                label="Fecha inicio"
                type="date"
                value={props.startDate}
                onChange={props.handleChangeStartDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div>
                <label className="messageError">{props.errorStartDate}</label>
              </div>
            </div>
            <div style={{ marginLeft: 10 }}>
              <TextField
                id="endDate"
                label="Fecha fin"
                type="date"
                value={props.endDate}
                onChange={props.handleChangeEndDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div>
                <label className="messageError">{props.errorEndDate}</label>
              </div>
            </div>
            <div className="hover" style={{ marginTop: 25, marginLeft: 15 }}>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Buscar</Tooltip>}>
                <span className="d-inline-block">
                  <SearchIcon onClick={props.searchData} size={20} />
                </span>
              </OverlayTrigger>
            </div>
            <div className="hover" style={{ marginTop: 25, marginLeft: 25 }}>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Limpiar filtros</Tooltip>}>
                <span className="d-inline-block">
                  <NotInterestedIcon style={{ color: '#950c0c' }} onClick={props.clearFilters} size={20} />
                </span>
              </OverlayTrigger>
            </div>

            <div className="hover" style={{ marginTop: 25, marginLeft: 25 }}>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Generar PDF</Tooltip>}>
                <span className="d-inline-block">
                  <PictureAsPdfIcon onClick={props.getPdfFile} size={20} />
                </span>
              </OverlayTrigger>
            </div>
          </div>
          <Divider />
          {props.data.length === 0 ? (
            "No hay datos que mostrar"
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Cat</th>
                  <th scope="col">Consulta</th>
                  <th scope="col">FIF</th>
                  <th scope="col">Hora Toma Mx</th>
                  <th scope="col">Vol. Sangre</th>
                  <th scope="col">Ordena Mx</th>
                  <th scope="col">Toma Mx</th>
                  <th scope="col">Tubo</th>
                </tr>
              </thead>
              <tbody>
                {props.data.map(item => (
                  <tr key={item.id}>
                    <td>{item.muestraId.codLab}</td>
                    <td>{item.categoriaId.nombre}</td>
                    <td>{item.consultaId.descripcion}</td>
                    <td>{item.muestraId.fif}</td>
                    <td>{item.muestraId.horaToma}</td>
                    <td>{item.muestraId.volumen}</td>
                    <td>{findMedicalName(item.muestraId.quienOrdena)}</td>
                    <td>{item.muestraId.bioanalistaId !== null ? item.muestraId.bioanalistaId.nombres + ' ' + item.muestraId.bioanalistaId.apellidos : null}</td>
                    <td>{item.tuboId !== null ? item.tuboId.descripcion : null}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Paper>
    </>
  );
};

export default MxTomadasDengue;
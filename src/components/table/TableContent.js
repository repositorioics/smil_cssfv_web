import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import '../table/TableContent.css';


const makeStyle = (status) => {
  if (status === 'Anulada') {
    return {
      background: '#ffadad8f',
      color: 'red'
    }
  }
  if (status === 'Tomada') {
    return {
      background: '#066acb',
      color: 'white'
    }
  }
  if (status === 'Pendiente') {
    return {
      background: '#f6d335',
      color: 'black'
    }
  }
}

const gunnarStyle = { height: "10px", padding: "0px"};

const TableContent = (props) => {
  return (
    <div style={{ marginTop: 20 }} className='table'>
      <h3>Últimas muestras tomadas</h3>
      <TableContainer component={Paper}
        style={{boxShadow: '0px 13px 20px 0px #80808029'}}
      >
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow style={gunnarStyle}>
              <TableCell style={gunnarStyle}>Código</TableCell>
              <TableCell style={gunnarStyle} align="left">Muestra</TableCell>
              {/* <TableCell align="left">Tipo</TableCell> */}
              <TableCell  style={gunnarStyle} align="left">Fecha Registro</TableCell>
              <TableCell style={gunnarStyle} align="left">Hora Toma</TableCell>
              <TableCell style={gunnarStyle} align="left">Tomada Por</TableCell>
              <TableCell style={gunnarStyle}align="left">Volumen</TableCell>
              <TableCell style={gunnarStyle}align="left">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.length > 0 ? props.data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.codigoParticipante}
                </TableCell>
                <TableCell align="left">{row.nombre}</TableCell>
                {/* <TableCell align='left'>{row.tipo}</TableCell> */}
                <TableCell align="left" type="date">{moment(row.fechaRegistro).format('D/MM/YYYY')}</TableCell>
                <TableCell align="left">{row.horaToma}</TableCell>
                <TableCell align="left">{row.usuario}</TableCell>
                <TableCell align="left">{row.volumen}</TableCell>
                {/* <TableCell align="left">{row.estado}</TableCell> */}
                <TableCell align="left">
                  <span className='status' style={makeStyle(row.estado)}>{row.estado}</span>
                </TableCell>
              </TableRow>
            )) : [] }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableContent;

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring';

const MinusSquare = (props) => {
  return (
    <>
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
      </SvgIcon>
    </>
  );
}

const PlusSquare = (props) => {
  return (
    <>
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
      </SvgIcon>
    </>
  );
}

const CloseSquare = (props) => {
  return (
    <>
      <SvgIcon
        className="close"
        fontSize="inherit"
        style={{ width: 14, height: 14 }}
        {...props}
      >
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
      </SvgIcon>
    </>
  );
}

const TransitionComponent = (props) => {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    //width:'100%',
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));


const AlertDialogMxDuplicada = (props) => {
  //console.log(props.valorDetalle);
  return (
    <>
      {Object.keys(props.valorDetalle).length > 0 ?
        <Dialog disableBackdropClick
          open={props.openAlertDialogRecep}
          onClose={props.handleCloseAlertDialogRecep}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Instituto de Ciencias Sostenibles"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-content" style={{color: 'red'}}>
              {props.alertMessageDialogRecep}
            </DialogContentText>
            <Box sx={{ flexGrow: 5 }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6} sm={6} md={6} >

                  <TreeView
                    style={{ marginTop: 10 }}
                    aria-label="customized"
                    //defaultExpanded={['2','4','6','8']}
                    defaultExpanded={['0']}
                    defaultCollapseIcon={<MinusSquare />}
                    defaultExpandIcon={<PlusSquare />}
                    defaultEndIcon={<CloseSquare />}
                    sx={{ height: 300, flexGrow: 1, maxWidth: 'auto', overflowY: 'auto' }}
                  >
                    <StyledTreeItem nodeId="1" label="Ver Detalle">
                      <StyledTreeItem nodeId="2" label="Cod-Lab">
                        <StyledTreeItem nodeId="3" label={props.valorDetalle.codigoLab} />
                      </StyledTreeItem>

                      <StyledTreeItem nodeId="4" label="Cod-Lab-Scan">
                        <StyledTreeItem nodeId="5" label={props.valorDetalle.codigoLabScan} />
                      </StyledTreeItem>

                      <StyledTreeItem nodeId="6" label="Fecha Toma">
                        <StyledTreeItem nodeId="7" label={props.valorDetalle.fechaTomaMx} />
                      </StyledTreeItem>

                      {/* <StyledTreeItem nodeId="8" label="Usuario Recepciona">
                        <StyledTreeItem nodeId="9" label={props.valorDetalle.muestraId.usuarioRecepciona.usuario} />
                      </StyledTreeItem> */}

                    </StyledTreeItem>
                  </TreeView>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleCloseAlertDialogRecep} color="primary" autoFocus>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog> : null}

    </>
  );
}

export default AlertDialogMxDuplicada;
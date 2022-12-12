import axios from 'axios';

import * as Constants from '../Constants';

const instance = axios.create({
    baseURL: Constants.URL,
    headers: {
        "Accept": "*/*",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    }
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

/**----------------------------------- */

const getParticipanteByCode = codigo => {
    return instance.get("participantes/"+codigo);
}

const getEstudios = () => {
    return instance.get("estudios")
}

const getEstudiosByCodigo = codigo => {
    return instance.get("estudios/"+codigo);
}

/**----------------------------------- */
/**Api para las muestras*/
const getCountMuestrasByCodigoParticipanteYCatMuestraId = (codigoParticipante, id) => {
    return instance.get(`muestras/byCodigoParticipante_Y_catMuestraId`, { params: {
        codigoParticipante: codigoParticipante,
        id: id
    }})
}

const postMuestraInfluenza = (muestra) => {
    return instance.post("muestras/influenza", muestra);
}

const putMuestraInfluenza = (muestra) => {
    return instance.put("muestras/influenza", muestra);
}

const getMuestrasInfluenza = () => {
    return instance.get("muestras/influenza/fechaDelDia");
}

const filtroMxInfluenza = (code, startDate, endDate) => {
    return instance.get(`muestras/influenza/participantes/codigo/fechas`, { params: {
        codigoParticipante: code,
        strFecha1: startDate,
        strFecha2: endDate
    }})
}

const getMuestraInfluenzaById = id => {
    return instance.get("muestras/influenza/"+id);
}

const codigoLabUltimaMxInfluenzaPorCodigo = (codigo) => {
    return instance.get(`muestras/influenza/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

/* const getMuestraInfluenzaUltimoRegistro = (code) => {
    return instance.get(`muestras/influenza/ultimoRegistro`, { params: {
        codigoParticipante: code
    }});
} */

const getUltimoRegistroMuestraInfluenza = (code) => {
    return instance.get(`muestras/influenza/ultimoRegistro`, { params: {
        codigoParticipante: code
    }});
}

const muestraInfluenzaByCodLabScan = (codLabScan) => {
    return instance.get(`muestras/influenza/cod_lab_scan`, { params: {
        codLabScan: codLabScan
    }});
}

const getMuestrasInfluenzaRetoma = () => {
    return instance.get("muestras/influenza/retoma");
}

const getMuestraInfluenzaByIdMuestra = idMuestra => {
    return instance.get("muestras/influenza/idMuestra/"+idMuestra);
}


/**Muestras BHC */
const getMuestrasBhc = () => {
    return instance.get("muestras/bhc/fechaDelDia");
}

const filtroMxBhc = (code, startDate, endDate) => {
    return instance.get(`muestras/bhc/participantes/codigo/fechas`, { params: {
        codigoParticipante: code,
        strFecha1: startDate,
        strFecha2: endDate
    }})
}

const postMuestraBhc = (muestra) => {
    return instance.post('muestras/bhc', muestra);
}

const putMuestraBhc = (muestra) => {
    return instance.put('muestras/bhc', muestra);
}

const muestrasBhcById = (id) => {
    return instance.get("muestras/bhc/"+id);
}

const codigoLabUltimaMxBHCPorCodigo = (codigo) => {
    return instance.get(`muestras/bhc/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const muestraBHCByCodLabScan = (codLabScan) => {
    return instance.get(`muestras/bhc/cod_lab_scan`, { params: {
        codLabScan: codLabScan
    }});
}

const getMuestraBHCByIdMuestra = idMuestra => {
    return instance.get("muestras/bhc/idMuestra/"+idMuestra);
}

/**Muestras U01 */
const getMuestrasU01 = () => {
    return instance.get("muestras/u01/fechaDelDia");
}

const getMustraU01ById = id => {
    return instance.get("muestras/u01/"+id);
}

const filtroMxU01 = (code, startDate, endDate) => {
    return instance.get(`muestras/u01/participantes/codigo/fechas`, { params: {
        codigoParticipante: code,
        strFecha1: startDate,
        strFecha2: endDate
    }})
}

const postMuestraU01 = (muestra) => {
    return instance.post("muestras/u01", muestra);
}

const putMuestraU01 = (muestra) => {
    return instance.put("muestras/u01", muestra);
}

const codigoLabUltimaMxUO1IngresadaPorCodigo = (codigo) => {
    return instance.get(`muestras/u01/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}


const muestraUO1ByCodLabScan = (codLabScan) => {
    return instance.get(`muestras/u01/cod_lab_scan`, { params: {
        codLabScan: codLabScan
    }});
}

const getMuestraU01ByIdMuestra = idMuestra => {
    return instance.get("muestras/u01/idMuestra/"+idMuestra);
}

/**Muestras Transmisión */
const getMuestrasTransmision = (idMx) => {
    return instance.get("muestras/transmision/fechaDelDia", {params: {
        idMx: idMx
    }});
}

/*const getMuestrasTransmision = (id) => {
    return instance.get("muestras/transmision", {params: {
        id: id
    }});
}*/

const getMuestrasTransmisionById = id => {
    return instance.get("muestras/transmision/"+id);
}

const filtroMxTransmision = (code, startDate, endDate, idMx) => {
    return instance.get(`muestras/transmision/participantes/codigo/fechas`, { params: {
        codigoParticipante: code,
        idMx: idMx,
        strFecha1: startDate,
        strFecha2: endDate
    }});
}

const postMuestraTransmision = (muestra) => {
    return instance.post("muestras/transmision", muestra);
}

const putMuestraTransmision = (muestra) => {
    return instance.put("muestras/transmision", muestra);
}

const codigoLabUltimaMxTransmisionPorCodigo = (codigo) => {
    return instance.get(`muestras/transmision/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const muestraTransmisionByCodLabScan = (codLabScan) => {
    return instance.get(`muestras/transmision/cod_lab_scan`, { params: {
        codLabScan: codLabScan
    }});
}

const getMuestraTransmisionByIdMuestra = idMuestra => {
    return instance.get("muestras/transmision/idMuestra/"+idMuestra);
}

/**Metodo para anular las muestras (Influenza, Dengue, BHC, etc) */
const anularMuestra = (muestra) => {
    return instance.put("muestras/anular", muestra);
}

/**Metodo para enviar las muestras (Influenza, Dengue, BHC, etc)*/
const enviarMuestras = (muestra) => {
    return instance.put("muestras/envio", muestra);
}

/**Metodo obtener todas las muestras tomadas (Influenza, Dengue, BHC, etc)*/
const getAllMuestrasTomadas = () => {
    return instance.get("muestras/cantidadMuestrasTomadas");
}

const getLastMuestrasTomadas = () => {
    return instance.get("muestras/ultimos-registros");
}

const mxByCodLabScan = (codLabScan) => {
    return instance.get(`muestras/codLabScan`, {
        params: {
            codLabScan: codLabScan
        }
    });
}

const mxByCodLab = (codLab) => {
    return instance.get(`muestras/codLab`, {
        params: {
            codLab: codLab
        }
    });
}

/* const getAllMxByCode = (valor) => {
    return instance.get(`muestras/codigoParticipante`, {
        params: {
            codigo: valor
        }
    });
} */

const getAllMxByCode = codigo => {
    return instance.get("muestras/codigoParticipante/"+codigo);
}

const getAllMxPBMCPendientesEnvio = () => {
    return instance.get("muestras/pbmc/pendientes/envio");
}

const getAllMxRojoPendientesEnvio = () => {
    return instance.get("muestras/rojo/pendientes/envio");
}

const getAllHisopadosPendientesEnvio = () => {
    return instance.get("muestras/hisopados/pendientes/envio");
}

const getMuestrasEnviadasDelDiaYEnvio = (viaje) => {
    return instance.get("muestras/enviadas/"+viaje);
}

/**----------------------------------- */
/**Muestras Dengue */
const getMuestrasDengue = () => {
    return instance.get("muestras/dengue/fechaDelDia");
}

const filtroMxDengue = (code, startDate, endDate, mxType) => {
    return instance.get(`muestras/dengue/participantes/codigo/fechas`, { params: {
        codigoParticipante: code,
        strFecha1: startDate,
        strFecha2: endDate,
        mxType: mxType
    }})
}

const getAllMxDengueRangoFecha = (startDate, endDate) => {
    return instance.get(`muestras/dengue/rango-fecha`, { params: {
        strFecha1: startDate,
        strFecha2: endDate
    }})
}

const postMuestraDengue = (muestra) => {
    return instance.post("muestras/dengue", muestra);
}

const putMuestraDengue = (muestra) => {
    return instance.put("muestras/dengue", muestra);
}

const getMuestraDengueById = id => {
    return instance.get("muestras/dengue/"+id);
}

const getMuestrasDengueRetomaYCompletarVol = () => {
    return instance.get("muestras/dengue/retoma/completarVolumen");
}

const getMuestraDengueByIdMuestra = idMuestra => {
    return instance.get("muestras/dengue/idMuestra/"+idMuestra);
}

/**Muestras pendientes de envio */
/* const muestrasPendientesDengue = (id) => {
    return instance.get(`muestras/dengue/pendientes/envio`, {
        params: {
            id: id
        }
    });
}

const muestrasPendientesTransmision = (id) => {
    return instance.get(`muestras/transmision/pendientes/envio`, {
        params: {
            id: id
        }
    });
}

const muestrasPendientesBHC = (id) => {
    return instance.get(`muestras/bhc/pendientes/envio`, {
        params: {
            id: id
        }
    });
}

const muestrasPendientesUO1 = (id) => {
    return instance.get(`muestras/u01/pendientes/envio`, {
        params: {
            id: id
        }
    });
} */

/* const muestrasEnviadasTransmision = (id, viaje, startDate, endDate) => {
    return instance.get(`muestras/transmision/enviadas`, {
        params: {
            id: id,
            viaje: viaje,
            startDate: startDate,
            endDate: endDate
        }
    });
}

const muestrasEnviadasBHC = (id, viaje, startDate, endDate) => {
    return instance.get(`muestras/bhc/enviadas`, {
        params: {
            id: id,
            viaje: viaje,
            startDate: startDate,
            endDate: endDate
        }
    });
}

const muestrasEnviadasUO1 = (id, viaje, startDate, endDate) => {
    return instance.get(`muestras/u01/enviadas`, {
        params: {
            id: id,
            viaje: viaje,
            startDate: startDate,
            endDate: endDate
        }
    });
} */

const muestrasPbmcEnviadasRangeDateAndViaje = (startDate, endDate, viaje) => {
    return instance.get(`muestras/enviadas/rangoFecha/viaje/pbmc`, {
        params: {
            startDate: startDate,
            endDate: endDate,
            viaje: viaje
        }
    });
}

const muestrasRojoEnviadasRangeDateAndViaje = (startDate, endDate, viaje) => {
    return instance.get(`muestras/enviadas/rangoFecha/viaje/rojo`, {
        params: {
            startDate: startDate,
            endDate: endDate,
            viaje: viaje
        }
    });
}

const muestrasHisopadosEnviadosRangeDateAndViaje = (startDate, endDate, viaje) => {
    return instance.get(`/muestras/enviadas/rangoFecha/viaje/hisopados`, {
        params: {
            startDate: startDate,
            endDate: endDate,
            viaje: viaje
        }
    });
}
/*const muestrasVacunasPendientesUO1 = (id) => {
    return instance.get(`muestras/u01/vacunas/pendientes/envio`);
}*/

/*const muestrasPendientesTransmisionMonitoreoIntensivoPbmc = () => {
    return instance.get(`muestras/transmision/monitoreo/intensivo/pbmc/pendientes/envio`);
}
const muestrasPendientesTransmisionMonitoreoIntensivoRojo = () => {
    return instance.get(`muestras/transmision/monitoreo/intensivo/rojo/pendientes/envio`);
}
const muestrasPendientesTransmisionCovidPbmc = () => {
    return instance.get(`muestras/transmision/covid/pbmc/pendientes/envio`);
}
const muestrasPendientesTransmisionCovidRojo = () => {
    return instance.get(`muestras/transmision/covid/rojo/pendientes/envio`);
}
const muestrasPendientesTransmisionHisopadosCovid = () => {
    return instance.get(`muestras/transmision/hisopados/covid/pendientes/envio`);
}
const muestrasPendientesTransmisionHisopadosMonitoreIntensivo = () => {
    return instance.get(`muestras/transmision/hisopado/monitoreo/intensivo/pendientes/envio`);
}*/

/* const muestrasPendientesInfluenza = (id) => {
    return instance.get(`/muestras/influenza/pendientes/envio`, { params: {
        id: id
    }});
} */

/** */
const verificarEnvioSeleccionado = (viaje) => {
    return instance.get(`muestras/existe/envio-seleccionado`, {
        params: {
            viaje: viaje
        }
    });
}

const muestrasDengueMetabolomicas = () => {
    return instance.get("muestras/dengue/metabolomicas");
}

const muestrasDengueBhc = () => {
    return instance.get("muestras/dengue/bhc");
}

const muestrasDenguePbmc = () => {
    return instance.get("muestras/dengue/pbmc");
}

const muestrasDenguePaxGene = () => {
    return instance.get("muestras/dengue/paxgene");
}

const muestrasDengueHematicas = () => {
    return instance.get("muestras/dengue/hematicas");
}

const codigoLabUltimaMxDengueMetabolomicaPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/metabolomica/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const codigoLabUltimaMxDengueBhcPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/bhc/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const codigoLabUltimaMxDenguePbmcPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/pbmc/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const codigoLabUltimaMxDenguePaxGenePorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/paxgene/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const codigoLabUltimaMxDengueHematicaPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/hematica/ultimo/code_lab`, { params: {
        codigo: codigo
    }});
}

const mxDengueMetabolomicaPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/metabolomica/ultima/muestra/codigoParticipante`, { params: {
        codigo: codigo
    }});
}

const mxDengueBhcPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/bhc/ultima/muestra/codigoParticipante`, { params: {
        codigo: codigo
    }});
}

const mxDenguePbmcPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/pbmc/ultima/muestra/codigoParticipante`, { params: {
        codigo: codigo
    }});
}

const mxDenguePaxGenePorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/paxgene/ultima/muestra/codigoParticipante`, { params: {
        codigo: codigo
    }});
}

const mxDengueHematicaPorCodigo = (codigo) => {
    return instance.get(`muestras/dengue/hematica/ultima/muestra/codigoParticipante`, { params: {
        codigo: codigo
    }});
}

const muestraDengueByCodLabScan = (codLabScan) => {
    return instance.get(`muestras/dengue/cod_lab_scan`, { params: {
        codLabScan: codLabScan
    }});
}

const muestraDengueCandidatos = () => {
    return instance.get("muestras/dengue/candidatos");
}

/**Dengue Detalle */
const postMuestraDengueDetalle = (id, dengueDetalle) => {
    return instance.post("muestras/dengue/detalle/"+id, dengueDetalle);
}

/**----------------------------------- */

const getMuestrasPorEstudios = () => {
    return instance.get("muestras/por_estudios");
}

const api = {
    getParticipanteByCode,
    getCountMuestrasByCodigoParticipanteYCatMuestraId,
    postMuestraInfluenza,
    putMuestraInfluenza,
    getMuestrasInfluenza,
    anularMuestra,
    filtroMxInfluenza,
    getMuestraInfluenzaById,
    getUltimoRegistroMuestraInfluenza,
    getMuestrasU01,
    filtroMxU01,
    postMuestraU01,
    putMuestraU01,
    getMustraU01ById,

    getMuestraU01ByIdMuestra,
    getMuestraBHCByIdMuestra,
    getMuestraDengueByIdMuestra,
    getMuestraInfluenzaByIdMuestra,
    getMuestraTransmisionByIdMuestra,

    getMuestrasTransmision,
    getMuestrasTransmisionById,
    filtroMxTransmision,
    postMuestraTransmision,
    putMuestraTransmision,
    getMuestrasBhc,
    filtroMxBhc,
    postMuestraBhc,
    putMuestraBhc,
    muestrasBhcById,
    getMuestrasDengue,
    filtroMxDengue,
    getAllMxDengueRangoFecha,
    postMuestraDengue,
    putMuestraDengue,
    getMuestraDengueById,
    /** 
    muestrasPendientesTransmision,
    muestrasPendientesInfluenza,
    muestrasPendientesBHC,
    muestrasPendientesUO1,
    //muestrasVacunasPendientesUO1,
    muestrasPendientesDengue,*/
    /*muestrasPendientesTransmisionMonitoreoIntensivoPbmc,
    muestrasPendientesTransmisionMonitoreoIntensivoRojo,
    muestrasPendientesTransmisionCovidPbmc,
    muestrasPendientesTransmisionCovidRojo,
    muestrasPendientesTransmisionHisopadosCovid,
    muestrasPendientesTransmisionHisopadosMonitoreIntensivo,
    muestrasEnviadasTransmision,
    muestrasEnviadasUO1,
    muestrasEnviadasBHC,*/
    /** */
    muestrasDengueMetabolomicas,
    muestrasDengueBhc,
    muestrasDenguePbmc,
    muestrasDenguePaxGene,
    muestrasDengueHematicas,
    enviarMuestras,
    getAllMuestrasTomadas,
    getLastMuestrasTomadas,
    getEstudios,
    getEstudiosByCodigo,
    getMuestrasPorEstudios,
    codigoLabUltimaMxUO1IngresadaPorCodigo,
    codigoLabUltimaMxTransmisionPorCodigo,
    codigoLabUltimaMxBHCPorCodigo,
    codigoLabUltimaMxInfluenzaPorCodigo,
    codigoLabUltimaMxDengueMetabolomicaPorCodigo,
    codigoLabUltimaMxDengueBhcPorCodigo,
    codigoLabUltimaMxDenguePbmcPorCodigo,
    codigoLabUltimaMxDenguePaxGenePorCodigo,
    codigoLabUltimaMxDengueHematicaPorCodigo,
    mxDengueMetabolomicaPorCodigo,
    mxDengueBhcPorCodigo,
    mxDengueHematicaPorCodigo,
    mxDenguePaxGenePorCodigo,
    mxDenguePbmcPorCodigo,
    muestraBHCByCodLabScan,
    muestraInfluenzaByCodLabScan,
    muestraUO1ByCodLabScan,
    muestraTransmisionByCodLabScan,
    muestraDengueByCodLabScan,
    mxByCodLabScan,
    mxByCodLab,
    muestraDengueCandidatos,
    postMuestraDengueDetalle,
    verificarEnvioSeleccionado,
    getMuestrasDengueRetomaYCompletarVol,
    getMuestrasInfluenzaRetoma,
    getAllMxByCode,
    getAllMxPBMCPendientesEnvio,
    getAllMxRojoPendientesEnvio,
    getAllHisopadosPendientesEnvio,
    getMuestrasEnviadasDelDiaYEnvio,
    muestrasPbmcEnviadasRangeDateAndViaje,
    muestrasRojoEnviadasRangeDateAndViaje,
    muestrasHisopadosEnviadosRangeDateAndViaje
};

export default api;
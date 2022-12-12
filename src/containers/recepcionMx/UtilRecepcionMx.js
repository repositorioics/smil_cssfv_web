import DataServices from '../../service/Api';

const getMxByIdMuestra = async (idMuestra, param) => {
    let response = {};
    switch (param) {
        case 'Influenza':
            response = await DataServices.getMuestraInfluenzaByIdMuestra(idMuestra);
            return response;
        case 'Dengue':
            response = await DataServices.getMuestraDengueByIdMuestra(idMuestra);
            return response;
        case 'BHC':
            response = await DataServices.getMuestraBHCByIdMuestra(idMuestra);
            return response;
        case 'U01':
            response = await DataServices.getMuestraU01ByIdMuestra(idMuestra);
            return response;
        case 'Transmision':
            response = await DataServices.getMuestraTransmisionByIdMuestra(idMuestra);
            return response;
        default:
            return 'Error';
    }
}

const UtilRecepcionMx = {
    getMxByIdMuestra
}

export default UtilRecepcionMx;
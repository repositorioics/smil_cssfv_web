import moment from "moment";
import DataServices from '../service/Api';
/**Metodo para obtener la edad*/
/* const obtenerEdad = (fechaNac) => {
    let a = moment();
    let b = moment(fechaNac, 'DD-MM-YYYY');
    let age = moment.duration(a.diff(b));
    let years = age.years();
    let months = age.months();
    let days = age.days();
    obtenerEdad2(b);
    return `${years} Años | ${months} Meses | ${days} Días`;
} */

const obtenerEdad = (fechaNac) => {
    let today = new Date();
    let b = moment(fechaNac, 'DD-MM-YYYY');
    let dob = new Date(b);
    //difference in milliseconds
    let diff = today.getTime() - dob.getTime();
    //convert milliseconds into years
    let years = Math.floor(diff / 31556736000);
    //1 day has 86400000 milliseconds
    let days_diff = Math.floor((diff % 31556736000) / 86400000);
    //1 month has 30.4167 days
    let months = Math.floor(days_diff / 30.4167);
    let days = Math.floor(days_diff % 30.4167);

    const result = {
        years: years,
        months: months,
        days: days
    };

    //return `${years} Años | ${months} Meses | ${days} Días`;
    return result;
}

/**Metodo para verificar que las fechas no sean mayor a la fecha del día */
const validateDate = (date) => {
    const selectedDate = moment(date, 'YYYY-MM-DD');
    const currentDate = moment(new Date(), 'YYYY-MM-DD');
    return selectedDate.isAfter(currentDate, 'days');
}

/**Metodo para verificar que la fecha de inico no sea mayor que la fecha fin */
const validateStartDateEndDate = (startDate, endDate) => {
    const selectedStartDate = moment(startDate, 'YYYY-MM-DD');
    const selectedEndDate = moment(endDate, 'YYYY-MM-DD');
    return selectedStartDate.isAfter(selectedEndDate, 'days');
}

/**Metodo para calcular la diferencia entre dos fechas */
const CalculateDifferenceDates = (date1, date2) => {
    const startDate = moment(date1, 'DD-MM-YYYY');
    const endDate = moment(date2, 'DD-MM-YYYY');
    return endDate.diff(startDate, 'days');
}

/**Metodo para crear codigos lab scan */
const createCodLabScan = (fif, fechaToma, codLab) => {
    let barCodeFif = '';
    let barCodeFechaToma = '';
    let barCodeSpace = '  ';
    if (fif === null || fif === undefined || fif === '') {
        barCodeFif = '10/10/3000'
    } else {
        const now = new moment(fif);
        barCodeFif = now.format("DD/MM/YYYY");
    }
    if (fechaToma !== null || fechaToma !== undefined || fechaToma !== '') {
        const now = new moment(fechaToma);
        barCodeFechaToma = now.format("DD/MM/YYYY");
    }
    //console.log('cod', `${barCodeFif}${barCodeFechaToma}${barCodeSpace}${codLab}`);
    return `${barCodeFif}${barCodeFechaToma}${barCodeSpace}${codLab}`;
}

/**Metodo para generar el consecutivo segun la letra de la A-Z*/
const nextString = (str) => {
    if (!str)
        return 'A'  // return 'A' if str is empty or null

    let tail = ''
    let i = str.length - 1
    let char = str[i]
    // find the index of the first character from the right that is not a 'Z'
    while (char === 'Z' && i > 0) {
        i--
        char = str[i]
        tail = 'A' + tail   // tail contains a string of 'A'
    }
    if (char === 'Z') // the string was made only of 'Z'
        return 'AA' + tail
    // increment the character that was not a 'Z'
    return str.slice(0, i) + String.fromCharCode(char.charCodeAt(0) + 1) + tail
}

const obtenerConsecutivo = (valor) => {
    let resultado = '';
    if (valor === '') {
        resultado = '01';
    } else {
        if (valor <= 8) {
            resultado = `${'0'}${parseInt(valor) + 1}`;
        } else {
            resultado = `${parseInt(valor) + 1}`;
        }
    }
    return resultado;
}

const obtenerMuestraByCodLabScan = async (valor, codLabScan) => {
    let resultado = '';
    if (valor === 'Dengue') {
        const response = await DataServices.muestraDengueByCodLabScan(codLabScan);
        if (response.status === 200) {
            if (response.data !== '') {
                resultado = response.data;
            }
        }
    } else if (valor === 'Bhc') {
        const response = await DataServices.muestraBHCByCodLabScan(codLabScan);
        if (response.status === 200) {
            if (response.data !== '') {
                resultado = response.data;
            }
        }
    } else if (valor === 'Influenza') {
        const response = await DataServices.muestraInfluenzaByCodLabScan(codLabScan);
        if (response.status === 200) {
            if (response.data !== '') {
                resultado = response.data;
            }
        }
    } else if (valor === 'UO1') {
        const response = await DataServices.muestraUO1ByCodLabScan(codLabScan);
        if (response.status === 200) {
            if (response.data !== '') {
                resultado = response.data;
            }
        }
    } else if (valor === 'Transmision') {
        const response = await DataServices.muestraTransmisionByCodLabScan(codLabScan);
        if (response.status === 200) {
            if (response.data !== '') {
                resultado = response.data;
            }
        }
    } else {
        resultado = '';
    }
    return resultado;
}

const viewTextToSaveData = (codLabScan) => {
    let result = '';
    const isMxBHC = codLabScan.includes('BHC');
    const isTransLN = codLabScan.includes('TL1') || codLabScan.includes('TL2');

    const isTransResp = codLabScan.includes('TR1') || codLabScan.includes('TR2') ||
        codLabScan.includes('TR3') || codLabScan.includes('TR4') || codLabScan.includes('TR5')
        || codLabScan.includes('TR6');

    const isTransSerologia = codLabScan.includes('TRI') || codLabScan.includes('TRF') ||
        codLabScan.includes('TPI') || codLabScan.includes('TPF');

    const isCVInfluenza = codLabScan.includes('IPI') || codLabScan.includes('IPF') ||
        codLabScan.includes('IRI') || codLabScan.includes('IRF');

    const isCVUO1 = codLabScan.includes('CPI') || codLabScan.includes('CPF') ||
        codLabScan.includes('CRI') || codLabScan.includes('CRF');

    const isCHFMxResp = codLabScan.includes('SR1') || codLabScan.includes('SR2') ||
        codLabScan.includes('SR3') || codLabScan.includes('SR4') || codLabScan.includes('SR5')
        || codLabScan.includes('SR6');

    const isCHFMxSerologia = codLabScan.includes('SPI') || codLabScan.includes('SPF') ||
        codLabScan.includes('SRI') || codLabScan.includes('SRF');

    const isPostivoInfluenzaUO1 = codLabScan.includes('UPI') || codLabScan.includes('UPF') ||
        codLabScan.includes('URI') || codLabScan.includes('URF');

    const isPostInfluenzaUO1PrePostVacuna = codLabScan.includes('VPI') || codLabScan.includes('VPF') ||
        codLabScan.includes('VRI') || codLabScan.includes('VRF');

    if (isMxBHC) {
        result =  'BHC';
    }

    if (isTransLN) {
        result = 'TransmisionLN'
    }

    if (isTransResp || isCHFMxResp) {
        result = 'TransmisionResp';
    }

    if (isTransSerologia || isCHFMxSerologia || isCVInfluenza) {
        result = 'TransmisionSero';
    }

    if (isCVUO1 || isPostivoInfluenzaUO1 || isPostInfluenzaUO1PrePostVacuna) {
        result = 'U01';
    }

    if (!isMxBHC && !isTransLN && !isTransResp && !isCHFMxResp &&
        !isTransSerologia && !isCHFMxSerologia && !isCVInfluenza &&
        !isCVUO1 && !isPostivoInfluenzaUO1 && !isPostInfluenzaUO1PrePostVacuna) {
        result = 'Influenza';
    }
    return result;
}

const utils = {
    obtenerEdad,
    validateDate,
    validateStartDateEndDate,
    CalculateDifferenceDates,
    createCodLabScan,
    nextString,
    obtenerConsecutivo,
    obtenerMuestraByCodLabScan,
    viewTextToSaveData
}

export default utils;

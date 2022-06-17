import moment from "moment";
/**Metodo para obtener la edad */
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
    console.log('cod', `${barCodeFif}${barCodeFechaToma}${barCodeSpace}${codLab}`);
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
            resultado = `${'0'}${parseInt(valor)+1}`;
        } else {
            resultado = `${parseInt(valor)+1}`;
        }
    }
    return resultado;
}

const utils = {
    obtenerEdad,
    validateDate,
    validateStartDateEndDate,
    CalculateDifferenceDates,
    createCodLabScan,
    nextString,
    obtenerConsecutivo
}

export default utils;

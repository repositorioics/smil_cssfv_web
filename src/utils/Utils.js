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

    return `${years} Años | ${months} Meses | ${days} Días`;
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

const utils = {
    obtenerEdad,
    validateDate,
    validateStartDateEndDate,
    CalculateDifferenceDates
}

export default utils;

import DataServices from '../../service/Api';
import moment from 'moment';
import utils from '../../utils/Utils';
const obtenerUltimoCodigoLabMxDengue = async (valor, codigo) => {
    let result = '';
    if (valor !== null && valor !== '' && valor !== undefined) {

        if (valor.trim() === 'metabolomica') {
            const response = await DataServices.codigoLabUltimaMxDengueMetabolomicaPorCodigo(codigo);
            if (response.status === 200) {
                if (response.data !== '') {
                    if (response.data !== '') {
                        const arr = response.data.split('.')
                        result = arr;
                    }
                }
            }
        } else if (valor.trim() === 'bhc') {
            const response = await DataServices.codigoLabUltimaMxDengueBhcPorCodigo(codigo);
            if (response.status === 200) {
                if (response.data !== '') {
                    if (response.data !== '') {
                        const arr = response.data.split('.')
                        result = arr;
                    }
                }
            }
        } else if (valor.trim() === 'paxgene') {
            const response = await DataServices.codigoLabUltimaMxDenguePaxGenePorCodigo(codigo);
            if (response.status === 200) {
                if (response.data !== '') {
                    if (response.data !== '') {
                        const arr = response.data.split('.')
                        result = arr;
                    }
                }
            }
        } else if (valor.trim() === 'pbmc') {
            const response = await DataServices.codigoLabUltimaMxDenguePbmcPorCodigo(codigo);
            if (response.status === 200) {
                if (response.data !== '') {
                    if (response.data !== '') {
                        const arr = response.data.split('.')
                        result = arr;
                    }
                }
            }
        } else if (valor.trim() === 'dengue') { //Hematica
            const response = await DataServices.codigoLabUltimaMxDengueHematicaPorCodigo(codigo);
            if (response.status === 200) {
                if (response.data !== '') {
                    if (response.data !== '') {
                        const arr = response.data.split('.')
                        result = arr;
                    }
                }
            }
        } else {
            result = '';
        }
    }
    return result;
}

const generarCodigoLabScan = (consulta, fif, fechaToma, categoria, code, positvoZika, type,
    lastAnioEstudio, lastCodeLab, orina, saliva, lastRecordMxDengue) => {

    let resultadoCodLab = '';
    let valorConsulta = '';
    let valorFif = '';
    let valorFechaToma = '';
    let valorCategoria = '';
    let anioEstudio = '';
    let str = '';
    let nVecesEnfermo = '';
    let diffDay = '';
    if (lastCodeLab !== '' && lastCodeLab !== null && lastCodeLab !== undefined) {
        if (lastRecordMxDengue.consultaId.consulta === 'I') {
            nVecesEnfermo = lastCodeLab[2];
        } else {
            str = lastCodeLab[2];
            nVecesEnfermo = utils.nextString(str);
        }
    } else {
        nVecesEnfermo = utils.nextString(str);
    }

    if (lastAnioEstudio !== null) {
        anioEstudio = lastAnioEstudio.anio
    }

    if (consulta === 1) {
        valorConsulta = 'I';
    }
    if (consulta === 2) {
        valorConsulta = 'C';
    }
    if (categoria === 1) {
        valorCategoria = 'A';
    }
    if (categoria === 2) {
        valorCategoria = 'B';
    }
    if (categoria === 3) {
        valorCategoria = 'C';
    }
    if (categoria === 4) {
        valorCategoria = 'D';
    }
    if (fif !== null) {
        const dateFif = new moment(fif);
        const newDateFif = dateFif.format("DD/MM/YYYY");
        valorFif = newDateFif;
    } else {
        valorFif = '10/10/3000'
    }
    const dateFtoma = moment(fechaToma);
    let newDateFechaToma = dateFtoma.format("DD/MM/YYYY");
    valorFechaToma = newDateFechaToma;
    if (valorFif !== '10/10/3000') {
        diffDay = utils.CalculateDifferenceDates(fif, new Date());
        console.log('diffDay', diffDay);
    }
    
    if (type === 'dengue') {
        if (valorConsulta === 'I') {
            resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.1'}`;
        }
        if (valorConsulta === 'C') {
            resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.2'}`;
        }
    }
    if (type === 'metabolomica') {
        if (diffDay !== '') {
            if (diffDay <= 7) {
                if (orina) {
                    if (positvoZika) {
                        resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.5Z1'}`;
                    } else {
                        resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.5'}`;
                    }
                }
                if (saliva) {
                    if (positvoZika) {
                        resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.6Z1'}`;
                    } else {
                        resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.6'}`;
                    }
                }
            } else {
                if (orina) {
                    resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.5Z2'}`;
                }
                if (saliva) {
                    resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.6Z2'}`;
                }
            }
        }
    }
    if (type === 'bhc') {
        if (diffDay !== '') {
            if (diffDay <= 7) {
                resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.1BH'}`;
            } else {
                resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.2BH'}`;
            }
        }
    }
    if (type === 'paxgene') {
        if (diffDay !== '') {
            if (diffDay <= 7) {
                if (positvoZika) {
                    resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.8q1'}`;
                } else {
                    resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.8q5'}`;
                }
            } else {
                resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.8q3'}`;
            }
        }
    }
    if (type === 'pbmc') {
        resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'7'}`;
    }

    return resultadoCodLab;
}

const validateMetabolomica = (orina, saliva) => {
    const result = {
        valor: false,
        mensaje: ''
    };
    if (orina === false && saliva === false) {
        result.valor = true;
        result.mensaje = 'Debe indicar si la muestra es Orina o Saliva';
    }
    return result;

}
const validatePbmc = (categoria, fis, fechaToma) => {
    const ftoma = moment(fechaToma, 'YYYY-MM-DD');
    const fFis = moment(fis, 'YYYY-MM-DD');
    const result = {
        valor: false,
        mensaje: ''
    };
    if (fFis.isAfter(ftoma, 'days')) {
        result.valor = true;
        result.mensaje = 'FIS no puede ser mayor que a fecha de toma de muestra';
    }
    return result;
}
const validateBhc = () => { }
const validatePaxgene = () => { }

const MxDengueUtils = {
    obtenerUltimoCodigoLabMxDengue,
    generarCodigoLabScan,
    validateMetabolomica
}

export default MxDengueUtils;
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

const generarCodigoLabScanDengue = (selectedConsulta, fif, fechaToma, selectedCategoria, code, positvoZika, type,
    lastAnioEstudio, lastCodeLab, orina, saliva, lastRecordMxDengue) => {
    let result = {
        error: '',
        mensajeError: '',
        resultado: '',
        resultado2: ''
    }
    let resultadoCodLab = '';
    let resultadoCodLabScan = '';
    //let resultadoCodLab2 = '';
    //let resultadoCodLabScan2 = '';
    let str = '';
    let nVecesEnfermo = '';
    let valorConsulta = '';
    let valorFif = '';
    let valorFechaToma = '';
    let valorCategoria = '';
    let anioEstudio = '';
    let diffDay = '';

    if (lastAnioEstudio !== null) {
        anioEstudio = lastAnioEstudio.anio
    }
    if (selectedConsulta === 1) {
        valorConsulta = 'I';
    }
    if (selectedConsulta === 2) {
        valorConsulta = 'C';
    }
    if (selectedCategoria === 1) {
        valorCategoria = 'A';
    }
    if (selectedCategoria === 2) {
        valorCategoria = 'B';
    }
    if (selectedCategoria === 3) {
        valorCategoria = 'C';
    }
    if (selectedCategoria === 4) {
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

    if (lastRecordMxDengue.muestraId.fif) {
        let dateVar = moment(lastRecordMxDengue.muestraId.fif).local().toDate();  //FIF
        diffDay = utils.CalculateDifferenceDates(dateVar, new Date());
    } else if (lastRecordMxDengue.muestraId.fis) {
        let dateVar = moment(lastRecordMxDengue.muestraId.fis).local().toDate();  //FIS
        diffDay = utils.CalculateDifferenceDates(dateVar, new Date());
    } else {
        let dateVar = moment(lastRecordMxDengue.muestraId.fechaToma).local().toDate();  //FECHA TOMA
        diffDay = utils.CalculateDifferenceDates(dateVar, new Date());
    }
    /**Si lastRecordMxDengue es vacio indica que es una nueva muestra */
    if (Object.keys(lastRecordMxDengue).length === 0) {
        /**Nuevo evento Incia con la letra A str = ''*/
        nVecesEnfermo = utils.nextString(str);
        if (type === 'dengue') {
            if (valorCategoria === 'A' || valorCategoria === 'B' || valorCategoria === 'D') {
                if (valorConsulta === 'C') {
                    resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.2'}`;
                    resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'2'}`;
                    result.error = '';
                    result.mensajeError = '';
                    result.resultado = resultadoCodLabScan;
                    result.resultado2 = resultadoCodLab;
                    return result;
                } else {
                    resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.1'}`;
                    resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'1'}`;
                    result.error = '';
                    result.mensajeError = '';
                    result.resultado = resultadoCodLabScan;
                    result.resultado2 = resultadoCodLab;
                    return result;
                }
            } else {
                if (valorConsulta === 'C') {
                    resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${'C'}${nVecesEnfermo}${'.2'}`;
                    resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${'C'}${nVecesEnfermo}${'.2'}`;
                    result.error = '';
                    result.mensajeError = '';
                    result.resultado = resultadoCodLabScan;
                    result.resultado2 = resultadoCodLab;
                    return result;
                } else {
                    resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${'C'}${nVecesEnfermo}${'.1'}`;
                    resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${'C'}${nVecesEnfermo}${'.1'}`;
                    result.error = '';
                    result.mensajeError = '';
                    result.resultado = resultadoCodLabScan;
                    result.resultado2 = resultadoCodLab;
                    return result;
                }
            }
        }
    } else {
        if (lastRecordMxDengue.consultaId.consulta === 'I' && valorConsulta === 'I' && type === 'dengue') {
            result.error = 'Error';
            result.mensajeError = 'La consulta tiene que ser convaleciente';
            result.resultado = '';
            return result;
        }
        if (lastRecordMxDengue.consultaId.consulta === 'C' && valorConsulta === 'C' && type === 'dengue') {
            result.error = 'Error';
            result.mensajeError = 'La consulta tiene que ser Inicial';
            result.resultado = '';
            return result;
        }

        if (valorConsulta === 'C') { /**Si es consulta convaleciente se mantiene el evento */
            nVecesEnfermo = lastCodeLab[2];
        } else { /**Sigue el consecutivo del evento anterior */
            if (type === 'dengue') {
                str = lastCodeLab[2];
                nVecesEnfermo = utils.nextString(str);
            } else {
                nVecesEnfermo = lastCodeLab[2];
            }
        }
        if (type === 'dengue') {
            if (valorCategoria === 'A' || valorCategoria === 'B' || valorCategoria === 'D') {
                if (diffDay <= 14 && valorConsulta === 'C') {
                    result.error = 'Error';
                    result.mensajeError = `${'No se puede tomar muestra convaleciente '}${'han pasado '}${diffDay}${' dias de su muestra incial'}`;
                    result.resultado = '';
                    return result;
                }
                if (valorConsulta === 'C') {
                    resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.2'}`;
                    resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'2'}`;
                    result.error = '';
                    result.mensajeError = '';
                    result.resultado = resultadoCodLabScan;
                    result.resultado2 = resultadoCodLab;
                    return result;
                } else {
                    resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.1'}`;
                    resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'1'}`;
                    result.error = '';
                    result.mensajeError = '';
                    result.resultado = resultadoCodLabScan;
                    result.resultado2 = resultadoCodLab;
                    return result;
                }
            } else {
                if (valorConsulta === 'C') {
                    resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${'C'}${nVecesEnfermo}${'.2'}`;
                    resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${'C'}${nVecesEnfermo}${'.2'}`;
                    result.error = '';
                    result.mensajeError = '';
                    result.resultado = resultadoCodLabScan;
                    result.resultado2 = resultadoCodLab;
                    return result;
                } else {
                    resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${'C'}${nVecesEnfermo}${'.1'}`;
                    resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${'C'}${nVecesEnfermo}${'.1'}`;
                    result.error = '';
                    result.mensajeError = '';
                    result.resultado = resultadoCodLabScan;
                    result.resultado2 = resultadoCodLab;
                    return result;
                }
            }
        }
        if (type === 'metabolomica') {
            if (valorCategoria === 'A' || valorCategoria === 'B' || valorCategoria === 'D') {
                if (valorConsulta === 'C') {
                    if (diffDay <= 7) {
                        if (orina) {
                            if (positvoZika) {
                                resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.5Z2'}`;
                                resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'5Z2'}`;
                                result.error = '';
                                result.mensajeError = '';
                                result.resultado = resultadoCodLabScan;
                                result.resultado2 = resultadoCodLab;
                                return result;
                            }
                        }
                        if (saliva) {
                            if (positvoZika) {
                                resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.6Z2'}`;
                                resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'6Z2'}`;
                                result.error = '';
                                result.mensajeError = '';
                                result.resultado = resultadoCodLabScan;
                                result.resultado2 = resultadoCodLab;
                                return result;
                            }
                        }
                    } else {
                        if (orina) {
                            if (positvoZika) {
                                resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.5Z2'}`;
                                resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'5Z2'}`;
                                result.error = '';
                                result.mensajeError = '';
                                result.resultado = resultadoCodLabScan;
                                result.resultado2 = resultadoCodLab;
                                return result;
                            }
                        }
                        if (saliva) {
                            if (positvoZika) {
                                resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.6Z2'}`;
                                resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'6Z2'}`;
                                result.error = '';
                                result.mensajeError = '';
                                result.resultado = resultadoCodLabScan;
                                result.resultado2 = resultadoCodLab;
                                return result
                            }
                        }
                    }
                } else {
                    if (orina) {
                        if (positvoZika) {
                            resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.5Z1'}`;
                            resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'5Z1'}`;
                            result.error = '';
                            result.mensajeError = '';
                            result.resultado = resultadoCodLabScan;
                            result.resultado2 = resultadoCodLab;
                            return result;
                        } else {
                            resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.5'}`;
                            resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'5'}`;
                            result.error = '';
                            result.mensajeError = '';
                            result.resultado = resultadoCodLabScan;
                            result.resultado2 = resultadoCodLab;
                            return result;
                        }
                    }
                    if (saliva) {
                        if (positvoZika) {
                            resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.6Z1'}`;
                            resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'6Z1'}`;
                            result.error = '';
                            result.mensajeError = '';
                            result.resultado = resultadoCodLabScan;
                            result.resultado2 = resultadoCodLab;
                            return result;
                        } else {
                            resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.6'}`;
                            resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'6'}`;
                            result.error = '';
                            result.mensajeError = '';
                            result.resultado = resultadoCodLabScan;
                            result.resultado2 = resultadoCodLab;
                            return result;
                        }
                    }
                }
            } else {
                result.error = 'Error';
                result.mensajeError = 'No se puede tomar muestra para categoria C';
                result.resultado = '';
                return result;
            }
        }
        if (type === 'bhc') {
            if (valorCategoria === 'A' || valorCategoria === 'B' || valorCategoria === 'D') {
                if (valorConsulta === 'C') {
                    if (diffDay <= 7) {
                        resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.2BH'}`;
                        resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'2BH'}`;
                        result.error = '';
                        result.mensajeError = '';
                        result.resultado = resultadoCodLabScan;
                        result.resultado2 = resultadoCodLab;
                        return result;
                    } else {
                        resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.2BH'}`;
                        resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'2BH'}`;
                        result.error = '';
                        result.mensajeError = '';
                        result.resultado = resultadoCodLabScan;
                        result.resultado2 = resultadoCodLab;
                        return result;
                    }
                } else {
                    resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.1BH'}`;
                    resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'1BH'}`;
                    result.error = '';
                    result.mensajeError = '';
                    result.resultado = resultadoCodLabScan;
                    result.resultado2 = resultadoCodLab;
                    return result;
                }
            } else {
                result.error = 'Error';
                result.mensajeError = 'No se puede tomar muestra para categoria C';
                result.resultado = '';
                return result;
            }
        }
        if (type === 'paxgene') {
            if (valorCategoria === 'A' || valorCategoria === 'B' || valorCategoria === 'D') {
                if (valorConsulta === 'C') {
                    if (diffDay <= 7) {
                        if (positvoZika) {
                            resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.8q1'}`;
                            resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'8q1'}`;
                            result.error = '';
                            result.mensajeError = '';
                            result.resultado = resultadoCodLabScan;
                            result.resultado2 = resultadoCodLab;
                            return result;
                        } else {
                            resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.8q5'}`;
                            resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'8q5'}`;
                            result.error = '';
                            result.mensajeError = '';
                            result.resultado = resultadoCodLabScan;
                            result.resultado2 = resultadoCodLab;
                            return result;
                        }
                    } else {
                        resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.8q3'}`;
                        resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'8q3'}`;
                        result.error = '';
                        result.mensajeError = '';
                        result.resultado = resultadoCodLabScan;
                        result.resultado2 = resultadoCodLab;
                        return result;
                    }
                } else {
                    if (diffDay <= 7) {
                        if (positvoZika) {
                            resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.8q1'}`;
                            resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'8q1'}`;
                            result.error = '';
                            result.mensajeError = '';
                            result.resultado = resultadoCodLabScan;
                            result.resultado2 = resultadoCodLab;
                            return result;
                        } else {
                            resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.8q5'}`;
                            resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'8q5'}`;
                            result.error = '';
                            result.mensajeError = '';
                            result.resultado = resultadoCodLabScan;
                            result.resultado2 = resultadoCodLab;
                            return result;
                        }
                    } else {
                        resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.8q3'}`;
                        resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'8q3'}`;
                        result.error = '';
                        result.mensajeError = '';
                        result.resultado = resultadoCodLabScan;
                        result.resultado2 = resultadoCodLab;
                        return result;
                    }
                }
            } else {
                result.error = 'Error';
                result.mensajeError = 'No se puede tomar muestra para categoria C';
                result.resultado = '';
                return result;
            }
        }
        if (type === 'pbmc') {
            if (valorCategoria === 'A' || valorCategoria === 'B' || valorCategoria === 'D') {
                resultadoCodLabScan = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'7'}`;
                resultadoCodLab = `${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'7'}`;
                result.error = '';
                result.mensajeError = '';
                result.resultado = resultadoCodLabScan;
                result.resultado2 = resultadoCodLab;
                return result;
            } else {
                result.error = 'Error';
                result.mensajeError = 'No se puede tomar muestra para categoria C';
                result.resultado = '';
                return result;
            }
        }
    }


}

/* const generarCodigoLabScanDengue = (consulta, fif, fechaToma, categoria, code, positvoZika, type,
    lastAnioEstudio, lastCodeLab, orina, saliva, lastRecordMxDengue) => {
    let resultadoCodLab = '';
    let valorConsulta = '';
    let valorFif = '';
    let valorFechaToma = '';
    let valorCategoria = '';
    let anioEstudio = '';
    //let str = '';
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
()
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
    //if (valorFif !== '10/10/3000') {
    diffDay = utils.CalculateDifferenceDates(lastRecordMxDengue.fechaToma, new Date());
        //console.log('diffDay', diffDay);
    //}
    
    
    if (type === 'metabolomica') {
        if (valorCategoria === 'A' || valorCategoria === 'B' || valorCategoria === 'D') {
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
    }
    if (type === 'bhc') {
        if (valorCategoria === 'A' || valorCategoria === 'B' || valorCategoria === 'D') {
            if (diffDay !== '') {
                if (diffDay <= 7) {
                    resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.1BH'}`;
                } else {
                    resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.2BH'}`;
                }
            }
        }
    }
    if (type === 'paxgene') {
        if (valorCategoria === 'A' || valorCategoria === 'B' || valorCategoria === 'D') {
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
    }
    if (type === 'pbmc') {
        if (valorCategoria === 'A' || valorCategoria === 'B' || valorCategoria === 'D') {
            resultadoCodLab = `${valorConsulta}${valorFif}${valorFechaToma}${valorCategoria}${code}${'.'}${anioEstudio}${'.'}${nVecesEnfermo}${'.'}${'7'}`;
        }
    }
    return resultadoCodLab;
}*/

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

/*const validatePbmc = (categoria, fis, fechaToma) => {
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
const validatePaxgene = () => { }*/

const MxDengueUtils = {
    obtenerUltimoCodigoLabMxDengue,
    generarCodigoLabScanDengue,
    //codLabScanDengue,
    validateMetabolomica
}

export default MxDengueUtils;
import axios from 'axios';
import * as Constants from '../../Constants';
import moment from 'moment';

const imprimirCodigo = (fif, fechaToma, name, codLab, cantidadCopiasCod, formatoCodigo) => {
    let closePopup = false;
    let barCode = '';
    let barCodeFif = '';
    let barCodeFechaToma = '';
    let barCodeSpace = '  ';
    let especialCharacter = '*';
    let lettersOfTheName = "";
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
    let matches = name.match(/\b(\w)/g);
    for (let i = 0; i < matches.length; i++) {
        if (matches.length === 4) {
            if (lettersOfTheName.length === 2) {
                const newString = lettersOfTheName + "-";
                lettersOfTheName = newString;
            }
        }
        if (matches.length === 3) {
            if (lettersOfTheName.length === 1) {
                const newString = lettersOfTheName + "-";
                lettersOfTheName = newString;
            }
        }
        lettersOfTheName += matches[i];
    }

    barCode = barCodeFif + barCodeFechaToma + barCodeSpace + especialCharacter + codLab + especialCharacter + lettersOfTheName + especialCharacter + cantidadCopiasCod + especialCharacter + formatoCodigo;
    console.log('barCode', barCode);
    //console.log('matches', matches);
    //console.log('lettersOfTheName', lettersOfTheName);
    //console.log('barCode', barCode);
    axios.post(Constants.URL_PRINT_CODES + barCode)
        .then((response) => {
            //console.log('response', response);
            //setOpenFormatoCodigos(false);
            return closePopup;
        }, (error) => {
            //console.log('error', error);
            //setOpenFormatoCodigos(false);
            return closePopup;
        });
}

const ImprimirCodigos = {
    imprimirCodigo
}

export default ImprimirCodigos;
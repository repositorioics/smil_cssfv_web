import axios from 'axios';

//const url = 'http://localhost:13001/print?barcodes=';

const instance = axios.create({
    //baseURL: url,
     headers: {
        "Accept": "*/*",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Methods": "*",
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});

const printCodeMxInfluenza = code => {
    return instance.get('http://localhost:13001/print?barcodes='+code);
}

const apiPrintCode = {
    printCodeMxInfluenza
};

export default apiPrintCode;
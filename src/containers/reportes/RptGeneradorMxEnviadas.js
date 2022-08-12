import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import 'moment/locale/es';

const GeneratePDFMxEnviadas = (rptTitle, data, viaje) => {
    // initialize jsPDF
    const doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a4'
    });
    let tableColumn = [];
    // Definiendo las colummnas del pdf
    if (rptTitle.trim() === 'BHC') {
        tableColumn = ["Código Lab", "Código", "Estudio", "FIF", "Fecha Toma", "Vol.", "Observaciones"];
    } else {
        tableColumn = ["Código Lab", "Código", "Estudio", "FIF", "Fecha Toma", "Tubo", "Vol.", "Observaciones"];
    }


    const tableRows = [];

    doc.setFont("Times New Roman", "Bold");
    //const width = doc.internal.pageSize.getWidth()
    doc.setFontSize(24);
    doc.setTextColor('#000000');
    doc.text("Centro de Salud Socrates Flores", 14, 18, { align: 'left' });
    //doc.line(14, 15, 60, 15); // horizontal line
    doc.setLineWidth(0.5);

    doc.setTextColor('#000000');
    doc.text("Envio de Muestras " + rptTitle, 14, 26, { align: 'left' });

    doc.setFontSize(10);
    if (rptTitle.trim() === 'BHC') {
        for (let i = 0; i < data.length; i++) {
            const ticketData = [
                data[i].muestraId.codLab,
                data[i].muestraId.codigoParticipante,
                data[i].muestraId.estudiosParticipante.trim(),
                data[i].muestraId.fif,
                data[i].muestraId.fechaToma,
                data[i].muestraId.volumen,
                data[i].muestraId.observacion
            ];
            tableRows.push(ticketData);
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            const ticketData = [
                data[i].muestraId.codLab,
                data[i].muestraId.codigoParticipante,
                data[i].muestraId.estudiosParticipante,
                data[i].muestraId.fif,
                data[i].muestraId.fechaToma,
                data[i].tuboId.tubo,
                data[i].muestraId.volumen,
                data[i].muestraId.observacion
            ];
            tableRows.push(ticketData);
        }
    }

    // startY es el margin-top de inicio
    doc.autoTable(tableColumn, tableRows, {
        startY: 30, pageBreak: 'auto',
        styles: { fontSize: 8, halign: 'left' }, rowPageBreak: 'avoid'
    });

    let now = moment().locale('es');
    const rptFecha = now.format('YYYYMMDD');

    const pageCount = doc.internal.getNumberOfPages(); //Total Page Number
    for (let i = 0; i < pageCount; i++) {
        doc.setPage(i);
        let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page

        doc.setFontSize(8);
        doc.text('Envia: __________________________ Fecha / Hora: __________________________ Temp: ________ ', 14, 200);

        doc.setFontSize(8);
        doc.text('Recibe(CNDR): __________________________ Fecha / Hora: __________________________ temp: ________', 140, 200);

        doc.setFontSize(7);
        doc.text('Total Mx: ' + data.length, 210, 205);

        doc.setFontSize(7);
        doc.text('Viaje: ' + viaje, 230, 205);

        doc.setFontSize(7);
        doc.text('página: ' + pageCurrent + '/' + pageCount, 260, 205, 'right', 'middle');

        doc.setFontSize(7);
        //doc.text(fecha, 14, 205);
    }

    // Definimos el nombre del archivo pdf
    doc.save(`reporte${rptTitle}${'-'}${rptFecha}.pdf`);
}

export default GeneratePDFMxEnviadas;
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import 'moment/locale/es';

const GeneratePDF = (data, medicos, dataResult, startDate, endDate) => {
  // initialize jsPDF
  const doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4'
  });

  /**Metodo para buscar el medico */
  const findMedicalName = (id) => {
    if (medicos.length > 0) {
      const result = medicos.filter(item => item.id === id);
      return result[0].nombre;
    }
  }

  /**Metodo para buscar el medico */
  const findResult = (id) => {
    if (dataResult.length > 0) {
      const result = dataResult.filter(item => item.id === parseInt(id));
      return result[0].descripcion;
    }
  }

  // Definiendo las colummnas del pdf
  const tableColumn = ["Código", "Cat", "Consulta", "FIF", "Hora Toma", "Vol Sangre", "Hora ref Mx",
    "Fecha Separación", "Hora Separación", "No Viales", "Vol Suero", "Hora Ref Vial", "Ordena Mx", "Toma Mx", 
    "Separa Mx", "Tubo", "Resultado PR"];
  
  const tableRows = [];

  doc.setFont("Times New Roman", "Bold");

  doc.setFontSize(12);
  doc.setTextColor('#6B041A');
  doc.text("Estudio Cohorte Pediátrica", 14, 15);
  doc.line(14, 15, 60, 15); // horizontal line
  doc.setLineWidth(0.5);

  doc.setTextColor('#040377');
  doc.text("Muestra de Dengue tomadas", 14, 20);

  doc.setFontSize(10);
  doc.text("Fecha de toma: " + startDate + '  al  ' + endDate, 220, 15);

  for (let i = 0; i < 100; i++) {
    const ticketData = [
      data[0].codLab,
      data[0].categoriaId.nombre,
      data[0].consultaId.descripcion,
      data[0].muestraId.fif,
      data[0].muestraId.horaToma,
      data[0].muestraId.volumen,
      data[0].horaRefrigeracion,
      data[0].fechaSeparacion,
      data[0].horaSeparacion,
      data[0].numViales,
      data[0].volumenSuero,
      data[0].horaRefrigeracionVial,
      findMedicalName(data[0].muestraId.quienOrdena),
      data[0].muestraId.bioanalistaId.nombres + ' ' + data[0].muestraId.bioanalistaId.apellidos,
      data[0].bioanalistaVialId !== null ? data[0].bioanalistaVialId.nombres + ' ' + data[0].bioanalistaVialId.apellidos : null,
      data[0].tuboId.descripcion,
      findResult(data[0].resultado)
      // called date-fns to format the date on the ticket
      //format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  };
  /* data.forEach(item => {
    const ticketData = [
      item.codLab,
      item.categoriaId.nombre,
      item.consultaId.descripcion,
      item.muestraId.fif,
      item.muestraId.horaToma,
      item.muestraId.volumen,
      findMedicalName(item.muestraId.quienOrdena),
      item.muestraId.bioanalistaId.nombres + ' ' + item.muestraId.bioanalistaId.apellidos,
      item.tuboId.descripcion
      // called date-fns to format the date on the ticket
      //format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  }); */


  // startY es el margin-top de inicio
  doc.autoTable(tableColumn, tableRows, {
    startY: 30, pageBreak: 'auto',
    styles: { fontSize: 7 }, rowPageBreak: 'avoid'
  });

  const date = Date().split(" ");
  
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  
  let now = moment().locale('es');
  const fecha = now.format('dddd, D MMMM YYYY, h:mm a');

  const pageCount = doc.internal.getNumberOfPages(); //Total Page Number
  for (let i = 0; i < pageCount; i++) {
    doc.setPage(i);
    let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page

    doc.setFontSize(8);
    doc.text('Entrega Turno Bioanlista: ____________________ Código: ________', 14, 200);

    doc.setFontSize(8);
    doc.text('Recibe Turno Bioanlista: ____________________ Código: ________', 100, 200);

    doc.setFontSize(8);
    doc.text('Supervisor: ____________________ Código: ________', 185, 200);

    doc.setFontSize(8);
    doc.text('Total Mx: '+ data.length, 260, 200);

    doc.setFontSize(7);
    doc.text('pagina: ' + pageCurrent + '/' + pageCount, 270, 205);

    doc.setFontSize(7);
    doc.text(fecha, 14, 205);

  }

  // Definimos el nombre del archivo pdf
  doc.save(`reporteDengue_${dateStr}.pdf`);
};

export default GeneratePDF;
import * as ExcelJs from "exceljs";
import { join } from "path";
import moment = require("moment");
import path = require("path");

export class ExcelService {
  private path = join(process.cwd(), "src", "config", "excel", "files");

  constructor() {}

  private config = (): {
    workbook: ExcelJs.Workbook;
    tramitesSheet: ExcelJs.Worksheet;
    otherSolicitantesSheet: ExcelJs.Worksheet;
    //Colocar aqui los demas documentos que necesiten con ExcelJs.Worksheet
  } => {
    const workbook = new ExcelJs.Workbook();
    workbook.creator = "VIGPRO TRAMITES";
    workbook.created = new Date();

    /*Crear hoja de trabajo*/
    const tramitesSheet = workbook.addWorksheet("Tramites", {
      properties: { tabColor: { argb: "03e3fc" } },
    });
    const otherSolicitantesSheet = workbook.addWorksheet("Otros solicitantes", {
      properties: { tabColor: { argb: "ff4040" } },
    });

    //Aqui crear las demas hojas de trabajos
    /**/

    /*columns doc*/
    tramitesSheet.columns = [
      { header: "Id solicitud", key: "id_solicitud", width: 13 },
      { header: "Categoria tramite", key: "categoriatramite", width: 40 },
      { header: "Nombre tramite", key: "nombretramite", width: 65 },
      { header: "Etapa actual", key: "etapa", width: 20 },
      { header: "Estado actual", key: "estado", width: 30 },
      { header: "Número expediente", key: "expediente", width: 30 },
      { header: "Responsable actual", key: "responsable", width: 40 },
      {
        header: "Requerimientos adicionales",
        key: "reqadicionales",
        width: 70,
      },
      {
        header: "Asignación territorial",
        key: "asignacionterritorial",
        width: 20,
      },
      { header: "Nombre solicitante 1", key: "nombresolicitante", width: 30 },
      {
        header: "Apellido solicitante 1",
        key: "apellidossolicitante",
        width: 30,
      },
      {
        header: "Tipo de documento solicitante 1",
        key: "tpdocumento",
        width: 30,
      },
      {
        header: "No. de documento solicitante 1",
        key: "docsolicitante",
        width: 30,
      },
      { header: "Email solicitante 1", key: "emailsolicitante", width: 30 },
      { header: "Celular solicitante 1", key: "celularsolicitante", width: 30 },
      {
        header: "Fecha de creación de solicitud",
        key: "fechahoracreacion",
        width: 35,
      },
    ];
    //idsolicitud,nombre,apellidos email, celular, documento, tipodocento, asignacion territorial
    otherSolicitantesSheet.columns = [
      { header: "Id solicitud", key: "id_solicitudo", width: 13 },
      { header: "Nombre", key: "nombreo", width: 40 },
      { header: "Apellido", key: "apellidoo", width: 65 },
      { header: "Email", key: "emailo", width: 20 },
      { header: "Celular", key: "celularo", width: 20 },
      { header: "Tipo de documento", key: "tpdocumentoo", width: 30 },
      { header: "Documento", key: "documentoo", width: 30 },
      { header: "Asignación territorial", key: "asignaciono", width: 30 },
    ];

    //si hay más hojas de trabajo colocar sus columnas aqui
    /**/
    /*columns or*/

    tramitesSheet.getColumn("A").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("B").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("C").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("D").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("E").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("F").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("G").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("H").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("I").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("J").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("K").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("L").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("M").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("N").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("O").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    tramitesSheet.getColumn("P").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    otherSolicitantesSheet.getColumn("A").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    otherSolicitantesSheet.getColumn("B").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    otherSolicitantesSheet.getColumn("C").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    otherSolicitantesSheet.getColumn("D").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    otherSolicitantesSheet.getColumn("E").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    otherSolicitantesSheet.getColumn("F").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    otherSolicitantesSheet.getColumn("G").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    otherSolicitantesSheet.getColumn("H").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    /**/

    return { workbook, tramitesSheet, otherSolicitantesSheet };
  };

  createDoc = async (data: any, otherSolicitantes: any, fecha: any) => {
    let { workbook, tramitesSheet, otherSolicitantesSheet } = this.config();

    for (let i = 0; i <= data.length - 1; i++) {
      tramitesSheet.getCell(i + 2, 1).value = data[i].id_solicitud;
      tramitesSheet.getCell(i + 2, 2).value = data[i].categoria_tramite;
      tramitesSheet.getCell(i + 2, 3).value = data[i].nombre_tramite;
      tramitesSheet.getCell(i + 2, 4).value = data[i].etapa;
      tramitesSheet.getCell(i + 2, 5).value = data[i].estado;
      tramitesSheet.getCell(i + 2, 6).value = data[i].no_exp;
      tramitesSheet.getCell(i + 2, 7).value = data[i].responsable_actual;
      tramitesSheet.getCell(i + 2, 8).value = data[i].req_adicionales;
      tramitesSheet.getCell(i + 2, 9).value = data[i].asignacion_territorial;
      tramitesSheet.getCell(i + 2, 10).value = data[i].nombres_solicitante_1;
      tramitesSheet.getCell(i + 2, 11).value = data[i].apellidos_solicitante_1;
      tramitesSheet.getCell(i + 2, 12).value =
        data[i].tipo_documento_solicitante_1;
      tramitesSheet.getCell(i + 2, 13).value = data[i].documento_solicitante_1;
      tramitesSheet.getCell(i + 2, 14).value = data[i].email_solicitante_1;
      tramitesSheet.getCell(i + 2, 15).value = data[i].celular_solicitante_1;
      tramitesSheet.getCell(i + 2, 16).value = data[i].fecha_y_hora_de_creación;
    }

    for (let i = 0; i <= otherSolicitantes.length - 1; i++) {
      otherSolicitantesSheet.getCell(i + 2, 1).value =
        otherSolicitantes[i].id_solicitud;
      otherSolicitantesSheet.getCell(i + 2, 2).value =
        otherSolicitantes[i].nombres;
      otherSolicitantesSheet.getCell(i + 2, 3).value =
        otherSolicitantes[i].apellidos;
      otherSolicitantesSheet.getCell(i + 2, 4).value =
        otherSolicitantes[i].email;
      otherSolicitantesSheet.getCell(i + 2, 5).value =
        otherSolicitantes[i].celular;
      otherSolicitantesSheet.getCell(i + 2, 6).value =
        otherSolicitantes[i].tipo_documento;
      otherSolicitantesSheet.getCell(i + 2, 7).value =
        otherSolicitantes[i].documento;
      otherSolicitantesSheet.getCell(i + 2, 8).value =
        otherSolicitantes[i].asignacion_territorial;
    }

    const Footers = this.BoldFooter(tramitesSheet, 1);
    const Footers2 = this.BoldFooter2(otherSolicitantesSheet, 1);

    tramitesSheet = Footers.tramitesSheet;
    otherSolicitantesSheet = Footers2.otherSolicitantesSheet;

    let date = workbook.created;
    let ruta = path.join(__dirname, "../../temp", `${fecha}.xlsx`);
    await workbook.xlsx.writeFile(ruta);
    return ruta;
  };

  private formatCells = (
    tramitesSheet: ExcelJs.Worksheet
    //Colocar aqui el resto de docs a formatear
  ): {
    tramitesSheet: ExcelJs.Worksheet;
  } => {
    /*tramites sheet*/
    tramitesSheet.eachColumnKey((col) => {
      col.eachCell((cell) => {
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        cell.font = {
          name: "Arial",
          size: 10,
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });
    tramitesSheet.getRow(1).eachCell((cell) => {
      cell.font = {
        name: "Arial",
        size: 10,
        bold: true,
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    /*end tramites sheet*/

    return { tramitesSheet };
  };

  private BoldFooter = (
    tramitesSheet: ExcelJs.Worksheet,
    tramitesRow: number
  ): {
    tramitesSheet: ExcelJs.Worksheet;
  } => {
    tramitesSheet.getRow(tramitesRow).eachCell((cell) => {
      cell.font = {
        name: "Arial",
        size: 10,
        bold: true,
      };
    });
    return { tramitesSheet };
  };

  private BoldFooter2 = (
    otherSolicitantesSheet: ExcelJs.Worksheet,
    tramitesRow: number
  ): {
    otherSolicitantesSheet: ExcelJs.Worksheet;
  } => {
    otherSolicitantesSheet.getRow(tramitesRow).eachCell((cell) => {
      cell.font = {
        name: "Arial",
        size: 10,
        bold: true,
      };
    });
    return { otherSolicitantesSheet };
  };
}

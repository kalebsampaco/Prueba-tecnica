/************ import libraries ************/
import { isEmpty } from 'lodash';
import Sequelize = require('sequelize');

/************ Instance operador sequelize ************/
const OP = Sequelize.Op;

/**
 * @author Styk Medina
 * @description Function search by where
 * if receive an object to organize the variables and returns an object to filter the condition
 * @param {object} Where
 */
export const whereModel = (Where) => {

  let where = {};
  let time = undefined, target = undefined;

  if(Where.taskTime != ""){
    time = Where.taskTime;
    delete Where.taskTime;
  }

  if(Where.taskTarget != ""){
    target = Where.taskTarget;
    delete Where.taskTarget;
  }

  if (!isEmpty(Where)) {
    Object.keys(Where).map((key, index) => {

      if(Where[key] === ""){
        delete Where[key];
        return;
      }

      switch (key) {
        case 'ss_id':
        case 'ss_id_etapa_actual':
        case 'ss_id_estado':
          Where[key] = { [OP.eq]: Where[key] };
          break;
        case 'ss_fecha_creacion':
        case 'ss_fecha_edicion':
          Where[key] = { [OP.gte]: Where[key] };
          break;
        case 'tds_nombre_o_razon_social':
          Where['$tram_datos_solicitante.tds_nombre_o_razon_social$'] = { [OP.like]: `%${Where[key]}%` };
          delete Where[key];
          break;
        case 'tds_id_tipo_documento':
        case 'tds_nro_doc':
          Where[`$tram_datos_solicitante.${key}$`] = { [OP.eq]: Where[key] };
          delete Where[key];
          break;
        case 'tig_nombre':
          Where['$tram_info_general.tig_nombre$'] = { [OP.like]: `%${Where[key]}%` };
          delete Where[key];
          break;
        case 'tig_id_ciudad':
          Where['$tram_info_general.tig_id_ciudad$'] = { [OP.like]: `%${Where[key]}%` };
          delete Where[key];
          break;
        case 'tig_vereda_corregimiento':
          Where['$tram_info_general.tig_vereda_corregimiento$'] = { [OP.like]: `%${Where[key]}%` };
          delete Where[key];
          break;
        case 'tt_id':
          Where['$fk_tra_tramite.tt_id$'] = { [OP.eq]: `${Where[key]}` };
          delete Where[key];
          break;
        case 'tt_nombre':
          Where['$fk_tra_tramite.tt_nombre$'] = { [OP.like]: `%${Where[key]}%` };
          delete Where[key];
          break;
        default:
          Where[key] = { [OP.like]: `%${Where[key]}%` };
          break;
      }


    });
    where = { [OP.and]: [Where] };
  }

  return { where, time, target };
};

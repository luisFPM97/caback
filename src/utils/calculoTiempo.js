const moment = require("moment");
require("moment-business-days");

const HORARIO_LABORAL = {
  lunes_a_viernes: { inicio: 8, fin: 17 },
  sabado: { inicio: 8, fin: 11.5 }, // 11:30 AM es 11.5 en formato decimal
};

/**
 * Calcula el tiempo total de trabajo dentro del horario laboral
 * @param {Date} fechaInicio - Fecha y hora de solicitud
 * @param {Date} fechaFin - Fecha y hora de finalización
 * @returns {String} - Tiempo total en formato "X horas Y minutos"
 */
const calcularTiempoLaboral = (fechaInicio, fechaFin) => {
  let inicio = moment(fechaInicio);
  let fin = moment(fechaFin);

  // Validación: Si la fecha de inicio es mayor que la de fin
  if (inicio.isAfter(fin)) return "0 horas 0 minutos";

  let totalMinutos = 0;

  while (inicio.isBefore(fin, "minute")) {
    let diaSemana = inicio.isoWeekday(); // 1 (Lunes) - 7 (Domingo)
    let horaActual = inicio.hour() + inicio.minute() / 60; // Hora en decimal

    if (diaSemana >= 1 && diaSemana <= 5) {
      // Lunes a Viernes
      if (horaActual >= HORARIO_LABORAL.lunes_a_viernes.inicio && horaActual < HORARIO_LABORAL.lunes_a_viernes.fin) {
        totalMinutos++;
      }
    } else if (diaSemana === 6) {
      // Sábado
      if (horaActual >= HORARIO_LABORAL.sabado.inicio && horaActual < HORARIO_LABORAL.sabado.fin) {
        totalMinutos++;
      }
    }

    inicio.add(1, "minute"); // Avanzamos un minuto
  }

  let horas = Math.floor(totalMinutos / 60);
  let minutos = totalMinutos % 60;

  return `${horas} horas ${minutos} minutos`;
};

module.exports = { calcularTiempoLaboral };

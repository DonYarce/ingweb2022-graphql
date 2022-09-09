import prisma from "@config/prisma";
import { schemas as schedulesSchemas } from "./validators/schedules.validations";
import { EjecutarConTry } from "@errors/errorhandler";
import { AplicacionError } from "@errors/aplicacionerror";
import { SucessCodes, ErrorCodes } from "@config/messages";

const createSchedule = async (data: any) => {
  return await EjecutarConTry(async () => {
    const { startTime, endTime, headquarterId, day } = data;

    //Start antes que end
    if (startTime > endTime)
      throw new AplicacionError(
        ErrorCodes.excepcionHorarioIncorrecto.code,
        ErrorCodes.excepcionHorarioIncorrecto.message
      );

    // Crear horario
    const newSchedules = await prisma.schedule.create({
      data: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        headquarterId: headquarterId,
        day: day,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      ...newSchedules,
    };
  }, SucessCodes.horarioCreado);
};

const updateSchedule = async (data: any) => {
  return await EjecutarConTry(async () => {
    const { id, headquarterId, day } = data;
    let {startTime, endTime} = data;
    
    if(startTime && endTime) {
    //Start antes que end
      if (startTime > endTime)
        throw new AplicacionError(
          ErrorCodes.excepcionHorarioIncorrecto.code,
          ErrorCodes.excepcionHorarioIncorrecto.message
        );      
      }

      //Obtenemos los times antiguos
    if(!startTime || !endTime) {
      const oldSchedule = await prisma.schedule.findFirst({
        where: { id: id },
      });
      if(!oldSchedule){
        throw new AplicacionError(
          ErrorCodes.excepcionHorarioNoExiste.code,
          ErrorCodes.excepcionHorarioNoExiste.message
        ); 
      }
      if(!startTime)
        startTime = oldSchedule.startTime;
      if(!endTime)
        endTime = oldSchedule.endTime;
      }

      
    // Actualizar horario
    const newSchedules = await prisma.schedule.update({
      where: { id: id },
      data: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        headquarterId: headquarterId,
        day: day,
        updatedAt: new Date(),
      },
    });
    return {
      ...newSchedules,
    };
  }, SucessCodes.horarioActualizado);
}

const deleteSchedule = async (id: string) => {
  return await EjecutarConTry(async () => {
    const schedule = await prisma.schedule.delete({
      where: { id: id },
    });

    return schedule;
  }, SucessCodes.horarioEliminado);
}

const getSchedules = async () => {
  return await EjecutarConTry(
    async () => await prisma.schedule.findMany(),
    SucessCodes.horarioListado
  );
};

const getScheduleById = async (id: string) => {
  return await EjecutarConTry(async() => {
    const schedule = await prisma.schedule.findFirst({
      where: { id: id },
    });

    return schedule;
  } , SucessCodes.horarioListado);
}

const getSchedulesbyHeadquarter = async (headquarterId: string) => {
  return await EjecutarConTry(async () => {
    const schedules = await prisma.schedule.findMany({
      where: { headquarterId: headquarterId },
    });

    return schedules;
  }
  , SucessCodes.horarioListado);
}

export const SchedulesService = {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedules,
  getScheduleById,
  getSchedulesbyHeadquarter
};

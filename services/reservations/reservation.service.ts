import prisma from "@config/prisma";
import { EjecutarConTry } from "@errors/errorhandler";
import { AplicacionError } from "@errors/aplicacionerror";
import { SucessCodes, ErrorCodes } from "@config/messages";
import { TableService } from "services/tables/table.service";

//HU-11:    Como cliente, quiero poder crear una reserva en el restaurante, indicando la sede, el día, la hora,
//          la cantidad de personas y la ocasión de la reserva
const createReservation = async (data: any) => {
  return await EjecutarConTry(async () => {
    const { date, occasion, tableId, userId, numberOfPeople } = data;

    // Existencia de la reserva
    const reservationExists = await reservaExisteAsync(tableId, date);

    if (reservationExists)
      throw new AplicacionError(
        ErrorCodes.excepcionReservaExiste.code,
        ErrorCodes.excepcionReservaExiste.message
      );  

    // Crear reserva
    const newReservation = await prisma.reservation.create({
      data: {
        date: new Date(date),
        occasion,
        tableId,
        userId,
        numberOfPeople,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      ...newReservation,
    };
  }, SucessCodes.reservaCreada);
};

//HU-12:    Como cliente, quiero poder visualizar mis reservas futuras y pasadas
const getReservations = async () => {
  return await EjecutarConTry(async () => {
    const reservations = await prisma.reservation.findMany({
      include: {
        user: true,
        reservationTable: true,
      },
    });
    
    return reservations;
  }, SucessCodes.reservasListadas);
};

const getReservationsOrderByDate = async () => {
    return await EjecutarConTry(async () => {
        const reservations = await prisma.reservation.findMany({
            include: {
                user: true,
            },
            orderBy: {
                date: "asc"
            }
        });
        return reservations;
    }, SucessCodes.reservasListadasPorDia);
};

//HU-13:    Como cliente, quiero poder repetir una reserva cambiando solo la fecha
const createReservationFromReservation = async (data: any) => {
  return await EjecutarConTry(async () => {
    const { date, id } = data;

    const oldReservation = await prisma.reservation.findUnique({
      where: {
        id: id,
      },
    });

    //TODO: Existencia de la reserva
    if (!oldReservation)
    throw new AplicacionError(
      ErrorCodes.excepcionReservaNoExiste.code,
      ErrorCodes.excepcionReservaNoExiste.message
    );
    

    const newReservation = await createReservation({
      date: new Date(date),
      occasion: oldReservation.occasion,
      tableId: oldReservation.tableId,
      userId: oldReservation.userId,
      numberOfPeople: oldReservation.numberOfPeople,
    });

    return {
      ...newReservation.data,
    };
  }, SucessCodes.reservaCreada);
};

//HU-14:    Como cliente, quiero poder eliminar una reserva
const deleteReservation = async (id: string) => {
  return await EjecutarConTry(async () => {
    const reservation = await prisma.reservation.delete({
      where: {
        id,
      },
    });
    return reservation;
  }, SucessCodes.reservaEliminada);
};




// ----------------De aqui en adelante no se les esta dando uso----------



const getReservationById = async (id: string) => {
  return await EjecutarConTry(async () => {
    const reservation = await prisma.reservation.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    return reservation;
  }, SucessCodes.reservaEncontrada);
};

//HU-11:    Como cliente, quiero poder crear una reserva en el restaurante, indicando la sede, el día, la hora,
//          la cantidad de personas y la ocasión de la reserva
const getReservationsByUserId = async (userId: string) => {
  return await EjecutarConTry(async () => {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
    return reservations;
  }, SucessCodes.reservasListadas);
};


const reservaExisteAsync = async (tableId: string, date: string) => {
  return await prisma.reservation.findFirst({
    where: {
      tableId,
      date: new Date(date),
    },
  });
};

//Verifica si el restaurante esta abierto a esa hora
const verificarHoraAsync = async (tableId: string, date: string) => {
  return await prisma.reservation.findFirst({
    where: {
      tableId: tableId,
    }, //Falta la peticion para el horario del restaurante
  });
};

export const ReservationService = {
    createReservation,
    getReservations,
    getReservationsOrderByDate,
    getReservationsByUserId,
    getReservationById,
    createReservationFromReservation,
    deleteReservation
}
import prisma from "@config/prisma";
import { EjecutarConTry } from "@errors/errorhandler";
import { AplicacionError } from "@errors/aplicacionerror";
import { SucessCodes, ErrorCodes } from "@config/messages";

const createTable = async (data: any) => {
  return await EjecutarConTry(async () => {
    const { number, capacity, headquarterId } = data;

    // Crear usuario
    const newTable = await prisma.table.create({
      data: {
        number: number,
        capacity: capacity,
        headquarterId: headquarterId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return{
      ...newTable
    };
  }, SucessCodes.mesaCreada);
};

const updateTable = async (data: any) => {
  return await EjecutarConTry(async () => {
    const { id, number, capacity, headquarterId } = data;

    const table = await prisma.table.findFirst({
      where: { id } });

    if (!table) {
      throw new AplicacionError(
        ErrorCodes.excepcionMesaNoExiste.code,
        ErrorCodes.excepcionMesaNoExiste.message
      );
    }

    // Crear usuario
    const newTable = await prisma.table.update({
      where: {
        id: id,
      },
      data: {
        number: number,
        capacity: capacity,
        headquarterId: headquarterId,
        updatedAt: new Date(),
      },
    });

    return{
      ...newTable
    };
  }, SucessCodes.mesaActualizada);
}

const deleteTable = async (id: any) => {
  return await EjecutarConTry(async () => {
    const table = await prisma.table.delete({
      where: { id: id },
    });

    return table;
  }, SucessCodes.mesaEliminada);
}

const getTable = async (id: any) => {
  return await EjecutarConTry(async () => {
    
    // Existencia de la mesa
    const tableExists = await mesaExisteAsync(id);

    if (!tableExists)
      throw new AplicacionError(
        ErrorCodes.excepcionMesaNoExiste.code,
        ErrorCodes.excepcionMesaNoExiste.message
      );
      return {
        ...tableExists
      };
    }, SucessCodes.mesaEncontrada);
  };

const getTables = async () => {
  return await EjecutarConTry(
    async () => await prisma.table.findMany(),
    SucessCodes.mesasListado
  );
};

// Funciones privadas reutilizables
const mesaExisteAsync = async (number: string) => {
  return await prisma.table.findUnique({
    where: {
      number,
    },
  });
};

export const TableService = {
  createTable,
  updateTable,
  deleteTable,
  getTable,
  getTables
};

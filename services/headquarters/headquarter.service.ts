import { EjecutarConTry } from "@errors/errorhandler";
import prisma from "@config/prisma";
import { SucessCodes, ErrorCodes } from "@config/messages";
import { AplicacionError } from "@errors/aplicacionerror";

const createHeadquarter = async (data: any) => {
    return await EjecutarConTry(async () => {
        const { name, address, phoneNumber, restaurantId } = data;
        
        // Creacion de sede
        const newHeadquarter = await prisma.headquarter.create({
            data: {
                name,
                address,
                phoneNumber,
                restaurantId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        // Devolver sede
        return newHeadquarter;
    }, SucessCodes.sedeCreada);
};

const updateHeadquarter = async (data: any) => {
    return await EjecutarConTry(async () => {
        const { id, name, address, phoneNumber, restaurantId } = data;

        const headquarter = await prisma.headquarter.findFirst({
        //Obtenemos los times antiguos
            where: { id: id },
        });

        if(!headquarter) {
            throw new AplicacionError(
                ErrorCodes.excepcionHeadquarterNoExiste.code,
                ErrorCodes.excepcionHeadquarterNoExiste.message
            );
        }

        // Actualizar sede
        const updatedHeadquarter = await prisma.headquarter.update({
            where: { id },
            data: {
                name,
                address,
                phoneNumber,
                restaurantId: restaurantId,
                updatedAt: new Date(),
            },
        });

        return updatedHeadquarter;
    }, SucessCodes.sedeActualizada);
}

const getHeadquarters = async () => {
    return await EjecutarConTry(async () => {
        // Obtener sedes
        const headquarters = await prisma.headquarter.findMany();
        return headquarters;
    }, SucessCodes.sedesListadas);
};

const getHeadquarterById = async (id: string) => {
    return await EjecutarConTry(async () => {
        // Obtener sede
        const headquarter = await prisma.headquarter.findFirst({
            where: { id },
        });

        if(!headquarter){
            throw new AplicacionError(
                ErrorCodes.excepcionHeadquarterNoExiste.code,
                ErrorCodes.excepcionHeadquarterNoExiste.message
            );
        }
        return headquarter;
    }, SucessCodes.sedeEncontrada);
}

const getHeadquartersByRestaurant = async (restaurantId: string) => {
    return await EjecutarConTry(async () => {
        const headquarters = await prisma.headquarter.findMany({
            where: {
                restaurantId,
            },
        });
        return headquarters;
    } , SucessCodes.sedesListadas);
}

export const HeadquarterService = {
    createHeadquarter,
    updateHeadquarter,
    getHeadquarters,
    getHeadquarterById,
    getHeadquartersByRestaurant
};
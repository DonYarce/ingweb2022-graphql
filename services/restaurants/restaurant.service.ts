import prisma from "@config/prisma";
import { schemas as restaurantSchemas } from "./validators/restaurant.validations";
import { EjecutarConTry } from "@errors/errorhandler";
import { AplicacionError } from "@errors/aplicacionerror";
import { SucessCodes, ErrorCodes } from "@config/messages";

const restaurantIdExisteAsync = async (id: string) => {
  return await prisma.restaurant.findUnique({
    where: {
      id,
    },
  });
};

const createRestaurant = async (data: any, auth: any) => {
  return await EjecutarConTry (async() => {
    const { name, phoneNumber, type } = data;

    if(auth === null){
      throw new AplicacionError(
        ErrorCodes.excepcionTokenNulo.code,
        ErrorCodes.excepcionTokenNulo.message
      );
    }

    // Validamos si es administrador
    if(auth.roleId !== "2"){
      throw new AplicacionError(
        ErrorCodes.excepcionNoAdmin.code,
        ErrorCodes.excepcionNoAdmin.message
      );
    }

    const newRestaurant = await prisma.restaurant.create({
      data: {
        name,
        phoneNumber,
        type,
        userId: auth.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      ...newRestaurant,
      message: SucessCodes.restauranteCreado.message,
    };
  }, SucessCodes.restauranteCreado);
};

const updateRestaurant = async (data: any) => {
  return await EjecutarConTry (async() => {
    const { id, name, phoneNumber, type } = data;

    // Validacion del restaurante
    const validationResult = restaurantSchemas.restaurantUpdateSchema.validate(data);
    
    if (validationResult.error)
      throw new AplicacionError(
        ErrorCodes.excepcionValidacion.code,
        validationResult.error.message
      );

    // Existencia del restaurante
    const restaurantExist = await restaurantIdExisteAsync(id);
    
    if (!restaurantExist)
      throw new AplicacionError(
        ErrorCodes.excepcionRestauranteNoExiste.code,
        ErrorCodes.excepcionRestauranteNoExiste.message
      );  
    
    const updatedRestaurant = await prisma.restaurant.update({
      where: {
        id: id,
      },
      data: {
        name,
        phoneNumber,
        type,
        updatedAt: new Date(),
      },
    });
    
    return {
      ...updatedRestaurant,
      message: SucessCodes.restauranteActualizado.message,
    };
  }, SucessCodes.restauranteActualizado);
};

const getRestaurants = async () => {
  return await EjecutarConTry (
    async() => await prisma.restaurant.findMany(),
    SucessCodes.restauranteListado
  );
};

const getRestaurantById = async (data: any) => {
  return await EjecutarConTry (async() => {
    const { id } = data;
    
    // Existencia del restaurante
    const restaurantExist = await restaurantIdExisteAsync(id);

    if (!restaurantExist)
      throw new AplicacionError(
        ErrorCodes.excepcionRestauranteNoExiste.code,
        ErrorCodes.excepcionRestauranteNoExiste.message
      );

    return await prisma.restaurant.findUnique({
      where: {
        id: id,
      },
    });
  }
  , SucessCodes.restauranteListado);
};

const getRestaurantByType = async (type: any) => {
  return await EjecutarConTry (async() => {

    const restaurantByType = await prisma.restaurant.findMany({
      where: {
        type,
      },
    });

    return restaurantByType

  }, SucessCodes.restauranteEncontrado);
};


export const RestaurantService = {
  createRestaurant,
  updateRestaurant,
  getRestaurants,
  getRestaurantById,
  getRestaurantByType,
};
import prisma from "@config/prisma";
import { schemas as userSchemas } from "./validators/user.validations";
import {
  comparePassword,
  hashPassword,
  verifyPassword,
} from "@utils/password.utils";
import { signToken } from "@utils/jwt.utils";
import { EjecutarConTry } from "@errors/errorhandler";
import { AplicacionError } from "@errors/aplicacionerror";
import { SucessCodes, ErrorCodes } from "@config/messages";

const registerUser = async (data: any) => {
  return await EjecutarConTry(async () => {
    const { email, name, password, confirmPassword, phoneNumber } = data;

    // Validacion del usuario
    const validationResult = userSchemas.userRegisterSchema.validate(data);

    if (validationResult.error)
      throw new AplicacionError(
        ErrorCodes.excepcionValidacion.code,
        validationResult.error.message
      );

    // Existencia del usuario
    const userExists = await usuarioExisteAsync(email);

    if (userExists)
      throw new AplicacionError(
        ErrorCodes.excepcionUsuariExiste.code,
        ErrorCodes.excepcionUsuariExiste.message
      );

    // Comparar contraseña
    const samePassword = comparePassword(password, confirmPassword);

    if (!samePassword)
      throw new AplicacionError(
        ErrorCodes.excepcionContrasena.code,
        ErrorCodes.excepcionContrasena.message
      );

    // Cifrar contraseña
    const hashedPassword = await hashPassword(password);

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        roleId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Devolver token JWT
    return {
      ...newUser,
      token: signToken({ userId: newUser.id, roleId: newUser.roleId }),
    };
  }, SucessCodes.usuarioRegistrado);
};

const loginUser = async (data: any) => {
  return await EjecutarConTry(async () => {
    const { email, password } = data;

    // Validacion del usuario
    const validationResult = userSchemas.userLoginSchema.validate(data);

    if (validationResult.error)
      throw new AplicacionError(
        ErrorCodes.excepcionValidacion.code,
        validationResult.error.message
      );

    // Existencia del usuario
    const userExists = await usuarioExisteAsync(email);

    if (!userExists)
      throw new AplicacionError(
        ErrorCodes.excepcionUsuarioNoExiste.code,
        ErrorCodes.excepcionUsuarioNoExiste.message
      );

    // Verificar contraseña
    const passwordVerify = await verifyPassword(userExists.password, password);

    if (!passwordVerify)
      throw new AplicacionError(
        ErrorCodes.excepcionUsuarioContrasena.code,
        ErrorCodes.excepcionUsuarioContrasena.message
      );

    // Devolver token JWT
    return {
      ...userExists,
      token: signToken({
        userId: userExists.id,
        roleId: userExists.roleId,
      }),
    };
  }, SucessCodes.usuarioLoggeado);
};

const updateUser =  async (data: any, auth: any) => {
  return await EjecutarConTry(async () => {
    const { userId, email, name, password, phoneNumber } = data;

    if(auth === null){
      throw new AplicacionError(
        ErrorCodes.excepcionTokenNulo.code,
        ErrorCodes.excepcionTokenNulo.message
      );
    }

    if(auth.roleId === "1" && (auth.userId !== userId)){
      throw new AplicacionError(
        ErrorCodes.excepcionUsuarioActualizar.code,
        ErrorCodes.excepcionUsuarioActualizar.message
      );
    }

    // Cifrar contraseña
    const hashedPassword = await hashPassword(password);

    // Actualizar usuario
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        name,
        password: hashedPassword,
        phoneNumber,
        updatedAt: new Date(),
      },
    });

    return updatedUser;
  }, SucessCodes.usuarioActualizado);
}

const getUsers = async () => {
  return await EjecutarConTry(
    async () => await prisma.user.findMany(),
    SucessCodes.usuariosListado
  );
};

// Funciones privadas reutilizables
const usuarioExisteAsync = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const UserService = {
  registerUser,
  loginUser,
  updateUser,
  getUsers
};

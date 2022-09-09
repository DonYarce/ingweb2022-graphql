import { AplicacionError } from "@errors/aplicacionerror";
import { ErrorCodes } from "@config/messages";
import { BaseResponse, ErrorResponse } from "@config/base";

interface Message {
  code: number;
  message: string;
}

export const EjecutarConTry = async (action, message: Message) => {
  try {
    const result = await action();

    BaseResponse.code = message.code;
    BaseResponse.message = message.message;
    BaseResponse.data = result;

    return BaseResponse;
  } catch (err: any) {
    console.error("[ERROR-LOG]:", err);

    if (err instanceof AplicacionError) {
      const errorAplicacion = manejarErrorAplicacion(err);

      ErrorResponse.code = errorAplicacion.code;
      ErrorResponse.message = errorAplicacion.message;
    } else {
      ErrorResponse.code = ErrorCodes.excepcionNoControlada.code;
      ErrorResponse.message = err.message;
    }

    return ErrorResponse;
  }
};

const manejarErrorAplicacion = (error: AplicacionError) => {
  return { code: error.code, message: error.message };
};

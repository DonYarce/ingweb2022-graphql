export const ErrorCodes = {
  // Excepciones de validacion
  excepcionNoControlada: { code: 501, message: "Excepción no controlada." },
  excepcionValidacion: { code: 502, message: "Error de validación." },
  excepcionContrasena: { code: 503, message: "Las contraseñas no coinciden." },
  excepcionUsuarioNoExiste: { code: 504, message: "El usuario no existe, verifique sus datos."},
  excepcionUsuariExiste: { code: 505, message: "El usuario ya existe, intente con otro email."},
  excepcionUsuarioContrasena: { code: 506, message: "Contraseña incorrecta, verifique sus datos."},

  // Excepciones de horario
  excepcionHorarioExiste: { code: 520, message: "El horario ya fue asignado."},
  excepcionHorarioIncorrecto : { code: 521, message: "El horario de apertura debe ser anterior al horario de cierra."},	
  excepcionHorarioNoExiste: { code: 522, message: "El restaurante no existe, verifique sus datos."},
  excepcionNoHorarioSede: { code: 523, message: "Esa sede no tiene horarios."},

  // Excepciones de sede
  excepcionSedeNoExiste: { code: 531, message: "La sede no existe, verifique sus datos."},
  excepcionSedeExiste: { code: 532, message: "La sede ya existe, intente con otro nombre."},
  excepcionSedeNoActualizada: { code: 533, message: "La sede no se pudo actualizar, intente de nuevo."},
  excepcionSedeNoCreada: { code: 534, message: "La sede no se pudo crear, intente de nuevo."},
  excepcionSedeNoListada: { code: 535, message: "Las sedes no se pudieron listar, intente de nuevo."},
  excepcionSedeNoListadaPorRestaurante: { code: 536, message: "Las sedes no se pudieron listar, intente de nuevo."},
  excepcionSedeNoListadaPorUsuario: { code: 537, message: "Las sedes no se pudieron listar, intente de nuevo."},
  excepcionSedeNoListadaPorIdRestaurante: { code: 538, message: "La sede no se pudo listar, intente de nuevo."},

  // Excepciones de restaurante
  excepcionRestauranteExiste: { code: 541, message: "El restaurante ya existe, intente con otro nombre."},
  excepcionRestauranteNoExiste: { code: 542, message: "El restaurante no existe, verifique sus datos."},
  excepcionReservaExiste: { code: 550, message: "La reserva ya existe, intente con otra fecha u hora."},
  
  // Excepciones de reservas
  excepcionReservaNoExiste: { code: 551, message: "La reserva no existe, intente con otra fecha u hora."},

  // Excepciones de autenticación
  excepcionTokenNulo: { code: 540, message: "Para realizar esta operacion debes estar loggeado, token nulo o invalido, en el header de authorization."},
  excepcionNoAdmin: { code: 541, message: "El usuario no es administrador."},
  excepcionUsuarioActualizar:  { code: 542, message: "No puedes modificar otro usuario sin ser administrador."},

  // Excepciones de mesas
  excepcionMesaNoExiste: { code: 580, message: "La mesa no existe, verifique sus datos."},

  // Excepciones de headquarter
  excepcionHeadquarterNoExiste: { code: 591, message: "La sede no existe, verifique sus datos."},
};

export const SucessCodes = {
  // Exito de usuario
  usuarioRegistrado: { code: 201, message: "Usuario registrado correctamente." },
  usuarioLoggeado: {code: 202, message: "Login exitoso."},
  usuariosListado: {code: 203, message: "Listado de usuarios."},
  usuariosEncontrado: {code: 204, message: "Usuario encontrado."},
  usuarioActualizado: {code: 204, message: "Usuario actualizado."},
  
  // Exito de sede
  sedeCreada: { code: 231, message: "Sede creada correctamente." },
  sedeEliminada: { code: 232, message: "Sede eliminada correctamente." },

  // Exito de horarios
  horarioCreado: {code: 220, message: "Horario creado."},
  horarioListado: {code: 221, message: "Horario listado."},
  horarioActualizado: {code: 222, message: "Horario actualizado."},
  horarioEliminado: {code: 223, message: "Horario eliminado."},

  // Exito de restaurantes
  restauranteCreado: { code: 241, message: "Restaurante registrado correctamente." },
  restauranteListado: { code: 242, message: "Listado de restaurantes." },
  restauranteEncontrado: { code: 243, message: "Restaurante encontrado." },
  restauranteActualizado: { code: 244, message: "Restaurante actualizado correctamente." },
  

  reservaCreada: { code: 250, message: "Reserva creada correctamente." },
  reservasListadas: {code: 251, message: "Listado de reservas."},
  reservaEncontrada: {code: 252, message: "Reserva encontrada."},
  reservaEliminada: {code: 253, message: "Reserva eliminada."},
  reservasListadasPorDia: {code: 254, message: "Listado de reservas por diario."},

  //Exito de mesas
  mesaEncontrada: {code: 280, message: "Mesa encontrado."},
  mesasListado: {code: 281, message: "Listado de mesas."},
  mesaCreada: { code: 282, message: "Mesa agregada correctamente." },
  mesaEliminada: { code: 283, message: "Mesa eliminada correctamente." },
  mesaActualizada: { code: 284, message: "Mesa actualizada actualizada correctamente." },

  //Exito de headquarter
  sedeEncontrada: {code: 291, message: "Sede encontrada."},
  sedesListadas: {code: 292, message: "Listado de sedes."},
  sedeActualizada: {code: 293, message: "Sede actualizada correctamente."},
};

import { Resolver } from "types";
import { ReservationService } from "../../../services";

export const ReservationResolvers: Resolver = {
  Mutation: {
    createReservation: async (parent, args) => {
      return await ReservationService.createReservation(args.input);
    },
    createReservationFromReservation: async (parent, args) => {
      return await ReservationService.createReservationFromReservation(
        args.input
      );
    },
    deleteReservation: async (parent, args) => {
      return await ReservationService.deleteReservation(args.id);
    },
  },
  Query: {
    getReservations: async (parent, args) => {
      return await ReservationService.getReservations();
    },
    getResertionOrderByDate: async (parent, args) => {
        return await ReservationService.getReservationsOrderByDate();
    },
    getReservationByUserId: async (parent, args) => {
      return await ReservationService.getReservationsByUserId(args.input);
    },
    getReservationById: async (parent, args) => {
      return await ReservationService.getReservationById(args.input);
    },
  },
};

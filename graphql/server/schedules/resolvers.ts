import { Resolver } from "types";
import { SchedulesService } from "../../../services";

export const ScheduleResolvers: Resolver = {
  Mutation: {
    createSchedule: async (parent, args) => {
      return await SchedulesService.createSchedule(args.input);
    },
    updateSchedule: async (parent, args) => {
      return await SchedulesService.updateSchedule(args.input);
    },

    deleteSchedule: async (parent, args) => {
      return await SchedulesService.deleteSchedule(args.input);
    }
  },
  Query: {
    getSchedules: async () => {
      return await SchedulesService.getSchedules();
    },
    getScheduleById: async (parent, args) => {
      return await SchedulesService.getScheduleById(args.id);
    },
    getSchedulesByHeadquarter: async (parent, args) => {
      return await SchedulesService.getSchedulesbyHeadquarter(args.headquarterId);
    }
  },
};


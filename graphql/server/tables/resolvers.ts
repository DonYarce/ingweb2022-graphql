import { Resolver } from "types";
import { TableService } from "services/tables/table.service";

export const TableResolvers: Resolver = {
  Mutation: {
    createTable: async (parent, { input }) => {
      return await TableService.createTable(input);
    },
    updateTable: async (parent, { input }) => {
      return await TableService.updateTable(input);
    },
    deleteTable: async (parent, args) => {
      return await TableService.deleteTable(args.id);
    }
  },
  Query: {
    getTableById: async (parent, args) => {
      return await TableService.getTable(args.id);
    },
    getTables: async (parent, { input }) => {
      return await TableService.getTables();
    },
  },
};
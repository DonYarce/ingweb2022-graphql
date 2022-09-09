import { Resolver } from "types";
import { UserService } from "../../../services";

export const UserResolvers: Resolver = {
  Mutation: {
    registerUser: async (parent, args) => {
      return await UserService.registerUser(args.input);
    },
    loginUser: async (parent, args, ctx, info) => {
      return await UserService.loginUser(args.input);
    },
    updateUser: async (parent, args, ctx) => {
      return await UserService.updateUser(args.input, ctx.auth);
    },
  },
  Query: {
    getUsers: async () => {
      return await UserService.getUsers();
    },
  },
};

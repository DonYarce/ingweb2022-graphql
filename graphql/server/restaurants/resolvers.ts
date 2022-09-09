import { Resolver } from "types";
import { RestaurantService } from "../../../services";

export const RestaurantResolvers: Resolver = {
  Mutation: {
    createRestaurant: async (parent, args, ctx) => {
      return await RestaurantService.createRestaurant(args.input, ctx.auth);
    },
    updateRestaurant: async (parent, args) => {
      return await RestaurantService.updateRestaurant(args.input);
    },
  },
  Query: {
    getRestaurants: async () => {
      return await RestaurantService.getRestaurants();
    },
    getRestaurantById: async (parent, args) => {
      return await RestaurantService.getRestaurantById(args.input);
    },
    getRestaurantByType: async (parent, args) => {
      return await RestaurantService.getRestaurantByType(args.type);
    },
  },
};

import { Resolver } from "types";
import { HeadquarterService } from "../../../services";

export const HeadquarterResolvers: Resolver = {
  Mutation: {
    createHeadquarter: async (parent, args) => {
      return await HeadquarterService.createHeadquarter(args.input);
    },
    updateHeadquarter: async (parent, args) => {
      //Todo usuario puede actualizar su perfil, el admin puede actualizar cualquier perfil
      return await HeadquarterService.updateHeadquarter(args.input);
    },
  },
  Query: {
    getHeadquarters: async () => {
      return await HeadquarterService.getHeadquarters();
    },
    getHeadquarterById: async (parent, args) => {
      return await HeadquarterService.getHeadquarterById(args.id);
    },
    getHeadquartersByRestaurant: async (parent, args) => {
      return await HeadquarterService.getHeadquartersByRestaurant(
        args.restaurantId
      );
    },
  },
};

const baseResponseTest = {
  code: 123,
  status: "SUCCESSFUL",
  message: "Respuesta correcta mi papa",
  data: {},
};

const mockedHeadquarters = {
  code: 234,
  status: "SUCCESSFUL",
  message: "Respuesta correcta mi papa",
  data: [
    {
      id: 1,
      email: "fake1@gmail.com",
      name: "fake1",
      phoneNumber: "1",
      document: "doc1",
      documentType: "cc",
      role: "ADMIN",
    },
    {
      id: 2,
      email: "fake2@gmail.com",
      name: "fake2",
      phoneNumber: "2",
      document: "doc2",
      documentType: "cc",
      role: "ADMIN",
    },
    {
      id: 3,
      email: "fake3@gmail.com",
      name: "fake3",
      phoneNumber: "3",
      document: "doc3",
      documentType: "cc",
      role: "ADMIN",
    },
  ],
};

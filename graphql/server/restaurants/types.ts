import { gql } from "apollo-server-micro";
import { GenericResponse } from "../generic";

export const RestaurantTypes = gql`
  # Generic types
  ${GenericResponse}

  type RestaurantResponse implements IGenericResponse {
    code: Int!
    status: EnumStatus!
    message: String!
    data: Restaurant
  }

  type RestaurantListResponse implements IGenericResponse {
    code: Int!
    status: EnumStatus!
    message: String!
    data: [Restaurant]!
  }

  type Mutation {
    createRestaurant(input: CreateRestaurantInput!): RestaurantResponse!
    updateRestaurant(input: UpdateRestaurantInput!): RestaurantResponse!
  }

  type Query {
    getRestaurants: RestaurantListResponse!
    getRestaurantById: RestaurantListResponse
    getRestaurantByType(type: RestaurantTypeEnum!): RestaurantListResponse
    updateRestaurant: RestaurantResponse
  }

  type Restaurant {
    id: ID
    name: String!
    phoneNumber: String!
    type: RestaurantTypeEnum!
    userId: String
  }

  # Input types
  input CreateRestaurantInput {
    name: String!
    phoneNumber: String!
    type: RestaurantTypeEnum!
  }

  # input UpdateRestaurantInput {
  input UpdateRestaurantInput {
    id: ID!
    name: String
    phoneNumber: String
    type: RestaurantTypeEnum
  }

  enum RestaurantTypeEnum {
  JUNKFOOD
  VEGETARIANFOOD
  MEATFOOD
  DESSERTFOOD
  JAPANESEFOOD
  PERUVIANFOOD
  COLOMBIANFOOD
  MEXICANFOOD
  ITALIANFOOD
  CHINAFOOD
}
`;




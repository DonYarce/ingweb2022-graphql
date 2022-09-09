import { gql } from "apollo-server-micro";
import { GenericResponse } from "../generic";

export const HeadquarterTypes = gql`
  # Generic types
  ${GenericResponse}

  type HeadquarterResponse implements IGenericResponse {
    code: Int!
    status: EnumStatus!
    message: String!
    data: Headquarter
  }

  type HeadquarterListResponse implements IGenericResponse {
    code: Int!
    status: EnumStatus!
    message: String!
    data: [Headquarter]
  }

  # Mutation type definition"
  type Mutation {
    createHeadquarter(input: HeadquarterCreateInput!): HeadquarterResponse
    updateHeadquarter(input: HeadquarterUpdateInput!): HeadquarterResponse
  }

  # Query type definition"
  type Query {
    getHeadquarters: HeadquarterListResponse
    getHeadquarterById(id: ID!): HeadquarterResponse
    getHeadquartersByRestaurant(restaurantId: ID!): HeadquarterListResponse
  }

  # Headquarter types definition"
  type Headquarter {
    id: ID
    name: String!
    phoneNumber: String!
    address: String!
    restaurantId: String!
    schedules: [Schedule]
    tables: [Table]
    createdAt: String
    updatedAt: String
  }

  # Input types definition"
  input HeadquarterCreateInput {
    name: String!
    address: String!
    restaurantId: String!
    phoneNumber: String
  }

  input HeadquarterUpdateInput {
    id: ID!
    name: String
    address: String
    restaurantId: String
    phoneNumber: String
  }





`;

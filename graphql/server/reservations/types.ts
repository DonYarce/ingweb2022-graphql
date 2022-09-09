import { gql } from "apollo-server-micro";
import { GenericResponse } from "../generic";

export const ReservationTypes = gql`
  # Generic types
  ${GenericResponse}

  type ReservationResponse implements IGenericResponse {
    code: Int!
    status: EnumStatus!
    message: String!
    data: Reservation
  }

  type ReservationListResponse implements IGenericResponse {
    code: Int!
    status: EnumStatus!
    message: String!
    data: [Reservation!]!
  }

  # Mutation type definition"
  type Mutation {
    createReservation(input: ReservationCreateInput!): ReservationResponse
    createReservationFromReservation(input: CreateFromReservationInput!): ReservationResponse
    deleteReservation(id: ID!): ReservationResponse
  }

  # Query type definition"
  type Query {
    getReservations: ReservationListResponse
    getResertionOrderByDate: ReservationListResponse
    getReservationById(id: ID!): ReservationResponse
    getReservationByUserId(userId: ID!): ReservationListResponse
  }

  # Reservation types definition"
  type Reservation {
    ocassion: String
    numberOfPeople: Int!
    userId: String!
    tableId: String!
    date: String!
  }

  # Input types definition"
  input ReservationCreateInput {
    ocassion: String!
    numberOfPeople: Int!
    userId: String!
    tableId: String!
    date: String!
  }

  # Input types definition"
  input CreateFromReservationInput {
    date: String!
    id: ID!
  }
`;

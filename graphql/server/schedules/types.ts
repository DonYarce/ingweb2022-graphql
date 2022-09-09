import { gql } from "apollo-server-micro";
import { GenericResponse } from "../generic";

export const ScheduleTypes = gql`
  # Generic types
  ${GenericResponse}

  type ScheduleResponse implements IGenericResponse {
    code: Int!
    status: EnumStatus!
    message: String!
    data: Schedule
  }

  type ScheduleListResponse implements IGenericResponse {
    code: Int!
    status: EnumStatus!
    message: String!
    data: [Schedule!]!
  }

  # Mutation type definition"
  type Mutation {
    createSchedule(input: CreateScheduleInput!): ScheduleResponse!
    updateSchedule(input: UpdateScheduleInput!): ScheduleResponse!
    deleteSchedule(id: ID!): ScheduleResponse!
  }

  # Query type definition"
  type Query {
    getSchedules: ScheduleListResponse
    getScheduleById(id: ID!): ScheduleResponse!
    getSchedulesByHeadquarter(headquarterId: ID!): ScheduleListResponse!
  }

  # schedule types definition"
  type Schedule {
    id: ID
    startTime: String!
    endTime: String!
    headquarterId: String!
    day: DayTypeEnum!
  }

  # Input types definition"
  input CreateScheduleInput {
    startTime: String!
    endTime: String!
    headquarterId: String!
    day: DayTypeEnum!
  }

  input UpdateScheduleInput {
    id: ID!
    startTime: String
    endTime: String
    headquarterId: String
    day: DayTypeEnum
  }

  enum DayTypeEnum {
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
    SUNDAY
  }
`;

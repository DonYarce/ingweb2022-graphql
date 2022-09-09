import { gql } from "apollo-server-micro";
import { GenericResponse } from "../generic";

export const TableTypes = gql`
  # Generic types
  ${GenericResponse}

  type TableResponse implements IGenericResponse {
    code: Int!
    status: EnumStatus!
    message: String!
    data: Table
  }

  type TableListResponse implements IGenericResponse {
    code: Int!
    status: EnumStatus!
    message: String!
    data: [Table!]!
  }

  # Mutation type definition"
  type Mutation {
    createTable(input: TableCreateInput!): TableResponse
    updateTable(input: TableUpdateInput!): TableResponse
    deleteTable(id: ID!): TableResponse
  }

  # Query type definition"
  type Query {
    getTables: TableListResponse
    getTableById(id: ID!): TableResponse
  }

  # Table types definition"
  type Table {
    id: ID
    number: String!
    capacity: Int!
    headquarterId: String!
  }

  # Input types definition"
  input TableCreateInput {
    number: String!
    capacity: Int!
    headquarterId: String!
  }

  input TableUpdateInput {
    id: ID!
    number: String
    capacity: Int
    headquarterId: String
  }
`;

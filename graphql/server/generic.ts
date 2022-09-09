import { gql } from "apollo-server-micro";

export const GenericResponse = gql`
  # Generic response type definition
  interface IGenericResponse {
    code: Int!
    status: EnumStatus!
    message: String!
  }

  # Enum status
  enum EnumStatus {
    SUCCESSFUL
    FAILED
  }
`;

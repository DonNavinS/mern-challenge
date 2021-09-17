import { gql } from "@apollo/client";

export const GET_ME = gql`
  type Query {
    me: User
  }
`;

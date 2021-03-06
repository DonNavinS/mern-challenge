import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $authors: [String!]
    $description: String!
    $title: String!
    $bookId: ID!
  ) {
    saveBook(
      authors: $authors
      description: $description
      title: $title
      bookId: $bookId
    ) {
      _id
      username
      email
      bookCount
      savedBooks {
        title
      }
    }
  }
`;

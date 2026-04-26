import { gql } from '@apollo/client';

export const GET_SESSION = gql`
  query GetSession($id: ID!) {
    session(id: $id) {
      id
      name
      currentSlideIndex
      slides {
        id
        type
        content
        order
      }
    }
  }
`;

export const GET_QUESTIONS = gql`
  query GetQuestions($sessionId: ID!) {
    questions(sessionId: $sessionId) {
      id
      text
      upvotes
      answered
    }
  }
`;

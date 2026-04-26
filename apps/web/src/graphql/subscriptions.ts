import { gql } from '@apollo/client';

export const SESSION_UPDATED = gql`
  subscription SessionUpdated($sessionId: ID!) {
    sessionUpdated(sessionId: $sessionId) {
      id
      currentSlideIndex
    }
  }
`;

export const NEW_REACTION = gql`
  subscription NewReaction($sessionId: ID!) {
    newReaction(sessionId: $sessionId) {
      id
      emoji
    }
  }
`;

export const NEW_QUESTION = gql`
  subscription NewQuestion($sessionId: ID!) {
    newQuestion(sessionId: $sessionId) {
      id
      text
      upvotes
      answered
    }
  }
`;

export const QUESTION_UPVOTED = gql`
  subscription QuestionUpvoted($sessionId: ID!) {
    questionUpvoted(sessionId: $sessionId) {
      id
      upvotes
    }
  }
`;

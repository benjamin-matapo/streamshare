import { gql } from '@apollo/client';

export const CREATE_SESSION = gql`
  mutation CreateSession($name: String!) {
    createSession(name: $name) {
      id
      name
    }
  }
`;

export const ADD_SLIDE = gql`
  mutation AddSlide($sessionId: ID!, $type: String!, $content: String!, $order: Int!) {
    addSlide(sessionId: $sessionId, type: $type, content: $content, order: $order) {
      id
    }
  }
`;

export const NEXT_SLIDE = gql`
  mutation NextSlide($sessionId: ID!) {
    nextSlide(sessionId: $sessionId) {
      id
      currentSlideIndex
    }
  }
`;

export const PREV_SLIDE = gql`
  mutation PrevSlide($sessionId: ID!) {
    prevSlide(sessionId: $sessionId) {
      id
      currentSlideIndex
    }
  }
`;

export const GO_TO_SLIDE = gql`
  mutation GoToSlide($sessionId: ID!, $index: Int!) {
    goToSlide(sessionId: $sessionId, index: $index) {
      id
      currentSlideIndex
    }
  }
`;

export const SEND_REACTION = gql`
  mutation SendReaction($sessionId: ID!, $emoji: String!) {
    sendReaction(sessionId: $sessionId, emoji: $emoji) {
      id
      emoji
    }
  }
`;

export const ASK_QUESTION = gql`
  mutation AskQuestion($sessionId: ID!, $text: String!) {
    askQuestion(sessionId: $sessionId, text: $text) {
      id
      text
      upvotes
      answered
    }
  }
`;

export const UPVOTE_QUESTION = gql`
  mutation UpvoteQuestion($questionId: ID!) {
    upvoteQuestion(questionId: $questionId) {
      id
      upvotes
    }
  }
`;

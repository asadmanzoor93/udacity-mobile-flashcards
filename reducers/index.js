import {RECEIVE_DECKS_SUCCESS, ADD_DECK_SUCCESS, REMOVE_DECK_SUCCESS, ADD_CARD_SUCCESS} from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS_SUCCESS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK_SUCCESS:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      };
    case REMOVE_DECK_SUCCESS:
      const { id } = action;
      const { [id]: value, ...remainingDecks } = state;
      return remainingDecks;
    case ADD_CARD_SUCCESS:
      const { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: [...state[deckId].questions].concat(card)
        }
      };
    default:
      return state;
  }
}

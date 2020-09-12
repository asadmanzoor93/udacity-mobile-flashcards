import {getDecks, saveDeckTitle, removeDeckStorage, addCardToDeckStorage} from '../services/api';

export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS';
export const REMOVE_DECK_SUCCESS = 'REMOVE_DECK_SUCCESS';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const RECEIVE_DECKS_SUCCESS = 'RECEIVE_DECKS_SUCCESS';

export const receiveDecksSuccess = (decks)=> {
  return {
    type: RECEIVE_DECKS_SUCCESS,
    decks
  };
}

export function addDeckSuccess(title){
  return {
    type: ADD_DECK_SUCCESS,
    title
  };
}

export function addCardToDeckSuccess(deckId, card){
  return {
    type: ADD_CARD_SUCCESS,
    deckId,
    card
  };
}

export function removeDeckSuccess(id){
  return {
    type: REMOVE_DECK_SUCCESS,
    id
  };
}

export const fetchInitialData = () => {
  return dispatch => {
    return getDecks().then(decks => {
      dispatch(receiveDecksSuccess(decks));
    });
  };
}

export function addDeck(title) {
  return dispatch => {
    saveDeckTitle(title)
    return dispatch(addDeckSuccess(title))
  };
}

export function addCardToDeck(deckId, card){
  return dispatch => {
    return addCardToDeckStorage(deckId, card).then(
        r =>dispatch(addCardToDeckSuccess(deckId, card))
    );
  };
}

export const removeDeck = (id) => {
  return dispatch => {
    return removeDeckStorage(id).then(r => dispatch(removeDeckSuccess(id)));
  };
}

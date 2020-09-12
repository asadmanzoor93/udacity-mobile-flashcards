import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

import { white, brown } from '../../helpers';

const Deck = (props) => {
  const { deck } = props;

  if (deck === undefined) {
    return <View style={styles.deckContainer} />;
  }
  return (
    <View style={styles.deckContainer}>
      <View>
        <Text style={styles.deckText}>Deck: {deck.title}</Text>
      </View>
      <View>
        <Text style={styles.cardText}>No of Card: {deck.questions.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deckText: {
    fontSize: 28,
    color: white
  },
  cardText: {
    fontSize: 18,
    color: white
  },
  deckContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor: brown,
    backgroundColor: brown,
    borderRadius: 5,
    marginBottom: 10
  }
});

const mapStateToProps = (state, { id }) => {
  const deck = state[id];

  return {
    deck
  };
};

export default connect(mapStateToProps)(Deck);

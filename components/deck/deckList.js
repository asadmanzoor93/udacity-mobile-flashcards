import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import Deck from './deck';
import { green, yellow } from '../../helpers';
import { fetchInitialData } from '../../actions';

export class DeckList extends Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }
  render() {
    const { decks, navigation } = this.props;
    const deckListing = Object.values(decks).map(deck => {
      return (
          <TouchableOpacity
              key={deck.title}
              onPress={() =>
                  navigation.navigate('DeckDetail', { title: deck.title })
              }
          >
            <Deck id={deck.title} />
          </TouchableOpacity>
      );
    })

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Udacity Mobile Flashcards</Text>
        <Text style={styles.subTitle}>Decks</Text>
        {deckListing}
        <View style={{ marginBottom: 30 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 16,
    color: green
  },
  subTitle: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 16,
    color: green
  },
  container: {
    flex: 1,
    paddingTop: 16,
    paddingRight: 16,
    backgroundColor: yellow,
    paddingLeft: 16,
    paddingBottom: 16,
  },
});

const mapStateToProps = state => ({ decks: state });

export default connect(
  mapStateToProps,
  { fetchInitialData }
)(DeckList);

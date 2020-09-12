import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import { View, StyleSheet } from 'react-native';

import {removeDeck} from '../../actions/index';
import ClickButton from '../button/clickButton';
import TextButton from '../button/textButton';
import Deck from "./deck";
import { yellow, textGray, green, white, red } from '../../helpers';

export class DeckDetail extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }

  handleDelete = id => {
    const { removeDeck, navigation } = this.props;
    removeDeck(id);
    navigation.goBack();
  };

  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <Deck id={deck.title} />
        <View>
          <ClickButton
            btnStyle={{ backgroundColor: white, borderColor: textGray }}
            txtStyle={{ color: textGray }}
            onPress={() =>
              this.props.navigation.navigate('AddCard', { title: deck.title })
            }
          >
            Add Card
          </ClickButton>
          <ClickButton
            btnStyle={{ backgroundColor: green, borderColor: green }}
            txtStyle={{ color: white }}
            onPress={() =>
              this.props.navigation.navigate('Quiz', { title: deck.title })
            }
          >
            Start Quiz
          </ClickButton>
        </View>
        <TextButton
          txtStyle={{ color: red }}
          onPress={() => this.handleDelete(deck.title)}
        >
          Delete Deck
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-around',
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: yellow
  }
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');
  const deck = state[title];

  return {
    deck
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ removeDeck }, dispatch)
  };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckDetail);

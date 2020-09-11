import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import TextButton from '../button/textButton';
import ClickButton from '../button/clickButton';
import ResultDetail from "./resultDetail";
import RestrictedQuiz from "./restrictedQuiz";
import deck from "../deck/deck";
import { gray, green, red, darkGray, white } from '../../helpers';

const screen = {
  QUESTION: 'question',
  ANSWER: 'answer',
  RESULT: 'result'
};
const answer = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};

export class AndroidDevice extends Component {
  state = {
    show: screen.QUESTION,
    correct: 0,
    incorrect: 0,
    questionCount: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0)
  };
  handlePageChange = evt => {
    this.setState({
      show: screen.QUESTION
    });
  };
  handleAnswer = (response, page) => {
    if (response === answer.CORRECT) {
      this.setState(prevState => ({ correct: prevState.correct + 1 }));
    } else {
      this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }));
    }
    this.setState(
        prevState => ({
          answered: prevState.answered.map((val, index) => (page === index ? 1 : val))
        }),
        () => {
          const { correct, incorrect, questionCount } = this.state;

          if (questionCount === correct + incorrect) {
            this.setState({ show: screen.RESULT });
          } else {
            this.viewPager.setPage(page + 1);
            this.setState(prevState => ({
              show: screen.QUESTION
            }));
          }
        }
    );
  };
  handleReset = () => {
    this.setState(prevState => ({
      show: screen.QUESTION,
      correct: 0,
      incorrect: 0,
      answered: Array(prevState.questionCount).fill(0)
    }));
  };
  render() {
    const { questions } = this.props.deck;
    const { show } = this.state;

    if (questions.length === 0) {
      return <RestrictedQuiz />;
    }

    if (this.state.show === screen.RESULT) {
      const { correct, questionCount } = this.state;
      const percent = ((correct / questionCount) * 100).toFixed(0);

      return (
          <ResultDetail
              deck={deck}
              navigation={this.props.navigation}
              handleReset={this.handleReset}
              percent={percent}
          />
      );
    }

    return (
        <ViewPager
            style={styles.container}
            scrollEnabled={true}
            onPageSelected={this.handlePageChange}
            ref={viewPager => {
              this.viewPager = viewPager;
            }}
        >
          {questions.map((question, index) => (
              <View style={styles.pageStyle} key={index}>
                <View style={styles.block}>
                  <Text style={styles.count}>
                    {index + 1} / {questions.length}
                  </Text>
                </View>
                <View style={[styles.block, styles.questionContainer]}>
                  <Text style={styles.questionText}>
                    {show === screen.QUESTION ? 'Question' : 'Answer'}
                  </Text>
                  <View style={styles.questionWrapper}>
                    <Text style={styles.title}>
                      {show === screen.QUESTION
                          ? question.question
                          : question.answer}
                    </Text>
                  </View>
                </View>
                {show === screen.QUESTION ? (
                    <TextButton
                        txtStyle={{ color: red }}
                        onPress={() => this.setState({ show: screen.ANSWER })}
                    >
                      Show Answer
                    </TextButton>
                ) : (
                    <TextButton
                        txtStyle={{ color: red }}
                        onPress={() => this.setState({ show: screen.QUESTION })}
                    >
                      Show Question
                    </TextButton>
                )}
                <View>
                  <ClickButton
                      btnStyle={{ backgroundColor: green, borderColor: white }}
                      onPress={() => this.handleAnswer(answer.CORRECT, index)}
                      disabled={this.state.answered[index] === 1}
                  >
                    Correct
                  </ClickButton>
                  <ClickButton
                      btnStyle={{ backgroundColor: red, borderColor: white }}
                      onPress={() => this.handleAnswer(answer.INCORRECT, index)}
                      disabled={this.state.answered[index] === 1}
                  >
                    Incorrect
                  </ClickButton>
                </View>
              </View>
          ))}
        </ViewPager>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageStyle: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray,
    justifyContent: 'space-around'
  },
  block: {
    marginBottom: 20
  },
  count: {
    fontSize: 24
  },
  title: {
    fontSize: 32,
    textAlign: 'center'
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: darkGray,
    backgroundColor: white,
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexGrow: 1
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  questionText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 20
  },
  resultTextGood: {
    color: green,
    fontSize: 46,
    textAlign: 'center'
  },
  resultTextBad: {
    color: red,
    fontSize: 46,
    textAlign: 'center'
  }
});


const mapStateToProps = (state, { title }) => {
  const deck = state[title];

  return {
    deck
  };
};

export default withNavigation(connect(mapStateToProps)(AndroidDevice));

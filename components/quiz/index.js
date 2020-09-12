import React, { Component } from 'react';
import Constants from 'expo-constants';

import AndroidQuiz from './androidDevice';
import IOSQuiz from './iOSDevice';
import { setNotification, clearNotification } from '../../helpers';

export class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', '');
    return {
      title: `${title} Quiz`
    };
  };
  componentDidMount() {
    clearNotification().then(setNotification);
  }

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', '');

    if (Constants.platform.android) {
      return <AndroidQuiz title={title} />;
    }
    return <IOSQuiz title={title} />;
  }
}

export default Quiz;

import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import Home from "./components/home";
import { store, setNotification } from './helpers';


export default class App extends React.Component {
    componentDidMount() {
        setNotification();
    }
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Home />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dde'
    }
});

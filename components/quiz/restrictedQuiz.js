import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {gray, lightGreen} from '../../helpers';

export const RestrictedQuiz =()=> {
    return (
        <View style={styles.pageStyle}>
            <View style={styles.block}>
                <Text style={[styles.count, { textAlign: 'center' }]}>
                    You cannot take a quiz because there are no cards in the deck.
                </Text>
                <Text style={[styles.count, { textAlign: 'center' }]}>
                    Please add some cards and try again.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: lightGreen,
        justifyContent: 'space-around'
    },
    block: {
        marginBottom: 20
    },
    count: {
        fontSize: 24
    }
});

export default RestrictedQuiz;

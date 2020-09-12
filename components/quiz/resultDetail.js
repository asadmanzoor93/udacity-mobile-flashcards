import React  from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ClickButton from '../button/clickButton';
import {blue, brown, green, red, white, yellow} from '../../helpers';

export const ResultDetail =(props)=>{
    const {handleReset, navigation, percent} = props;
    const resultStyle = percent >= 80 ? styles.resultTextGood : styles.resultTextBad;

    return (
        <View style={styles.pageStyle}>
            <View style={styles.block}>
                <Text style={[styles.count, { textAlign: 'center' }]}>
                    Quiz Attempt Complete!
                </Text>
            </View>
            <View style={styles.block}>
                <Text style={[styles.count, { textAlign: 'center' }]}>
                    Quiz Score:
                </Text>
                <Text style={resultStyle}>{percent}%</Text>
            </View>
            <View>
                <ClickButton
                    btnStyle={{ backgroundColor: green, borderColor: green }}
                    onPress={handleReset}
                >
                    Restart Quiz
                </ClickButton>
                <ClickButton
                    btnStyle={{ backgroundColor: brown, borderColor: brown }}
                    txtStyle={{ color: white }}
                    onPress={() => {
                        handleReset();
                        navigation.goBack();
                    }}
                >
                    Back To Deck
                </ClickButton>
                <ClickButton
                    btnStyle={{ backgroundColor: blue, borderColor: blue }}
                    txtStyle={{ color: white }}
                    onPress={() => {
                        handleReset();
                        navigation.navigate('Home');
                    }}
                >
                    Home
                </ClickButton>
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
        backgroundColor: yellow,
        justifyContent: 'space-around'
    },
    block: {
        marginBottom: 20
    },
    count: {
        fontSize: 24
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


export default ResultDetail;

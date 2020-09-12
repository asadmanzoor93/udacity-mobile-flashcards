import React, {Fragment} from 'react';
import { View, StatusBar } from 'react-native';
import Constants from 'expo-constants';

import AppNavigator from '../navigation/appNavigator';

function CustomStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
}

const Home =(props)=> {
    return (
        <Fragment>
            <CustomStatusBar
                backgroundColor="green"
                barStyle="light-content"
            />
            <AppNavigator />
        </Fragment>
    );
}

export default Home;
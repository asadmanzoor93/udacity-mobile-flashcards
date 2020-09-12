import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import * as Icon from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import DeckList from '../deck/deckList';
import AddDeck from '../deck/addDeck';
import DeckDetail from '../deck/deckDetail';
import AddCard from '../card/addCard';
import Quiz from '../quiz';

import { darkGray, white, green, lightGreen } from '../../helpers';

const isIOS = Platform.OS === 'ios';

const routeConfig = {
    Decks: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => (
                <Icon.Ionicons
                    name={isIOS ? 'ios-bookmarks' : 'md-bookmarks'}
                    size={30}
                    color={tintColor}
                />
            )
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => (
                <Icon.FontAwesome name="plus-square" size={30} color={tintColor} />
            )
        }
    }
};

const tabConfig = {
    navigationOptions: {
        headerShown: false
    },
    defaultNavigationOptions: {
        bounces: true
    },
    tabBarOptions: {
        activeTintColor: green,
        style: {
            height: 60,
            backgroundColor: white,
            shadowColor: 'rgba(0,0,0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1,
            borderTopWidth: 1,
            borderTopColor: 'red'
        },
        labelStyle: {
            fontSize: 12,
            fontWeight: 'bold'
        },
        tabStyle: {
            marginTop: 5,
            marginBottom: 3
        },
        showIcon: true
    }
};

const TabsNavigator = createBottomTabNavigator(routeConfig, tabConfig);

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: TabsNavigator
        },
        DeckDetail: {
            screen: DeckDetail,
            navigationOptions: {
                headerTintColor: green,
                headerStyle: {
                    backgroundColor: darkGray
                },
                title: 'Deck Detailed Information'
            }
        },
        AddCard: {
            screen: AddCard,
            navigationOptions: {
                headerTintColor: green,
                headerStyle: {
                    backgroundColor: darkGray
                },
                headerTitleStyle: {
                    justifyContent: 'center',
                    textAlign: 'center'
                },
                title: 'Add Card'
            }
        },
        Quiz: {
            screen: Quiz,
            navigationOptions: {
                headerTitleAlign: 'center',
                headerTintColor: green,
                headerStyle: {
                    backgroundColor: darkGray
                },
                title: 'Quiz'
            }
        }
    }
);

export default createAppContainer(AppNavigator);

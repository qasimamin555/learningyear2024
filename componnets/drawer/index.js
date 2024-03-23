import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ParentsHome from "../parents/home/ParentsHome";
import {NavigationContainer} from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default function DrawerSettings() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={ParentsHome}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

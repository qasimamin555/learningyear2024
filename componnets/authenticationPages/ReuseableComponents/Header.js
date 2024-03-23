import React, {useEffect, useState} from "react";
import {Text, View, Button, BackHandler, Alert, Image} from 'react-native';
import styles from "../../rootStyling";
import splashStyling from "../../splashScreens/splashScreensStyling";
import {TextInput} from 'react-native-paper';
import splashScreenThree from "../../../assets/SplashScreen/Splash_3.png";

export default function Header(props) {
    return (
        <View style={{width:"100%", padding:50, paddingBottom:20, position:"absolute"}}>
            <Text style={{textAlign:"center", fontWeight:"bold"}}>{props?.headerName}</Text>
        </View>
    );
}

import React from "react";
import {Text, View, Button, Image} from 'react-native';
import styles from "../../rootStyling";
import splashStyling from "../../splashScreens/splashScreensStyling";
import {TextInput} from 'react-native-paper';
import splashScreenThree from "../../../assets/SplashScreen/Splash_3.png";

export default function Email() {
    return (
        <View style={[styles.container]}>
            <View style={[splashStyling.splashScreenBack, {height: "40%"}]}/>
            <View style={splashStyling.splashScreenContainer}>
                <View style={{height: "90%"}}>
                    <View style={{
                        height: "40%",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        margin: "auto",
                        marginBottom: "10%"
                    }}>
                        <Image source={splashScreenThree}/>
                    </View>
                    <View style={[splashStyling.splashScreenContent, {width: "100%", marginTop: "10%"}]}>
                        <TextInput
                            label="Enter Email"
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                        />
                        <View style={{width: "100%", marginTop: "40%"}}>
                            <Button color={"#FFB906"} title={"Next"}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

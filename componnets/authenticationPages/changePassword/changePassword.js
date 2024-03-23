import React, {useEffect, useState} from "react";
import {Text, View, Button, BackHandler, Alert, Image} from 'react-native';
import styles from "../../rootStyling";
import splashStyling from "../../splashScreens/splashScreensStyling";
import {TextInput} from 'react-native-paper';
import splashScreenThree from "../../../assets/SplashScreen/Splash_3.png";

export default function ChangePassword() {
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
                    <View style={[splashStyling.splashScreenContent, {width: "100%", marginTop:"10%"}]}>
                        <TextInput
                            label="Old Password"
                            secureTextEntry
                            right={<TextInput.Icon icon="eye"/>}
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                        />
                        <TextInput
                            label="New Password"
                            secureTextEntry
                            right={<TextInput.Icon icon="eye"/>}
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                        />
                        <TextInput
                            label="Confirm New Password"
                            secureTextEntry
                            right={<TextInput.Icon icon="eye"/>}
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                        />
                        <View style={{width:"100%", marginTop:20}}>
                            <Button color={"#FFB906"} title={"Submit"}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

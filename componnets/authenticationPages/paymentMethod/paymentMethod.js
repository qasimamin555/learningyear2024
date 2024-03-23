import React from "react";
import {Text, View, Button, Image} from 'react-native';
import styles from "../../rootStyling";
import splashStyling from "../../splashScreens/splashScreensStyling";
import {TextInput} from 'react-native-paper';
import splashScreenThree from "../../../assets/SplashScreen/Splash_3.png";

export default function PaymentMethod() {
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
                            label="Account Holder Name"
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                        />
                        <View style={{flexDirection:"row", gap:10, justifyContent:"space-between", width:"100%"}}>
                            <TextInput
                                label="MM/YY"
                                style={{backgroundColor: "white", width: "40%"}}
                                activeUnderlineColor={"#FFB906"}
                            />
                            <TextInput
                                label="CVC"
                                style={{backgroundColor: "white", width: "40%"}}
                                activeUnderlineColor={"#FFB906"}
                            />
                        </View>
                        <TextInput
                            label="Account Number"
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                        />
                        <View style={{width: "100%", marginTop: "30%"}}>
                            <Button color={"#FFB906"} title={"Submit"}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

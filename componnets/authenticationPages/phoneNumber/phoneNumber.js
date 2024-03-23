import React from "react";
import {Text, View, Button, Image} from 'react-native';
import styles from "../../rootStyling";
import splashStyling from "../../splashScreens/splashScreensStyling";
import {TextInput} from 'react-native-paper';
import splashScreenThree from "../../../assets/SplashScreen/Splash_3.png";
import Header from "../ReuseableComponents/Header";
import Phone from "../../../assets/AuthenticationPage/phone.png";

export default function PhoneNumber({route, navigation}) {
    const { headerName } = route.params;
    return (
        <View style={[styles.container]}>
            <View style={[splashStyling.splashScreenBack, {height: "40%"}]}/>
            <Header headerName={headerName}/>
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
                        <Image style={{width:150, height:150}} source={Phone}/>
                    </View>
                    <View style={[splashStyling.splashScreenContent, {width: "100%", marginTop: "10%"}]}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Text>+1</Text>
                        <TextInput
                            label="Phone"
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                        />
                        </View>
                        <View style={{width: "100%", marginTop: "40%"}}>
                            <Button onPress={()=>navigation.navigate("pincode", {
                                headerName:"Enter Code"
                            })} color={"#FFB906"} title={"Next"}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

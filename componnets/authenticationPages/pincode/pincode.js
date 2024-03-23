import React from "react";
import {Text, View, Button, Image} from 'react-native';
import styles from "../../rootStyling";
import splashStyling from "../../splashScreens/splashScreensStyling";
import {TextInput} from 'react-native-paper';
import splashScreenThree from "../../../assets/SplashScreen/Splash_3.png";
import Header from "../ReuseableComponents/Header";
import pincodeImg from "../../../assets/AuthenticationPage/pincode.png";

export default function Pincode({route, navigation}) {
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
                        <Image style={{width:160, height:160}} source={pincodeImg}/>
                    </View>
                    <View style={[splashStyling.splashScreenContent, {width: "100%", marginTop:"10%"}]}>
                        <TextInput
                            label="Pincode"
                            placeholder={"Enter code here"}
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                        />
                        <Text style={{marginTop:10}}>Please add your pincode here.</Text>
                        <View style={{width:"100%", marginTop:"30%"}}>
                            <Button onPress={()=>navigation.navigate("newPassword", {
                                headerName:"Set New Password"
                            })} color={"#FFB906"} title={"Login"}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

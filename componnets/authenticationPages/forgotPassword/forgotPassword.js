import React from "react";
import {View, Button, Image} from 'react-native';
import styles from "../../rootStyling";
import splashStyling from "../../splashScreens/splashScreensStyling";
import {TextInput} from 'react-native-paper';
import newPasswordImg from "../../../assets/AuthenticationPage/newPasswordImg.png";
import Header from "../ReuseableComponents/Header";

export default function ForgotPassword({route, navigation}) {
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
                        <Image style={{width:160, height:160}} source={newPasswordImg}/>
                    </View>
                    <View style={[splashStyling.splashScreenContent, {width: "100%", marginTop:"10%"}]}>
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
                            <Button onPress={()=>navigation.navigate("login")} color={"#FFB906"} title={"Submit"}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

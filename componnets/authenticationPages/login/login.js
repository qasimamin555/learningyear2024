import React, {useContext, useEffect, useState} from "react";
import {Text, View, Button, BackHandler, Alert, Image, ScrollView} from 'react-native';
import styles from "../../rootStyling";
import splashStyling from "../../splashScreens/splashScreensStyling";
import {Checkbox, HelperText, TextInput} from 'react-native-paper';
import LoginImage from "../../../assets/AuthenticationPage/five.jpg"
import {loginUser} from "../../actions";
import {SET_USER_INFO} from "../../store/const";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GlobalContext} from "../../store";

export default function Login({navigation}) {
    const [globalState, dispatch] = useContext(GlobalContext);

    const [state, setState] = useState({
        isParent: true,
        isSecret: true

    })

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const OnChange = (name, value) => setForm({...form, [name]: value});

    const login = () => {
        let {email, password, registrationType = state.isParent ? "parent" : "caretaker"} = form;
        if (!!email?.trim() && !!password?.trim()) {
            console.log('working ...........')
            loginUser({email, password})
                .then(async response => {
                    if (response?.success) {
                        dispatch({type: SET_USER_INFO, payload: response.data.result});
                        await AsyncStorage.setItem("userInfo", JSON.stringify(response.data.result));
                        setForm({
                            name: "",
                            email: "",
                            password: "",
                            address: "",
                            registrationType: "parent",
                        })
                    }
                })
                .catch(error => {
                    console.log(error, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                })
        }
    }

    return (
        <ScrollView style={{backgroundColor: "white"}}>
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
                            marginBottom: "4%",
                            marginTop: "10%"
                        }}>
                            <Image style={{
                                width: 240,
                                height: 240,
                                borderRadius: 120,
                                marginTop: 30
                            }} alt={"Image"} source={LoginImage}/>
                        </View>
                        <View style={[splashStyling.splashScreenContent, {width: "100%", marginTop: "10%"}]}>
                            <TextInput
                                value={form.email}
                                onChangeText={(e) => OnChange("email", e)}
                                label="Email"
                                style={{backgroundColor: "white", width: "100%"}}
                                activeUnderlineColor={"#FFB906"}
                            />
                            <TextInput
                                value={form.password}
                                onChangeText={(e) => OnChange("password", e)}
                                label="Password"
                                secureTextEntry={!!state.isSecret}
                                right={
                                    <TextInput.Icon
                                        onPress={() => {
                                            setState({...state, isSecret: !state.isSecret})
                                        }}
                                        icon={state.isSecret ? "eye-off" : "eye"}/>}
                                style={{backgroundColor: "white", width: "100%"}}
                                activeUnderlineColor={"#FFB906"}
                            />
                            <View style={{flexDirection: "row", alignItems: "center", gap: 2, width: "100%"}}>
                                <Checkbox color={"#FFB906"} status={"unchecked"}/>
                                <Text>
                                    Remember me
                                </Text>
                            </View>
                            <Text disabled={true} onPress={() => navigation.navigate("phoneNumber", {
                                headerName: "Phone Number"
                            })} style={{textAlign: "right", color: "gray", width: "100%"}}>Forgot Password?</Text>
                            <View style={{width: "100%", marginTop: 20}}>
                                <Button
                                    disabled={!(!!form.email?.trim() && !!form.password?.trim())}
                                    onPress={login}
                                    // onPress={() => navigation.navigate('parentsHome', {
                                    //     headerName: "Home"
                                    // })}
                                    color={"#FFB906"} title={"Login"}/>

                                <View style={{marginTop: 20}}/>
                                {/*<Button*/}
                                {/*    onPress={() => {*/}
                                {/*        setState({...state, isParent: !state.isParent})*/}
                                {/*    }}*/}
                                {/*    // onPress={() => navigation.navigate('CareTakerHome', {*/}
                                {/*    //     headerName: "Home"*/}
                                {/*    // })}*/}
                                {/*    color={"#0179EF"}*/}
                                {/*    title={state.isParent ? "Login as Caregiver" : "Login as Parent/Guardian"}/>*/}
                            </View>
                        </View>
                    </View>
                    <Text
                        onPress={() => navigation.navigate("caretakerSignup", {
                            headerName: "Caregiver Signup"
                        })}
                        style={{width: "100%", textAlign: "center", color: "#404040"}}>
                        Don’t have an account? <Text style={{color: "#0179EF"}}>Signup</Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

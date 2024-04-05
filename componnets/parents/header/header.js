import React, {useContext, useState} from "react";
import {Alert, Button, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import headerStyling from "./headerStyling";
import man from "../../../assets/man/man.jpg"
import BottomSheetStyling from "../BottomSheetStyling";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Checkbox} from "react-native-paper";
import {BottomSheet} from "react-native-btr";
import woman from "../../../assets/man/woman.jpeg";
import babyTwo from "../../../assets/baby/baby2.jpg";
import babyOne from "../../../assets/baby/baby1.jpeg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GlobalContext} from "../../store";
import {SET_USER_INFO} from "../../store/const";

export default function MainHeader(props) {
    const {navigation} = props;
    const [state, setState] = useState({
        isBottomSheetOpen: false
    })
    const [globalState, dispatch] = useContext(GlobalContext);
    let {userData} = globalState;

    const logout = () => {
        AsyncStorage.removeItem("userInfo")
            .then(res => {
                dispatch({type: SET_USER_INFO, payload: null});
                navigation.navigate("login")
            })
    }

    const getMemberYear = (data) => {
        if (data && typeof data === "string") {
            let createdAt = JSON.parse(data);
            console.log(createdAt);
        }
    }

    return (
        <View style={[headerStyling.container]}>
            <View style={{width: "33.33%"}}>
                {props.main
                    ? <Ionicons onPress={logout} size={22} name="log-out" color={"white"}/>
                    : <Ionicons onPress={() => {
                        props?.navigation?.goBack()
                    }} size={22} name={"arrow-back"} color={"white"}/>
                }
            </View>
            <View style={{width: "33.33%"}}>
                <Text style={{
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center"
                }}>{props?.headerName ? props.headerName : "Home"}</Text>
            </View>
            <View style={{width: "33.33%", flexDirection: "row", justifyContent: "flex-end"}}>
                <TouchableOpacity onPress={() => setState({...state, isBottomSheetOpen: true})}>
                    <Image style={{
                        height: 34,
                        width: 34,
                        borderRadius: 17,
                        borderWidth: 1,
                        borderColor: "black",
                    }}
                           // source={man}
                    />
                </TouchableOpacity>

            </View>

            <BottomSheet
                visible={state.isBottomSheetOpen}
                onBackButtonPress={() => setState({...state, isBottomSheetOpen: false})}
                onBackdropPress={() => setState({...state, isBottomSheetOpen: false})}
            >
                <View style={BottomSheetStyling.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{
                            width: "100%",
                            textAlign: "center",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Image source={man} style={{
                                height: 80,
                                width: 80,
                                borderRadius: 40,
                                borderWidth: 1,
                                borderColor: "black",
                                margin: "auto"
                            }}/>
                            <Text style={{fontWeight: "bold", fontSize: 14, marginTop: 10, color: "black"}}>
                                {
                                    userData && typeof userData === "string"
                                        ? JSON.parse(userData).name
                                        : "Not found"
                                }
                            </Text>
                            <Text style={{color: "#FF912C"}}> {!props.isCaretaker ? "Caregiver" : "Parent"}</Text>
                            <Text style={{
                                color: "#727272",
                                fontSize: 12
                            }}>{`Member since ${getMemberYear(userData)}`}</Text>
                        </View>

                        {
                            !props?.isCaretaker && <View style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                gap: 16,
                                backgroundColor: "#FFF1E4",
                                padding: 16,
                                borderRadius: 10,
                                marginTop: 20
                            }}>
                                <View>
                                    <Image source={woman} style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 40,
                                        borderWidth: 1,
                                        borderColor: "black",
                                        margin: "auto"
                                    }}/>
                                    <Text style={{
                                        fontWeight: "bold",
                                        fontSize: 14,
                                        marginTop: 2,
                                        textAlign: "center"
                                    }}>Malaika</Text>
                                    <Text style={{color: "grey", fontSize: 8, textAlign: "center"}}>(Parent)</Text>
                                </View>
                                <View>
                                    <Image source={babyTwo} style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 40,
                                        borderWidth: 1,
                                        borderColor: "black",
                                        margin: "auto"
                                    }}/>
                                    <Text style={{
                                        fontWeight: "bold",
                                        fontSize: 14,
                                        marginTop: 2,
                                        textAlign: "center"
                                    }}>Peter</Text>
                                    <Text style={{color: "grey", fontSize: 8, textAlign: "center"}}>(Son)</Text>
                                </View>
                                <View>
                                    <Image source={babyOne} style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 40,
                                        borderWidth: 1,
                                        borderColor: "black",
                                        margin: "auto"
                                    }}/>
                                    <Text style={{
                                        fontWeight: "bold",
                                        fontSize: 14,
                                        marginTop: 2,
                                        textAlign: "center"
                                    }}>Ale</Text>
                                    <Text style={{color: "grey", fontSize: 8, textAlign: "center"}}>(Daughter)</Text>
                                </View>
                            </View>
                        }


                        <View>
                            <Text style={{marginTop: 20, fontWeight: "bold"}}>Note</Text>
                            <Text style={{color: "grey"}}>
                                {
                                    userData && typeof userData === "string"
                                        ? JSON.parse(userData).address
                                        : "Not found"
                                }                            </Text>
                        </View>

                        {/*<View>*/}
                        {/*            <View style={{*/}
                        {/*                backgroundColor: "#FFF1E4",*/}
                        {/*                padding: 16,*/}
                        {/*                flexDirection: "row",*/}
                        {/*                justifyContent: "center",*/}
                        {/*                alignItems: "center",*/}
                        {/*                gap: 50,*/}
                        {/*                borderRadius: 10,*/}
                        {/*                marginTop: 20*/}
                        {/*            }}>*/}
                        {/*                <View style={{textAlign: "center", flexDirection: "column", alignItems: "center"}}>*/}
                        {/*                    <Text style={{fontSize: 16, fontWeight: "bold"}}>4.7</Text>*/}
                        {/*                    <Text style={{color: "#6A6A6A", fontSize: 12}}>Punctuality</Text>*/}
                        {/*                </View>*/}
                        {/*                <View style={{textAlign: "center", flexDirection: "column", alignItems: "center"}}>*/}
                        {/*                    <Text style={{fontSize: 16, fontWeight: "bold"}}>5.0</Text>*/}
                        {/*                    <Text style={{color: "#6A6A6A", fontSize: 12}}>Rating</Text>*/}
                        {/*                </View>*/}
                        {/*            </View>*/}
                    </ScrollView>

                </View>
            </BottomSheet>

        </View>
    );
}

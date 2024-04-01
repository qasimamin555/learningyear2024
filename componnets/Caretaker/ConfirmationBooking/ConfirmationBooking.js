import React, {useContext, useEffect, useState} from "react";
import {Alert, Button, Text, ToastAndroid, View} from 'react-native';
import parentsStyling from "../../parents/parentsStyling";
import MainHeader from "../../parents/header/header";
import {TextInput} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {acceptBookingStatus, getChildInfo, getToken, getUserId} from "../../actions";
import {SET_BOOKING_REQUEST_DATA, SET_RE_CALLING_STATUS} from "../../store/const";
import {GlobalContext} from "../../store";

export default function ConfirmationBooking({route, navigation}) {
    const [globalState, dispatch] = useContext(GlobalContext);
    const {reCallStatus} = globalState;
    console.log(reCallStatus, "^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    const {headerName, data} = route.params;
    const [state, setState] = useState({
        childInfo: []
    })

    useEffect(() => {
        if (data?.children?.length) {
            getToken()
                .then(token => {
                    console.log('Api is calling')
                    getChildInfo(token, data.children)
                        .then((response) => {
                            console.log(response)
                            if (response?.success && response?.data?.result?.length) {
                                setState({...state, childInfo: response.data.result});
                            }
                        })
                        .catch(error => {
                            console.log(error, "QQQQQQQQQQQQQQQQQ")
                        })
                })
        }
    }, [data]);


    const acceptBooking = async () => {
        let token = await getToken();
        let updateId = data?._id;

        if (token && updateId) {
            acceptBookingStatus(token, updateId)
                .then(response => {
                    if (response?.success) {
                        dispatch({type: SET_RE_CALLING_STATUS, payload: true});
                        dispatch({type: SET_BOOKING_REQUEST_DATA, payload: []})
                        navigation.navigate("CareTakerHome");
                    }
                })
        }

    }

    console.log(reCallStatus)
    return (
        <View style={[parentsStyling.container]}>
            <MainHeader isCaretaker={true} headerName={headerName}/>
            <View style={{padding: 20}}>
                <View style={{
                    padding: 10, backgroundColor: "#E5F7E9", borderWidth: 1,
                    borderColor: "#00B428",
                    borderBottomWidth: 0,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                }}>

                    <Text style={{fontWeight: "bold", marginTop: 10}}>Child Info</Text>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{color: "grey"}}>
                            Age
                        </Text>
                        <Text style={{color: "#FF912C"}}>{state.childInfo?.[0]?.age}</Text>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{color: "grey"}}>
                            Gender
                        </Text>
                        <Text style={{color: "#FF912C"}}>{state.childInfo?.[0]?.gender}</Text>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{color: "grey"}}>
                            School
                        </Text>
                        <Text style={{color: "#FF912C"}}>{state.childInfo?.[0]?.school}</Text>
                    </View>

                    <View style={{marginTop: 10}}/>
                    <Text style={{fontWeight: "bold", marginTop: 10}}>Request Info</Text>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{color: "grey"}}>
                            Booking Date:
                        </Text>
                        <Text style={{color: "#FF912C"}}>{data?.requestSendingTime}</Text>
                    </View>
                    {/*<Button title={"Location"}/>*/}
                </View>

                <View style={{
                    padding: 10,
                    backgroundColor: "#FFE9D5",
                    borderWidth: 1,
                    borderColor: "#FF912C",
                    borderTopWidth: 0,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                }}>
                    <Text style={{fontWeight: "bold"}}>Services</Text>
                    {data?.services?.length && data.services.map((name, index) => {
                        return <Text key={index} style={{marginTop: 2, color: "grey"}}>{name}</Text>
                    })}
                </View>

                <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", marginTop: 20}}>
                    <View style={{width: "45%"}}>
                        <Button onPress={acceptBooking} color={"#00B428"} title={"Accept"}/>
                    </View>
                    <View style={{width: "45%"}}>
                        <Button onPress={() => {
                            Alert.alert("Sorry!", "You don't have permission to decline any request");
                        }} color={"#FF1D46"} title={"Decline"}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

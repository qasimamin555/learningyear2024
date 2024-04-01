import React, {useContext, useState} from "react";
import {Button, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import parentsStyling from "../parentsStyling";
import MainHeader from "../header/header";
import {Checkbox, Divider, Menu, PaperProvider, TextInput} from "react-native-paper";
import FavouritesCaretakerProfile from "../favourites/FavouritesCaretakerProfile";
import man from "../../../assets/man/man.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserMenu from "./menu";
import {getToken, updateRequestElements} from "../../actions";
import {SET_RELOAD} from "../../store/const";
import {GlobalContext} from "../../store";

export default function BookingConfirmation({route, navigation}) {
    const {headerName, data, value} = route.params;
    const [globalState, dispatch] = useContext(GlobalContext);
    const [state, setState] = useState({
        isMenuOpen: false
    })


    const requestUpdate = (filter, id) => {
        getToken()
            .then(token => {
                updateRequestElements(token, filter, id)
                    .then(res => {
                        if (res.success) {
                            dispatch({type: SET_RELOAD, payload: true});
                            navigation.goBack();
                        }
                    })
            })
    }

    console.log(JSON.stringify(data, null, 2), value, "##########################")
    return (
        <TouchableWithoutFeedback onPress={() => {
            if (state.isMenuOpen) {
                setState({...state, isMenuOpen: false})
            }
        }}>
            <View style={[parentsStyling.container]}>
                <MainHeader headerName={headerName}/>
                <View style={{padding: 20, backgroundColor: "#2CA6FF", paddingTop: 0}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                        <View style={{flexDirection: "row", gap: 10}}>
                            {/*<Image source={man} style={{*/}
                            {/*    height:54,*/}
                            {/*    width:54,*/}
                            {/*    borderRadius:27,*/}
                            {/*    borderWidth:1,*/}
                            {/*    borderColor:"black"*/}
                            {/*}}/>*/}
                            <Ionicons name={'person'} size={26} color={'#fff'}/>
                            <View>
                                <Text style={{color: "white", marginTop: 2, fontSize: 16, fontWeight: 'bold'}}>Request
                                    Id</Text>
                                <Text style={{color: "white", fontSize: 14}}>{data._id}</Text>
                                {value !== 'request'
                                    && <View style={{flexDirection: "row", alignItems: "center", gap: 2, marginTop: 6}}>
                                        <Text
                                            style={{fontSize: 16, color: "#FFB906"}}>{data?.caretakerData?.name}</Text>
                                    </View>
                                }
                            </View>
                        </View>

                        {value !== "request" && <TouchableOpacity
                            onPress={() => {
                                setState({...state, isMenuOpen: true})
                            }}
                            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        >
                            <Ionicons size={25} name="ellipsis-horizontal" color={"white"} style={{marginTop: 10}}/>
                        </TouchableOpacity>}

                        {(state.isMenuOpen) &&
                            <View style={{position: 'absolute', backgroundColor: '#EFEEEE', right: 0, top: 40}}>
                                {data?.isFavourites
                                    ? <Menu.Item
                                        onPress={() => requestUpdate({isFavourites: false}, data._id)}
                                        leadingIcon="star" title="Remove from Faviourate"/>
                                    : <Menu.Item
                                        onPress={() => requestUpdate({isFavourites: true}, data._id)}
                                        leadingIcon="star"
                                        title="Add to Faviourate"/>}
                                {value === 'live'
                                    && <Menu.Item
                                        onPress={() => requestUpdate({isCompleted: true}, data._id)}
                                        leadingIcon="undo" title="Sign off"/>
                                }
                            </View>
                        }

                    </View>
                </View>
                <View style={{width: "100%", padding: 20, paddingTop: 10, height: "58%"}}>
                    <View style={{flexDirection: 'row', gap: 4, alignItems: "center", marginTop: 10}}>
                        <Ionicons color={'#00B428'} size={14} name="time"/>
                        <Text style={{color: '#727272'}}>Booking From :</Text>
                        <Text style={{color: '#727272'}}>{data?.requestFrom}</Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 4, alignItems: "center", marginTop: 4}}>
                        <Ionicons color={'#00B428'} size={14} name="time"/>
                        <Text style={{color: '#727272'}}>Booking To :</Text>
                        <Text style={{color: '#727272'}}>{data?.requestTo}</Text>
                    </View>
                    <View><Text></Text></View>
                    <View style={{flexDirection: 'row', gap: 4, alignItems: "center", marginTop: 4}}>
                        <Ionicons color={'#00B428'} size={14} name="time"/>
                        <Text style={{color: '#727272'}}>Start Time : </Text>
                        <Text style={{color: '#727272'}}>{data?.startTime}</Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 4, alignItems: "center", marginTop: 4}}>
                        <Ionicons color={'#00B428'} size={14} name="time"/>
                        <Text style={{color: '#727272'}}>End Time : </Text>
                        <Text style={{color: '#727272'}}>{data?.endTime}</Text>
                    </View>

                    <ScrollView style={{maxHeight: 300, padding: 16, backgroundColor: "#EFEEEE", marginTop: 10}}>

                        <Text style={{fontSize: 15, fontWeight: "bold", marginTop: 10}}>Services</Text>
                        {
                            data?.services?.length
                            && data.services.map((v, i) => {
                                return <View key={i}
                                             style={{flexDirection: "row", alignItems: "center", gap: 2, marginBottom: 2}}>
                                    <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                    <Text>
                                        {v}
                                    </Text>
                                </View>
                            })
                        }

                    </ScrollView>
                </View>
                <View style={{padding: 20}}>
                    {
                        (value !== 'request' && undefined)
                        && ((headerName === "Live" || headerName === "Upcoming Booking")
                            ? <Button onPress={() => navigation.navigate('chat', {
                                headerName: "Chat"
                            })} color={"#FFB906"} title={"Contact Caregiver"}/> :
                            <Button onPress={() => navigation.navigate('parentsHome')} color={"#FFB906"}
                                    title={"Confirm"}/>)
                    }
                    {value !== 'request' && undefined &&
                        <Text onPress={() => headerName !== "Live" && navigation.navigate('parentsHome')}
                              style={{fontSize: 15, textAlign: "center", marginTop: 10, color: "grey"}}>
                            {
                                headerName === "Live" ? "Get Location" : "Cancel"
                            }
                        </Text>}
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
        ;
}

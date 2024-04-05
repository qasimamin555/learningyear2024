import {Alert, Button, Image, ScrollView, Text, View, TouchableOpacity, Linking, ActivityIndicator} from "react-native";
import man from "../../../assets/man/man.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, {useContext, useEffect, useState} from "react";
import BottomSheetStyling from "../BottomSheetStyling";
import {Checkbox} from "react-native-paper";
import {BottomSheet} from "react-native-btr";
import {useNavigation} from "@react-navigation/native";
import {getCareTakers, getToken, updateRequestElements} from "../../actions";
import {SET_RELOAD} from "../../store/const";
import {GlobalContext} from "../../store";

export default function FavouritesCaretakerProfile(props) {
    const [state, setState] = useState({
        isBottomSheetOpen: false,
        aos: false,
        caretaker: null,
        data: [],
        loading: false
    })
    const navigate = useNavigation();

    useEffect(() => {
        let {isBottomSheetOpen, caretaker} = state;
        if (isBottomSheetOpen && caretaker) {
            getData();
        }
    }, [state.isBottomSheetOpen]);

    const getData = () => {
        setState({...state, loading: true})
        getToken()
            .then(token => {
                getCareTakers(token, {_id: state.caretaker})
                    .then(res => {
                        if (res.success) {
                            setState({...state, data: res.data.result[0], loading: false})
                        }
                    })
                    .catch(err => {
                        setState({...state, loading: false})
                    })
            })
    }

    function getAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    const {data, value} = props;
    const getLocation = async () => {
        let latitude = state?.data?.location?.latitude;
        let longitude = state?.data?.location?.longitude;
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        await Linking.openURL(url);
    }

    let {navigation} = props;
    const [globalState, dispatch] = useContext(GlobalContext);


    const requestUpdate = (filter, id) => {
        getToken()
            .then(token => {
                updateRequestElements(token, filter, id)
                    .then(res => {
                        console.log(res, '%%%%%%%%%%%%%%%%%%%%%%%%%')
                        if (res.success) {
                            dispatch({type: SET_RELOAD, payload: true});
                            navigation.goBack();
                        }
                    })
            })
    }

    return <View key={value}>

        <TouchableOpacity
            onPress={() => setState({...state, isBottomSheetOpen: true, caretaker: data.caretakerId})}
            style={{padding: 10, marginTop: 10}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                <View style={{flexDirection: "row", gap: 10}}>
                    {/*<Image source={man} style={{*/}
                    {/*    height: 46,*/}
                    {/*    width: 46,*/}
                    {/*    borderRadius: 23,*/}
                    {/*    borderWidth: 1,*/}
                    {/*    borderColor: "black"*/}
                    {/*}}/>*/}

                    <Ionicons name="person" color={"gray"} size={25}/>

                    <View>
                        <Text style={{
                            color: "#263238",
                            fontWeight: "bold",
                            marginTop: 2
                        }}>{data?.['caretakerData']?.name}</Text>
                        <View style={{flexDirection: "row", alignItems: "center", gap: 2, marginTop: 6}}>
                            {/*<Ionicons name="star" color={"#FFDB1E"}/>*/}
                            {/*<Text style={{fontSize: 12}}>5.0</Text>*/}
                            {/*<Text style={{fontSize: 12, color: "grey"}}>(122)</Text>*/}
                        </View>
                    </View>
                </View>
                <Ionicons name="star" size={16} color={"#FFDB1E"}/>
            </View>
            <View style={{height: 1, width: "100%", backgroundColor: "black", marginTop: 10}}></View>
        </TouchableOpacity>

        <BottomSheet
            visible={state.isBottomSheetOpen}
            onBackButtonPress={() => setState({...state, isBottomSheetOpen: false})}
            onBackdropPress={() => setState({...state, isBottomSheetOpen: false})}
        >
            {state.loading
                ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={50}/>
                </View>
                : <View style={BottomSheetStyling.container}>
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        {
                            state.aos ?
                                <Ionicons onPress={() => setState({...state, aos: false})} name="chevron-back"
                                          size={20}/> :
                                <View></View>
                        }
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{
                            width: "100%",
                            textAlign: "center",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Image
                                // source={man}
                                style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 40,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    margin: "auto"
                                }}/>
                            <Text style={{fontWeight: "bold", fontSize: 14, marginTop: 10}}>{state?.data?.name}</Text>
                            <Text
                                style={{color: "#FF912C"}}>{'Age: ' + getAge(state?.data?.payload?.dateOfBirth) + ' years old'} </Text>
                            <Text style={{color: "#727272", fontSize: 12}}>Masters in Computer Science</Text>
                        </View>
                        {
                            !state.aos ?
                                <View>
                                    <Text style={{marginTop: 20, fontWeight: "bold"}}>Services</Text>

                                    {state?.data?.payload?.['services']?.length && <Text>Services</Text>}
                                    {state?.data?.payload?.['services']?.length
                                        && state.data['payload']['services'].map((v, i) => <View
                                            key={i}
                                            style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                            <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                            <Text style={{color: "grey"}}>
                                                {v}
                                            </Text>
                                        </View>)
                                    }

                                    {state?.data?.payload?.['Sports']?.length && <Text>Sports</Text>}
                                    {state?.data?.payload?.['Sports']?.length
                                        && state.data['payload']['Sports'].map((v, i) => <View
                                            key={i}
                                            style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                            <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                            <Text style={{color: "grey"}}>
                                                {v}
                                            </Text>
                                        </View>)
                                    }
                                    {state?.data?.payload?.['Music']?.length && <Text>Music</Text>}
                                    {state?.data?.payload?.['Music']?.length
                                        && state.data['payload']['Music'].map((v, i) => <View
                                            key={i}
                                            style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                            <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                            <Text style={{color: "grey"}}>
                                                {v}
                                            </Text>
                                        </View>)
                                    }
                                    <Text style={{marginTop: 20, fontWeight: "bold"}}>Address</Text>
                                    <Text style={{color: "grey", marginBottom: 10}}>{state?.data?.address}</Text>

                                    <Button title={'Get location'} onPress={getLocation}/>
                                    <View><Text></Text></View>

                                    <TouchableOpacity
                                        onPress={() => requestUpdate({isFavourites: false}, data._id)}
                                        style={{padding: 10, backgroundColor: '#bb2124'}}>
                                        <Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>
                                            REMOVE FROM FAVOURITE
                                        </Text>
                                    </TouchableOpacity>
                                    {
                                        props?.module === "allCaretakers" &&
                                        <Button onPress={() => navigate.navigate('BookingConfirmation', {
                                            headerName: "Booking Information"
                                        })} color={'green'} title={'Continue'}/>
                                    }
                                </View> :
                                <View
                                    style={{padding: 10, backgroundColor: "#F2F2F2", borderRadius: 10, marginTop: 20}}>
                                    <Text style={{color: "#263238", fontWeight: 'bold'}}>
                                        Areas of services
                                    </Text>
                                    <View style={{marginTop: 4}}>
                                        <Text style={{color: "#404040"}}>.Piccadilly and St James’s </Text>
                                        <Text style={{color: "#404040", marginTop: 4}}>.Soho and Trafalgar Square</Text>
                                        <Text style={{color: "#404040", marginTop: 4}}>.Covent Garden and Strand</Text>
                                        <Text style={{color: "#404040", marginTop: 4}}>.Bloomsbury and Fitzrovia</Text>
                                        <Text style={{color: "#404040", marginTop: 4}}>.Holborn and Inns of Court</Text>
                                    </View>
                                </View>

                        }
                    </ScrollView>

                </View>}
        </BottomSheet>
    </View>
}

//                 <View style={{
//                                     backgroundColor: "#FFF1E4",
//                                     padding: 16,
//                                     flexDirection: "row",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     gap: 50,
//                                     borderRadius: 10,
//                                     marginTop: 20
//                                 }}>
//                                     <View style={{textAlign: "center", flexDirection: "column", alignItems: "center"}}>
//                                         <Text style={{fontSize: 16, fontWeight: "bold"}}>4.7</Text>
//                                         <Text style={{color: "#6A6A6A", fontSize: 12}}>Punctuality</Text>
//                                     </View>
//                                     <View style={{textAlign: "center", flexDirection: "column", alignItems: "center"}}>
//                                         <Text style={{fontSize: 16, fontWeight: "bold"}}>5.0</Text>
//                                         <Text style={{color: "#6A6A6A", fontSize: 12}}>Rating</Text>
//                                     </View>
//                                 </View>

//              <View style={{
//                                     flexDirection: "row",
//                                     width: "100%",
//                                     justifyContent: "space-between",
//                                     marginTop: 10
//                                 }}>
//                                     <Text style={{color: "grey"}}>Cancelled Bookings</Text>
//                                     <Text style={{color: "grey"}}>0</Text>
//                                 </View>

//   <View style={{marginTop: 20}}></View>
//                                 <Button onPress={() => setState({...state, aos: true})} color={'#FFB906'}
//                                         title={'Areas of services'}/>

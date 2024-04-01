import {Alert, Button, Image, ScrollView, Text, View, TouchableOpacity} from "react-native";
import man from "../../../assets/man/man.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, {useState} from "react";
import BottomSheetStyling from "../BottomSheetStyling";
import {Checkbox} from "react-native-paper";
import {BottomSheet} from "react-native-btr";
import {useNavigation} from "@react-navigation/native";

export default function FavouritesCaretakerProfile(props) {
    const [state, setState] = useState({
        isBottomSheetOpen: false,
        aos: false
    })
    const navigate = useNavigation();

    const {data, value} = props;
    return <View key={value}>

        <TouchableOpacity
            onPress={() => setState({...state, isBottomSheetOpen: true})}
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

                    <Ionicons name="person" color={"gray"} size={25} />

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
            <View style={BottomSheetStyling.container}>
                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    {
                        state.aos ?
                            <Ionicons onPress={() => setState({...state, aos: false})} name="chevron-back" size={20}/> :
                            <View></View>
                    }
                    <Text style={{color: "red"}} onPress={() => Alert.alert(
                        'Alert',
                        'Are you sure to block the caretaker?',
                        [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                            {text: 'Yes', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false}
                    )}
                          name="ellipsis-vertical"
                          size={20}
                    >
                        Block
                    </Text>
                </View>
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
                        <Text style={{fontWeight: "bold", fontSize: 14, marginTop: 10}}>Kerry Mate</Text>
                        <Text style={{color: "#FF912C"}}>24 years old</Text>
                        <Text style={{color: "#727272", fontSize: 12}}>Masters in Computer Science</Text>
                    </View>
                    {
                        !state.aos ?
                            <View>
                                <View style={{
                                    backgroundColor: "#FFF1E4",
                                    padding: 16,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 50,
                                    borderRadius: 10,
                                    marginTop: 20
                                }}>
                                    <View style={{textAlign: "center", flexDirection: "column", alignItems: "center"}}>
                                        <Text style={{fontSize: 16, fontWeight: "bold"}}>4.7</Text>
                                        <Text style={{color: "#6A6A6A", fontSize: 12}}>Punctuality</Text>
                                    </View>
                                    <View style={{textAlign: "center", flexDirection: "column", alignItems: "center"}}>
                                        <Text style={{fontSize: 16, fontWeight: "bold"}}>5.0</Text>
                                        <Text style={{color: "#6A6A6A", fontSize: 12}}>Rating</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    marginTop: 10
                                }}>
                                    <Text style={{color: "grey"}}>Cancelled Bookings</Text>
                                    <Text style={{color: "grey"}}>0</Text>
                                </View>
                                <View style={{marginTop: 20}}></View>
                                <Button onPress={() => setState({...state, aos: true})} color={'#FFB906'}
                                        title={'Areas of services'}/>
                                <Text style={{marginTop: 20, fontWeight: "bold"}}>Services</Text>
                                <View>
                                    <Text>Sports</Text>
                                    <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                        <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                        <Text style={{color: "grey"}}>
                                            Football
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                        <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                        <Text style={{color: "grey"}}>
                                            Baseball
                                        </Text>
                                    </View>
                                </View>
                                <Text>Music</Text>
                                <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                    <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                    <Text style={{color: "grey"}}>
                                        Pop
                                    </Text>
                                </View>
                                <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                    <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                    <Text style={{color: "grey"}}>
                                        Solo
                                    </Text>
                                </View>
                                <Text style={{marginTop: 20, fontWeight: "bold"}}>Note</Text>
                                <Text style={{color: "grey"}}>Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                                    since
                                    the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                                    type
                                    specimen book.</Text>
                                {
                                    props?.module === "allCaretakers" &&
                                    <Button onPress={() => navigate.navigate('BookingConfirmation', {
                                        headerName: "Booking Information"
                                    })} color={'green'} title={'Continue'}/>
                                }
                            </View> :
                            <View style={{padding: 10, backgroundColor: "#F2F2F2", borderRadius: 10, marginTop: 20}}>
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

            </View>
        </BottomSheet>
    </View>
}

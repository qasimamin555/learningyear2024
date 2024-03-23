import React, {useState} from "react";
import {Image, View, Text, TouchableOpacity, Button, ScrollView, Alert} from 'react-native';
import parentsStyling from "../parentsStyling";
import MainHeader from "../header/header";
import man from "../../../assets/man/man.jpg";
import {Checkbox, TextInput, Menu, PaperProvider} from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomSheetStyling from "../BottomSheetStyling";
import {BottomSheet} from "react-native-btr";

export default function Chat({route}) {
    const [state, setState] = useState({
        isBottomSheetOpen: false,
        aos:false,
        openMenu:false
    })
    const {headerName} = route.params

    let data = [
        {
            message: "Hello how are you? Can I talk to you?",
            direction: "0",
            image: man
        },
        {
            message: "Yes, how may I help you?",
            direction: "1",
            image: man
        },
        {
            message: "I need to know that where are you?",
            direction: "0",
            image: man
        },
    ]

    return (
        <PaperProvider>
        <View style={[parentsStyling.container]}>
            <MainHeader  headerName={headerName}/>
            <View style={{height: "74%"}}>
                {
                    data.map((item, idx) => <View key={idx} style={{
                        padding: 10,
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: item.direction === "1" ? "flex-end" : "none"
                    }}>
                        <View style={{width: "65%"}}>
                            <View style={{
                                flexDirection: item.direction === "1" ? "row-reverse" : "row",
                                gap: 10
                            }}>
                                <TouchableOpacity onPress={() => item.direction==='0' && setState({...state, isBottomSheetOpen: true})}>
                                    <Image source={item.image} style={{
                                        height: 28,
                                        width: 28,
                                        borderRadius: 14,
                                        borderWidth: 1,
                                        borderColor: "black"
                                    }}/>
                                </TouchableOpacity>
                                <View>
                                    <Text style={{
                                        borderRadius: 10,
                                        color: item.direction === "1" ? "#6A6A6A" : "white",
                                        padding: 10,
                                        backgroundColor: item.direction === "1" ? "#F0F0F0" : "#549EC3",
                                        marginTop: 10,
                                        fontSize: 13
                                    }}>
                                        {item.message}
                                    </Text>
                                    <Text style={{
                                        fontSize: 10,
                                        textAlign: item.direction === "0" ? "right" : "left",
                                        color: "#404040",
                                        marginTop: 2
                                    }}>12 Oct 2022, 12:22 AM</Text>
                                </View>
                            </View>
                        </View>
                    </View>)
                }
            </View>
            <View style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-between",
                alignItems: "center",
                margin: 10,
            }}>
                <TextInput
                    outlined
                    label="Enter message"
                    mode="outlined"
                    style={{backgroundColor: "white", width: "88%", height: 40}}
                />
                <Ionicons style={{marginTop: 8}} color={"#549EC3"} size={26} name={"send"}/>
            </View>
            <BottomSheet
                visible={state.isBottomSheetOpen}
                onBackButtonPress={() => setState({...state, isBottomSheetOpen: false})}
                onBackdropPress={() => setState({...state, isBottomSheetOpen: false})}
            >
                <View style={BottomSheetStyling.container}>
                    <View style={{
                        width:"100%",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:"center"
                    }}>
                        {
                            state.aos ? <Ionicons onPress={()=>setState({...state, aos: false})} name="chevron-back" size={20}/> : <View></View>
                        }
                        <Text style={{color:"red"}} onPress={()=>Alert.alert(
                                    'Alert',
                                    'Are you sure to block the caretaker?',
                                    [
                                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                                        { text: 'Yes', onPress: () => console.log('OK Pressed') },
                                    ],
                                    { cancelable: false }
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
                                    <Button onPress={()=>setState({...state, aos: true})} color={'#FFB906'} title={'Areas of services'}/>
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
                                        typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
                                        the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                                        specimen book.</Text>
                                </View> :
                                <View style={{padding:10, backgroundColor:"#F2F2F2", borderRadius:10, marginTop:20}}>
                                    <Text style={{color:"#263238", fontWeight:'bold'}}>
                                    Areas of services
                                </Text>
                                    <View style={{marginTop:4}}>
                                    <Text style={{color:"#404040"}}>.Piccadilly and St James’s </Text>
                                    <Text style={{color:"#404040", marginTop:4}}>.Soho and Trafalgar Square</Text>
                                    <Text style={{color:"#404040", marginTop:4}}>.Covent Garden and Strand</Text>
                                    <Text style={{color:"#404040", marginTop:4}}>.Bloomsbury and Fitzrovia</Text>
                                    <Text style={{color:"#404040", marginTop:4}}>.Holborn and Inns of Court</Text>
                                    </View>
                                </View>

                        }
                    </ScrollView>

                </View>
            </BottomSheet>
        </View>
        </PaperProvider>
    );
}

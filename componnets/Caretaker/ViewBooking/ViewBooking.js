import {Button, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import parentsStyling from "../../parents/parentsStyling";
import MainHeader from "../../parents/header/header";
import man from "../../../assets/man/man.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Checkbox} from "react-native-paper";
import React, {useState} from "react";
import {BottomSheet} from "react-native-btr";
import BottomSheetStyling from "../../parents/BottomSheetStyling";
import babyOne from "../../../assets/baby/baby1.jpeg";
import babyTwo from "../../../assets/baby/baby2.jpg"
import woman from "../../../assets/man/woman.jpeg"

export default function ViewBooking({route, navigation}) {
    const [state, setState] = useState({
        isBottomSheetOpen:false
    })
    const {headerName} = route.params
    return (
        <View style={[parentsStyling.container]}>
            <MainHeader  isCaretaker={true} headerName={headerName}/>
            <View style={{padding:20, backgroundColor:"#2CA6FF", paddingTop:0}}>
                <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
                    <View style={{flexDirection:"row", gap:10}}>
                        <Image source={man} style={{
                            height:54,
                            width:54,
                            borderRadius:27,
                            borderWidth:1,
                            borderColor:"black"
                        }}/>
                        <View>
                            <Text style={{color:"white", marginTop:2, fontSize:16}}>Harry Kate</Text>
                            <Text style={{color:"white", fontSize:10}}>Member since 2022</Text>
                            <View style={{flexDirection:"row", alignItems:"center", gap:2, marginTop:6}}>
                                <Ionicons name="star" color={"#FFDB1E"}/>
                                <Text style={{fontSize:12, color:"white"}}>5.0</Text>
                            </View>
                        </View>
                    </View>
                    <Text onPress={()=>setState({...state, isBottomSheetOpen:true})} style={{marginTop:10, fontSize:10, fontWeight:"bold", color:"white"}}>View</Text>
                </View>
            </View>
            <View style={{width:"100%", padding:20, paddingTop:10, height:"58%" }}>
                <View style={{flexDirection:'row', gap:4, alignItems:"center", marginTop:10}}>
                    <Ionicons color={'#00B428'} size={14} name="time"/>
                    <Text style={{color:'#727272'}}>From :</Text>
                    <Text style={{color:'#727272'}}>24 Dec 2023, 05:00 PM</Text>
                </View>
                <View style={{flexDirection:'row', gap:4, alignItems:"center", marginTop:4}}>
                    <Ionicons color={'#00B428'} size={14} name="time"/>
                    <Text style={{color:'#727272'}}>To     :</Text>
                    <Text style={{color:'#727272'}}>24 Dec 2023, 05:00 PM</Text>
                </View>

                <View style={{width:"100%", padding:16, backgroundColor:"#EFEEEE", marginTop:20}}>
                    <Text style={{fontSize:15, fontWeight:"bold"}}>Child Info</Text>

                    <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%", marginTop:10}}>
                        <View style={{flexDirection:"row", gap:10}}>
                            <Image source={man} style={{
                                height:44,
                                width:44,
                                borderRadius:22,
                                borderWidth:1,
                                borderColor:"black"
                            }}/>
                            <View>
                                <Text style={{marginTop:2, fontSize:16}}>Kerry</Text>
                                <Text style={{color:"#FFB906", fontSize:10}}>1 Years old</Text>
                            </View>
                        </View>
                        <Text onPress={()=>navigation.navigate('ChildInfoPage', {
                            headerName:"Information"
                        })} style={{marginTop:10, fontSize:10, fontWeight:"bold"}}>View</Text>
                    </View>
                    <Text style={{fontWeight:"bold", marginTop:4}}>School</Text>
                    <Text style={{color:"grey"}}>London School, London</Text>

                    <View style={{marginTop:14}}/>
                    <Button title={"Location"}/>

                    <Text style={{fontSize:15, fontWeight:"bold", marginTop:10}}>Services Required</Text>
                    <Text style={{marginTop: 2, color: "grey"}}>Football</Text>
                    <Text style={{marginTop: 2, color: "grey"}}>Baseball</Text>
                </View>
            </View>
            <View style={{padding:20}}>
                    <Button onPress={()=>navigation.navigate('chat', {
                            headerName:"Chat"
                        })} color={"#FFB906"} title={"Contact Parent"}/>
                <Text onPress={()=> navigation.navigate('CareTakerHome')}
                      style={{fontSize:15, textAlign:"center", marginTop:10, color:"grey"}}>
                    Cancel
                </Text>
            </View>


            <BottomSheet
                visible={state.isBottomSheetOpen}
                onBackButtonPress={()=>setState({...state, isBottomSheetOpen: false})}
                onBackdropPress={()=>setState({...state, isBottomSheetOpen: false})}
            >
                <View style={BottomSheetStyling.container}>
                    <View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                gap:16,
                                backgroundColor:"#FFF1E4",
                                padding:16,
                                borderRadius:10
                            }}>
                                <View>
                                    <Image source={man} style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 40,
                                        borderWidth: 1,
                                        borderColor: "black",
                                        margin: "auto"
                                    }}/>
                                    <Text style={{fontWeight: "bold", fontSize: 14, marginTop: 2, textAlign:"center"}}>Henry</Text>
                                    <Text style={{color: "grey", fontSize:8, textAlign:"center"}}>(Parent)</Text>
                                </View>
                                <View>
                                    <Image source={woman} style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 40,
                                        borderWidth: 1,
                                        borderColor: "black",
                                        margin: "auto"
                                    }}/>
                                    <Text style={{fontWeight: "bold", fontSize: 14, marginTop: 2, textAlign:"center"}}>Malaika</Text>
                                    <Text style={{color: "grey", fontSize:8, textAlign:"center"}}>(Parent)</Text>
                                </View>
                                <TouchableOpacity onPress={()=>navigation.navigate('ChildInfoPage', {
                                    headerName:"Information"
                                })}>
                                <View style={{borderWidth:1, padding:4, borderRadius:4, borderColor:"#FF912C", backgroundColor:"#FFD3AB"}}>
                                    <Image source={babyTwo} style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 40,
                                        borderWidth: 1,
                                        borderColor: "black",
                                        margin: "auto"
                                    }}/>
                                    <Text style={{fontWeight: "bold", fontSize: 14, marginTop: 2, textAlign:"center"}}>Peter</Text>
                                    <Text style={{color: "grey", fontSize:8, textAlign:"center"}}>(Son)</Text>
                                </View>
                                </TouchableOpacity>
                                <View>
                                    <Image source={babyOne} style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 40,
                                        borderWidth: 1,
                                        borderColor: "black",
                                        margin: "auto"
                                    }}/>
                                    <Text style={{fontWeight: "bold", fontSize: 14, marginTop: 2, textAlign:"center"}}>Ale</Text>
                                    <Text style={{color: "grey", fontSize:8, textAlign:"center"}}>(Daughter)</Text>
                                </View>
                                </View>
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
                            <View>
                                <Text style={{marginTop: 20, fontWeight: "bold"}}>Note</Text>
                                <Text style={{color: "grey"}}>Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
                                    the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen book.</Text>
                            </View>
                            <View style={{margin:10}}/>
                            <Button title={"Add note"} color={"#FFB906"}/>
                        </ScrollView>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
}

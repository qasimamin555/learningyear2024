import {Alert, Button, Image, ScrollView, Text, View, TouchableOpacity} from "react-native";
import man from "../../../assets/man/man.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, {useState} from "react";
import BottomSheetStyling from "../../parents/BottomSheetStyling";
import {Checkbox} from "react-native-paper";
import {BottomSheet} from "react-native-btr";
import {useNavigation} from "@react-navigation/native";

export default function FavouritesParents(){
    const [state, setState] = useState({
        isBottomSheetOpen:false,
        aos:false
    })
    const navigate = useNavigation()
    return <View>
        <TouchableOpacity onPress={()=>setState({...state, isBottomSheetOpen: true})} style={{padding:10, marginTop:10}}>
        <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
            <View style={{flexDirection:"row", gap:10}}>
                <Image source={man} style={{
                    height:46,
                    width:46,
                    borderRadius:23,
                    borderWidth:1,
                    borderColor:"black"
                }}/>
                <View>
                    <Text style={{color:"#263238", fontWeight:"bold", marginTop:2}}>usman</Text>
                    <Text style={{color:"#FF912C", fontSize:10}}>Member since 2022</Text>
                    <View style={{flexDirection:"row", alignItems:"center", gap:2, marginTop:6}}>
                        <Ionicons name="star" color={"#FFDB1E"}/>
                        <Text style={{fontSize:12}}>5.0</Text>
                        <Text style={{fontSize:12, color:"grey"}}>(122)</Text>
                    </View>
                </View>
            </View>
            <Ionicons name="star" size={16} color={"#FFDB1E"}/>
        </View>
        <View style={{height:1, width:"100%", backgroundColor:"black", marginTop:10}}></View>
    </TouchableOpacity>
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
                                        <Text style={{fontSize: 16, fontWeight: "bold"}}>27</Text>
                                        <Text style={{color: "#6A6A6A", fontSize: 12}}>Services use</Text>
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
                                <Text style={{marginTop: 10, fontWeight: "bold"}}>Required services</Text>
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
                                <Text style={{marginTop: 20, fontWeight: "bold"}}>Parent Note</Text>
                                <Text style={{color: "grey"}}>Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
                                    the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen book.</Text>

                                <Text style={{marginTop: 20, fontWeight: "bold"}}>Your Note</Text>
                                <Text style={{color: "grey"}}>Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
                                    the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen book.</Text>
                                <View style={{marginTop:10}}/>
                                <Button onPress={()=>navigate.navigate('chat', {
                                    headerName:"Chat"
                                })} color={'#FFB906'} title={'Contact Parent'}/>
                            </View>

                </ScrollView>

            </View>
        </BottomSheet>
    </View>
}
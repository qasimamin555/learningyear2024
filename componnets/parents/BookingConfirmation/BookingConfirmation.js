import React, {useState} from "react";
import {Button, Image, ScrollView, Text, View} from 'react-native';
import parentsStyling from "../parentsStyling";
import MainHeader from "../header/header";
import {Checkbox, TextInput} from "react-native-paper";
import FavouritesCaretakerProfile from "../favourites/FavouritesCaretakerProfile";
import man from "../../../assets/man/man.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BookingConfirmation({route, navigation}) {
    const {headerName} = route.params
    return (
        <View style={[parentsStyling.container]}>
            <MainHeader  headerName={headerName}/>
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
                    <Ionicons name="ellipsis-horizontal" color={"white"} style={{marginTop:10}}/>
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
                    <Text style={{fontWeight:"bold", marginTop:4}}>Name</Text>
                    <Text style={{color:"grey"}}>Peter</Text>
                    <Text style={{fontWeight:"bold", marginTop:4}}>School</Text>
                    <Text style={{color:"grey"}}>London School, London</Text>
                    <Text style={{fontWeight:"bold", marginTop:4}}>Age</Text>
                    <Text style={{color:"grey"}}>8 Months</Text>

                    <Text style={{fontSize:15, fontWeight:"bold", marginTop:10}}>Services</Text>
                    <View style={{flexDirection:"row", alignItems:"center", gap:2}}>
                        <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                        <Text>
                            Football
                        </Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center", gap:2}}>
                        <Checkbox color={"#FFB906"} value={"Hello"} status={"unchecked"}/>
                        <Text>
                            Baseball
                        </Text>
                    </View>

                </View>
            </View>
            <View style={{padding:20}}>
                {
                    headerName==="Live" || headerName==="Upcoming Booking" ? <Button onPress={()=>navigation.navigate('chat', {
                        headerName:"Chat"
                        })} color={"#FFB906"} title={"Contact Caregiver"}/> :
                        <Button onPress={()=>navigation.navigate('parentsHome')} color={"#FFB906"} title={"Confirm"}/>
                }
                <Text onPress={()=> headerName!=="Live" && navigation.navigate('parentsHome')} style={{fontSize:15, textAlign:"center", marginTop:10, color:"grey"}}>
                    {
                        headerName==="Live" ? "Get Location" : "Cancel"
                    }
                    </Text>
            </View>
        </View>
    );
}

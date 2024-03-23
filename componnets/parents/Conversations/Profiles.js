import {Image, Text, TouchableOpacity, View} from "react-native";
import man from "../../../assets/man/man.jpg";
import React from "react";

export default function Profiles(props){
    return <TouchableOpacity onPress={()=>props.navigation.navigate("chat", {
        headerName:"Chat"
    })}>
        <View style={{padding:10, marginTop:10, backgroundColor:!!props.background ? "#FFF4EA" : "white", borderRadius:10}}>
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
                    <Text style={{color:"#989898", fontSize:14, marginTop:2}}>Hello how are you?</Text>
                </View>
            </View>
            <Text style={{fontSize:10, color:props.status!=="Online" ? "#FF1D46" : "#00B428"}}>{props.status}</Text>
        </View>
    </View>
    </TouchableOpacity>
}
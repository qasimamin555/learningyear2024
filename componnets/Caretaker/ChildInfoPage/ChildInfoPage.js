import {Button, Image, ScrollView, Text, View} from "react-native";
import parentsStyling from "../../parents/parentsStyling";
import MainHeader from "../../parents/header/header";
import React, {useState} from "react";
import babyTwo from "../../../assets/baby/baby2.jpg"

export default function ChildInfoPage({route, navigation}) {
    const [state, setState] = useState({
        isBottomSheetOpen:false
    })
    const {headerName} = route.params
    return (
        <View style={[parentsStyling.container]}>
            <MainHeader  isCaretaker={true} headerName={headerName}/>
            <View style={{padding:20, backgroundColor:"#2CA6FF", paddingTop:0}}>
                <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
                    <View style={{
                        width: "100%",
                        textAlign: "center",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Image source={babyTwo} style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40,
                            borderWidth: 1,
                            borderColor: "black",
                            margin: "auto"
                        }}/>
                        <Text style={{fontWeight: "bold",color:"white", fontSize: 14, marginTop: 10}}>Kerry Mate</Text>
                        <Text style={{color: "#FF912C"}}>1.5 Years</Text>
                        <Text style={{color: "white", fontSize: 12}}>Grade 2</Text>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{padding:20, height:"65%"}}>
                <View>
            <Text style={{marginTop: 10, fontWeight: "bold"}}>Required services</Text>
            <View style={{marginTop:6}}>
                <Text>Sports</Text>
                <Text style={{color: "grey", marginTop:2}}>
                    Football
                </Text>
                <Text style={{color: "grey", marginTop:2}}>
                    Baseball
                </Text>
            </View>
            <Text style={{marginTop:6}}>Music</Text>
                <Text style={{color: "grey", marginTop:2}}>
                    Pop
                </Text>
                <Text style={{color: "grey", marginTop:2}}>
                    Solo
                </Text>
            <Text style={{marginTop: 20, fontWeight: "bold"}}>Parent Note</Text>
            <Text style={{color: "grey"}}>Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
                the 1500ss.</Text>

            <Text style={{marginTop: 20, fontWeight: "bold"}}>Your Note</Text>
            <Text style={{color: "grey"}}>Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
                the 1500s.</Text>
                </View>
            </ScrollView>
        </View>
    );
}

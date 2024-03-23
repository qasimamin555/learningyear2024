import React, {useState} from "react";
import {Button, Image, ScrollView, Text, View} from 'react-native';
import parentsStyling from "../parentsStyling";
import MainHeader from "../header/header";
import {TextInput} from "react-native-paper";
import Profiles from "./Profiles";

export default function Conversations({route, navigation}) {
    const {headerName} = route.params
    return (
        <View style={[parentsStyling.container]}>
            <MainHeader  headerName={headerName}/>
            <View style={{padding:20}}>
                <TextInput
                    label="Search"
                    style={{backgroundColor: "white", width: "100%"}}
                    activeUnderlineColor={"#FFB906"}
                />
                <Profiles navigation={navigation} background={"white"} status={"Online"}/>
                <Profiles navigation={navigation} background={null} status={"Offline"}/>
                <Profiles navigation={navigation} background={"white"} status={"Offline"}/>
                <Profiles navigation={navigation} background={null} status={"Online"}/>
            </View>
        </View>
    );
}

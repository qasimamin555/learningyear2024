import React, {useState} from "react";
import {Button, Image, ScrollView, Text, View} from 'react-native';
import parentsStyling from "../parentsStyling";
import MainHeader from "../header/header";
import {TextInput} from "react-native-paper";
import FavouritesCaretakerProfile from "./FavouritesCaretakerProfile";

export default function FavouriteCaretaker({route, navigation}) {
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
            <FavouritesCaretakerProfile/>
            <FavouritesCaretakerProfile/>
            <FavouritesCaretakerProfile/>
        </View>
        </View>
    );
}

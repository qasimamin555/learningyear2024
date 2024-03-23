import React, {useState} from "react";
import {Button, Image, ScrollView, Text, View} from 'react-native';
import parentsStyling from "../../parents/parentsStyling";
import MainHeader from "../../parents/header/header";
import {TextInput} from "react-native-paper";
import FavouritesParents from "./FavouritesParents";

export default function FavouriteParent({route, navigation}) {
    const {headerName} = route.params
    return (
        <View style={[parentsStyling.container]}>
            <MainHeader  isCaretaker={true} headerName={headerName}/>
            <View style={{padding:20}}>
            <TextInput
                label="Search"
                style={{backgroundColor: "white", width: "100%"}}
                activeUnderlineColor={"#FFB906"}
            />
            <FavouritesParents/>
            <FavouritesParents/>
            <FavouritesParents/>
        </View>
        </View>
    );
}

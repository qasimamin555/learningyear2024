import React, {useState} from "react";
import {Button, Image, ScrollView, Text, View} from 'react-native';
import parentsStyling from "../parentsStyling";
import MainHeader from "../header/header";
import {TextInput} from "react-native-paper";
import FavouritesCaretakerProfile from "../favourites/FavouritesCaretakerProfile";

export default function AllCaretakers({route, navigation}) {
    const [state, setState] = useState({
        mode:"all",
        module:"allCaretakers"
    })
    const {headerName ,bookingData} = route.params;
    return (
        <View style={[parentsStyling.container]}>
            <MainHeader  headerName={headerName}/>
            <View style={{flexDirection:"row", justifyContent:"space-around", padding:20, paddingBottom:0}}>
                <Text style={{fontWeight: state.mode==="all" ? "bold" : "grey"}} onPress={()=>setState({...state, mode:"all"})}>All</Text>
                <Text style={{fontWeight: state.mode==="favourites" ? "bold" : "grey"}} onPress={()=>setState({...state, mode:"favourites"})}>Favourites</Text>
            </View>
            {
                state.mode==="all" ? <View style={{padding:20, paddingTop:0}}>
                    <TextInput
                        label="Search"
                        style={{backgroundColor: "white", width: "100%"}}
                        activeUnderlineColor={"#FFB906"}
                    />
                    <FavouritesCaretakerProfile module={state.module}/>
                    <FavouritesCaretakerProfile  module={state.module}/>
                    <FavouritesCaretakerProfile  module={state.module}/>
                </View> : <View style={{padding:20, paddingTop:0}}>
                    <TextInput
                        label="Search"
                        style={{backgroundColor: "white", width: "100%"}}
                        activeUnderlineColor={"#FFB906"}
                    />
                    <FavouritesCaretakerProfile  module={state.module}/>
                </View>
            }

        </View>
    );
}

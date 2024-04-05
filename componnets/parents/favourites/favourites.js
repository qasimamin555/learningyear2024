import React, {useContext, useState} from "react";
import {Button, Image, ScrollView, Text, View} from 'react-native';
import parentsStyling from "../parentsStyling";
import MainHeader from "../header/header";
import {TextInput} from "react-native-paper";
import FavouritesCaretakerProfile from "./FavouritesCaretakerProfile";
import {GlobalContext} from "../../store";

export default function FavouriteCaretaker({route, navigation}) {
    const {headerName} = route.params;
    const [globalState, dispatch] = useContext(GlobalContext);
    const {allRequests} = globalState;

    return (
        <View style={[parentsStyling.container]}>
            <MainHeader headerName={headerName}/>
            <View style={{padding: 20}}>
                {
                    '' && <TextInput
                        label="Search"
                        style={{backgroundColor: "white", width: "100%"}}
                        activeUnderlineColor={"#FFB906"}
                    />
                }

                {allRequests.length
                    && allRequests.map((data, index) => {
                        if (data.isFavourites) {
                            return <FavouritesCaretakerProfile navigation={navigation} data={data} index={index}/>
                        }
                    })

                }
            </View>
        </View>
    );
}

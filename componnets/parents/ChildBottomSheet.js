import {Image, Text, View, TouchableOpacity} from "react-native";
import {Checkbox} from "react-native-paper";
import React, {useEffect, useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ChildBottomSheet(props) {
    const {navigation, closeBottomSheet, checked, setChecked} = props;

    useEffect(() => {
        return () => {
            // closeBottomSheet();
        }
    }, []);

    const onSelector = (id) => {
        if(!checked.includes(id)) {
            setChecked([...checked, id])
        } else {
            let filterCheckBox = checked.filter((v) => v !== id);
            setChecked(filterCheckBox);
        }
    };

    return <TouchableOpacity onPress={() => props.mode !== "addBooking" && navigation.navigate("addChildForm", {
        headerName: "Child Information",
        isAdd: false
    })}>
        <View style={{
            flexDirection: "row",
            marginTop: 10,
            gap: 10,
            padding: 8,
            alignItems: "center",
            backgroundColor: "#FFE9D5",
            borderRadius: 10
        }}>
            {
                props.mode === "addBooking"
                && <Checkbox
                    onPress={(e) => {
                        onSelector(props.data._id)
                    }}
                    color={"#FFB906"}
                    status={checked.includes(props?.data?._id) ? "checked" : "unchecked"}
                />
            }
            {/*<Image source={props.img} style={{*/}
            {/*    height: 50,*/}
            {/*    width: 50,*/}
            {/*    borderRadius: 25,*/}
            {/*    borderWidth: 1,*/}
            {/*    borderColor: "black"*/}
            {/*}}/>*/}

            <View style={{borderWidth: 1, borderRadius: 100, padding: 5}}>
                <Ionicons color={"gray"} size={30} name={"person"}/>
            </View>
            <View>
                <Text style={{color: "#263238", fontWeight: "bold", marginTop: 4}}>{props?.childName}</Text>
                <Text style={{color: "#FF912C"}}>{props?.data?.age}</Text>
            </View>
        </View>
    </TouchableOpacity>
}

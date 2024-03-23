import React, {useState} from "react";
import {Button, Image, ScrollView, Text, View} from 'react-native';
import parentsStyling from "../../parentsStyling";
import MainHeader from "../../header/header";
import profileImage from "../../../../assets/AuthenticationPage/signupProfileImage.png";
import authenticationStyling from "../../../authenticationPages/CaretakerSignup/authenticationStyling";
import {Checkbox, RadioButton, TextInput} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import {BottomSheet} from "react-native-btr";

export default function ChildInformation({route, navigation}) {
    const [state, setState] = useState({
        isPickUp:false,
        childSeat:"",
        checkBoxOne:false,
        checkBoxTwo:false,
        checkBoxThree:false,
        isBottomSheetOpen:false,
        drawerName:""
    })
    let musicalData=[
        {
            label:"Cello"
        },
        {
            label:"Guitar"
        },
        {
            label:"Flute"
        },
        {
            label:"Piano"
        },
        {
            label:"Vialin"
        }
    ]

    let sportsData=[
        {
            label:"Baseball"
        },
        {
            label:"Basketball"
        },
        {
            label:"Football"
        },
        {
            label:"Soccer"
        },
        {
            label:"Tennis"
        },
        {
            label:"Volleyball"
        }
    ]

    let languageData=[
        {
            label:"Arabic"
        },
        {
            label:"Chinese"
        },
        {
            label:"French"
        },
        {
            label:"German"
        },
        {
            label:"Hebrew"
        },
        {
            label:"Hindi"
        },
        {
            label:"Italian"
        },
        {
            label:"Japanese"
        },
        {
            label:"Korean"
        },
        {
            label:"Russian"
        },
        {
            label:"Spanish"
        },
        {
            label:"Tagalog"
        }
    ]
    // const {headerName} = route?.params
    let drawerContent = state.drawerName==="Music" ? musicalData : state.drawerName==="Language" ? languageData: sportsData
    return (
        <View style={[parentsStyling.container]}>
            <MainHeader 
                // headerName={headerName}
            />
            <View style={[parentsStyling.buttonContainer, {flexDirection: "column", paddingTop:0}]}>
                <Image style={{height: 100, width: 100}} source={profileImage}/>
                <Text style={{marginTop:-30, fontSize:12, color:"white"}}>Upload</Text>
            </View>

            <View style={{height:"69%", padding:16, flexDirection:"column", justifyContent:"space-between"}}>
                <ScrollView showsVerticalScrollIndicator={false} style={parentsStyling.parentContainer}>
                    <View style={{width: "100%"}}>
                        <Text style={authenticationStyling.optionsHeading}>Child info</Text>
                        <TextInput
                            label="Name"
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                        />
                        <TextInput
                            label="School"
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                        />
                        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                            <TextInput
                                label="DD"
                                style={{backgroundColor: "white", width: "24%"}}
                                activeUnderlineColor={"#FFB906"}
                                keyboardType="numeric"
                            />
                            <Text>:</Text>
                            <TextInput
                                label="MM"
                                style={{backgroundColor: "white", width: "24%"}}
                                activeUnderlineColor={"#FFB906"}
                                keyboardType="numeric"
                            />
                            <Text>:</Text>
                            <TextInput
                                label="YYYY"
                                style={{backgroundColor: "white", width: "24%"}}
                                activeUnderlineColor={"#FFB906"}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View style={{width: "100%"}}>
                        <Text style={authenticationStyling.optionsHeading}>Gender</Text>
                        <View style={{width: "100%", flexDirection:"row", gap:20}}>
                            <View style={{flexDirection:"row", alignItems:"center"}}>
                                <RadioButton
                                    status={state.isPickUp ? 'checked' : 'unchecked'}
                                    color="#FFB906"
                                    onPress={()=> {
                                        setState({...state, isPickUp: !state.isPickUp})
                                    }}
                                />
                                <Text style={[authenticationStyling.optionsHeading, {marginTop: -2}]}>Male</Text>
                            </View>

                            <View style={{flexDirection:"row", alignItems:"center"}}>
                                <RadioButton
                                    status={state.isPickUp ? 'checked' : 'unchecked'}
                                    color="#FFB906"
                                    onPress={()=> {
                                        setState({...state, isPickUp: !state.isPickUp})
                                    }}
                                />
                                <Text style={[authenticationStyling.optionsHeading, {marginTop: -2}]}>Female</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{width: "100%"}}>
                        <Text style={authenticationStyling.optionsHeading}>Services</Text>
                        <Text style={[authenticationStyling.optionsHeading]}>Sports</Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop:8
                        }}>
                            <Text style={{color:"#404040"}}>
                                Baseball
                            </Text>
                            <View style={{flexDirection: "row", gap: 10}}>
                                <Icon name="remove" color="red" size={16}/>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop:8
                        }}>
                            <Text style={{color:"#404040"}}>
                                Basketball
                            </Text>
                            <View style={{flexDirection: "row", gap: 10}}>
                                <Icon name="remove" color="red" size={16}/>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop:8
                        }}>
                            <Text style={{color:"#404040"}}>
                                Baseball
                            </Text>
                            <View style={{flexDirection: "row", gap: 10}}>
                                <Icon name="remove" color="red" size={16}/>
                            </View>
                        </View>
                        <View style={{flexDirection:"row", justifyContent:"center", marginTop:18}}>
                            <View style={{
                                flexDirection:"row",
                                alignItems:"center",
                                gap:4,
                            }}>
                                <Icon name="add" color="#0179EF" size={16}/>
                                <Text onPress={()=>setState({...state, drawerName: "Sports", isBottomSheetOpen:true})} style={{color:"#0179EF"}}>Add More</Text>
                            </View>
                        </View>

                        <Text style={[authenticationStyling.optionsHeading]}>Music</Text>

                        <View style={{flexDirection:"row", justifyContent:"center", marginTop:18}}>
                            <View style={{
                                flexDirection:"row",
                                alignItems:"center",
                                gap:4,
                            }}>
                                <Icon name="add" color="#0179EF" size={16}/>
                                <Text onPress={()=>setState({...state, drawerName: "Music", isBottomSheetOpen:true})} style={{color:"#0179EF"}}>Add More</Text>
                            </View>
                        </View>

                        <Text style={[authenticationStyling.optionsHeading]}>Language</Text>

                        <View style={{flexDirection:"row", justifyContent:"center", marginTop:18}}>
                            <View style={{
                                flexDirection:"row",
                                alignItems:"center",
                                gap:4
                            }}>
                                <Icon name="add" color="#0179EF" size={16}/>
                                <Text onPress={()=>setState({...state, drawerName: "Language", isBottomSheetOpen:true})} style={{color:"#0179EF"}}>Add More</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{width: "100%"}}>
                        <Text style={authenticationStyling.optionsHeading}>Add information here</Text>
                        <TextInput
                            label="Notes"
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                        />
                    </View>
                </ScrollView>
                <BottomSheet
                    visible={state.isBottomSheetOpen}
                    onBackButtonPress={()=>setState({...state, isBottomSheetOpen: false})}
                    onBackdropPress={()=>setState({...state, isBottomSheetOpen: false})}
                >
                    <View style={authenticationStyling.bottomSheet}>
                        <View style={{
                            backgroundColor:"#E6F2FD",
                            flexDirection:"row",
                            justifyContent:"space-between",
                            alignItems:"center",
                            padding:10,
                            borderRadius:10}}>
                            <View style={{flexDirection:"row",width:"70%", alignItems:"center", gap:10}}>
                                <Text style={{fontSize:16, color:"#263238"}}>{state.drawerName}</Text>
                                <View style={{height:1, width:"60%", backgroundColor:"#263238"}}/>
                            </View>
                            <View style={{height:8, width:8, borderRadius:4, backgroundColor:"#0179EF"}}/>
                        </View>
                        <ScrollView style={{marginTop:"2%"}} showsVerticalScrollIndicator={false}>
                            <View style={{marginTop:20}}>
                                {
                                    drawerContent.map((item, idx)=> <View key={idx} style={{flexDirection:"row", alignItems:"center", gap:2}}>
                                        <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                        <Text>
                                            {item.label}
                                        </Text>
                                    </View>)
                                }
                            </View>
                        </ScrollView>
                    </View>
                </BottomSheet>
                <Button color={"#FFB906"} title={"Add"}></Button>
            </View>

        </View>
    );
}

import React, {useContext, useEffect, useState} from "react";
import {Text, View, Button, Image, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native';
import styles from "../../rootStyling";
import splashStyling from "../../splashScreens/splashScreensStyling";
import {TextInput, RadioButton, Checkbox, HelperText} from 'react-native-paper';
import Header from "../ReuseableComponents/Header";
import authenticationStyling from "../CaretakerSignup/authenticationStyling";
import profileImage from "../../../assets/AuthenticationPage/signupProfileImage.png";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {loginUser, registration} from "../../actions";
import {GlobalContext} from "../../store";
import {SET_USER_INFO} from "../../store/const";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";


export default function GuardianSignup({route, navigation}) {
    const [globalState, dispatch] = useContext(GlobalContext);

    const [state, setState] = useState({
        isPickUp: false,
        childSeat: "",
        checkBoxOne: false,
        checkBoxTwo: false,
        checkBoxThree: false,
        isBottomSheetOpen: false,
        isInvalid: false
    })

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        registrationType: "parent",
        // childName: "",
        // childSchool: "",
    })

    const OnChange = (name, value) => {
        setForm({...form, [name]: value})
    }

    useEffect(() => {
        AsyncStorage.getItem('location')
            .then(async data => {
                if (data) {
                    let parseData = JSON.parse(data);
                    let location = await Location.reverseGeocodeAsync(parseData);
                    let address = formatAddress(location[0]);
                    setForm({...form, address: address});
                }
            })
    }, []);


    function formatAddress(address) {
        let formattedAddress = "";

        if (address.name) {
            formattedAddress += address.name + " ";
        }

        if (address.streetNumber) {
            formattedAddress += address.streetNumber + " ";
        }

        if (address.street) {
            formattedAddress += address.street + ", ";
        }

        if (address.district) {
            formattedAddress += address.district + ", ";
        }

        if (address.city) {
            formattedAddress += address.city + ", ";
        }

        if (address.subregion) {
            formattedAddress += address.subregion + ", ";
        }

        if (address.region) {
            formattedAddress += address.region + ", ";
        }

        if (address.postalCode) {
            formattedAddress += address.postalCode + ", ";
        }

        if (address.country) {
            formattedAddress += address.country;
        }

        return formattedAddress.trim();
    }

    const pickImage = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.All,
        //     allowsEditing: true,
        //     aspect: [4, 3],
        //     quality: 1,
        // });
        //
        // if (!result.cancelled) {
        //     console.log(result, "%%%%%%%%%%%%%5");
        // }
    };

    const signUp = () => {
        AsyncStorage.getItem('location')
            .then(locate => {
                if (!locate) {
                    return ToastAndroid.show("Location is required", 2000);
                }

                let {name, email, password, address, registrationType, childName, childSchool} = form;
                if (!!name?.trim() && !!email?.trim() && !!password?.trim() && !!address?.trim()) {
                    setState({...state, isInvalid: false});

                    registration({
                        ...form, location: JSON.parse(locate)
                    })
                        .then(response => {
                            if (response?.success) {
                                ToastAndroid.show("Account created successfully", 2000);
                                loginUser({email, password})
                                    .then(async response => {
                                        if (response?.success) {
                                            dispatch({type: SET_USER_INFO, payload: response.data.result});
                                            await AsyncStorage.setItem("userInfo", JSON.stringify(response.data.result));
                                            setForm({
                                                name: "",
                                                email: "",
                                                password: "",
                                                address: "",
                                                registrationType: "parent",
                                                location: ''
                                            })
                                        }
                                    })
                            }
                        });
                } else {
                    setState({...state, isInvalid: true});
                }
            });
    }

    const hasErrors = (name) => {
        return (!form[name].trim() && state.isInvalid);
    }

    const {headerName} = route.params;
    return (
        <View style={[styles.container]}>
            <Header headerName={headerName}/>
            <View style={splashStyling.splashScreenContainer}>
                <ScrollView style={{marginTop: "20%"}} showsVerticalScrollIndicator={false}>
                    <View style={[splashStyling.splashScreenContent, {width: "100%", marginTop: "10%"}]}>
                        <View style={{width: "100%"}}>
                            <Button onPress={() => navigation.navigate('caretakerSignup', {
                                headerName: "Caregiver Signup"
                            })} title={"Switch To Caregiver"}/>
                        </View>
                        <View style={{width: "100%"}}>
                            <Text style={authenticationStyling.optionsHeading}>General Information</Text>

                            <TextInput
                                onChangeText={(text) => OnChange("name", text)}
                                value={form.name}
                                label="Name"
                                style={{backgroundColor: "white", width: "100%"}}
                                activeUnderlineColor={"#FFB906"}
                            />
                            <HelperText type="error" visible={hasErrors("name")}>
                                Name is required!
                            </HelperText>

                            <TextInput
                                onChangeText={(text) => OnChange("email", text)}
                                value={form.email}
                                label="Email"
                                style={{backgroundColor: "white", width: "100%"}}
                                activeUnderlineColor={"#FFB906"}
                            />

                            <HelperText type="error" visible={hasErrors("email")}>
                                Email is required!
                            </HelperText>

                            <TextInput
                                secureTextEntry
                                onChangeText={(text) => OnChange("password", text)}
                                value={form.password}
                                label="Password"
                                style={{backgroundColor: "white", width: "100%"}}
                                activeUnderlineColor={"#FFB906"}
                            />
                            <HelperText type="error" visible={hasErrors("password")}>
                                Password is required!
                            </HelperText>

                            {/*<View style={{flexDirection: "row", justifyContent: "center", marginTop: 18}}>*/}
                            {/*    <View style={{*/}
                            {/*        flexDirection: "row",*/}
                            {/*        alignItems: "center",*/}
                            {/*        gap: 4*/}
                            {/*    }}>*/}
                            {/*        <Icon name="add" color="#0179EF" size={16}/>*/}
                            {/*        <Text style={{color: "#0179EF"}}>Add Parent/Guardian</Text>*/}
                            {/*    </View>*/}
                            {/*</View>*/}

                        </View>

                        <View style={{width: "100%"}}>
                            <Text style={authenticationStyling.optionsHeading}>Parent/Guardian Address</Text>

                            <TextInput
                                onChangeText={(text) => OnChange("address", text)}
                                value={form.address}
                                mode={"outlined"}
                                multiline={true}
                                numberOfLines={5}
                                label="Address"
                                style={{backgroundColor: "#F5F5F5", width: "100%"}}
                                activeUnderlineColor={"#FFB906"}
                            />
                            <HelperText type="error" visible={hasErrors("address")}>
                                Address is required!
                            </HelperText>

                            {/*<View style={{flexDirection: "row", justifyContent: "center", marginTop: 18}}>*/}
                            {/*    <View style={{*/}
                            {/*        flexDirection: "row",*/}
                            {/*        alignItems: "center",*/}
                            {/*        gap: 4*/}
                            {/*    }}>*/}
                            {/*        <Icon name="add" color="#0179EF" size={16}/>*/}
                            {/*        <Text onPress={() => setState({...state, isBottomSheetOpen: true})}*/}
                            {/*              style={{color: "#0179EF"}}>Add More</Text>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                        </View>

                        <View style={{width: "100%"}}>
                            <Text style={authenticationStyling.optionsHeading}>Authorized People</Text>
                            <Text style={{fontSize: 12}}>Alternative people that are authorized by you to pick up your
                                child, ie friends or extended family. Please note that we can not individually vet
                                people on this list as it is designed to cover last minute cases where you can't
                                personally be there for the pick up, and the vetting procedure takes considerable
                                time.</Text>
                            <View style={{
                                flexDirection: "row",
                                marginTop: 8,
                                alignItems: "center"
                            }}>
                                <Image style={{height: 60, width: 60, borderRadius: 30}} source={profileImage}/>
                                <Text style={{fontWeight: "bold"}}>Harry Peter</Text>
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 18}}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 4
                                }}>
                                    <Icon name="add" color="#0179EF" size={16}/>
                                    <Text style={{color: "#0179EF"}}>Add More</Text>
                                </View>
                            </View>
                        </View>


                        <View style={{width: "100%"}}>
                            <Button onPress={signUp} color={"#FFB906"} title={"Submit"}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

// <View style={{width: "100%"}}>
//                             <Text style={authenticationStyling.optionsHeading}>Child Information</Text>
//                             <TextInput
//                                 onChangeText={(text) => OnChange("childName", text)}
//                                 value={form.childName}
//                                 label="Name"
//                                 style={{backgroundColor: "white", width: "100%"}}
//                                 activeUnderlineColor={"#FFB906"}
//                             />
//                             <TextInput
//                                 onChangeText={(text) => OnChange('childSchool', text)}
//                                 value={form.childSchool}
//                                 label="School"
//                                 style={{backgroundColor: "white", width: "100%"}}
//                                 activeUnderlineColor={"#FFB906"}
//                             />
//                             <TouchableOpacity onPress={pickImage} style={{width: "100%"}}>
//                                 <View style={{flexDirection: "row", justifyContent: "center", marginTop: 18}}>
//                                     <Icon style={{transform: [{rotate: '-45deg'}]}} name="attachment" color="#0179EF"
//                                           size={16}/>
//                                     <Text style={{color: "#0179EF"}}>Upload Image (Optional)</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         </View>

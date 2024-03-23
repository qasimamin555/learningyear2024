import React, {useContext, useState} from "react";
import {Text, View, Button, Image, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native';
import styles from "../../rootStyling";
import splashStyling from "../../splashScreens/splashScreensStyling";
import {TextInput, RadioButton, Checkbox, HelperText} from 'react-native-paper';
import Header from "../ReuseableComponents/Header";
import authenticationStyling from "./authenticationStyling";
import profileImage from "../../../assets/AuthenticationPage/signupProfileImage.png";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BottomSheet} from "react-native-btr";
import BottomSheetStyling from "../../parents/BottomSheetStyling";
import CalendarPicker from "react-native-calendar-picker";
import {loginUser, registration, uploadImage} from "../../actions";
import {SET_USER_INFO} from "../../store/const";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GlobalContext} from "../../store";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data"

export default function CaretakerSignup({route, navigation}) {

    const [globalState, dispatch] = useContext(GlobalContext);
    const [state, setState] = useState({
        isPickUp: false,
        childSeat: "",
        checkBoxOne: false,
        checkBoxTwo: false,
        checkBoxThree: false,
        isBottomSheetOpen: false,
        drawerName: "",
        mode: "",
        isInvalid: false,
    })

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        registrationType: "caretaker",
        payload: {}
    })

    const [checkBox, setCheckBox] = useState([]);
    const [services, setServices] = useState([]);


    const {headerName} = route.params;
    const handleDateChange = (date) => {
        setSelectedDate(date);
        OnChange("payload", {dateOfBirth: date});
    };
    const [selectedDate, setSelectedDate] = useState(null);
    let musicalData = [
        {
            label: "Cello"
        },
        {
            label: "Guitar"
        },
        {
            label: "Flute"
        },
        {
            label: "Piano"
        },
        {
            label: "Vialin"
        }
    ]

    let sportsData = [
        {
            label: "Baseball"
        },
        {
            label: "Basketball"
        },
        {
            label: "Football"
        },
        {
            label: "Soccer"
        },
        {
            label: "Tennis"
        },
        {
            label: "Volleyball"
        }
    ]

    let languageData = [
        {
            label: "Arabic"
        },
        {
            label: "Chinese"
        },
        {
            label: "French"
        },
        {
            label: "German"
        },
        {
            label: "Hebrew"
        },
        {
            label: "Hindi"
        },
        {
            label: "Italian"
        },
        {
            label: "Japanese"
        },
        {
            label: "Korean"
        },
        {
            label: "Russian"
        },
        {
            label: "Spanish"
        },
        {
            label: "Tagalog"
        }
    ]

    let pickupService = [
        {text: "Eligibility for pick ups / drop offs:", radio: false},
        {text: "You must have your license for more than 2 years", radio: true},
        {text: "Car must be 2010 model or newer", radio: true},
        {text: "No points in license", radio: true},
        {text: "Valid car insurance", radio: true},
        {text: "Child Seats", radio: false},
        {text: "Forward Facing", radio: true},
        {text: "Rearward Facing", radio: true},
        {text: "Booster Facing", radio: true},
    ]


    const hasErrors = (name) => {
        return (!form[name].trim() && state.isInvalid);
    }

    const OnChange = (name, value) => {
        // {dateOfBirth: 11111111}
        // payload: {}
        if (typeof value === "object") {
            setForm({...form, payload: {...form.payload, ...value}})
        } else setForm({...form, [name]: value});
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result['cancelled']) {
            const data = result.assets[0];
            uploadImage(data)
                .then(response => {
                })
                .catch(err => {
                    console.log(err, "!!!!!!!!!!!!!!!!!!!!!!111");
                })
        }
    };

    const signUp = () => {
        let {name, email, password, address, registrationType, childName, childSchool} = form;
        if (!!name?.trim() && !!email?.trim() && !!password?.trim() && !!address?.trim()) {
            setState({...state, isInvalid: false})
            registration(form)
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
                                    })
                                }
                            })
                    }
                });
        } else {
            setState({...state, isInvalid: true});
        }
    }

    let drawerContent = state.drawerName === "Music" ? musicalData : state.drawerName === "Language" ? languageData : sportsData

    return (
        <View style={[styles.container]}>
            <Header headerName={headerName}/>
            <View style={splashStyling.splashScreenContainer}>
                <ScrollView style={{marginTop: "20%"}} showsVerticalScrollIndicator={false}>
                    <View style={[splashStyling.splashScreenContent, {width: "100%", marginTop: "10%"}]}>
                        <View style={{width: "100%"}}>
                            <Button onPress={() => navigation.navigate('guardianSignup', {
                                headerName: "Parent/Guardian Signup"
                            })} title={"Switch To Parent/Guardian"}/>
                        </View>
                        <TouchableOpacity onPress={pickImage}>
                            <Image style={{height: 150, width: 150}} source={profileImage}/>
                        </TouchableOpacity>
                        <Text style={{marginTop: -20}}>Upload Image</Text>
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

                            <TextInput
                                onChangeText={(text) => OnChange("address", text)}
                                value={form.address}
                                // mode={"outlined"}
                                multiline={true}
                                numberOfLines={5}
                                label="Address"
                                style={{backgroundColor: "#F5F5F5", width: "100%"}}
                                activeUnderlineColor={"#FFB906"}
                            />
                            <HelperText type="error" visible={hasErrors("address")}>
                                Address is required!
                            </HelperText>
                        </View>

                        {selectedDate
                            ? <TouchableOpacity
                                onPress={() => setState({...state, mode: "calendar", isBottomSheetOpen: true})}
                                style={{width: "100%"}}>
                                <TextInput
                                    disabled={true}
                                    value={selectedDate && new Date(selectedDate.toString()).toLocaleString()}
                                    label="Date of Birth"
                                    activeUnderlineColor={"#FFB906"}
                                />
                            </TouchableOpacity>
                            : <View style={{width: "100%"}}>
                                <Text style={authenticationStyling.optionsHeading}>Date Of Birth</Text>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 4,
                                    justifyContent: "center",
                                    marginTop: 14
                                }}>
                                    <Icon name="add" color="#0179EF" size={16}/>
                                    <Text
                                        onPress={() => setState({...state, mode: "calendar", isBottomSheetOpen: true})}
                                        style={{color: "#0179EF"}}>Select Date Of Birth</Text>
                                </View>
                            </View>}

                        <View style={{width: "100%"}}>
                            <Text style={authenticationStyling.optionsHeading}>Education</Text>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 8
                            }}>
                                <Text style={{color: "#404040"}}>
                                    Masters In Human Resources
                                </Text>
                                <View style={{flexDirection: "row", gap: 10}}>
                                    <Icon name="remove" color="red" size={16}/>
                                </View>
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
                            <Text style={authenticationStyling.optionsHeading}>Tutoring</Text>
                            <Text style={[authenticationStyling.optionsHeading]}>Sports</Text>

                            {
                                form?.payload?.Sports?.length
                                && form.payload.Sports.map((v) => {
                                    return <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: 8
                                    }}>
                                        <Text style={{color: "#404040"}}>
                                            {v}
                                        </Text>
                                        <View style={{flexDirection: "row", gap: 10}}>
                                            <Icon name="remove" color="red" size={16}/>
                                        </View>
                                    </View>
                                })
                            }

                            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 18}}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 4,
                                }}>
                                    <Icon name="add" color="#0179EF" size={16}/>
                                    <Text onPress={() => setState({
                                        ...state,
                                        drawerName: "Sports",
                                        isBottomSheetOpen: true
                                    })} style={{color: "#0179EF"}}>Add More</Text>
                                </View>
                            </View>

                            <Text style={[authenticationStyling.optionsHeading]}>Music</Text>

                            {
                                form?.payload?.Music?.length
                                && form.payload.Music.map((v) => {
                                    return <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: 8
                                    }}>
                                        <Text style={{color: "#404040"}}>
                                            {v}
                                        </Text>
                                        <View style={{flexDirection: "row", gap: 10}}>
                                            <Icon name="remove" color="red" size={16}/>
                                        </View>
                                    </View>
                                })
                            }
                            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 18}}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 4,
                                }}>
                                    <Icon name="add" color="#0179EF" size={16}/>
                                    <Text onPress={() => setState({
                                        ...state,
                                        drawerName: "Music",
                                        isBottomSheetOpen: true
                                    })} style={{color: "#0179EF"}}>Add More</Text>
                                </View>
                            </View>

                            <Text style={[authenticationStyling.optionsHeading]}>Language</Text>

                            {
                                form?.payload?.Language?.length
                                && form.payload.Language.map((v) => {
                                    return <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: 8
                                    }}>
                                        <Text style={{color: "#404040"}}>
                                            {v}
                                        </Text>
                                        <View style={{flexDirection: "row", gap: 10}}>
                                            <Icon name="remove" color="red" size={16}/>
                                        </View>
                                    </View>
                                })
                            }

                            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 18}}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 4
                                }}>
                                    <Icon name="add" color="#0179EF" size={16}/>
                                    <Text onPress={() => setState({
                                        ...state,
                                        drawerName: "Language",
                                        isBottomSheetOpen: true
                                    })} style={{color: "#0179EF"}}>Add More</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{width: "100%"}}>
                            <Text style={authenticationStyling.optionsHeading}>Child Age Range (Months)</Text>
                            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <TextInput
                                    onChangeText={(e) => OnChange("payload", {minChildAgeRang: e})}
                                    label="Min"
                                    style={{backgroundColor: "white", width: "40%"}}
                                    activeUnderlineColor={"#FFB906"}
                                    keyboardType="numeric"
                                />
                                <Text>To</Text>
                                <TextInput
                                    onChangeText={(e) => OnChange("payload", {maxChildAgeRang: e})}
                                    label="Max"
                                    style={{backgroundColor: "white", width: "40%"}}
                                    activeUnderlineColor={"#FFB906"}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={{width: "100%"}}>
                            <Text style={authenticationStyling.optionsHeading}>Citizenship</Text>
                            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 18}}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 4
                                }}>
                                    <Icon style={{transform: [{rotate: '-45deg'}]}} name="attachment" color="#0179EF"
                                          size={16}/>
                                    <Text style={{color: "#0179EF"}}>Upload</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{width: "100%"}}>
                            <Text style={authenticationStyling.optionsHeading}>Residency Proof</Text>
                            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 18}}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 4
                                }}>
                                    <Icon style={{transform: [{rotate: '-45deg'}]}} name="attachment" color="#0179EF"
                                          size={16}/>
                                    <Text style={{color: "#0179EF"}}>Upload</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{width: "100%"}}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <RadioButton
                                    status={state.isPickUp ? 'checked' : 'unchecked'}
                                    color="#FFB906"
                                    onPress={() => {
                                        setState({...state, isPickUp: !state.isPickUp})
                                    }}
                                />
                                <Text
                                    style={[authenticationStyling.optionsHeading, {marginTop: -2}]}>Pickups/Dropoff</Text>
                            </View>
                            {
                                state.isPickUp
                                && pickupService.map(({text, radio}) => {
                                    if (!radio) {
                                        return <Text style={authenticationStyling.optionsHeading}>{text}</Text>
                                    } else {
                                        return <View
                                            style={{
                                                flexDirection: "row",
                                                marginTop: 8,
                                                alignItems: "center",
                                            }}>
                                            <Checkbox
                                                onPress={() => {
                                                    if (form?.payload?.services?.includes(text)) {
                                                        let filterService = form?.payload?.services && form.payload.services.filter((v) => v !== text);
                                                        setForm({
                                                            ...form,
                                                            payload: {...form.payload, services: filterService}
                                                        });
                                                    } else {
                                                        setForm({
                                                            ...form,
                                                            payload: {
                                                                ...form.payload,
                                                                services: form?.payload?.services?.length ? [...form.payload.services, text] : [text]
                                                            }
                                                        })
                                                    }
                                                }}
                                                status={form?.payload?.services?.includes(text) ? 'checked' : 'unchecked'}
                                                color={"#FFB906"}
                                            />
                                            <Text style={{color: "#404040"}}>
                                                {text}
                                            </Text>
                                        </View>
                                    }
                                })
                            }

                        </View>

                        <View style={{width: "100%"}}>
                            <Button onPress={signUp} color={"#FFB906"} title={"Submit"}/>
                        </View>
                    </View>
                </ScrollView>

                <BottomSheet
                    visible={state.isBottomSheetOpen}
                    onBackButtonPress={() => {
                        setState({...state, isBottomSheetOpen: false, mode: ""});
                        if (checkBox?.length) {
                            OnChange("payload", {[state.drawerName]: checkBox});
                        }
                        setCheckBox([])
                    }}
                    onBackdropPress={() => {
                        setState({...state, isBottomSheetOpen: false, mode: ""})
                        setState({...state, isBottomSheetOpen: false, mode: ""});
                        if (checkBox?.length) {
                            OnChange("payload", {[state.drawerName]: checkBox});
                        }
                        setCheckBox([])
                    }}
                >
                    {
                        state.mode === "calendar" ? <View style={[BottomSheetStyling.container, {
                                flexDirection: "column", justifyContent: "space-between"
                            }]}>
                                <CalendarPicker
                                    onDateChange={handleDateChange}
                                    selectedStartDate={selectedDate}
                                    selectedEndDate={selectedDate}
                                    weekdays={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                                    months={[
                                        'January',
                                        'February',
                                        'March',
                                        'April',
                                        'May',
                                        'June',
                                        'July',
                                        'August',
                                        'September',
                                        'October',
                                        'November',
                                        'December',
                                    ]}
                                    textStyle={{
                                        color: '#000',
                                    }}
                                    previousTitle="Previous"
                                    nextTitle="Next"
                                    selectedDayColor="#3498db"
                                    selectedDayTextColor="#fff"
                                /></View>
                            : <View style={authenticationStyling.bottomSheet}>
                                <View style={{
                                    backgroundColor: "#E6F2FD",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: 10,
                                    borderRadius: 10
                                }}>
                                    <View style={{flexDirection: "row", width: "70%", alignItems: "center", gap: 10}}>
                                        <Text style={{fontSize: 16, color: "#263238"}}>{state.drawerName}</Text>
                                        <View style={{height: 1, width: "60%", backgroundColor: "#263238"}}/>
                                    </View>
                                    <View style={{height: 8, width: 8, borderRadius: 4, backgroundColor: "#0179EF"}}/>
                                </View>
                                <ScrollView style={{marginTop: "2%"}} showsVerticalScrollIndicator={false}>
                                    <View style={{marginTop: 20}}>
                                        {
                                            drawerContent.map((item, idx) => <View key={idx} style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 2
                                            }}>
                                                <Checkbox
                                                    onPress={(v) => {
                                                        if (checkBox.includes(item.label)) {
                                                            let filterCheckBox = checkBox.filter((value) => value !== item.label);
                                                            setCheckBox(filterCheckBox)

                                                        } else {
                                                            setCheckBox([...checkBox, item.label])
                                                        }
                                                    }}
                                                    color={"#FFB906"} value={"Hello"}
                                                    status={!!(checkBox && checkBox.includes(item.label)) ? "checked" : "unchecked"}
                                                />
                                                <Text>
                                                    {item.label}
                                                </Text>
                                            </View>)
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                    }
                </BottomSheet>
            </View>
        </View>
    );
}

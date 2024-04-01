import React, {useContext, useEffect, useState} from "react";
import {Button, Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import parentsStyling from "../../parentsStyling";
import MainHeader from "../../header/header";
import profileImage from "../../../../assets/AuthenticationPage/signupProfileImage.png";
import authenticationStyling from "../../../authenticationPages/CaretakerSignup/authenticationStyling";
import {Checkbox, HelperText, RadioButton, TextInput} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import {BottomSheet} from "react-native-btr";
import CalendarPicker from "react-native-calendar-picker";
import BottomSheetStyling from "../../BottomSheetStyling";
import {addChildren, updateChildren} from "../../../actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChildBottomSheet from "../../ChildBottomSheet";
import babyOne from "../../../../assets/baby/baby1.jpeg";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import {SET_CHILDRENS} from "../../../store/const";
import {GlobalContext} from "../../../store";

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

export default function AddChildForm({route, navigation}) {
    const [globalState, dispatch] = useContext(GlobalContext);
    const {headerName, isAdd, update, data} = route.params;

    const [state, setState] = useState({
        isPickUp: false,
        childSeat: "",
        checkBoxOne: false,
        checkBoxTwo: false,
        checkBoxThree: false,
        isBottomSheetOpen: false,
        drawerName: "",
        isInvalid: false,
        isDateOpen: false,

        day: null,
        month: null,
        year: null
    })

    const [form, setForm] = useState({
        name: "",
        school: "",
        gender: "male",
        note: "",
        age: ""
    })

    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (update) {
            console.log(JSON.stringify(data, null, 2))
            let {name, age, gender, school, note, _id} = data;
            setForm({
                name: name,
                school: school,
                gender: gender,
                note: note,
                age: age,
                id: _id
            })
        }
    }, [update]);

    const hasErrors = (name) => {
        if (name === "age") {
            return (!form[name] && state.isInvalid);
        } else return (!form[name]?.trim() && state.isInvalid);
    }

    const getToken = async () => {
        return await AsyncStorage.getItem('userInfo')
            .then(response => {
                if (response) {
                    try {
                        let data = JSON.parse(response);
                        return data.token
                    } catch (e) {

                    }
                }
            })
    }

    const AddChild = () => {
        if (!form.name.trim() || !form.gender.trim() || !form.age.trim()) {
            setState({...state, isInvalid: true});
        } else if (update) {
            let data = {...form};
            getToken()
                .then(token => {
                    updateChildren(token, data)
                        .then(response => {
                            if (response?.success) {
                                setForm({
                                    name: "",
                                    school: "",
                                    gender: "male",
                                    note: ""
                                });
                                ToastAndroid.show("Data updated successfully", 2000);
                                dispatch({type: SET_CHILDRENS, payload: []})
                                navigation.goBack();
                            }
                        })
                })
        } else {
            let data = {...form};
            getToken()
                .then(token => {
                    addChildren(token, data)
                        .then(response => {
                            if (response?.success) {
                                setForm({
                                    name: "",
                                    school: "",
                                    gender: "male",
                                    note: ""
                                });
                                ToastAndroid.show("Date added successfully", 2000);
                                dispatch({type: SET_CHILDRENS, payload: []})
                                navigation.goBack();
                            }
                        })
                })
        }
    }

    const OnChange = (name, value, extraParam) => {
        if (name === "age") {
            setForm({...form, [name]: value.toISOString()});
        } else setForm({...form, [name]: value});
    };

    const hasDateError = () => {
        return !selectedDate;
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const timer = (event, date) => {
        if (event.type === "set") {
            setState({...state, mode: "", timerValue: ""});
            OnChange("age", date);
        }
    }

    const handleDate = () => {
        setState({...state, mode: "timer"});
    }

    let drawerContent = state.drawerName === "Music" ? musicalData : state.drawerName === "Language" ? languageData : sportsData
    return (
        <View style={[parentsStyling.container]}>
            <MainHeader navigation={navigation} headerName={headerName}/>

            {
                state.mode === "timer"
                && <RNDateTimePicker
                    onChange={timer}
                    mode={"timer"}
                    value={form.age ? new Date(form.age) : new Date()}
                    display={"clock"}
                    maximumDate={new Date()}
                />
            }

            <View style={[parentsStyling.buttonContainer, {flexDirection: "column", paddingTop: 0}]}>
                <Image style={{height: 100, width: 100}} source={profileImage}/>
                <Text style={{marginTop: -30, fontSize: 12, color: "white"}}>Upload</Text>

            </View>
            <View style={{height: "69%", padding: 16, flexDirection: "column", justifyContent: "space-between"}}>

                <ScrollView showsVerticalScrollIndicator={false} style={parentsStyling.parentContainer}>
                    <View style={{width: "100%"}}>
                        <Text style={authenticationStyling.optionsHeading}>Add information here</Text>
                        <TextInput
                            label="Name"
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                            value={form.name}
                            onChangeText={(e) => OnChange("name", e)}
                        />
                        <HelperText type="error" visible={hasErrors("name")}>
                            Name is required!
                        </HelperText>

                        <TextInput
                            label="School"
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                            value={form.school}
                            onChangeText={(e) => OnChange("school", e)}
                        />

                        <TouchableOpacity
                            onPress={handleDate}
                            style={{
                                marginTop: 38,
                                borderBottomWidth: 1,
                                borderBottomColor: 'lightgrey',
                                display: "inline",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text
                                style={{color: "#000", marginBottom: 19}}
                                onChangeText={(e) => OnChange("age", e)}
                            >{form.age ? new Date(form.age).toLocaleString() : 'Select Date of Birth'}</Text>
                            <Ionicons color={"#000"} size={22} name={"chevron-down"}/>
                        </TouchableOpacity>


                        <HelperText type="error" visible={hasErrors("age")}>
                            Date of Birth is required!
                        </HelperText>

                        <BottomSheet
                            visible={state.isDateOpen}
                            onBackButtonPress={() => {
                                setState({...state, isDateOpen: false,})
                            }}
                            onBackdropPress={() => {
                                setState({...state, isDateOpen: false})
                            }}
                        >
                            <View style={[BottomSheetStyling.container, {
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
                                        color: '#000', // Default text color
                                    }}
                                    previousTitle="Previous"
                                    nextTitle="Next"
                                    selectedDayColor="#3498db" // Selected day background color
                                    selectedDayTextColor="#fff" // Selected day text color
                                />
                            </View>
                        </BottomSheet>

                        {selectedDate
                            && <>
                                <TouchableOpacity
                                    onPress={() => setState({...state, isDateOpen: true})}
                                    style={{width: "100%"}}>
                                    <TextInput
                                        disabled={true}
                                        value={selectedDate && new Date(selectedDate.toString()).toLocaleDateString()}
                                        label="Date of Birth"
                                        activeUnderlineColor={"#FFB906"}
                                    />
                                </TouchableOpacity>
                                <View style={{width: "100%"}}>
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
                                            onPress={() => setState({...state, isDateOpen: true})}
                                            style={{color: "#0179EF"}}>Select Date Of Birth</Text>
                                    </View>
                                </View>
                            </>
                        }

                    </View>

                    <View style={{width: "100%"}}>
                        <Text style={authenticationStyling.optionsHeading}>Gender</Text>
                        <View style={{width: "100%", flexDirection: "row", gap: 20}}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <RadioButton
                                    status={form.gender === "male" ? 'checked' : 'unchecked'}
                                    color="#FFB906"
                                    onPress={() => {
                                        OnChange("gender", "male")
                                    }}
                                    // value={}
                                />
                                <Text style={[authenticationStyling.optionsHeading, {marginTop: -2}]}>Male</Text>
                            </View>

                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <RadioButton
                                    status={form.gender === "female" ? 'checked' : 'unchecked'}
                                    color="#FFB906"
                                    onPress={() => {
                                        OnChange("gender", "female")
                                    }}
                                />
                                <Text style={[authenticationStyling.optionsHeading, {marginTop: -2}]}>Female</Text>
                            </View>
                        </View>
                    </View>
                    <HelperText type="error" visible={hasErrors("gender")}>
                        Gender is required!
                    </HelperText>


                    <View style={{width: "100%"}}>
                        <Text style={authenticationStyling.optionsHeading}>Add information here</Text>
                        <TextInput
                            label="Notes"
                            style={{backgroundColor: "white", width: "100%"}}
                            activeUnderlineColor={"#FFB906"}
                            value={form.note}
                            onChangeText={(e) => OnChange("note", e)}
                        />

                    </View>
                </ScrollView>

                <BottomSheet
                    visible={state.isBottomSheetOpen}
                    onBackButtonPress={() => setState({...state, isBottomSheetOpen: false})}
                    onBackdropPress={() => setState({...state, isBottomSheetOpen: false})}
                >
                    <View style={authenticationStyling.bottomSheet}>
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
                <Button onPress={() => AddChild()} color={"#FFB906"} title={isAdd ? "Add" : "Update"}></Button>
            </View>
        </View>
    );
}

//                     <View style={{width: "100%"}}>
//                         <Text style={authenticationStyling.optionsHeading}>Services</Text>
//                         <Text style={[authenticationStyling.optionsHeading]}>Sports</Text>
//                         <View style={{
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                             marginTop:8
//                         }}>
//                             <Text style={{color:"#404040"}}>
//                                 Baseball
//                             </Text>
//                             <View style={{flexDirection: "row", gap: 10}}>
//                                 <Icon name="remove" color="red" size={16}/>
//                             </View>
//                         </View>
//                         <View style={{
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                             marginTop:8
//                         }}>
//                             <Text style={{color:"#404040"}}>
//                                 Basketball
//                             </Text>
//                             <View style={{flexDirection: "row", gap: 10}}>
//                                 <Icon name="remove" color="red" size={16}/>
//                             </View>
//                         </View>
//
//                         <View style={{
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                             marginTop:8
//                         }}>
//                             <Text style={{color:"#404040"}}>
//                                 Baseball
//                             </Text>
//                             <View style={{flexDirection: "row", gap: 10}}>
//                                 <Icon name="remove" color="red" size={16}/>
//                             </View>
//                         </View>
//                         <View style={{flexDirection:"row", justifyContent:"center", marginTop:18}}>
//                             <View style={{
//                                 flexDirection:"row",
//                                 alignItems:"center",
//                                 gap:4,
//                             }}>
//                                 <Icon name="add" color="#0179EF" size={16}/>
//                                 <Text onPress={()=>setState({...state, drawerName: "Sports", isBottomSheetOpen:true})} style={{color:"#0179EF"}}>Add More</Text>
//                             </View>
//                         </View>
//
//                         <Text style={[authenticationStyling.optionsHeading]}>Music</Text>
//
//                         <View style={{flexDirection:"row", justifyContent:"center", marginTop:18}}>
//                             <View style={{
//                                 flexDirection:"row",
//                                 alignItems:"center",
//                                 gap:4,
//                             }}>
//                                 <Icon name="add" color="#0179EF" size={16}/>
//                                 <Text onPress={()=>setState({...state, drawerName: "Music", isBottomSheetOpen:true})} style={{color:"#0179EF"}}>Add More</Text>
//                             </View>
//                         </View>
//
//                         <Text style={[authenticationStyling.optionsHeading]}>Language</Text>
//
//                         <View style={{flexDirection:"row", justifyContent:"center", marginTop:18}}>
//                             <View style={{
//                                 flexDirection:"row",
//                                 alignItems:"center",
//                                 gap:4
//                             }}>
//                                 <Icon name="add" color="#0179EF" size={16}/>
//                                 <Text onPress={()=>setState({...state, drawerName: "Language", isBottomSheetOpen:true})} style={{color:"#0179EF"}}>Add More</Text>
//                             </View>
//                         </View>
//                     </View>

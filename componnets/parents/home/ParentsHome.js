import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid,
    RefreshControl
} from 'react-native';
import parentsStyling from "../parentsStyling";
import MainHeader from "../header/header";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomSheet} from "react-native-btr";
import BottomSheetStyling from "../BottomSheetStyling";
import ChildBottomSheet from "../ChildBottomSheet";
import babyOne from "../../../assets/baby/baby1.jpeg";
import man from '../../../assets/man/man.jpg'
import CalendarPicker from 'react-native-calendar-picker';
import {Checkbox, SegmentedButtons, TextInput} from "react-native-paper";
import {
    addBookingRequest,
    getBookingsRequest,
    getCareTakers,
    getChildrens,
    getServices,
    getToken,
    getUserData, getUserId
} from "../../actions";
import {SET_ALL_REQUEST, SET_CARE_TAKERS, SET_CHILDRENS, SET_RELOAD, SET_SERVICES} from "../../store/const";
import {GlobalContext} from "../../store";
import * as Location from 'expo-location';


import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function ParentsHome({navigation}) {
    const [state, setState] = useState({
        isBottomSheetOpen: false,
        mode: "",
        isTimer: false,
        timer: false,
        timerValue: "",
        loading: false,
        segmentValue: "request",

        request: [],
        upcoming: [],
        live: [],
    });
    const [globalState, dispatch] = useContext(GlobalContext);
    const {careTakers, userData, childrenData, services, reload} = globalState;

    const [selectedDate, setSelectedDate] = useState(null);
    const [checked, setCheckBox] = useState([]);

    const [booking, setBooking] = useState({
        children: [],
        services: []
    });


    useEffect(() => {
        if (!(careTakers?.length)) {
            getToken()
                .then(token => {
                    getCareTakers(token)
                        .then((response) => {
                            if (response?.success && response?.data?.result?.length) {
                                dispatch({type: SET_CARE_TAKERS, payload: response.data.result})
                            }
                        })
                        .catch(error => {
                            console.log(error, "QQQQQQQQQQQQQQQQQ")
                        })
                })
        }

        if (state.isBottomSheetOpen && !state.isTimer && state.mode !== "calendar") {
            if (!(childrenData?.length)) {
                setState({...state, loading: true});
                getToken()
                    .then(token => {
                        getChildrens(token, userData._id)
                            .then((response) => {
                                if (response?.success && response?.data?.result?.length) {
                                    dispatch({type: SET_CHILDRENS, payload: response.data.result})
                                    setState({...state, loading: false})
                                } else {
                                    setState({...state, loading: false})
                                }
                            })
                            .catch(error => {
                                console.log(error, "QQQQQQQQQQQQQQQQQ")
                                setState({...state, loading: false})
                            })
                    })
            }
        }

        if (state.isBottomSheetOpen && state.isTimer) {
            if (!(Object.keys(services)?.length)) {
                setState({...state, loading: true});
                getToken()
                    .then(token => {
                        getServices(token)
                            .then((response) => {
                                if (response?.success && response?.data?.result?.length) {
                                    const serviceTypes = {};

                                    response.data.result.forEach(item => {
                                        if (!serviceTypes[item['serviceType']]) {
                                            serviceTypes[item['serviceType']] = [];
                                        }
                                        serviceTypes[item['serviceType']].push(item.serviceName);
                                    });
                                    setState({...state, loading: false})
                                    dispatch({type: SET_SERVICES, payload: serviceTypes})
                                }
                            })
                            .catch(error => {
                                setState({...state, loading: false})
                            })
                    })
                    .finally(() => {
                        setState({...state, loading: false})
                    })
            }
        }

        if (reload || !state.requests?.length) {
            getAllRequests()
        }

    }, [globalState.careTakers, state.isBottomSheetOpen, childrenData, services, state.isTimer, reload]);

    console.log(reload, '***********************************************************')
    // Assume backendData is an array of dates from the backend that need a different background color
    const backendData = ['2024-01-10', '2024-01-15', '2024-01-20'];

    const getAllRequests = () => {
        getUserData()
            .then(response => {
                let {token, _id} = response;
                let filter = {
                    isCompleted: false,
                    parentId: _id
                }
                getBookingsRequest(token, filter)
                    .then(res => {
                        if (res.success) {
                            let result = res.data.result;
                            if (result?.length) {
                                let request = result
                                    .filter(({rejectStatus, acceptStatus}) => !rejectStatus && !acceptStatus);
                                let upcoming = result
                                    .filter(({
                                                 acceptStatus,
                                                 requestFrom,
                                                 paymentStatus
                                             }) => {
                                        let newDate = new Date();
                                        newDate.setHours(0, 0, 0, 0);

                                        let parts = requestFrom.split('/');
                                        let month = parseInt(parts[0], 10);
                                        let day = parseInt(parts[1], 10);
                                        let year = parseInt(parts[2], 10);
                                        let requestDate = new Date(year, month - 1, day);
                                        requestDate.setHours(0, 0, 0, 0);
                                        return !!acceptStatus && !!paymentStatus && (requestDate > newDate);
                                    });

                                let live = result
                                    .filter(({
                                                 acceptStatus,
                                                 requestFrom,
                                                 paymentStatus
                                             }) => {
                                        let newDate = new Date();
                                        newDate.setHours(0, 0, 0, 0);

                                        let parts = requestFrom.split('/');
                                        let month = parseInt(parts[0], 10);
                                        let day = parseInt(parts[1], 10);
                                        let year = parseInt(parts[2], 10);
                                        let requestDate = new Date(year, month - 1, day);
                                        requestDate.setHours(0, 0, 0, 0);

                                        return !!acceptStatus && !!paymentStatus && (requestDate <= newDate);
                                    })

                                setState({
                                    ...state,
                                    request: request,
                                    upcoming: upcoming,
                                    live: live,
                                    loading: false,
                                    segmentValue: state.segmentValue
                                })
                                setRefreshing(false);
                                dispatch({type: SET_RELOAD, payload: false});
                                dispatch({type: SET_ALL_REQUEST, payload: result});
                            }
                        }
                    })
                    .catch(err => {
                        ToastAndroid.show(err.message, 2000);
                        setRefreshing(false);
                        setState({...state, loading: false})
                        dispatch({type: SET_RELOAD, payload: false});

                    })

            })
    }

    const handleDateChange = (date) => {
        console.log(date)
        setSelectedDate(date);
        setBooking({...booking, requestSendingTime: new Date(date).toLocaleDateString()})
    };

    const customDatesStyles = [];

    backendData.forEach((date) => {
        customDatesStyles.push({
            date: date,
            style: {backgroundColor: '#FFB906'}, // Set the background color you want
            textStyle: {color: 'white'}, // Set the text color if needed
        });
    });

    const renderBookings = (data) => {
        if (!!data && data?.length) {
            return data.map((value, index) => {
                let {name, createdAt} = value;
                return (
                    <View
                        key={index}
                        style={{marginTop: 15}}
                        onPress={() => navigation.navigate('BookingConfirmation', {
                            headerName: "Upcoming Booking"
                        })}>
                        <View style={{
                            padding: 16,
                            backgroundColor: "#FFE2C7",
                            borderRadius: 10,
                            flexDirection: "row"
                        }}>
                            {/*<Image style={{*/}
                            {/*    height: 50,*/}
                            {/*    width: 50,*/}
                            {/*    borderRadius: 25,*/}
                            {/*    borderColor: "black",*/}
                            {/*    borderWidth: 1*/}
                            {/*}}*/}
                            {/*       source={man}*/}
                            {/*/>*/}
                            <Ionicons name={"person"} color={"gray"} size={30}/>
                            <View style={{width: "84%", padding: 10, paddingTop: 0}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <View>
                                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{name}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('BookingConfirmation', {
                                            headerName: "Upcoming Booking"
                                        })}
                                    >
                                        <Text style={{fontSize: 10, fontWeight: 'bold'}}>
                                            View
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection: 'row', gap: 4, alignItems: "center", marginTop: 10}}>
                                    <Ionicons color={'#FF912C'} size={14} name="time"/>
                                    <Text style={{color: '#727272'}}>From :</Text>
                                    <Text style={{color: '#727272'}}>{new Date(createdAt).toLocaleString()}</Text>
                                </View>
                                <View style={{flexDirection: 'row', gap: 4, alignItems: "center"}}>
                                    <Ionicons color={'#FF912C'} size={14} name="time"/>
                                    <Text style={{color: '#727272'}}>To :</Text>
                                    <Text style={{color: '#727272'}}>24 Dec 2023, 05:00 PM</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            })
        }
    }

    const timer = (event, date) => {
        if (event.type === "set") {
            setBooking({
                ...booking,
                [state.timerValue]: state.mode === "date" ? date.toLocaleDateString() : date.toLocaleTimeString()
            })
            setState({...state, mode: "", timerValue: ""})
        }
    }

    const selectService = (v) => {
        if (booking?.services?.length && booking.services.includes(v)) {
            let filterService = booking.services.filter((name) => name !== v);
            setBooking({...booking, services: filterService})
        } else {
            setBooking({...booking, services: [...booking.services, v]})
        }
    }

    const renderServices = () => {
        if (Object.keys(services)?.length) {
            return <ScrollView showsVerticalScrollIndicator={false}>{
                Object.keys(services).map((serviceType, index) => {
                    return <View key={index}>
                        <Text>{serviceType}</Text>
                        {
                            services[serviceType].map((name, ind) => <View
                                key={ind}
                                style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                <Checkbox
                                    onPress={() => selectService(name)} color={"#FFB906"} value={"Hello"}
                                    status={booking?.services && booking.services.includes(name) ? "checked" : "unchecked"}/>
                                <Text style={{color: "grey"}}>
                                    {name}
                                </Text>
                            </View>)
                        }
                    </View>
                })
            }</ScrollView>
        }
    }

    const sendBookingRequest = () => {
        getToken()
            .then(token => {
                addBookingRequest(token, booking)
                    .then(response => {
                        console.log(response, "#############")
                        if (response?.success && response?.data?.result) {
                            setState({
                                ...state,
                                isBottomSheetOpen: false,
                                loading: false,
                                mode: "",
                                isTimer: false,
                                timer: false,
                                timerValue: ""
                            });
                            setBooking({
                                children: [],
                                services: []
                            });
                            ToastAndroid.show("Request created successfully", 2000);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                    })
            })
    }

    const renderBottomSheet = () => {
        return (
            <BottomSheet
                visible={state.isBottomSheetOpen}
                onBackButtonPress={() => {
                    setState({...state, isBottomSheetOpen: false, mode: '', isTimer: false})
                    setSelectedDate(null)
                    setCheckBox([]);
                }}
                onBackdropPress={() => {
                    setState({...state, isBottomSheetOpen: false, mode: '', isTimer: false})
                    setSelectedDate(null)
                    setCheckBox([]);
                }}
            >
                {
                    state.mode === "calendar"
                        ? <View style={[BottomSheetStyling.container, {
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: '100%'
                        }]}>
                            <CalendarPicker
                                minDate={new Date()}
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
                                customDatesStyles={customDatesStyles}
                            />
                            <Button
                                onPress={() => {
                                    setState({...state, mode: state.isTimer ? "" : "children"})
                                }}
                                disabled={!selectedDate} title={'Add Booking'}/>
                        </View>

                        : !!state.isTimer
                            ? <View style={BottomSheetStyling.container}>
                                <View>
                                    <Text>Request From</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setState({...state, mode: "date", timerValue: "requestFrom"})
                                        }}
                                        style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <TextInput
                                            value={booking?.requestFrom?.trim() ? booking.requestFrom : ""}
                                            mode={"outlined"}
                                            disabled={true}
                                            label="Select Request From"
                                            style={{backgroundColor: "white", width: "100%"}}
                                            activeUnderlineColor={"#FFB906"}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginTop: 20}}>
                                    <Text>Request To</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setState({...state, mode: "date", timerValue: "requestTo"})
                                        }}
                                        style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <TextInput
                                            value={booking?.requestTo?.trim() ? booking.requestTo : ""}
                                            mode={"outlined"}
                                            disabled={true}
                                            label="Select Request To"
                                            style={{backgroundColor: "white", width: "100%"}}
                                            activeUnderlineColor={"#FFB906"}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginTop: 20}}>
                                    <Text>Start Time</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setState({...state, mode: "timer", timerValue: "startTime"})
                                        }}
                                        style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <TextInput
                                            value={booking?.startTime?.trim() ? booking.startTime : ""}
                                            mode={"outlined"}
                                            disabled={true}
                                            label="Select Start Time"
                                            style={{backgroundColor: "white", width: "100%"}}
                                            activeUnderlineColor={"#FFB906"}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginTop: 20}}>
                                    <Text>End Time</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setState({...state, mode: "timer", timerValue: "endTime"})
                                        }}
                                        style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <TextInput
                                            value={booking?.endTime?.trim() ? booking.endTime : ""}
                                            mode={"outlined"}
                                            disabled={true}
                                            label="Select End Time"
                                            style={{backgroundColor: "white", width: "100%"}}
                                            activeUnderlineColor={"#FFB906"}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{marginTop: 20, fontWeight: "bold"}}>Services</Text>
                                {renderServices()}
                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: (!booking?.services?.length || !booking?.startTime || !booking?.endTime) ? "gray" : "#2CA6FF",
                                        padding: 10,
                                        display: 'flex',
                                        flexDirection: "row"
                                    }}
                                    disabled={
                                        !booking?.services?.length
                                        || !booking?.startTime
                                        || !booking?.endTime
                                        || !booking?.['requestFrom']
                                        || !booking?.['requestTo']
                                    }
                                    title={'Send request'}
                                    onPress={sendBookingRequest}
                                >
                                    <Text style={{color: "white"}}>
                                        SEND REQUEST
                                    </Text>
                                    {state.loading && <ActivityIndicator style={{marginLeft: 10}} color={"#fff"}/>}
                                </TouchableOpacity>
                            </View>

                            : <View style={BottomSheetStyling.container}>
                                <View style={BottomSheetStyling.headingContainer}>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 10,
                                        width: "80%",
                                        overflow: "hidden"
                                    }}>
                                        <Text style={BottomSheetStyling.headingTitle}>Children</Text>
                                        <View style={BottomSheetStyling.hr}></View>
                                    </View>
                                    <View style={BottomSheetStyling.rightCircle}/>
                                </View>

                                {
                                    state.loading
                                        ? <ActivityIndicator size={"large"} color={'#2CA6FF'}/>
                                        : <ScrollView
                                            showsVerticalScrollIndicator={false}
                                            style={{height: "86%"}}>
                                            {childrenData
                                                && childrenData.map((v, index) => <ChildBottomSheet
                                                    closeBottomSheet={() => {
                                                        if (state.isBottomSheetOpen || state.mode) {
                                                            setState({...state, isBottomSheetOpen: false, mode: ""})
                                                        }
                                                    }}
                                                    setChecked={(data) => {
                                                        setBooking({...booking, children: data})
                                                    }}
                                                    checked={booking.children}
                                                    key={index}
                                                    data={v}
                                                    mode={state.mode}
                                                    navigation={navigation}
                                                    childName={v.name}
                                                    img={babyOne}/>
                                                )
                                            }
                                        </ScrollView>
                                }

                                <Button
                                    disabled={
                                        (!(state.mode === "addBooking" && booking.children.length)
                                            && state.mode === "addBooking") || state.loading}
                                    style={{marginTop: 10}}
                                    onPress={() => {
                                        if (state.mode !== "addBooking") {
                                            navigation.navigate("addChildForm", {
                                                headerName: "Add Child",
                                                isAdd: true
                                            })
                                            setState({...state, isBottomSheetOpen: false})
                                        } else setState({...state, mode: state.isTimer ? "" : "children", isTimer: true})
                                    }}
                                    title={
                                        state.mode !== "addBooking" ?
                                            "Add more" :
                                            "Continue"
                                    } color={"#00B428"}
                                />

                            </View>

                }
            </BottomSheet>

        )
    }

    const renderRequests = () => {
        if (state[state.segmentValue].length) {
            return state[state.segmentValue].map((data, index) => {
                console.log(JSON.stringify(data, null, 2))
                return (
                    <View key={index} style={{padding: 7}}>
                        <View style={parentsStyling.parentContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('BookingConfirmation', {
                                headerName: "Live",
                                data: data,
                                value: state.segmentValue
                            })}>
                                <View style={{
                                    padding: 16,
                                    backgroundColor: "#CEFFD9",
                                    borderRadius: 10,
                                    flexDirection: 'row'
                                }}>
                                    {
                                        state.segmentValue !== "request"
                                        && <Ionicons size={25} name={"person"} color={"gray"}/>
                                        // && <Image style={{
                                        //     height: 50,
                                        //     width: 50,
                                        //     borderRadius: 25,
                                        //     borderColor: "black",
                                        //     borderWidth: 1
                                        // }}
                                        //           source={man}
                                        // />
                                    }
                                    <View style={{
                                        width: "100%",
                                        padding: 10,
                                        paddingTop: 0,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-end'
                                    }}>
                                        <View>
                                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                                <View>
                                                    <Text
                                                        style={{fontSize: 14, fontWeight: 'bold'}}>ID {data._id}</Text>
                                                    {state.segmentValue !== 'request' && <Text
                                                        style={{
                                                            color: "#FF912C",
                                                            fontSize: 14,
                                                            fontWeight: 'bold'
                                                        }}>{data?.caretakerData?.name}</Text>}
                                                </View>
                                            </View>


                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: 4,
                                                    alignItems: "center",
                                                    marginTop: 10
                                                }}>
                                                <Ionicons color={'#FF912C'} size={14} name="time"/>
                                                <Text style={{color: '#727272'}}>Booking From :</Text>
                                                <Text style={{color: '#727272'}}>{data.requestFrom}</Text>
                                            </View>

                                            <View style={{flexDirection: 'row', gap: 4, alignItems: "center"}}>
                                                <Ionicons color={'#FF912C'} size={14} name="time"/>
                                                <Text style={{color: '#727272'}}>Booking To :</Text>
                                                <Text style={{color: '#727272'}}>{data.requestTo}</Text>
                                            </View>

                                        </View>

                                        {
                                            state.segmentValue === "request"
                                                ? <View style={{backgroundColor: '#FF912C', borderRadius: 10}}>
                                                    <Text style={{
                                                        color: "#fff",
                                                        padding: 5,
                                                        fontWeight: 'bold',
                                                        fontSize: 16
                                                    }}>
                                                        Request Sent
                                                    </Text>
                                                </View>
                                                : state.segmentValue === "live"
                                                && <View style={{backgroundColor: '#FF912C', borderRadius: 10}}>
                                                    <Text style={{
                                                        color: "#fff",
                                                        padding: 5,
                                                        fontWeight: 'bold',
                                                        fontSize: 16,
                                                    }}>
                                                        Live
                                                    </Text>
                                                </View>
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })
        } else {
            return (
                <View style={{marginTop: '40%', justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: 20, color: 'gray'}}>Not found</Text>
                </View>
            )
        }
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAllRequests()
    }, []);

    console.log(state.segmentValue, "##############################################################")
    return (
        <>
            <View style={[parentsStyling.container]}>
                <MainHeader navigation={navigation} main={true}/>

                {
                    state.mode === "timer"
                    && <RNDateTimePicker
                        onChange={timer}
                        mode={"time"}
                        value={new Date()}
                        display={"clock"}
                        minimumDate={new Date()}
                    />
                }

                {
                    state.mode === "date"
                    && <RNDateTimePicker
                        onChange={timer}
                        value={new Date()}
                        minimumDate={new Date()}
                    />
                }

                <View style={parentsStyling.buttonContainer}>
                    <View>

                        <Ionicons
                            onPress={() => setState({...state, isBottomSheetOpen: true, mode: "children"})}
                            style={parentsStyling.buttons} name="happy-outline" size={26} color="#FF912C"/>

                        <Text style={{
                            fontSize: 10,
                            textAlign: "center",
                            color: "white",
                            marginTop: 6
                        }}>Children</Text>
                    </View>
                    <View>
                        <Ionicons onPress={() => navigation.navigate("favouriteCaretaker", {
                            headerName: "Favourites"
                        })} style={parentsStyling.buttons} name="heart-outline" size={26} color="#FF1D46"/>
                        <Text style={{
                            fontSize: 10,
                            textAlign: "center",
                            color: "white",
                            marginTop: 6
                        }}>Favorites</Text>
                    </View>
                    <View>
                        <Ionicons onPress={() => navigation.navigate("conversations", {
                            headerName: "Conversations"
                        })} style={parentsStyling.buttons} name="chatbox-ellipses-outline" size={26}
                                  color="#00B428"/>
                        <Text style={{fontSize: 10, textAlign: "center", color: "white", marginTop: 6}}>Chats</Text>
                    </View>
                    <View>
                        <Ionicons onPress={() => navigation.navigate("CaretakerHistory", {
                            headerName: "History"
                        })} style={parentsStyling.buttons} name="timer-outline" size={26} color="#FF1D46"/>
                        <Text
                            style={{fontSize: 10, textAlign: "center", color: "white", marginTop: 6}}>History</Text>
                    </View>
                    <View>
                        <Ionicons onPress={() => setState({...state, mode: "calendar", isBottomSheetOpen: true})}
                                  style={parentsStyling.buttons} name="calendar-outline" size={26} color="#FF1D46"/>
                        <Text style={{
                            fontSize: 10,
                            textAlign: "center",
                            color: "white",
                            marginTop: 6
                        }}>Calendar</Text>
                    </View>
                </View>

                <SegmentedButtons
                    style={{marginTop: 5, padding: 5}}
                    value={state.segmentValue}
                    onValueChange={(value) => {
                        setState({...state, segmentValue: value})
                    }}
                    buttons={[
                        {
                            value: 'request',
                            label: 'REQUEST',
                        },
                        {
                            value: 'upcoming',
                            label: 'UPCOMING',
                        },
                        {
                            value: 'live',
                            label: 'LIVE',
                        },
                    ]}
                />


                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }>
                    {renderRequests()}
                </ScrollView>

                {renderBottomSheet()}

                <Button
                    onPress={() =>
                        setState({...state, isBottomSheetOpen: true, mode: "addBooking"})}
                    color={"#FFB906"} title={"Add Booking"}></Button>
            </View>
        </>
    );
}

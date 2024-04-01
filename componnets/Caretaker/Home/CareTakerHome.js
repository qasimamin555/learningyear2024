import React, {useContext, useEffect, useState} from "react";
import {Button, ScrollView, Text, View, Image, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import parentsStyling from "../../parents/parentsStyling";
import MainHeader from "../../parents/header/header";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomSheet} from "react-native-btr";
import BottomSheetStyling from "../../parents/BottomSheetStyling";
import man from '../../../assets/man/man.jpg'
import {Checkbox, SegmentedButtons} from "react-native-paper";
import {GlobalContext} from "../../store";
import {acceptBookingStatus, getBookingsRequest, getCareTakers, getToken} from "../../actions";
import {
    SET_BOOKING_REQUEST_DATA,
    SET_CARE_TAKERS,
    SET_RE_CALLING_STATUS,
    SET_UPCOMING_REQUEST_DATA
} from "../../store/const";

export default function CareTakerHome({navigation}) {
    const [globalState, dispatch] = useContext(GlobalContext);
    const {bookingRequestsData, reCallStatus, upcomingRequestData} = globalState

    const [state, setState] = useState({
        isBottomSheetOpen: false,
        mode: "",
        aos: false,
        bookingSegmentValue: "new",
        loading: false
    })

    useEffect(() => {
        if (!(bookingRequestsData?.length) || reCallStatus) {
            getBookings({acceptStatus: false})
        }
        if (!(upcomingRequestData?.length) || reCallStatus) {
            console.log("Is API calling ......................................................")
            let filter = {
                acceptStatus: true,
                caretakerId: true
            }
            getBookings(filter)
        }
    }, [bookingRequestsData, reCallStatus, upcomingRequestData]);

    const getBookings = (filter) => {
        getToken()
            .then(token => {
                setState({...state, loading: true})
                getBookingsRequest(token, filter)
                    .then((response) => {
                        if (response?.success && response?.data?.result?.length) {
                            if (response?.['bookingStatus'] === "new") {
                                dispatch({type: SET_BOOKING_REQUEST_DATA, payload: response.data.result})
                            } else {
                                dispatch({type: SET_UPCOMING_REQUEST_DATA, payload: response.data.result})
                            }
                            setState({...state, loading: false})
                            dispatch({type: SET_RE_CALLING_STATUS, payload: false})

                        } else {
                            setState({...state, loading: false})
                        }
                    })
                    .catch(error => {
                        setState({...state, loading: false})
                    })
            })
    }

    const acceptBooking = async (data) => {
        let token = await getToken();
        let updateId = data._id;

        if (token && updateId) {
            acceptBookingStatus(token, updateId)
                .then(response => {
                    if (response?.success) {
                        // dispatch({type: SET_RE_CALLING_STATUS, payload: true});
                        dispatch({type: SET_BOOKING_REQUEST_DATA, payload: []})
                        dispatch({type: SET_UPCOMING_REQUEST_DATA, payload: []})

                    }
                })
        }

    }

    const renderNewBookings = () => {
        if (bookingRequestsData?.length) {
            return bookingRequestsData.map((data, index) => {
                console.log(JSON.stringify(data, null, 2))
                return <TouchableOpacity
                    style={{marginBottom: 15}}
                    key={index}
                    onPress={() => navigation.navigate('ConfirmationBooking', {
                        headerName: "New Booking",
                        data: data
                    })}>
                    <View style={{
                        padding: 16,
                        backgroundColor: "#CCEAFF",
                        borderRadius: 10,
                        flexDirection: "row"
                    }}>
                        <View style={{width: "100%", padding: 10, paddingTop: 0}}>
                            <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                                <Text style={{fontSize: 14, fontWeight: 'bold'}}>Booking Request</Text>
                                <Text style={{fontSize: 10, fontWeight: 'bold'}}>View</Text>
                            </View>
                            <Text style={{color: "#000"}}>{data?._id}</Text>
                            <Text style={{color: "#FF912C"}}>{data?.parentData?.name}</Text>
                            <View style={{flexDirection: 'row', gap: 4, alignItems: "center", marginTop: 10}}>
                                <Ionicons color={'#FF912C'} size={14} name="time"/>
                                <Text style={{color: '#727272'}}>Booking From :</Text>
                                <Text style={{color: '#727272'}}>{data.requestFrom}</Text>
                            </View>
                            <View style={{flexDirection: 'row', gap: 4, alignItems: "center"}}>
                                <Ionicons color={'#FF912C'} size={14} name="time"/>
                                <Text style={{color: '#727272'}}>Booking To :</Text>
                                <Text style={{color: '#727272'}}>{data.requestTo}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "space-between",
                                marginTop: 20
                            }}>
                                <View style={{width: "45%"}}>
                                    <Button onPress={() => acceptBooking(data)} color={"#00B428"} title={"Accept"}/>
                                </View>
                                <View style={{width: "45%"}}>
                                    <Button
                                        onPress={() => {
                                            Alert.alert("Sorry!", "You don't have permission to decline any request");
                                        }}
                                        color={"#FF1D46"} title={"Decline"}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            })
        }
    }

    const renderUpcomingBookings = () => {
        if (upcomingRequestData?.length) {
            return upcomingRequestData.map((val, index) => {
                let {parentData: {name}, requestSendingTime} = val;

                return <TouchableOpacity
                    style={{marginBottom: 10}}
                    key={index}
                    onPress={() => navigation.navigate('ViewBooking', {
                        headerName: "Upcoming Booking"
                    })}>
                    <View style={{
                        padding: 16,
                        backgroundColor: "#CEFFD9",
                        borderRadius: 10,
                        flexDirection: "row"
                    }}>
                        <Image style={{
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            borderColor: "black",
                            borderWidth: 1
                        }}
                               source={man}
                        />
                        <View style={{width: "84%", padding: 10, paddingTop: 0}}>
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <View>
                                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>Upcoming Request</Text>
                                    <Text style={{color: "#FF912C", fontSize: 12, fontWeight: 'bold'}}>{name}</Text>
                                </View>
                                <Text style={{fontSize: 10, fontWeight: 'bold'}}>View</Text>
                            </View>
                            <View style={{flexDirection: 'row', gap: 4, alignItems: "center", marginTop: 10}}>
                                <Ionicons color={'#FF912C'} size={14} name="time"/>
                                <Text style={{color: '#727272'}}>From :</Text>
                                <Text style={{color: '#727272'}}>{requestSendingTime}</Text>
                            </View>
                            <View style={{flexDirection: 'row', gap: 4, alignItems: "center"}}>
                                <Ionicons color={'#FF912C'} size={14} name="time"/>
                                <Text style={{color: '#727272'}}>To :</Text>
                                <Text style={{color: '#727272'}}>{requestSendingTime}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            })
        }
    }

    return (
        <View style={[parentsStyling.container]}>
            <MainHeader main={true}/>
            <View style={parentsStyling.buttonContainer}>
                <View>
                    <Ionicons onPress={() => navigation.navigate("FavouriteParent", {
                        headerName: "Favourites"
                    })} style={parentsStyling.buttons} name="heart-outline" size={26} color="#FF1D46"/>
                    <Text style={{fontSize: 10, textAlign: "center", color: "white", marginTop: 6}}>Favorites</Text>
                </View>
                <View>
                    <Ionicons onPress={() => navigation.navigate("conversations", {
                        headerName: "Conversations"
                    })} style={parentsStyling.buttons} name="chatbox-ellipses-outline" size={26} color="#00B428"/>
                    <Text style={{fontSize: 10, textAlign: "center", color: "white", marginTop: 6}}>Chats</Text>
                </View>
                <View>
                    <Ionicons onPress={() => navigation.navigate("CaretakerHistory", {
                        headerName: "History"
                    })} style={parentsStyling.buttons} name="timer-outline" size={26} color="#FF1D46"/>
                    <Text style={{fontSize: 10, textAlign: "center", color: "white", marginTop: 6}}>History</Text>
                </View>
                <View>
                    <Ionicons onPress={() => setState({...state, mode: "calendar", isBottomSheetOpen: true})}
                              style={parentsStyling.buttons} name="calendar-outline" size={26} color="#FF1D46"/>
                    <Text style={{fontSize: 10, textAlign: "center", color: "white", marginTop: 6}}>Calendar</Text>
                </View>
            </View>

            <SegmentedButtons
                style={{marginTop: 5, padding: 5}}
                value={state.bookingSegmentValue}
                onValueChange={(value) => {
                    setState({...state, bookingSegmentValue: value})
                }}
                buttons={[
                    {
                        value: 'new',
                        label: 'New Booking',
                    },
                    {
                        value: 'upcoming',
                        label: 'Upcoming Bookings',
                    },
                ]}
            />

            <View style={{height: "70%", padding: 16}}>
                <View style={[parentsStyling.parentContainer, {
                    marginBottom: 10
                }]}>
                    {
                        state.bookingSegmentValue === "new"
                            ? <ScrollView style={{marginBottom:20}} showsVerticalScrollIndicator={false}>
                                <View style={[BottomSheetStyling.headingContainer, {backgroundColor: "white"}]}>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 10,
                                        width: "80%",
                                        overflow: "hidden"
                                    }}>
                                        <Text style={BottomSheetStyling.headingTitle}>New Booking Arrived</Text>
                                        <View style={BottomSheetStyling.hr}></View>
                                    </View>
                                    <View style={[BottomSheetStyling.rightCircle, {backgroundColor: '#FF912C'}]}/>
                                </View>
                                {
                                    state.loading
                                        ? <ActivityIndicator color={"#2CA6FF"} size={50}/>
                                        : renderNewBookings()
                                }
                            </ScrollView>
                            : <ScrollView>
                                <View style={[BottomSheetStyling.headingContainer, {backgroundColor: "white"}]}>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 10,
                                        width: "80%",
                                        overflow: "hidden"
                                    }}>
                                        <Text style={BottomSheetStyling.headingTitle}>Upcoming Bookings</Text>
                                        <View style={BottomSheetStyling.hr}></View>
                                    </View>
                                    <View style={[BottomSheetStyling.rightCircle, {backgroundColor: '#FF912C'}]}/>
                                </View>
                                {state.loading
                                    ? <ActivityIndicator color={"#2CA6FF"} size={50}/>
                                    : renderUpcomingBookings()}
                            </ScrollView>
                    }
                </View>
                {/*<Button*/}
                {/*    onPress={() => navigation.navigate('AllBookings', {*/}
                {/*        headerName: "All Bookings"*/}
                {/*    })} color={"#FFB906"} title={"See All bookings"}/>*/}
            </View>

            <BottomSheet
                visible={state.isBottomSheetOpen}
                onBackButtonPress={() => setState({...state, isBottomSheetOpen: false})}
                onBackdropPress={() => setState({...state, isBottomSheetOpen: false})}
            >
                <View style={BottomSheetStyling.container}>
                    <View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{
                                width: "100%",
                                textAlign: "center",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Image source={man} style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 40,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    margin: "auto"
                                }}/>
                                <Text style={{fontWeight: "bold", fontSize: 14, marginTop: 10}}>Kerry Mate</Text>
                                <Text style={{color: "#FF912C"}}>24 years old</Text>
                                <Text style={{color: "#727272", fontSize: 12}}>Masters in Computer Science</Text>
                            </View>
                            {
                                !state.aos ?
                                    <View>
                                        <View style={{
                                            backgroundColor: "#FFF1E4",
                                            padding: 16,
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: 50,
                                            borderRadius: 10,
                                            marginTop: 20
                                        }}>
                                            <View style={{
                                                textAlign: "center",
                                                flexDirection: "column",
                                                alignItems: "center"
                                            }}>
                                                <Text style={{fontSize: 16, fontWeight: "bold"}}>4.7</Text>
                                                <Text style={{color: "#6A6A6A", fontSize: 12}}>Punctuality</Text>
                                            </View>
                                            <View style={{
                                                textAlign: "center",
                                                flexDirection: "column",
                                                alignItems: "center"
                                            }}>
                                                <Text style={{fontSize: 16, fontWeight: "bold"}}>5.0</Text>
                                                <Text style={{color: "#6A6A6A", fontSize: 12}}>Rating</Text>
                                            </View>
                                        </View>

                                        <View style={{
                                            flexDirection: "row",
                                            width: "100%",
                                            justifyContent: "space-between",
                                            marginTop: 10
                                        }}>
                                            <Text style={{color: "grey"}}>Cancelled Bookings</Text>
                                            <Text style={{color: "grey"}}>0</Text>
                                        </View>
                                        <View style={{marginTop: 20}}></View>
                                        <Button onPress={() => setState({...state, aos: true})} color={'#FFB906'}
                                                title={'Areas of services'}/>
                                        <Text style={{marginTop: 20, fontWeight: "bold"}}>Services</Text>
                                        <View>
                                            <Text>Sports</Text>
                                            <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                                <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                                <Text style={{color: "grey"}}>
                                                    Football
                                                </Text>
                                            </View>
                                            <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                                <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                                <Text style={{color: "grey"}}>
                                                    Baseball
                                                </Text>
                                            </View>
                                        </View>
                                        <Text>Music</Text>
                                        <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                            <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                            <Text style={{color: "grey"}}>
                                                Pop
                                            </Text>
                                        </View>
                                        <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                            <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                            <Text style={{color: "grey"}}>
                                                Solo
                                            </Text>
                                        </View>
                                        <Text style={{marginTop: 20, fontWeight: "bold"}}>Note</Text>
                                        <Text style={{color: "grey"}}>Lorem Ipsum is simply dummy text of the printing
                                            and
                                            typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                            text ever since
                                            the 1500s, when an unknown printer took a galley of type and scrambled it to
                                            make a type
                                            specimen book.</Text>
                                    </View> :
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: "#F2F2F2",
                                        borderRadius: 10,
                                        marginTop: 20
                                    }}>
                                        <Text style={{color: "#263238", fontWeight: 'bold'}}>
                                            Areas of services
                                        </Text>
                                        <View style={{marginTop: 4}}>
                                            <Text style={{color: "#404040"}}>.Piccadilly and St James’s </Text>
                                            <Text style={{color: "#404040", marginTop: 4}}>.Soho and Trafalgar
                                                Square</Text>
                                            <Text style={{color: "#404040", marginTop: 4}}>.Covent Garden and
                                                Strand</Text>
                                            <Text style={{color: "#404040", marginTop: 4}}>.Bloomsbury and
                                                Fitzrovia</Text>
                                            <Text style={{color: "#404040", marginTop: 4}}>.Holborn and Inns of
                                                Court</Text>
                                        </View>
                                    </View>

                            }
                        </ScrollView>
                    </View>
                </View>
            </BottomSheet>

        </View>
    );
}

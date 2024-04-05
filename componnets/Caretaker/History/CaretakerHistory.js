import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, ActivityIndicator, Button, TouchableOpacity, Linking} from 'react-native';
import {Checkbox, List} from 'react-native-paper';
import parentsStyling from "../../parents/parentsStyling";
import MainHeader from "../../parents/header/header";
import Ionicons from "react-native-vector-icons/Ionicons";
import man from "../../../assets/man/man.jpg"
import BottomSheetStyling from "../../parents/BottomSheetStyling";
import {BottomSheet} from "react-native-btr";
import {GlobalContext} from "../../store";
import {getCareTakers, getToken, loginUser} from "../../actions";

const CaretakerHistory = (props) => {
    const {headerName} = props.route.params
    const [state, setState] = useState({
        isBottomSheetOpen: false,
        data: {},
        caretaker: null,
        requestData: []

    })
    const accordionData = [
        {
            id: 1, title: 'Accordion 1', date: "12 Nov 2023", items:
                <View style={{width: "100%", padding: 20, paddingTop: 10, height: "58%"}}>
                    <View style={{flexDirection: 'row', gap: 4, alignItems: "center", marginTop: 10}}>
                        <Ionicons color={'#00B428'} size={14} name="time"/>
                        <Text style={{color: '#727272'}}>From :</Text>
                        <Text style={{color: '#727272'}}>24 Dec 2023, 05:00 PM</Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 4, alignItems: "center", marginTop: 4}}>
                        <Ionicons color={'#00B428'} size={14} name="time"/>
                        <Text style={{color: '#727272'}}>To :</Text>
                        <Text style={{color: '#727272'}}>24 Dec 2023, 05:00 PM</Text>
                    </View>

                    <View style={{width: "100%", padding: 16, backgroundColor: "#EFEEEE", marginTop: 20}}>
                        <Text style={{fontSize: 15, fontWeight: "bold"}}>Child Info</Text>
                        <Text style={{fontWeight: "bold", marginTop: 4}}>Name</Text>
                        <Text style={{color: "grey"}}>Peter</Text>
                        <Text style={{fontWeight: "bold", marginTop: 4}}>School</Text>
                        <Text style={{color: "grey"}}>London School, London</Text>
                        <Text style={{fontWeight: "bold", marginTop: 4}}>Age</Text>
                        <Text style={{color: "grey"}}>8 Months</Text>

                        <Text style={{fontSize: 15, fontWeight: "bold", marginTop: 10}}>Services</Text>
                        <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                            <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                            <Text>
                                Football
                            </Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                            <Checkbox color={"#FFB906"} value={"Hello"} status={"unchecked"}/>
                            <Text>
                                Baseball
                            </Text>
                        </View>

                    </View>
                </View>
        }
    ];

    const [expandedAccordions, setExpandedAccordions] = useState([]);

    const [globalState, dispatch] = useContext(GlobalContext);
    const {allRequests} = globalState;


    useEffect(() => {
        setState({...state, requestData: allRequests})
    }, []);

    useEffect(() => {
        let {isBottomSheetOpen, caretaker} = state;
        if (isBottomSheetOpen && caretaker) {
            getData();
        }
    }, [state.isBottomSheetOpen]);

    const getData = () => {
        setState({...state, loading: true})

        getToken()
            .then(token => {
                getCareTakers(token, {_id: state.caretaker})
                    .then(res => {
                        if (res.success) {
                            setState({...state, data: res.data.result[0], loading: false})
                        }
                    })
                    .catch(err => {
                        setState({...state, loading: false})
                    })
            })
    }

    const getLocation = async () => {
        let latitude = state?.data?.location?.latitude;
        let longitude = state?.data?.location?.longitude;
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        await Linking.openURL(url);
    }

    const handleAccordionPress = (accordionId) => {
        if (expandedAccordions.includes(accordionId)) {
            setExpandedAccordions(expandedAccordions.filter((id) => id !== accordionId));
        } else {
            setExpandedAccordions([...expandedAccordions, accordionId]);
        }
    };

    function getAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    // accordion.isCompleted &&
    return (
        <View style={[parentsStyling.container]}>
            <MainHeader isCaretaker={true} headerName={headerName}/>

            <ScrollView showsVerticalScrollIndicator={false} style={{height: "50%"}}>
                {allRequests?.length
                    && allRequests.map((accordion, index) => {
                        return <View key={index}>
                            <List.Section key={accordion.id}>
                                <List.Accordion
                                    title={
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                width: "100%"
                                            }}>
                                            <View style={{flexDirection: "row", gap: 10}}>
                                                <Image
                                                    // source={man}
                                                    style={{
                                                        height: 54,
                                                        width: 54,
                                                        borderRadius: 27,
                                                        borderWidth: 1,
                                                        borderColor: "black"
                                                    }}/>
                                                <View>
                                                    <Text style={{
                                                        marginTop: 2,
                                                        fontSize: 16
                                                    }}>{accordion?.caretakerData?.name}</Text>
                                                    <Text style={{fontSize: 15}}>{accordion._id}</Text>
                                                    <Text style={{fontSize: 15}}>{accordion?.requestFrom + ' - ' + accordion.requestTo}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                    expanded={expandedAccordions.includes(accordion.id)}
                                    onPress={() => {
                                        setState({...state, isBottomSheetOpen: true, caretaker: accordion?.caretakerId})
                                    }}
                                >
                                    {accordion.items}
                                </List.Accordion>
                            </List.Section>
                        </View>
                    })}
            </ScrollView>


            <BottomSheet
                visible={state.isBottomSheetOpen}
                onBackButtonPress={() => setState({...state, isBottomSheetOpen: false, data: []})}
                onBackdropPress={() => setState({...state, isBottomSheetOpen: false, data: []})}
            >
                {state.loading
                    ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={50}/>
                    </View>
                    : Object.keys(state.data).length
                        ? <View style={BottomSheetStyling.container}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{
                                    width: "100%",
                                    textAlign: "center",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Image
                                        // source={man}
                                        style={{
                                            height: 80,
                                            width: 80,
                                            borderRadius: 40,
                                            borderWidth: 1,
                                            borderColor: "black",
                                            margin: "auto"
                                        }}/>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 14,
                                            marginTop: 10
                                        }}>{state?.data?.name}</Text>
                                    <Text
                                        style={{color: "#FF912C"}}>{'Age: ' + getAge(state?.data?.payload?.dateOfBirth) + ' years old'} </Text>
                                    <Text style={{color: "#727272", fontSize: 12}}>Masters in Computer Science</Text>
                                </View>

                                <View>
                                    <Text style={{marginTop: 20, fontWeight: "bold"}}>Services</Text>

                                    {state?.data?.payload?.['services']?.length && <Text>Services</Text>}
                                    {state?.data?.payload?.['services']?.length
                                        && state.data['payload']['services'].map((v, i) => <View
                                            key={i}
                                            style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                            <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                            <Text style={{color: "grey"}}>
                                                {v}
                                            </Text>
                                        </View>)
                                    }

                                    {state?.data?.payload?.['Sports']?.length && <Text>Sports</Text>}
                                    {state?.data?.payload?.['Sports']?.length
                                        && state.data['payload']['Sports'].map((v, i) => <View
                                            key={i}
                                            style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                            <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                            <Text style={{color: "grey"}}>
                                                {v}
                                            </Text>
                                        </View>)
                                    }
                                    {state?.data?.payload?.['Music']?.length && <Text>Music</Text>}
                                    {state?.data?.payload?.['Music']?.length
                                        && state.data['payload']['Music'].map((v, i) => <View
                                            key={i}
                                            style={{flexDirection: "row", alignItems: "center", gap: 2}}>
                                            <Checkbox color={"#FFB906"} value={"Hello"} status={"checked"}/>
                                            <Text style={{color: "grey"}}>
                                                {v}
                                            </Text>
                                        </View>)
                                    }
                                    <Text style={{marginTop: 20, fontWeight: "bold"}}>Address</Text>
                                    <Text style={{color: "grey", marginBottom: 10}}>{state?.data?.address}</Text>

                                    <Button title={'Get location'}
                                        onPress={getLocation}
                                    />
                                </View>

                            </ScrollView>

                        </View>
                        : <View style={BottomSheetStyling.container}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
                                <Text style={{fontSize: 16, color: 'gray'}}>
                                    Data not found.
                                </Text>
                            </View>
                        </View>
                }
            </BottomSheet>
        </View>
    );
};

export default CaretakerHistory;

import React, { useState } from 'react';
import {View, Text, Image, ScrollView, Button} from 'react-native';
import {Checkbox, List} from 'react-native-paper';
import parentsStyling from "../../parents/parentsStyling";
import MainHeader from "../../parents/header/header";
import Ionicons from "react-native-vector-icons/Ionicons";
import man from "../../../assets/man/man.jpg"

const AllBookings = ({route, navigation}) => {
    const {headerName, data} = route.params

    const accordionData = [
        { id: 1, title: 'Accordion 1', date:"12 Nov 2023", items:
                <View style={{width:"100%", padding:20, paddingTop:10, height:"58%" }}>
                    <View style={{flexDirection:'row', gap:4, alignItems:"center", marginTop:10}}>
                        <Ionicons color={'#00B428'} size={14} name="time"/>
                        <Text style={{color:'#727272'}}>From :</Text>
                        <Text style={{color:'#727272'}}>24 Dec 2023, 05:00 PM</Text>
                    </View>
                    <View style={{flexDirection:'row', gap:4, alignItems:"center", marginTop:4}}>
                        <Ionicons color={'#00B428'} size={14} name="time"/>
                        <Text style={{color:'#727272'}}>To     :</Text>
                        <Text style={{color:'#727272'}}>24 Dec 2023, 05:00 PM</Text>
                    </View>

                    <View style={{width:"100%", padding:16, backgroundColor:"#EFEEEE", marginTop:20}}>
                        <Text style={{fontSize:15, fontWeight:"bold"}}>Child Info</Text>
                        <Text style={{fontWeight:"bold", marginTop:4}}>Name</Text>
                        <Text style={{color:"grey"}}>Peter</Text>
                        <Text style={{fontWeight:"bold", marginTop:4}}>School</Text>
                        <Text style={{color:"grey"}}>London School, London</Text>
                        <Text style={{fontWeight:"bold", marginTop:4}}>Age</Text>
                        <Text style={{color:"grey"}}>8 Months</Text>

                        <Text style={{fontSize:15, fontWeight:"bold", marginTop:10}}>Services</Text>
                            <Text style={{marginTop:10, color:"grey"}}>
                                Football
                            </Text>
                            <Text style={{marginTop:10, color:"grey"}}>
                                Baseball
                            </Text>
                        <View style={{marginTop:10}}/>
                            <Button title={"Cancel Booking"}/>
                    </View>
                </View>
        },
        // { id: 2, title: 'Accordion 2', date:"14 Nov 2023", items:
        //         <View style={{width:"100%", padding:20, paddingTop:10, height:"58%" }}>
        //             <View style={{flexDirection:'row', gap:4, alignItems:"center", marginTop:10}}>
        //                 <Ionicons color={'#00B428'} size={14} name="time"/>
        //                 <Text style={{color:'#727272'}}>From :</Text>
        //                 <Text style={{color:'#727272'}}>24 Dec 2023, 05:00 PM</Text>
        //             </View>
        //             <View style={{flexDirection:'row', gap:4, alignItems:"center", marginTop:4}}>
        //                 <Ionicons color={'#00B428'} size={14} name="time"/>
        //                 <Text style={{color:'#727272'}}>To     :</Text>
        //                 <Text style={{color:'#727272'}}>24 Dec 2023, 05:00 PM</Text>
        //             </View>
        //
        //             <View style={{width:"100%", padding:16, backgroundColor:"#EFEEEE", marginTop:20}}>
        //                 <Text style={{fontSize:15, fontWeight:"bold"}}>Child Info</Text>
        //                 <Text style={{fontWeight:"bold", marginTop:4}}>Name</Text>
        //                 <Text style={{color:"grey"}}>Peter</Text>
        //                 <Text style={{fontWeight:"bold", marginTop:4}}>School</Text>
        //                 <Text style={{color:"grey"}}>London School, London</Text>
        //                 <Text style={{fontWeight:"bold", marginTop:4}}>Age</Text>
        //                 <Text style={{color:"grey"}}>8 Months</Text>
        //
        //                 <Text style={{fontSize:15, fontWeight:"bold", marginTop:10}}>Services</Text>
        //                 <Text style={{marginTop:10, color:"grey"}}>
        //                     Football
        //                 </Text>
        //                 <Text style={{marginTop:10, color:"grey"}}>
        //                     Baseball
        //                 </Text>
        //                 <View style={{marginTop:10}}/>
        //                 <Button title={"Cancel Booking"}/>
        //             </View>
        //         </View>
        // },
    ];

    const [expandedAccordions, setExpandedAccordions] = useState([]);

    const handleAccordionPress = (accordionId) => {
        if (expandedAccordions.includes(accordionId)) {
            setExpandedAccordions(expandedAccordions.filter((id) => id !== accordionId));
        } else {
            setExpandedAccordions([...expandedAccordions, accordionId]);
        }
    };

    return (
        <View style={[parentsStyling.container]}>
            <MainHeader  isCaretaker={true} headerName={headerName}/>
            <Text style={{fontSize:16, fontWeight:"bold", margin:20, marginBottom:0}}>Upcomings</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                {accordionData.map((accordion) => (
                    <View>
                        <Text style={{textAlign:"center", fontSize:12, marginTop:10, color:"#989898"}}>{accordion.date}</Text>
                        <List.Section key={accordion.id}>
                            <List.Accordion
                                title={
                                    <View style={{ flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
                                        <View style={{flexDirection:"row", gap:10}}>
                                            <Image source={man} style={{
                                                height:54,
                                                width:54,
                                                borderRadius:27,
                                                borderWidth:1,
                                                borderColor:"black"
                                            }}/>
                                            <View>
                                                <Text style={{ marginTop:2, fontSize:16}}>Harry Kate</Text>
                                                <Text style={{fontSize:10}}>Member since 2022</Text>
                                                <View style={{flexDirection:"row", alignItems:"center", gap:2, marginTop:6}}>
                                                    <Ionicons name="star" color={"#FFDB1E"}/>
                                                    <Text style={{fontSize:12}}>5.0</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                }
                                expanded={expandedAccordions.includes(accordion.id)}
                                onPress={() => handleAccordionPress(accordion.id)}
                                right= {(props) =>
                                    <View style={{marginTop:10}}>
                                        <Text style={{fontSize:10, fontWeight:"bold", color:"#00B428"}}>Online</Text>
                                        <Text style={{fontSize:16, fontWeight:"bold", color:"#263238"}}>60%</Text>
                                    </View>
                                }
                            >
                                {accordion.items}
                            </List.Accordion>
                        </List.Section>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default AllBookings;

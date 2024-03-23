import React, {useEffect, useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {Text, View, Button, BackHandler, Alert, Image} from 'react-native';
import styles from "../rootStyling";
import splashScreensStyling from "./splashScreensStyling";
import splashScreenOne from "../../assets/AuthenticationPage/six.jpg";
import splashScreenTwo from "../../assets/AuthenticationPage/two.jpg";
import splashScreenThree from "../../assets/AuthenticationPage/one.jpg";

export default function ScreenOne({navigation}) {
    const [state, setState] = useState({
        screen: 1
    })
    useEffect(() => {
        const backAction = () => {
            if (state.screen === 2) {
                setState({...state, screen: 1})
                return true
            } else if (state.screen === 3) {
                setState({...state, screen: 2})
                return true
            } else return false;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, [state.screen]);
    return (
        <View
            style={[styles.container]}
        >
            <View style={splashScreensStyling.splashScreenBack}/>
            <View style={splashScreensStyling.splashScreenContainer}>
                <View style={{height:"90%"}}>
                <View style={{
                    height:"50%",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"flex-end",
                    margin:"auto",
                    marginBottom:"10%",
                    marginTop:"10%"
                }}>
                <Image style={{
                    width: 240,
                    height: 240,
                    borderRadius: 120
                }} source={
                    state.screen === 1 ? splashScreenOne :
                        state.screen === 2 ? splashScreenTwo :
                            splashScreenThree
                }/>
                </View>
                <View style={splashScreensStyling.splashScreenContent}>
                    <Text style={{fontWeight:"bold", color:"#263238"}}>{state.screen === 1 ? "Every child is unique" : state.screen === 2 ? "Safety and Well-being" : "For a bright and promising future"} </Text>
                    <Text style={{textAlign: "center", color:"#263238", width:"75%"}}>

                        {state.screen === 1 ? "Personalized services from infancy to adolescence, to meet your children's individual needs" : state.screen === 2 ? "Fully vetted senior college students to better relate, bond with and be positive and supportive role models for your children" : "From homework assistance to enriching extracurricular activities, we are here to support your child's educational and emotional journey"}

                    </Text>
                    <View style={splashScreensStyling.circlesContainer}>
                        <View
                            style={[splashScreensStyling.circles, state.screen === 1 && splashScreensStyling.activeColor]}></View>
                        <View
                            style={[splashScreensStyling.circles, state.screen === 2 && splashScreensStyling.activeColor]}></View>
                        <View
                            style={[splashScreensStyling.circles, state.screen === 3 && splashScreensStyling.activeColor]}></View>
                    </View>
                </View>
                </View>
                <View style={{width: "100%"}}>
                    <Button color={"#FFB906"} title="Next" onPress={() => {
                        state.screen===3 && navigation.navigate('login')
                        setState({
                            ...state,
                            screen: state.screen === 1 ? 2 : 3
                        })
                    }
                    }/>
                </View>
            </View>
        </View>
    );
}

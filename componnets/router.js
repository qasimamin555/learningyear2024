import React, {Component} from 'react';
import ScreenOne from "./splashScreens/ScreenOne";
import Login from "./authenticationPages/login/login";
import Pincode from "./authenticationPages/pincode/pincode";
import PaymentMethod from "./authenticationPages/paymentMethod/paymentMethod";
import ChangePassword from "./authenticationPages/changePassword/changePassword";
import PhoneNumber from "./authenticationPages/phoneNumber/phoneNumber";
import Email from "./authenticationPages/email/email";
import ForgotPassword from "./authenticationPages/forgotPassword/forgotPassword";
import CaretakerSignup from "./authenticationPages/CaretakerSignup/CaretakerSignup";
import GuardianSignup from "./authenticationPages/GuardianSignup/GuardianSignup";
import ParentsHome from "./parents/home/ParentsHome";
import AddChildForm from "./parents/Child/AddChildForm/AddChildForm";
import ChildInformation from "./parents/Child/ChildInformation/ChildInformation";
import FavouriteCaretaker from "./parents/favourites/favourites";
import Conversations from "./parents/Conversations/Conversations";
import Chat from "./parents/Chats/Chats";
import AllCaretakers from "./parents/allCaretakers/allCaretakers";
import BookingConfirmation from "./parents/BookingConfirmation/BookingConfirmation";
import CareTakerHome from "./Caretaker/Home/CareTakerHome";
import FavouriteParent from "./Caretaker/favourites/favourites";
import CaretakerHistory from "./Caretaker/History/CaretakerHistory";
import AllBookings from "./Caretaker/AllBookings/AllBookings";
import ConfirmationBooking from "./Caretaker/ConfirmationBooking/ConfirmationBooking";
import ViewBooking from "./Caretaker/ViewBooking/ViewBooking";
import ChildInfoPage from "./Caretaker/ChildInfoPage/ChildInfoPage";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {GlobalContext} from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SET_USER_INFO} from "./store/const";

const Stack = createNativeStackNavigator();

class Router extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: true,
            loading: true,
            tokenData: null,
        };
    }

    static contextType = GlobalContext;

    componentDidMount() {
        this.authenticateUser();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const [globalState, dispatch] = this.context;
        const {userData} = globalState;


        if ((!userData && this.state.isAuthenticated) || (userData && !this.state.isAuthenticated)) {
            this.authenticateUser();
        }
    }


    authenticateUser = () => {
        const [globalState, dispatch] = this.context;
        const {userData} = globalState;
        AsyncStorage.getItem("userInfo")
            .then(r => {
                if (!r) {
                    this.setState({isAuthenticated: false, loading: false, tokenData: null});
                } else {
                    dispatch({type: SET_USER_INFO, payload: r});
                    this.setState({isAuthenticated: true, loading: false, tokenData: JSON.parse(r)});
                }
            })
    };

    render() {
        const [globalState, dispatch] = this.context;
        const {userData} = globalState;

        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="start">

                    <>
                        {
                            !this.state.isAuthenticated
                            && <>
                                <Stack.Screen name="start" options={{headerShown: false}} component={ScreenOne}/>
                                <Stack.Screen name="login" options={{headerShown: false}} component={Login}/>
                                <Stack.Screen name="pincode" options={{headerShown: false}} component={Pincode}/>
                                <Stack.Screen name="paymentMethod" options={{headerShown: false}}
                                              component={PaymentMethod}/>
                                <Stack.Screen name="changePassword" options={{headerShown: false}}
                                              component={ChangePassword}/>
                                <Stack.Screen name="phoneNumber" options={{headerShown: false}} component={PhoneNumber}/>
                                <Stack.Screen name="newPassword" options={{headerShown: false}} component={ForgotPassword}/>
                                <Stack.Screen name="email" options={{headerShown: false}} component={Email}/>
                                <Stack.Screen name="guardianSignup" options={{headerShown: false}}
                                              component={GuardianSignup}/>
                                <Stack.Screen name="caretakerSignup" options={{headerShown: false}}
                                              component={CaretakerSignup}/>
                            </>
                        }
                    </>

                    {
                        this.state.isAuthenticated
                        && <>
                            {
                                this.state.tokenData?.registrationType === "parent"
                                    ? <>
                                        <Stack.Screen
                                            name="parentsHome"
                                            options={{headerShown: false}}
                                            component={ParentsHome}/>
                                        <Stack.Screen
                                            name="addChildForm"
                                            options={{headerShown: false}}
                                            component={AddChildForm}/>
                                    </>

                                    : <>
                                        <Stack.Screen
                                            name="CareTakerHome"
                                            options={{headerShown: false}}
                                            component={CareTakerHome}/>
                                    </>
                            }

                            <Stack.Screen name="childInformation" options={{headerShown: false}}
                                          component={ChildInformation}/>
                            <Stack.Screen name="favouriteCaretaker" options={{headerShown: false}}
                                          component={FavouriteCaretaker}/>
                            <Stack.Screen name="conversations" options={{headerShown: false}} component={Conversations}/>
                            <Stack.Screen name="chat" options={{headerShown: false}} component={Chat}/>
                            <Stack.Screen name="allCaretakers" options={{headerShown: false}} component={AllCaretakers}/>
                            <Stack.Screen name="BookingConfirmation" options={{headerShown: false}}
                                          component={BookingConfirmation}/>

                            {/*Caretaker*/}

                            <Stack.Screen name="FavouriteParent" options={{headerShown: false}}
                                          component={FavouriteParent}/>
                            <Stack.Screen name="CaretakerHistory" options={{headerShown: false}}
                                          component={CaretakerHistory}/>
                            <Stack.Screen name="AllBookings" options={{headerShown: false}} component={AllBookings}/>
                            <Stack.Screen name="ConfirmationBooking" options={{headerShown: false}}
                                          component={ConfirmationBooking}/>
                            <Stack.Screen name="ViewBooking" options={{headerShown: false}} component={ViewBooking}/>
                            <Stack.Screen name="ChildInfoPage" options={{headerShown: false}} component={ChildInfoPage}/>
                        </>
                    }

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default Router;

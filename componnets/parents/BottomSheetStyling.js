import {StyleSheet} from "react-native";

const BottomSheetStyling = StyleSheet.create({
    container:{
        backgroundColor:"white",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        padding:20,
        height:"80%"
    },
    headingContainer:{
        padding:10,
        backgroundColor:"#E6F2FD",
        borderRadius:8,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    headingTitle:{
        color:"#263238"
    },
    hr:{
        height:1,
        width:"100%",
        backgroundColor:"#263238"
    },
    rightCircle:{
        height:6,
        width:6,
        backgroundColor:"#0179EF",
        borderRadius:3
    }
});

export default BottomSheetStyling
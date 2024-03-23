import {StyleSheet} from "react-native";

const parentStyling = StyleSheet.create({
    container: {
        padding: 0,
        margin: 0,
        backgroundColor: "white",
        flex: 1
    },
    buttons: {
        padding: 12,
        borderRadius: 6,
        backgroundColor: "white"
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2CA6FF",
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 16,
        paddingTop: "6%",
        justifyContent: "space-between"
    },
    parentContainer: {
        height: "90%"
    }
});

export default parentStyling

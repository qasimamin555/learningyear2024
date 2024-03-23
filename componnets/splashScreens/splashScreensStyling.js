import {StyleSheet} from "react-native";

const splashStyling = StyleSheet.create({
    circlesContainer: {
        flexDirection: "row",
        gap: 4
    },
    circles: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "#D5D5D5",
        transition:.4
    },
    activeColor: {
        backgroundColor: "#FFB906"
    },
    splashScreenBack: {
        height: "50%",
        position: "absolute",
        width: "100%",
        backgroundColor:"#ECF2FF",
        borderBottomLeftRadius: 140,
        borderBottomRightRadius: 140,
    },
    splashScreenContainer: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        padding:30,
    },
    splashScreenContent: {
        flexDirection:"column",
        alignItems:"center",
        gap:10
    },
    rightAlignedView: {
        flexDirection:"column",
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width:"100%"
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
});

export default splashStyling
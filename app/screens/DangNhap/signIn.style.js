import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f5f5f5', 
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#333', 
        marginBottom: 30,
    },
    input: {
        width: 290,
        height: 50, 
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15, 
        backgroundColor: '#fff', 
        shadowColor: '#000', 
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5, 
    },
    button: {
        backgroundColor: '#007bff', 
        borderRadius: 5,
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        marginTop: 10, 
    },
    buttonText: {
        color: '#fff', 
        fontSize: 18, 
        textAlign: 'center', 
    },
    signupButton: {
        marginTop: 15, 
        paddingVertical: 10,
    },
});

export default styles;

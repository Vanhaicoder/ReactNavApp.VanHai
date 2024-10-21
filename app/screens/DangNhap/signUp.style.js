// Thay đổi trong styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#f9f9f9',
      padding: 20,
  },
  title: {
      fontWeight: 'bold',
      fontSize: 30,
      color: 'black',
      marginBottom: 30,
  },
  input: {
      width: 290,
      height: 40,
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
  inputHalf: {
      width: '45%', // Chiếm 45% chiều rộng
      height: 40,
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      marginHorizontal: 5,
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
  },
  picker: {
      width: 290,
      marginLeft:43, // Đảm bảo chiều rộng như trường input
      height: 40,
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
  view: {
      width: '100%',
      alignItems: 'center',
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    width: '78%',
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

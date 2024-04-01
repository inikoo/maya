import { MAINCOLORS } from '~/Utils/Colors';
import { AppStyles } from '../../../AppStyles'
const React = require('react-native');

const {StyleSheet} = React;

const styles = StyleSheet.create({
  FormTextInput: AppStyles.TextInput,
  containerView: {
    flex: 1, 
    justifyContent: 'center'
  },
  image: {
    height: 300, 
    width: 300
  },
  loginText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 20,
  },
  inputIcon:{
    marginRight: 5, 
    paddingVertical: 8
  },
  input:{
    flex: 1, 
    paddingVertical: 0
  },
  loginButton: {
    backgroundColor: MAINCOLORS.primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
});
export default styles;

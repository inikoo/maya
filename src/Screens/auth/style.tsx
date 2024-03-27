import { COLORS } from '~/Utils/Colors';
const React = require("react-native");


const { StyleSheet } = React;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center"
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
    color: COLORS.primary,
    textShadowColor: COLORS.dark, 
    textShadowOffset: { width: 3, height: 3 }, 
    textShadowRadius: 4,
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 0.6,
    borderColor: COLORS.dark,
    backgroundColor: COLORS.whiteGray,
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center",
  },
});
export default styles;

import {createTheme} from '@rneui/themed';
import {COLORS} from '~/Utils/Colors';

const theme = createTheme({
  lightColors: {
    primary: COLORS.primary,
  },
  darkColors: {
    primary: COLORS.primary,
  },
  components: {
    Button: {
        titleStyle : { color : COLORS.dark },
        buttonStyle : {
            borderRadius: 5,
            borderWidth: 1,
            borderColor: COLORS.dark,
        }
    },
    Text : {
      style : { 
        color : COLORS.dark
      }
    },
    ButtonGroup : {
      textStyle : {
        color : COLORS.black
      },
      selectedTextStyle : {
        color : COLORS.black
      },
      containerStyle : {
        borderRadius: 5,
        borderTopWidth: 1,
        borderLeftWidth : 1,
        borderBottomWidth : 1,
        borderRightWidth : 1,
        borderColor: COLORS.dark,
      },
      buttonContainerStyle : {
        borderRadius: 5,
        borderRightWidth: 1,
        borderColor: COLORS.dark,
      }
    },
    Avatar : {
      containerStyle : {
        borderWidth : 1,
        borderColor : COLORS.dark
      }
    }
  },
});

export {theme};

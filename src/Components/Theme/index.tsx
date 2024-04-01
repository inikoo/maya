import {createTheme} from '@rneui/themed';
import {COLORS, MAINCOLORS } from '~/Utils/Colors';

const theme = createTheme({
  lightColors: {
    primary: MAINCOLORS.primary,
  },
  darkColors: {
    primary: MAINCOLORS.primary,
  },
  components: {
    Button: {
        titleStyle : { color : MAINCOLORS.white },
    },
    Text : {
      style : { 
        color : MAINCOLORS.black
      }
    },
    ButtonGroup : {
      textStyle : {
        color : MAINCOLORS.black
      },
      selectedTextStyle : {
        color : COLORS.grey8
      },
 /*      containerStyle : {
        borderRadius: 5,
        borderTopWidth: 1,
        borderLeftWidth : 1,
        borderBottomWidth : 1,
        borderRightWidth : 1,
        borderColor: ,
      }, */
      buttonContainerStyle : {
        borderRadius: 5,
       /*  borderRightWidth: 1, */
      /*   borderColor: MAINCOLORS.black, */
      }
    },
    Avatar : {
      containerStyle : {
        borderWidth : 1,
        borderColor : COLORS.grey7
      }
    }
  },
});

export {theme};

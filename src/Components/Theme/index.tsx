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
        color : MAINCOLORS.black,
        fontFamily: 'Inter-VariableFont_slnt,wght'
      }
    },
    ButtonGroup : {
      textStyle : {
        color : MAINCOLORS.black
      },
      selectedTextStyle : {
        color : COLORS.grey8
      },
      buttonContainerStyle : {
        borderRadius: 5,
      }
    },
    Avatar : {
      containerStyle : {
        borderWidth : 1,
        borderColor : COLORS.grey7
      }
    },
    SpeedDial : {
      buttonStyle:{backgroundColor: MAINCOLORS.primary},
      openIcon:{name: 'close', color: COLORS.grey8},
      icon:{name: 'settings', color: COLORS.grey8},
      overlayColor : 'transparent'
    },
    SpeedDialAction:{
      icon: {color: COLORS.grey8, size: 18},
      buttonStyle:{backgroundColor: MAINCOLORS.primary},
      iconContainerStyle:{paddingTop: 10}
    }
  },
});

export {theme};

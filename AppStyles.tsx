import { StyleSheet, Dimensions } from 'react-native';
import {COLORS} from '~/Utils/Colors';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 60;
const RECIPE_ITEM_MARGIN = 20;

export const RecipeCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
    borderRadius: 15,
    backgroundColor : '#ffff',
    padding :20,
    borderWidth : 1,
    borderColor : COLORS.dark
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    marginTop: 3,
    marginBottom: 1,
    paddingLeft :3,
    paddingRight :3,
    justifyContent : 'center',
    textAlign: 'center'
  }
});

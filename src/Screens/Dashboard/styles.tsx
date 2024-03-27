import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../../AppStyles';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  containerCard: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor :'#ffff',
    margin:20,
    borderRadius:10
  },
  titleCard: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default styles;

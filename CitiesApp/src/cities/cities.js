import { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';

//import custom center-message component
import CenterMessage from '../components/center-message';
//import custom theme
import { colors } from '../theme';

//create Cities page as a class component
class Cities extends Component {
  //style navigation header
  static navigationOptions = {
    title: 'Cities',
    headerTitleStyle: {
      color: 'white',
      fontSize: 20,
      fontWeight: '400'
    }
  }
  navigate = (item) => {
    this.props.navigation.navigate('City', { city: item });
  }
  render() {
    //destruct routing parameters to obtain cities array data
    const {  cities  } = this.props.route.params;
    return (
      //if cities array is empty, use CenterMessage to display default message
      <ScrollView  contentContainerStyle={[!cities.length && { flex: 1 }]}>
        <View style={[!cities.length && { justifyContent: 'center', flex: 1 }]}>
          {
            !cities.length && <CenterMessage message='No saved cities!' />
          }
          {
            //else, display the array of cities data
            cities.map((item, index) => (
              <TouchableWithoutFeedback onPress={() => this.navigate(item)} key={index} >
                <View style={styles.cityContainer}>
                  <Text style={styles.city}>{item.city}</Text>
                  <Text style={styles.country}>{item.country}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cityContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary
  },
  city: {
    fontSize: 20,
  },
  country: {
    color: 'rgba(0, 0, 0, .5)'
  },  
});

export default Cities;
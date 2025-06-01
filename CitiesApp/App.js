import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import Cities from './src/cities/cities'
import AddCity from './src/add-city/add-city'

import Countries from './src/countries/countries'
import AddCountry from './src/add-country/add-country'

const Tab = createBottomTabNavigator();

export default class App extends Component {
  state = {
    cities: [],
    countries: []
  }
  addCity = (city) => {
    const cities = this.state.cities
    cities.push(city)
    this.setState({ cities })
  }

  addCountry = (country) => {
    const countries = this.state.countries
    countries.push(country)
    this.setState({ countries })
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>

          <Tab.Screen name="Cities"  initialParams={{cities: this.state.cities, addCity: this.addCity}} component={Cities} />
          <Tab.Screen name="Add City" initialParams={{cities: this.state.cities, addCity: this.addCity}} component={AddCity} />

          <Tab.Screen name="Countries"  initialParams={{countries: this.state.countries, addCountry: this.addCountry}} component={Countries} />
          <Tab.Screen name="Add Country" initialParams={{countries: this.state.countries, addCountry: this.addCountry}} component={AddCountry} />

        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
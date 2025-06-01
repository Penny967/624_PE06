import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import Cities from './src/cities/cities';
import City from './src/cities/city';
import AddCity from './src/add-city/add-city';
import Countries from './src/countries/countries';
import Country from './src/countries/country';
import AddCountry from './src/add-country/add-country';

import { colors } from './src/theme';

const Tab = createBottomTabNavigator();
const CityStack = createNativeStackNavigator();
const CountryStack = createNativeStackNavigator();

function CitiesStackScreen({ navigation, route }) {
  return (
    <CityStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTintColor: '#fff' }} >
      <CityStack.Screen name="Cities" component={Cities} initialParams={{
        cities: route.params.cities,
        addCity: route.params.addCity,
        addLocation: route.params.addLocation}} />
      <CityStack.Screen name="City" component={City} initialParams={{
        cities: route.params.cities,
        addCity: route.params.addCity,
        addLocation: route.params.addLocation}} />
    </CityStack.Navigator>
  );
}

function CountriesStackScreen({ navigation, route }) {
  return (
    <CountryStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTintColor: '#fff' }} >
      <CountryStack.Screen name="Countries" component={Countries} initialParams={{
        countries: route.params.countries,
        addCountry: route.params.addCountry,
        addCurrency: route.params.addCurrency}} />
      <CountryStack.Screen name="Country" component={Country} initialParams={{
        countries: route.params.countries,
        addCountry: route.params.addCountry,
        addCurrency: route.params.addCurrency}} />
    </CountryStack.Navigator>
  );
}

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
  addLocation = (location, city) => {
    const index = this.state.cities.findIndex(item => {
      return item.id === city.id
    });
    const chosenCity = this.state.cities[index];
    chosenCity.locations.push(location);
    const cities = [
      ...this.state.cities.slice(0, index),
      chosenCity,
      ...this.state.cities.slice(index + 1)
    ]
    this.setState({ cities });
  }
  addCountry = (country) => {
    const countries = this.state.countries
    countries.push(country)
    this.setState({ countries })
  }
  addCurrency = (currency, country) => {
    const index = this.state.countries.findIndex(item => {
      return item.id === country.id
    });
    const chosenCountry = this.state.countries[index];
    chosenCountry.currencies.push(currency);
    const countries = [
      ...this.state.countries.slice(0, index),
      chosenCountry,
      ...this.state.countries.slice(index + 1)
    ]
    this.setState({ countries });
  }
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="CitiesNav" initialParams={{cities: this.state.cities, addCity: this.addCity, addLocation: this.addLocation}} component={CitiesStackScreen} />
          <Tab.Screen name="Add City" initialParams={{cities: this.state.cities, addCity: this.addCity, addLocation: this.addLocation}} component={AddCity} />
          <Tab.Screen name="CountriesNav" initialParams={{countries: this.state.countries, addCountry: this.addCountry, addCurrency: this.addCurrency}} component={CountriesStackScreen} />
          <Tab.Screen name="Add Country" initialParams={{countries: this.state.countries, addCountry: this.addCountry, addCurrency: this.addCurrency}} component={AddCountry} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
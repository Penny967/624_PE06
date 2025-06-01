import { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import package to generate unique IDs using uuidv4 method
import * as Crypto from 'expo-crypto';

// import custom theme
import { colors } from '../theme';

// component page allows user to input country & currency
class AddCountry extends Component {
  state = {
    country: '',
    currency: ''
  }
  // function to capture user text input
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  // function to capture user submission
  submit = () => {
    // if incomplete submission, alert user
    if (this.state.country === '' || this.state.currency === '') {
      alert('please complete form') 
    }
    // define country object and its properties
    const country = {
      country: this.state.country,
      currency: this.state.currency,
      id: Crypto.randomUUID(),
      currencies: []
    }
    // add data to routing parameters
    this.props.route.params.addCountry(country);
    // reset the state of the component
    this.setState({
      country: '',
      currency: ''
    }, () => {
      //return to Countries view
      this.props.navigation.navigate('Countries')
    });
  }
  // render AddCountry interface
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Countries</Text>
        <TextInput
          placeholder='Country name'
          onChangeText={val => this.onChangeText('country', val)}
          style={styles.input}
          value={this.state.country}
        />
        <TextInput
          placeholder='Currency name'
          onChangeText={val => this.onChangeText('currency', val)}
          style={styles.input}
          value={this.state.currency}
        />
        <TouchableOpacity onPress={this.submit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Country</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  heading: {
    color: 'white',
    fontSize: 40,
    marginBottom: 10,
    alignSelf: 'center'
  },
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    margin: 10,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    height: 50
  }
});

export default AddCountry;
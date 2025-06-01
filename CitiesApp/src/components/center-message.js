import { Text, View, StyleSheet } from 'react-native';

//import custom theme
import { colors } from '../theme';

const CenterMessage = ({ message }) => (
  <View style={styles.messageContainer}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary
  },
  message: {
    alignSelf: 'center',
    fontSize: 20
  }
});

export default CenterMessage;
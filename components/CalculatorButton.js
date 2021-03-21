import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class CalculatorButton extends React.Component {

  static defaultProps = {
    onPress: function() { },
    title: "",
    color: "white",
    backgroundColor: "black"
  }

  // add styles.container in [] because dynamic styles so add as array
  render() {
    var bc = this.props.backgroundColor

    return (
      <TouchableOpacity onPress={this.props.onPress} 
        style={[styles.container, { backgroundColor: bc }]}>
        <Text style={[styles.text, { color: this.props.color }]}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    alignItems: "center", 
    justifyContent: "center", 
    width: 50, 
    height: 50, 
    borderRadius: 25
  },
  text: { 
    fontSize: 30, 
    fontWeight: "bold"
  },
});
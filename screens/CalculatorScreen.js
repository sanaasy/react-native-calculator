require("./../lib/swisscalc.lib.format.js");
require("./../lib/swisscalc.lib.operator.js");
require("./../lib/swisscalc.lib.operatorCache.js");
require("./../lib/swisscalc.lib.shuntingYard.js");
require("./../lib/swisscalc.display.numericDisplay.js");
require("./../lib/swisscalc.display.memoryDisplay.js");
require("./../lib/swisscalc.calc.calculator.js");

import React from 'react';
import { StyleSheet, View, Text, PanResponder, Dimensions } from 'react-native';
import { CalculatorButton, CalculatorDisplay } from './../components';

export default class CalculatorScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      display: "0",
      orientation: "portrait",
    };

    this.oc = global.swisscalc.lib.operatorCache;
    this.calc = new global.swisscalc.calc.calculator();

    Dimensions.addEventListener("change", () => {
      const { width, height } = Dimensions.get("window");
      const checkOrientation = (width > height) ? "landscape" : "portrait";
      this.setState({ orientation: checkOrientation });
    });

    // to implement the swipe
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) >= 50) {
          this.onBackspacePress();
        }
      }
    });
  }

  onDigitPress = (digit) => {
    this.calc.addDigit(digit);
    this.setState({ display: this.calc.getMainDisplay() });
  }

  onClearPress = () => {
    this.calc.clear();
    this.setState({ display: this.calc.getMainDisplay() });
  }

  onBackspacePress = () => {
    this.calc.backspace();
    this.setState({ display: this.calc.getMainDisplay() });
  }

  onPlusMinusPress = () => {
    this.calc.negate();
    this.setState({ display: this.calc.getMainDisplay() });
  }

  onBinaryOperatorPress = (operator) => {
    this.calc.addBinaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  }

  onEqualsPress = () => {
    this.calc.equalsPressed();
    this.setState({ display: this.calc.getMainDisplay() });
  }

  onUnaryOperatorPress = (operator) => {
    this.calc.addUnaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  }

  renderPortrait() {
    return (
      <View style={{flex:1}}>

        <View style={styles.displayContainer} {...this.panResponder.panHandlers}>
          <CalculatorDisplay display={this.state.display} />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <CalculatorButton onPress={this.onClearPress} title="C" color="black" backgroundColor="#D4D4D2" />
            <CalculatorButton onPress={this.onPlusMinusPress} title="+/-" color="black" backgroundColor="#D4D4D2" />
            <CalculatorButton onPress={() => { this.onUnaryOperatorPress(this.oc.PercentOperator) }} title="%" color="black" backgroundColor="#D4D4D2" />
            <CalculatorButton onPress={() => { this.onBinaryOperatorPress(this.oc.DivisionOperator) }} title="??" color="white" backgroundColor="#FF9500" />
          </View>

          <View style={styles.buttonRow}>
            <CalculatorButton onPress={() => { this.onDigitPress("7") }} title="7" color="white" backgroundColor="#1C1C1C" />
            <CalculatorButton onPress={() => { this.onDigitPress("8") }} title="8" color="white" backgroundColor="#1C1C1C" />
            <CalculatorButton onPress={() => { this.onDigitPress("9") }} title="9" color="white" backgroundColor="#1C1C1C" />
            <CalculatorButton onPress={() => { this.onBinaryOperatorPress(this.oc.MultiplicationOperator) }} title="??" color="white" backgroundColor="#FF9500" />
          </View>
          
          <View style={styles.buttonRow}>
            <CalculatorButton onPress={() => { this.onDigitPress("4") }} title="4" color="white" backgroundColor="#1C1C1C" />
            <CalculatorButton onPress={() => { this.onDigitPress("5") }} title="5" color="white" backgroundColor="#1C1C1C" />
            <CalculatorButton onPress={() => { this.onDigitPress("6") }} title="6" color="white" backgroundColor="#1C1C1C" />
            <CalculatorButton onPress={() => { this.onBinaryOperatorPress(this.oc.SubtractionOperator) }} title="-" color="white" backgroundColor="#FF9500" />
          </View>

          <View style={styles.buttonRow}>
            <CalculatorButton onPress={() => { this.onDigitPress("1") }} title="1" color="white" backgroundColor="#1C1C1C" />
            <CalculatorButton onPress={() => { this.onDigitPress("2") }} title="2" color="white" backgroundColor="#1C1C1C" />
            <CalculatorButton onPress={() => { this.onDigitPress("3") }} title="3" color="white" backgroundColor="#1C1C1C" />
            <CalculatorButton onPress={() => { this.onBinaryOperatorPress(this.oc.AdditionOperator) }} title="+" color="white" backgroundColor="#FF9500" />
          </View>

          <View style={styles.buttonRow}>
            <CalculatorButton onPress={() => { this.onDigitPress("0") }} title="0" color="white" backgroundColor="#1C1C1C" style={{ width: 190 }} />
            <CalculatorButton onPress={() => { this.onDigitPress(".") }} title="." color="white" backgroundColor="#1C1C1C" />
            <CalculatorButton onPress={this.onEqualsPress} title="=" color="white" backgroundColor="#FF9500" />
          </View>
        </View>

      </View>
    )
  }

  renderLandscape() {
    return (
      <View style={{flex: 1, paddingTop: 50}}>
        <Text style={{color:"white"}}>Landscape Mode</Text>
      </View>
    )
  }

  render() {
    const view = (this.state.orientation == "portrait") ? this.renderPortrait() : this.renderLandscape();
    return (
      <View style={styles.container}>
        {view}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "black",
  },
  displayContainer: { 
    flex: 1, 
    justifyContent: "flex-end",
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  buttonRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
  },
});
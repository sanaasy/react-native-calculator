require("./../lib/swisscalc.lib.format.js");
require("./../lib/swisscalc.lib.operator.js");
require("./../lib/swisscalc.lib.operatorCache.js");
require("./../lib/swisscalc.lib.shuntingYard.js");
require("./../lib/swisscalc.display.numericDisplay.js");
require("./../lib/swisscalc.display.memoryDisplay.js");
require("./../lib/swisscalc.calc.calculator.js");

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CalculatorButton, CalculatorDisplay } from './../components';

export default class CalculatorScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      display: "0",
    };

    this.oc = global.swisscalc.lib.operatorCache;
    this.calc = new global.swisscalc.calc.calculator();
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.displayContainer}>
          <CalculatorDisplay display={this.state.display} />
        </View>

        <View>
          <View style={styles.buttonRow}>
            <CalculatorButton title="C" color="red" backgroundColor="blue" />
            <CalculatorButton title="+/-" color="red" backgroundColor="blue" />
            <CalculatorButton title="%" color="red" backgroundColor="blue" />
            <CalculatorButton title="÷" color="red" backgroundColor="blue" />
          </View>

          <View style={styles.buttonRow}>
            <CalculatorButton title="7" color="red" backgroundColor="blue" />
            <CalculatorButton title="8" color="red" backgroundColor="blue" />
            <CalculatorButton title="9" color="red" backgroundColor="blue" />
            <CalculatorButton title="×" color="red" backgroundColor="blue" />
          </View>
          
          <View style={styles.buttonRow}>
            <CalculatorButton title="4" color="red" backgroundColor="blue" />
            <CalculatorButton title="5" color="red" backgroundColor="blue" />
            <CalculatorButton title="6" color="red" backgroundColor="blue" />
            <CalculatorButton title="-" color="red" backgroundColor="blue" />
          </View>

          <View style={styles.buttonRow}>
            <CalculatorButton title="1" color="red" backgroundColor="blue" />
            <CalculatorButton title="2" color="red" backgroundColor="blue" />
            <CalculatorButton title="3" color="red" backgroundColor="blue" />
            <CalculatorButton title="+" color="red" backgroundColor="blue" />
          </View>

          <View style={styles.buttonRow}>
            <CalculatorButton title="0" color="red" backgroundColor="blue" style={{ flex: 2 }} />
            <CalculatorButton title="." color="red" backgroundColor="blue" />
            <CalculatorButton title="=" color="red" backgroundColor="blue" />
          </View>
        </View>

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
  buttonRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
  },
});
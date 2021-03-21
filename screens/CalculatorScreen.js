require("./../lib/swisscalc.lib.format.js");
require("./../lib/swisscalc.lib.operator.js");
require("./../lib/swisscalc.lib.operatorCache.js");
require("./../lib/swisscalc.lib.shuntingYard.js");
require("./../lib/swisscalc.display.numericDisplay.js");
require("./../lib/swisscalc.display.memoryDisplay.js");
require("./../lib/swisscalc.calc.calculator.js");

import React from 'react';
import { View, Text } from 'react-native';
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
      <View style={{paddingTop:50}}>
        <CalculatorDisplay display={this.state.display} />
        <CalculatorButton title="+" color="red" backgroundColor="blue" />
      </View>
    )
  }
}
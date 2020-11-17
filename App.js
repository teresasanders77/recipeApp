import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';

import Amplify from "aws-amplify"
import config from "./aws-exports"

import { withAuthenticator } from "aws-amplify-react-native"

Amplify.configure(config)

class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

export default withAuthenticator(App, true)
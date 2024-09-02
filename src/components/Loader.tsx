import { ActivityIndicator, StyleProp, TextStyle } from 'react-native'
import React, { Component } from 'react'

export default class Loader extends Component<{ style?: StyleProp<TextStyle> }> {
    render() {
        return <ActivityIndicator color="#fff" size={"large"} style={this.props.style} />
    }
}
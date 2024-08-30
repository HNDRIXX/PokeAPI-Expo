import { ActivityIndicator, StyleProp, TextStyle } from 'react-native'
import React from 'react'

export default function Loader({ style } : { style?: StyleProp<TextStyle> }) {
    return <ActivityIndicator color="#fff" size={"large"} style={style}/>
}
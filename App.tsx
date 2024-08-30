import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import routeMap from "./src/routes/routeMap";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('./src/assets/fonts/SpaceMono-Regular.ttf'),
    });

    const Stack = createStackNavigator();

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer
            independent={true}
            children={
                <Stack.Navigator
                    initialRouteName='Home'
                    screenOptions={{
                        headerShown: false,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                >
                    {routeMap.map((Current, index) => {
                        const CurrentComponent = Current.component;
                        return (
                            <Stack.Screen name={Current.path} component={CurrentComponent} key={index} />
                        );
                    })}
                </Stack.Navigator>
            }
        />

    );
}

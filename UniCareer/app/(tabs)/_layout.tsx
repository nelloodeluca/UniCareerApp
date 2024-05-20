import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import {HomeScreen} from "expo-dev-launcher/bundle/screens/HomeScreen";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    headerShown: false
            }}
            />
            <Tabs.Screen
                name="aggiungi"
                options={{
                    title: 'Aggiungi',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="statistica"
                options={{
                    title: 'Statistica',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="bars" color={color} />,
                    headerShown: false
                }}
            />
        </Tabs>
    );
}
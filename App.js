/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {decorator as sensors} from "react-native-sensors";
import { Accelerometer, Gyroscope } from "react-native-sensors";

let accelerationObservable = null;
new Accelerometer({
    updateInterval: 400
})
    .then(observable => {
        accelerationObservable = observable;

        accelerationObservable
            .map(({ x, y, z }) => x + y + z)
            .filter(speed => speed > 20)
            .subscribe(speed => console.log(`Poruszasz telefonem z predkością ${speed}`));
    })
    .catch(error => {
        console.log("Sensor nie jest dostępny");
    });

setTimeout(() => {
    accelerationObservable.stop();
}, 1000);


class MyComponent {
    render() {
        const { sensorsFound, Accelerometer, Gyroscope } = this.props;

        if (!Accelerometer || !Gyroscope) {
            return null;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {(sensorsFound["Accelerometer"] &&
                        `Wartość: ${Accelerometer}`) ||
                    "Acceleration is not available"}
                    {(sensorsFound["Gyroscope"] && `Żyroskop has value: ${Gyroscope}`) ||
                    "Gyro is not available"}
                </Text>
            </View>
        );
    }
}

export default new sensors({
    Accelerometer: {
        updateInterval: 300
    },
    Gyroscope: true
})(MyComponent);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

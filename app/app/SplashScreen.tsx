import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
 const SplashScreenPage = () => {
    return (
        <View style = {styles.container}>
            <LottieView
                autoPlay
                style={styles.animation}
                source={require('@/assets/lotties/mascote_inicial_splashcreen.json')}
            />
        </View>
    )
}

export default SplashScreenPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    animation: {
        width: 200,
        height: 200,
    }
})
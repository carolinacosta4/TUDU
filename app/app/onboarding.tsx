import { Text, View, StyleSheet, Image, Pressable, Dimensions } from "react-native";
import { Stack } from "expo-router";
import { router } from "expo-router";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut, interpolateColor, SlideInRight, SlideOutLeft, useAnimatedStyle, withSpring, withDelay, withSequence, BounceInDown } from "react-native-reanimated";
import logoWhite from '@/assets/images/logo_white.png';
import logoBlue from "@/assets/images/logo_blue.png";
import logoGreen from "@/assets/images/logo_green.png";
import logoYellow from "@/assets/images/logo_yellow.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
const COLORS = {
  primary: '#562CAF',
  secondary: '#291752',
  green: '#0B5B29',
  yellow: '#F49519',
  blue: '#AA8BD3',
  white: '#EEE5F5',
  lightBlue: '#C0C7FB',
  lightGreen: '#B8DEA4',
  beige: '#EEEADF',
  darkBrown: '#654111',
  lightYellow: '#FFF8AE'
};

const FONT_SIZES = {
  title: 19.2,
  subtitle: 24,
};

const onboardingSteps = [
  {
    image: "https://res.cloudinary.com/ditdnslga/image/upload/v1734716115/ydhoz2f5k5umd0xsynm0.png",
    widthImage: 187,
    heightImage: 196,
    subtitle: "",
    description: "Your personal productivity companion to stay on top of your tasks, every day",
    logo: logoWhite,
    button: "Let’s get started!",
    subtitleStyle: {},
    text: {
      color: COLORS.white,
    },
    contentOnboarding: {
      backgroundColor: COLORS.blue,
    },
    buttonContainer: {
      backgroundColor: COLORS.primary,
    },
    buttonText: {
      color: COLORS.beige,
    },
    icon: null
  },
  {
    image: "https://res.cloudinary.com/ditdnslga/image/upload/v1734716116/jlihlvzvfwruvoh5midg.png",
    widthImage: 178,
    heightImage: 200,
    subtitle: "Create Tasks in Seconds",
    description: "Put your messy era behind you! Add tasks effortlessly, so you never forget a thing.",
    logo: logoBlue,
    button: "Continue",
    subtitleStyle: {
      color: COLORS.secondary,
      fontSize: FONT_SIZES.title,
      fontWeight: '700',
      lineHeight: 24,
      paddingBottom: 16,
    },
    text: {
      color: COLORS.secondary,
    },
    contentOnboarding: {
      backgroundColor: COLORS.lightBlue,
    },
    buttonContainer: {
      marginTop: 16,
      width: '40%', 
      height: '4%',
      paddingTop: 24,
      paddingLeft: 0,
      paddingRight: 0,
      marginLeft: '40%', 
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row', 
      gap: 8,
    },
    buttonText: {
      color: COLORS.primary,
      fontSize: FONT_SIZES.title,
      fontWeight: '700',
      lineHeight: 24,
    },
    icon: {
      name: "chevron-right",
      size: 24,
      color: COLORS.primary,
    }
  },
  {
    image: "https://res.cloudinary.com/ditdnslga/image/upload/v1734716116/mvcli5lsp2uwp7uvhcwo.png",
    widthImage: 234,
    heightImage: 172,
    subtitle: "Never miss a deadline",
    description: "Don’t get lazy! Set reminders and get notified exactly when you need to act.",
    logo: logoGreen,
    button: "Continue",
    subtitleStyle: {
      color: COLORS.green,
      fontSize: FONT_SIZES.title,
      fontWeight: '700',
      lineHeight: 24,
      paddingBottom: 16,
    },
    text: {
      color: COLORS.green,
    },
    contentOnboarding: {
      backgroundColor: COLORS.lightGreen,
    },
    buttonContainer: {
      marginTop: 16,
      width: '40%', 
      height: '4%',
      paddingTop: 24,
      paddingLeft: 0,
      paddingRight: 0,
      marginLeft: '40%', 
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    buttonText: {
      color: COLORS.primary,
      fontSize: FONT_SIZES.title,
      fontWeight: '700',
      lineHeight: 24,
    },
    icon: {
      name: "chevron-right",
      size: 24,
      color: COLORS.primary,
    }
  },
  {
    image: "https://res.cloudinary.com/ditdnslga/image/upload/v1734716116/qjdu28or1nmu7auc9ldw.png",
    widthImage: 200,
    heightImage: 180,
    subtitle: "Celebrate your progress",
    description: "Put your messy era behind you! Add tasks effortlessly, so you never forget a thing.",
    logo: logoYellow,
    button: "Create Account",
    subtitleStyle: {
      color: COLORS.yellow,
    },
    text: {
      color: COLORS.darkBrown,
    },
    contentOnboarding: {
      backgroundColor: "#FFF8AE",
    },
    buttonContainer: {
      marginTop: 56,
      height: 52,
      display: 'flex',
      paddingLeft: 78,
      paddingRight: 78,
      paddingTop: 12,
      paddingBottom: 8,
      backgroundColor: COLORS.primary,
      borderRadius: 54,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: COLORS.beige,
    },
    icon: null
  },
];
/*
type Props = {
  onClose: () => void
}*/
export default function OnboardingScreen(/*{  onClose }: Props*/) {
  const [screenIndex, setScreenIndex] = useState(0);
  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      setScreenIndex(0);
      AsyncStorage.setItem('IS_ONBOARDED', 'true');
      //onClose ? onClose() : router.push('/register')
      router.push('/register');
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0
    if (isFirstScreen) {
      setScreenIndex(0);
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const swipeForward = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      onContinue();
    })
    .runOnJS(true);

  const swipeBackward = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      onBack();
    })
    .runOnJS(true);

  const swipes = Gesture.Simultaneous(swipeBackward, swipeForward)
  
  const changeBackgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        screenIndex,
        [0, 1, 2, 3],
        [COLORS.blue, COLORS.lightBlue, COLORS.lightGreen, COLORS.lightYellow]
      ),
      transition: 'background-color 100ms ease'
    };
  });

  return (
    <GestureDetector gesture={swipes}>
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.containerOnboarding}>
          <Animated.View entering={FadeIn} exiting={FadeOut} key={screenIndex} style={styles.innerContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: data.image,
                }}
                style={{ width: data.widthImage, height: data.heightImage }}
              />
            </View>
            <Animated.View  style={[styles.contentOnboarding, changeBackgroundColor]}   entering={screenIndex === 0 ? BounceInDown.delay(50) : undefined}>
              <View style={styles.logo}>
                <Image
                  source={data.logo}
                  style={{ width: 170, height: 67.32, marginTop: 20 }}
                />
              </View>
              <Text  style={[styles.subtitleStyle, data.subtitleStyle]}>
                {data.subtitle}
              </Text>
              <Animated.Text style={[styles.text, data.text]} entering={SlideInRight.delay(50)} exiting={SlideOutLeft.delay(50)}>
                {data.description}
              </Animated.Text>

              <Pressable style={[styles.buttonContainer, data.buttonContainer]} onPress={onContinue}>
                <Text style={[styles.buttonText, data.buttonText]}>{data.button}</Text>
                {data.icon && (
                  <Icon 
                    name={data.icon.name || 'chevron-right'}
                    size={data.icon.size}
                    color={data.icon.color}
                  />
                )}
              </Pressable>
            </Animated.View>
          </Animated.View>
        </View>
    </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerOnboarding: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 72,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 36,
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    position: "absolute",
    top: 164,
  },
  contentOnboarding: {
    width: "140%",
    height: "400%", 
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "10%",
    borderRadius: 9999,
    position: "absolute",
    top: Dimensions.get('window').height * 0.5,
  },
  text: {
    width: 331,
    height: 73,
    textAlign: 'center',
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    lineHeight: 24,
    wordWrap: 'break-word',
  },
  subtitleStyle: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    lineHeight: 24,
    wordWrap: 'break-word',
    paddingBottom: 16,
  },
  buttonContainer: {
    marginTop: 56,
    height: 52,
    display: 'flex',
    paddingLeft: 78,
    paddingRight: 78,
    paddingTop: 12,
    paddingBottom: 8,
    borderRadius: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    lineHeight: 24,
    wordWrap: 'break-word',
    alignSelf: 'center',
  },
});
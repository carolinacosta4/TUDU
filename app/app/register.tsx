import api from "@/api/api";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import useFonts from "@/hooks/useFonts";
import { useUserInfo } from "@/hooks/useUserInfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from "@/app/onboarding";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const fontsLoaded = useFonts();
  const { setUserInfo, storeData } = useUserInfo();
  const [showOnboarding, setShowOnboarding] = useState(false)
    AsyncStorage.clear()
    /*
    useEffect(() => {
      async function checkFirstLaunch() {
        try {
          const firstLaunchVal = await AsyncStorage.getItem('IS_ONBOARDED');
          console.log("Retrieved IS_ONBOARDED:", firstLaunchVal);
          if (!firstLaunchVal) {
            console.log('IS_ONBOARDED does not exist, showing onboarding');
            setShowOnboarding(true);
            router.push('/onboarding')
            console.log('show onbaoaring',showOnboarding)          }
        } catch (error) {
          console.warn("Error retrieving data from AsyncStorage:", error);
        }
      }
      checkFirstLaunch();
    }, []);

    const handleOnboardingClose = async () => {
      try {
        await AsyncStorage.setItem('IS_ONBOARDED', 'true');
        console.log("Stored IS_ONBOARDED: true");
        setShowOnboarding(false); 
      } catch (error) {
        console.warn("Error saving data to AsyncStorage:", error);
      }
    };
*/
  const handleCreateAccount = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      setShowError(true);
      return;
    }

    if (name && email && password && confirmPassword) {
      setShowError(false);
      try {
        await api.post("users", {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        });

        const response = await api.post("users/login", {
          email: email,
          password: password,
        });

        if (response.data.success) {
          setUserInfo({
            userID: response.data.userID,
            authToken: response.data.accessToken,
          });
          storeData({
            userID: response.data.userID,
            authToken: response.data.accessToken,
          });

          router.push("/");
        }
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data.msg);
          setShowError(true);
        } else {
          console.error("Error message:", error);
        }
      }
    } else {
      setShowError(true);
      setError("You need to fill all the parameters");
    }
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: "#EEE5F5",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              rowGap: 40,
              marginBottom: 60,
            }}
          >
            <Image
              source={require("@/assets/images/logo_purple.png")}
              style={{ width: 170, height: 67.32, marginTop: 20 }}
            />
            <Image
              source={{
                uri: "https://res.cloudinary.com/ditdnslga/image/upload/v1734716115/ydhoz2f5k5umd0xsynm0.png",
              }}
              style={{ width: 152.08, height: 162 }}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#562CAF",
                  fontFamily: "Rebond-Grotesque-Regular",
                  lineHeight: 20,
                }}
              >
                Say goodbye to chaos!
              </Text>
              <Text style={{ fontSize: 16, color: "#562CAF" }}>
                Stay on top of your tasks
              </Text>
            </View>
            <View style={{ rowGap: 24, alignItems: "center" }}>
              <View style={{ rowGap: 16 }}>
                <InputField
                  value={name}
                  onChangeText={setName}
                  placeholder="Name"
                  icon={"account-outline"}
                />
                <InputField
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  icon={"email-outline"}
                />
                <InputField
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  placeholder="Password"
                  icon={"lock-outline"}
                />
                <InputField
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm password"
                  secureTextEntry={true}
                  icon={"lock-outline"}
                />
              </View>
              <TouchableHighlight
                onPress={handleCreateAccount}
                style={{
                  backgroundColor: "#562CAF",
                  borderRadius: 29,
                  alignItems: "center",
                  width: 350,
                  height: 56,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#EEEADF",
                    fontSize: 19.2,
                    fontFamily: "Rebond-Grotesque-Bold",
                    lineHeight: 20,
                  }}
                >
                  Create account
                </Text>
              </TouchableHighlight>
              {showError && <Text style={{ color: "red" }}>{error}</Text>}
            </View>
            <View style={{ rowGap: 20 }}>
              <Text
                style={{
                  fontSize: 13.33,
                  color: "#562CAF",
                  paddingLeft: 90,
                  paddingRight: 90,
                  textAlign: "center",
                  fontFamily: "Rebond-Grotesque-Regular",
                  lineHeight: 20,
                }}
              >
                When you register, you're agreeing to our terms and privacy
                policy
              </Text>
              <Link href={{ pathname: "/login" }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#291752",
                    textAlign: "center",
                    fontFamily: "Rebond-Grotesque-Bold",
                    lineHeight: 20,
                  }}
                >
                  Already have an account?
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
        {/* {showOnboarding && <OnboardingScreen onClose={handleOnboardingClose} />} */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

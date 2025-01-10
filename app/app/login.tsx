import api from "@/api/api";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useUserInfo } from "@/hooks/useUserInfo";
import InputField from "@/components/InputField";
import useFonts from "@/hooks/useFonts";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const fontsLoaded = useFonts();
  const { setUserInfo, storeData } = useUserInfo();

  const handleLoginAccount = async () => {
    if (email && password) {
      setShowError(false);
      try {
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
                Back to planning, back to progress.
              </Text>
              <Text style={{ fontSize: 16, color: "#562CAF" }}>Let's go!</Text>
            </View>
            <View style={{ rowGap: 24, alignItems: "center" }}>
              <View style={{ rowGap: 16 }}>
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
              </View>
              <TouchableHighlight
                onPress={handleLoginAccount}
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
                  Login
                </Text>
              </TouchableHighlight>
              {showError && <Text style={{ color: "red" }}>{error}</Text>}
            </View>
            <View
              style={{
                rowGap: 20,
              }}
            >
              <View>
                <Link href={{ pathname: "/recoverPassword" }}>
                  <Text
                    style={{
                      fontSize: 13.33,
                      color: "#562CAF",
                      paddingLeft: 80,
                      paddingRight: 80,
                      textAlign: "center",
                      fontFamily: "Rebond-Grotesque-Bold",
                      lineHeight: 20,
                    }}
                  >
                    Forgot your password?
                  </Text>
                </Link>
                <Text
                  style={{
                    fontSize: 13.33,
                    color: "#562CAF",
                    paddingLeft: 80,
                    paddingRight: 80,
                    textAlign: "center",
                    fontFamily: "Rebond-Grotesque-Regular",
                    lineHeight: 20,
                  }}
                >
                  No worries, we've got you covered!
                </Text>
              </View>
              <Link href={{ pathname: "/register" }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#291752",
                    textAlign: "center",
                    fontFamily: "Rebond-Grotesque-Bold",
                    lineHeight: 20,
                  }}
                >
                  Don't have an account?
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

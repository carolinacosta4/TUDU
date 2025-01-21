import { useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import InputField from "@/components/InputField";
import useFonts from "@/hooks/useFonts";
import useUserStore from "@/stores/userStore";

export default function RecoverPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fontsLoaded = useFonts();
  const { id } = useLocalSearchParams();
  const { resetPassword } = useUserStore();

  const handleSendEmail = async () => {
    if (password && confirmPassword) {
      setShowError(false);
      try {
        const response = await resetPassword(
          String(id),
          password,
          confirmPassword
        );
        if (response.success) {
          setShowSuccess(true);
          setSuccess("Password updated successfully");
        }
      } catch (error: any) {
        if (error) {
          setError(error);
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
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={require("@/assets/images/logo_purple.png")}
              style={{ width: 170, height: 67.32, marginTop: 20 }}
            />

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  rowGap: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 23.04,
                    color: "#291752",
                    fontFamily: "Rebond-Grotesque-Bold",
                    lineHeight: 20,
                    textAlign: "center",
                  }}
                >
                  Ready to get back in?
                </Text>
                <Text
                  style={{
                    fontSize: 19.2,
                    color: "#562CAF",
                    fontFamily: "Rebond-Grotesque-Regular",
                    lineHeight: 20,
                    paddingHorizontal: 70,
                    textAlign: "center",
                  }}
                >
                  Set a strong new password to protect your account!
                </Text>
              </View>
              <View
                style={{
                  marginTop: 32,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View style={{ rowGap: 16 }}>
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
                  onPress={handleSendEmail}
                  style={{
                    backgroundColor: "#562CAF",
                    borderRadius: 29,
                    alignItems: "center",
                    width: 350,
                    height: 56,
                    justifyContent: "center",
                    marginTop: 24,
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
                    Continue
                  </Text>
                </TouchableHighlight>
                {showError && (
                  <Text
                    style={{
                      color: "red",
                      marginTop: 12,
                      fontFamily: "Rebond-Grotesque-Regular",
                      lineHeight: 20,
                    }}
                  >
                    {error}
                  </Text>
                )}
                {showSuccess && (
                  <Text
                    style={{
                      color: "green",
                      marginTop: 12,
                      fontFamily: "Rebond-Grotesque-Regular",
                      lineHeight: 20,
                    }}
                  >
                    {success}
                  </Text>
                )}
              </View>
            </View>
            <Image
              source={require("@/assets/images/Ellipse.png")}
              style={{
                bottom: 0,
              }}
            />
            <Image
              source={{
                uri: "https://res.cloudinary.com/ditdnslga/image/upload/v1734716116/mvcli5lsp2uwp7uvhcwo.png",
              }}
              style={{
                width: 146,
                height: 109,
                position: "absolute",
                bottom: 100,
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

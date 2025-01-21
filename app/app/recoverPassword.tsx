import { useState } from "react";
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
import useUserStore from "@/stores/userStore";

export default function RecoverPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fontsLoaded = useFonts();
  const { sendEmail } = useUserStore();

  const handleSendEmail = async () => {
    if (email) {
      setShowError(false);
      try {
        await sendEmail(email);
        setShowSuccess(true);
        setSuccess("Recovery email sent!");
      } catch (error) {
        console.error(error);
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
          <Image
            source={{
              uri: "https://res.cloudinary.com/ditdnslga/image/upload/v1734716116/qjdu28or1nmu7auc9ldw.png",
            }}
            style={{
              width: 132.49,
              height: 119.52,
              transform: [{ rotate: "-42.48deg" }],
              position: "absolute",
              top: 50,
              right: -52,
            }}
          />
          <Image
            source={{
              uri: "https://res.cloudinary.com/ditdnslga/image/upload/v1734716116/jlihlvzvfwruvoh5midg.png",
            }}
            style={{
              width: 155.25,
              height: 174,
              transform: [{ rotate: "43.44deg" }],
              position: "absolute",
              bottom: 20,
              left: -70,
            }}
          />
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
                  Don't stress! We will help you!
                </Text>
                <Text
                  style={{
                    fontSize: 19.2,
                    color: "#562CAF",
                    fontFamily: "Rebond-Grotesque-Regular",
                    lineHeight: 20,
                    paddingHorizontal: 40,
                    textAlign: "center",
                  }}
                >
                  We'll send reset instructions to your inbox - check your email
                  soon!
                </Text>
              </View>
              <View
                style={{
                  marginTop: 32,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <InputField
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  icon={"email-outline"}
                />

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
                    Recover password
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

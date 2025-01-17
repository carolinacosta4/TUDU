import { Dimensions, Image, ScrollView, Text, View, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useFonts from "@/hooks/useFonts";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import YourAchievements from "@/components/YourAchievements";
import AccountSettings from "@/components/AccountSettings";
import Customization from "@/components/Customization";
import AccountManagement from "@/components/AccountManagement";
import UserAccountInfo from "@/components/UserAccountInfo";
import { useUserStore } from "@/stores/userStore";
import LoadingScreen from "@/components/LoadingScreen";

export default function ProfileScreen() {
  const { height } = Dimensions.get("window");
  const fontsLoaded = useFonts();
  const { userInfo, logged, logout, loading } = useUserInfo();
  const [notifications, setNotifications] = useState(false);
  const [vibration, setVibration] = useState(false);
  const [sound, setSound] = useState(false);
  const { user, fetchUser, updateUser, updateUserProfilePicture, deleteUser } =
    useUserStore();
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [isDeactivated, setIsDeactivated] = useState(false);

  useEffect(() => {
    if (logged === false) {
      router.push("/register");
    }
  }, [logged]);

  useEffect(() => {
    if (userInfo && !loading) {
      fetchUser(userInfo.userID).then(() => setIsUserFetched(true));
    }
  }, [userInfo]);

  useEffect(() => {
    if (isUserFetched) {
      setNotifications(user.data.notifications);
      setVibration(user.data.vibration);
      setSound(user.data.sound);
      setIsDeactivated(user.data.isDeactivated);
    }
  }, [isUserFetched]);

  if (!isUserFetched || !userInfo || !userInfo.userID || !user || !fontsLoaded)
    return  <LoadingScreen />

  const handlePersonalInfo = async (newName?: string, newEmail?: string) => {
    try {
      await updateUser(
        user.data._id,
        { name: newName, email: newEmail },
        userInfo.authToken
      );
    } catch (error) {
      throw error;
    }
  };

  const handlePassword = async (newPassword: string, oldPassword: string) => {
    try {
      await updateUser(
        user.data._id,
        { password: newPassword, oldPassword: oldPassword },
        userInfo.authToken
      );
    } catch (error) {     
      throw error;
    }
  };

  const handleLogout = () => {
    router.push("/register");
    logout();
  };

  const handleDeactivate = () => {
    const updatedStatus = !isDeactivated;
    setIsDeactivated(updatedStatus);
    updateUser(
      user.data._id,
      { isDeactivated: updatedStatus },
      userInfo.authToken
    );
    router.push("/register");
    logout();
  };

  const handleDelete = () => {
    deleteUser(user.data._id, userInfo.authToken);
    router.push("/register");
    logout();
  };

  const handleVibration = () => {
    const updatedStatus = !vibration;
    setVibration(updatedStatus);
    updateUser(user.data._id, { vibration: updatedStatus }, userInfo.authToken);
  };

  const handleSound = () => {
    const updatedStatus = !sound;
    setSound(updatedStatus);
    updateUser(user.data._id, { sound: updatedStatus }, userInfo.authToken);
  };

  const handleNotifications = () => {
    const updatedStatus = !notifications;
    setNotifications(updatedStatus);
    updateUser(
      user.data._id,
      { notifications: updatedStatus },
      userInfo.authToken
    );
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need permission to access your media library!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const fileName = imageUri.split("/").pop();
      const fileType = fileName?.split(".").pop() || "";

      const formData = new FormData();
      formData.append("profilePicture", {
        uri: imageUri,
        name: fileName || "profilePicture",
        type: `image/${fileType}`,
      } as any);

      updateUserProfilePicture(user.data._id, formData, userInfo.authToken);
    }
  };

  return (
    user &&
    isUserFetched == true && (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <Image
              source={{ uri: user.data.profilePicture }}
              style={{
                width: 160,
                height: 160,
                borderRadius: 100,
                alignSelf: "center",
                position: "absolute",
                zIndex: 2,
                marginTop: height * 0.05,
              }}
            />
            <View
              style={{
                backgroundColor: "#EEEADF",
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                padding: 20,
                paddingBottom: height * 0.15,
                marginTop: height * 0.15,
                bottom: 0,
              }}
            >
              <View>
                <UserAccountInfo user={user.data} />
                <YourAchievements achievements={user.userAchievements} />
                <AccountSettings
                  handlePersonalInfo={handlePersonalInfo}
                  pickImage={pickImage}
                  handlePassword={handlePassword}
                />
                <Customization
                  handleNotifications={handleNotifications}
                  notifications={notifications}
                  handleSound={handleSound}
                  sound={sound}
                  handleVibration={handleVibration}
                  vibration={vibration}
                />
                <AccountManagement
                  handleLogout={handleLogout}
                  handleDeactivate={handleDeactivate}
                  handleDelete={handleDelete}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  );
}

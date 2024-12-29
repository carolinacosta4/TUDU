import { useState, useEffect } from "react";
import * as Font from "expo-font";

const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Rebond-Grotesque-Regular": require("@/assets/fonts/ESRebondGrotesqueTRIAL-Regular-BF66189040b697b.otf"),
          "Rebond-Grotesque-Medium": require("@/assets/fonts/ESRebondGrotesqueTRIAL-Medium-BF6618904088566.otf"),
          "Rebond-Grotesque-Bold": require("@/assets/fonts/ESRebondGrotesqueTRIAL-Bold-BF66189040400df.otf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.warn(error);
      }
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};

export default useFonts;

import { useState, useEffect } from "react";
import * as Font from "expo-font";

const useFonts = (fonts?: { [key: string]: any }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      if (fonts) {
        try {
          await Font.loadAsync(fonts);
        } catch (error) {
          console.warn(error);
        }
      }
      setFontsLoaded(true);
    };

    loadFonts();
  }, [fonts]);

  return fontsLoaded;
};

export default useFonts;

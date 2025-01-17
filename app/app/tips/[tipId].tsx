import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useTip } from '@/hooks/useTip';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useUserInfo } from '@/hooks/useUserInfo';
import { useUser } from '@/hooks/useUser';
import LoadingScreen from '@/components/LoadingScreen';

const TipDetail = () => {
  const { userInfo } = useUserInfo();
  const {user} = useUser();
  const { tipId } = useLocalSearchParams();
  const { tip, loading, removeFromFavorite, markAsFavorite, fetchTip } = useTip();
  const [isLiked, setIsLiked] = useState(false); 

  useEffect(() => {
    if (typeof tipId === "string") {
      fetchTip(tipId)
    }
  }, [tipId])

  useEffect(() => {
    const favoriteTipIds = user ? user.FavoriteTip.map(fav => fav.IDtip) : [];   
    setIsLiked(favoriteTipIds.includes(String(tipId)));
  }, [user, tipId, userInfo]);

  if (!userInfo || !tipId || !user || loading) {
    return <LoadingScreen/>
  }

  const handleHeartClick = async () => { 
    setIsLiked(prevState => !prevState);
  
    try {
      const id = String(tipId);
      if (isLiked) {
        await removeFromFavorite(id, userInfo.authToken);
      } else {
        await markAsFavorite(id, userInfo.authToken);
      }
    } catch (error) {
      console.error("Error with favorite action", error);
      setIsLiked(isLiked); 
    }
  };

  return (
    tip &&
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ImageBackground
        source={{ uri: tip.image }}
        style={styles.headerContainer}
        imageStyle={styles.imageBackground}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']} 
          style={styles.linearGradient}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>{tip.title}</Text>
              <Text style={styles.subtitle}>{new Date(tip.createdAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })} • {tip.author}</Text>
            </View>
            <View style={styles.iconContainer}>
              
            <TouchableOpacity onPress={handleHeartClick}>
              {isLiked ? (
                <Icon name="heart" size={30} color='#EEE5F5' />
              ) : (
                <Icon name="heart-outline" size={30} color='#EEE5F5' />
              )}
            </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        
      </ImageBackground>
      <View style={styles.bodyContainer}>

        <View style={styles.section}>
          <Text style={styles.sectionText}>
            {tip.info}
          </Text>
          <Text style={styles.bodyText}>
          {tip.description}
        </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6F0',
  },
  contentContainer: {
    paddingBottom: 40, 
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 2, 
  },
  imageBackground: {
    resizeMode: 'cover',
    justifyContent: 'center',
    
  },
  headerContainer: {
    width: '100%',
    height: 274,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  linearGradient: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  headerContent: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 26,
    flexDirection: 'row',
    zIndex: 2,
    position: 'absolute',
    bottom: 16,
  },
  headerTextContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 4,
    marginLeft: 16,
  },
  title: {
    alignSelf: 'stretch',
    width: 296,
    color: '#EEE5F5',
    fontSize: 23.04,
    fontFamily: 'SF Pro Display',
    fontWeight: '500',
    lineHeight: 34.56,
    flexWrap: 'wrap',
  },
  subtitle: {
    alignSelf: 'stretch',
    height: 16,
    color: '#EEE5F5',
    fontSize: 13.33,
    fontFamily: 'ES Rebond Grotesque TRIAL',
    fontWeight: '400',
    lineHeight: 16,
  },
  iconContainer: {
    width: 30,
    height: 30,
    marginRight: 16,
    position: 'relative',
  },
  icon: {
    width: 31.61,
    height: 29,
    position: 'absolute',
    backgroundColor: '#EEE5F5',
  },
  bodyContainer: {
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 26,
    marginBottom: Dimensions.get("window").width * 0.1, 
  },
  bodyText: {
    color: '#635C54',
    fontSize: 16,
    fontFamily: 'ES Rebond Grotesque TRIAL',
    fontWeight: '400',
    lineHeight: 16,
  },
  section: {
    alignSelf: 'stretch',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    alignSelf: 'stretch',
    color: '#635C54',
    fontSize: 16,
    fontFamily: 'ES Rebond Grotesque TRIAL',
    fontWeight: '400',
    lineHeight: 16,
  },
  sectionText: {
    alignSelf: 'stretch',
    paddingTop: 8,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    borderLeftWidth: 1.5,
    borderLeftColor: '#562CAF',
    color: '#635C54',
    fontSize: 13.33,
    fontFamily: 'ES Rebond Grotesque TRIAL',
    fontWeight: '400',
    lineHeight: 16,
  },
});

export default TipDetail;

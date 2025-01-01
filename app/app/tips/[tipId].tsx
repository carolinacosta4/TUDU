import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useTip } from '@/hooks/useTip';
import { formatDistanceToNow } from 'date-fns';
import { Asset } from 'expo-asset';
import SvgUri from 'react-native-svg-uri';

const TipDetail = () => {


  const { tipId } = useLocalSearchParams();
  console.log('tipId:', tipId);
  const navigation = useNavigation(); 
  const { tip, loading, error } = useTip(tipId as string);
  
  const [isLiked, setIsLiked] = useState(false); 

  console.log('tip:', tip);
  const formatRelativeTime = (date: string | Date | null) => {
    if (!date) return 'Unknown time';
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true }).replace(/^about\s/, '');
    } catch (error) {
      console.error('Invalid date:', date, error);
      return 'Invalid date';
    }
  };
    const handleHeartClick = () => {
      setIsLiked(!isLiked); 
    };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,}
);
    
  }, [navigation, tip]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!tip) {
    return <Text>No tip found</Text>;
  }

  return (
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
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <SvgUri
              width="16"
              height="16"
              source={require('@/assets/icons/back_white.svg')}
            />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>{tip.title}</Text>
              <Text style={styles.subtitle}>{formatRelativeTime(new Date(tip.createdAt))} • {tip.author}</Text>
            </View>
            <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleHeartClick}>
            <SvgUri
                width="32"
                height="32"
                source={{
                    uri: isLiked
                    ? Asset.fromModule(require('@/assets/icons/heart_after_tips.svg')).uri
                    : Asset.fromModule(require('@/assets/icons/heart_before_tips.svg')).uri,
                }}
                />
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
  },
  title: {
    alignSelf: 'stretch',
    width: 296,
    color: '#EEE5F5',
    fontSize: 23.04,
    fontFamily: 'SF Pro Display',
    fontWeight: '500',
    lineHeight: 34.56,
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
    width: 42,
    height: 0,
    position: 'relative',
  },
  icon: {
    width: 31.61,
    height: 29,
    position: 'absolute',
    backgroundColor: '#EEE5F5',
  },
  bodyContainer: {
    height: 664,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 26,
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

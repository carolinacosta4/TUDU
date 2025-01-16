import React, { PropsWithChildren } from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

interface SwipeDeleteProps {
  handleDelete: () => void;
}

const SwipeDelete: React.FC<PropsWithChildren<SwipeDeleteProps>> = ({ children, handleDelete }) => {
  let swipeableRow: Swipeable | null = null;

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <TouchableOpacity
        style={{
          backgroundColor: "#EF4444",
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          height: "100%",
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        }}
        onPress={handleDelete}
      >
        <Text
          style={{
            width: 60,
            color: "#F7F6F0",
            textAlign: "center",
            fontFamily: "Rebond-Grotesque-Medium",
            fontSize: 13.3,
          }}
        >
          Delete
        </Text>
      </TouchableOpacity>
  );

  const updateRef = (ref: Swipeable) => {
    swipeableRow = ref;
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
};

export default SwipeDelete;

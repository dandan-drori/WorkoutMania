import React, { useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { turnNightModeOn, turnNightModeOff } from '../redux/actions';
import { darkTheme } from '../style/GlobalStyle';

const Toggler = () => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const toggleAnim = useRef(new Animated.Value(-2)).current;
  const dispatch = useDispatch();

  const turnOnNightMode = () => {
    Animated.timing(toggleAnim, {
      toValue: 23,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const turnOffNightMode = () => {
    Animated.timing(toggleAnim, {
      toValue: -2,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <AnimatedTouchable
      style={{
        height: 25,
        width: 50,
        borderWidth: 2,
        borderColor: isNightModeOn ? '#44cc00' : darkTheme,
        borderRadius: 15,
        marginLeft: 15,
        marginTop: 3,
        backgroundColor: isNightModeOn ? '#44cc00' : '#ddd',
      }}
      onPress={() => {
        if (isNightModeOn === false) {
          turnOnNightMode();
          dispatch(turnNightModeOn());
        } else {
          turnOffNightMode();
          dispatch(turnNightModeOff());
        }
      }}>
      <Animated.View
        style={{
          height: 25,
          width: 25,
          borderRadius: 25,
          backgroundColor: '#eee',
          borderColor: isNightModeOn ? '#44cc00' : darkTheme,
          borderWidth: 2,
          position: 'absolute',
          top: -2,
          left: toggleAnim,
        }}
      />
    </AnimatedTouchable>
  );
};

export default Toggler;
import React, { useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { turnNightModeOn, turnNightModeOff } from '../redux/actions';

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

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        height: 25,
        width: 50,
        borderWidth: 2,
        borderColor: isNightModeOn ? '#44cc00' : '#ddd',
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
          backgroundColor: '#fff',
          borderColor: isNightModeOn ? '#44cc00' : '#ddd',
          borderWidth: 2,
          position: 'absolute',
          top: -2,
          left: toggleAnim,
        }}
      />
    </TouchableOpacity>
  );
};

export default Toggler;

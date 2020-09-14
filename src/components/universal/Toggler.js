import React, { useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

const Toggler = ({ isOn, onAction, offAction, isUsingDispatch }) => {
  const toggleAnim = useRef(new Animated.Value(-2)).current;
  const dispatch = useDispatch();

  const turnOn = () => {
    Animated.timing(toggleAnim, {
      toValue: 23,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const turnOff = () => {
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
        borderColor: isOn ? '#44cc00' : '#ddd',
        borderRadius: 15,
        marginLeft: 15,
        marginTop: 3,
        backgroundColor: isOn ? '#44cc00' : '#ddd',
      }}
      onPress={() => {
        if (isOn === false) {
          turnOn();
          isUsingDispatch ? dispatch(onAction()) : onAction();
        } else {
          turnOff();
          isUsingDispatch ? dispatch(offAction()) : offAction();
        }
      }}>
      <Animated.View
        style={{
          height: 25,
          width: 25,
          borderRadius: 25,
          backgroundColor: '#fff',
          borderColor: isOn ? '#44cc00' : '#ddd',
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

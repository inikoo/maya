import React, { useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { COLORS } from '~/Constant/Color';

const { width, height } = Dimensions.get('window');

const BottomDrawer = (props: { open: boolean, onClose: () => void, children: React.ReactNode, height?: number | null }) => {
  const pan = useRef(new Animated.Value(0)).current;

  return props.open ? (
    <Animated.View
      style={{
        ...styles.container,
        transform: [{ translateY: pan }],
        zIndex: 9,
      }}
    >
      <View style={{ ...styles.box, minHeight: props.height }}>
        {/* Close Button */}
        <TouchableOpacity
          onPress={() => {
            props.onClose();
          }}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>

        {props.children}
      </View>
    </Animated.View>
  ) : null;
};

BottomDrawer.defaultProps = {
  open: false,
  onClose: () => null,
  children: null,
  height: height * 0.7 , // Set the default height to null
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end', // Align to the bottom
  },
  box: {
    minHeight: height * 0.7,
    width,
    padding: 11,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: COLORS.black,
    borderWidth: 1,
    // Shadow properties for iOS
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});

export default BottomDrawer;

import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },

  list : {
    card: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 12,
      },
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      avatarContainer: {
        position: 'relative',
        marginRight: 12,
      },
      avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#ddd',
      },
      fallbackAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#5a67d8',
        justifyContent: 'center',
        alignItems: 'center',
      },
      fallbackText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
      },
      statusIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#34d399',
        borderWidth: 2,
        borderColor: '#ffffff',
      },
      textContainer: {
        flex: 1,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
      description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
      },

      activeCard: {
        borderWidth: 2,
        borderColor: '#007AFF',
        backgroundColor: '#E6F0FF',
      },
      activeIndicator: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -10 }],
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
      },
  }
});

export default globalStyles;

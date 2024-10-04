import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For bell icon
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const FeedHeader = ({ feedText, feedIcon, notificationCount }) => {
  const navigation = useNavigation(); // Initialize navigation

  const handleBellPress = () => {
    navigation.navigate('Profile'); // Navigate to the Profile screen
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{feedText}</Text>
      
      <View style={{ position: 'relative' }}>
        <TouchableOpacity onPress={handleBellPress}>
          <FontAwesome name={feedIcon} size={24} color="red" />
        </TouchableOpacity>
        
        {/* Tạo badge với số thông báo */}
        {notificationCount > 0 && (
          <View style={{
            position: 'absolute',
            top: -5,
            right: -5,
            backgroundColor: 'red',
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ color: 'white', fontSize: 12 }}>{notificationCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default FeedHeader;

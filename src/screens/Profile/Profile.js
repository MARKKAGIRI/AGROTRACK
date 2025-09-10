import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FAF7' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.role}>Farmer</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Icon name="email" size={22} color="#388e3c" />
            <Text style={styles.infoText}>john.doe@email.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="phone" size={22} color="#388e3c" />
            <Text style={styles.infoText}>+254 712 345678</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="map-marker" size={22} color="#388e3c" />
            <Text style={styles.infoText}>Nyeri, Kenya</Text>
          </View>
        </View>

        {/* Farm Overview */}
        <View style={styles.sectionTitleRow}>
          <Icon name="sprout" size={22} color="#388e3c" />
          <Text style={styles.sectionTitle}>Farm Overview</Text>
        </View>
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <Icon name="sprout" size={28} color="#388e3c" />
            <Text style={styles.statsLabel}>Crops</Text>
            <Text style={styles.statsValue}>120</Text>
          </View>
          <View style={styles.statsCard}>
            <Icon name="cow" size={28} color="#795548" />
            <Text style={styles.statsLabel}>Livestock</Text>
            <Text style={styles.statsValue}>15</Text>
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editBtn}>
          <Icon name="account-edit" size={22} color="#fff" />
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: '#F6FAF7',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: '#d0e8d6',
    padding: 24,
    borderRadius: 18,
    width: '100%',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#388e3c',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#388e3c',
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    width: '100%',
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#388e3c',
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#388e3c',
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '48%',
    elevation: 2,
    shadowColor: '#388e3c',
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  statsLabel: {
    fontSize: 15,
    color: '#666',
    marginTop: 6,
    marginBottom: 2,
    textAlign: 'center',
  },
  statsValue: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 2,
    textAlign: 'center',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#388e3c',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  editBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default Profile;
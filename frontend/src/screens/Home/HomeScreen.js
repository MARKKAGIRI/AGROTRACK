import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FAF7' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.username}>John Doe</Text>
          </View>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
        </View>

        {/* Greeting & Next Task Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hello, John Doe 👋</Text>
          <Text style={styles.cardText}>
            Hope you're having a productive day on the farm!
          </Text>
          <View style={styles.nextTaskRow}>
            <Icon name="calendar-check" size={22} color="#388e3c" style={{ marginRight: 8 }} />
            <Text style={styles.nextTaskText}>
              Next Task: Water Tomatoes at 4:00 PM
            </Text>
          </View>
        </View>

        {/* Farm Stats Card */}
        <View style={styles.cardYellow}>
          <Text style={styles.cardTitleYellow}>Farm Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statsCard}>
              <Icon name="sprout" size={28} color="#388e3c" />
              <Text style={styles.statsLabel}>Crops Planted</Text>
              <Text style={styles.statsValue}>120</Text>
            </View>
            <View style={styles.statsCard}>
              <Icon name="basket" size={28} color="#fbc02d" />
              <Text style={styles.statsLabel}>Harvest Ready</Text>
              <Text style={styles.statsValue}>30</Text>
            </View>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statsCard}>
              <Icon name="cow" size={28} color="#795548" />
              <Text style={styles.statsLabel}>Livestock</Text>
              <Text style={styles.statsValue}>15</Text>
            </View>
            <View style={styles.statsCard}>
              <Icon name="water" size={28} color="#039be5" />
              <Text style={styles.statsLabel}>Irrigation Level</Text>
              <Text style={styles.statsValue}>Optimal</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Label */}
        <Text style={styles.actionsTitle}>Quick Actions</Text>
        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="plus-circle" size={32} color="#388e3c" />
              <Text style={styles.actionLabel}>Add Crop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="clipboard-list" size={32} color="#388e3c" />
              <Text style={styles.actionLabel}>View Tasks</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="weather-partly-cloudy" size={32} color="#388e3c" />
              <Text style={styles.actionLabel}>Weather</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="calendar-clock" size={32} color="#388e3c" />
              <Text style={styles.actionLabel}>Schedule Task</Text>
            </TouchableOpacity>
           

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F6FAF7',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 18,
    padding: 16,
    borderRadius: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#388e3c',
    fontWeight: '500',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#388e3c',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#e8f5e9',
    padding: 18,
    borderRadius: 14,
    width: '100%',
    marginBottom: 16,
    shadowColor: '#388e3c',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#388e3c',
  },
  cardText: {
    fontSize: 15,
    marginBottom: 4,
    color: '#333',
  },
  cardYellow: {
    backgroundColor: '#fffde7',
    padding: 18,
    borderRadius: 14,
    width: '100%',
    marginBottom: 16,
    shadowColor: '#fbc02d',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitleYellow: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#fbc02d',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '48%',
    elevation: 2,
    shadowColor: '#fbc02d',
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  statsLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
    marginBottom: 2,
    textAlign: 'center',
  },
  statsValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 2,
    textAlign: 'center',
  },
  actionsGrid: {
    width: '100%',
    marginTop: 8,
    marginBottom: 24,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    width: '48%',
    elevation: 3,
    shadowColor: '#388e3c',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  actionLabel: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#388e3c',
    textAlign: 'center',
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#388e3c',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  nextTaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#d0e8d6',
    padding: 10,
    borderRadius: 8,
  },
  nextTaskText: {
    fontSize: 15,
    color: '#388e3c',
    fontWeight: '600',
  },
});

export default Home;
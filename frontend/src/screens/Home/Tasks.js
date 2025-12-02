import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_GAP = 16;
const CARD_WIDTH = (width - CARD_GAP * 3) / 2; // 16px padding left/right + 16 gap between cards

const COLORS = {
  primary: '#10B981',
  dark: '#059669',
  bg: '#FFFFFF',
  grayText: '#6B7280',
  border: '#E5E7EB',
  lightGray: '#F9FAFB',
  completed: 'rgba(0,0,0,0.35)',
};

const TASK_TYPES = {
  water: { bg: '#DBEAFE', icon: { name: 'droplet', color: '#2563EB' } },
  pest: { bg: '#FED7AA', icon: { name: 'alert-circle', color: '#EA580C' } },
  harvest: { bg: '#D1FAE5', icon: { name: 'leaf', color: '#059669' } },
  fertilizer: { bg: '#DCFCE7', icon: { name: 'seed', color: '#16A34A' } },
};

const SAMPLE_TASKS = [
  { id: 't1', title: 'Water Plants', date: 'Today', type: 'water', completed: false },
  { id: 't2', title: 'Check for Pests', date: 'Tomorrow', type: 'pest', completed: false },
  { id: 't3', title: 'Harvest Leaves', date: 'Nov 3', type: 'harvest', completed: false },
  { id: 't4', title: 'Apply Fertilizer', date: 'Nov 5', type: 'fertilizer', completed: true },
];

export default function CropTasks({ navigation }) {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);

  const toggleComplete = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const confirmDelete = (id) => {
    Alert.alert('Delete task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTask(id) },
    ]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTask = () => {
    // navigate to Add Task screen or open modal
    if (navigation && navigation.navigate) navigation.navigate('AddTask');
    else Alert.alert('Add New Task', 'Open add task flow (not implemented).');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>

        {/* Plant info card */}
        <View style={styles.plantCard} accessibilityLabel="Plant info">
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="sprout" size={24} color="#059669" />
          </View>
          <View style={styles.plantText}>
            <Text style={styles.plantName}>Lettuce Batch 1</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Harvesting</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity accessibilityLabel="Notifications" style={styles.bellBtn}>
              <Feather name="bell" size={20} color={COLORS.grayText} />
              <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
            </TouchableOpacity>
            <View style={styles.avatar}><Text style={styles.avatarText}>JD</Text></View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Section header */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>UPCOMING TASKS</Text>

          {/* Task list (cards) */}
          <View style={styles.cardGrid}>
            {tasks.map((task) => {
              const type = TASK_TYPES[task.type] || TASK_TYPES.water;
              return (
                <View
                  key={task.id}
                  style={[
                    styles.taskCard,
                    { backgroundColor: COLORS.bg, borderColor: COLORS.border, width: CARD_WIDTH },
                    task.completed && { opacity: 0.6 },
                  ]}
                  accessible
                  accessibilityLabel={`Task card ${task.title}`}
                >
                  <View style={styles.cardLeft}>
                    <View style={[styles.typeIcon, { backgroundColor: type.bg }]}>
                      {type.icon.name === 'droplet' ? (
                        <MaterialCommunityIcons name="water" size={20} color={type.icon.color} />
                      ) : (
                        <Feather name={type.icon.name} size={18} color={type.icon.color} />
                      )}
                    </View>
                  </View>

                  <View style={styles.cardMiddle}>
                    <Text style={[styles.taskTitle, task.completed && styles.taskTitleDone]}>
                      {task.title}
                    </Text>
                    <View style={styles.dateRow}>
                      <Feather name="calendar" size={14} color="#9CA3AF" />
                      <Text style={styles.dateText}>{task.date}</Text>
                    </View>
                  </View>

                  <Pressable
                    style={({ pressed }) => [
                      styles.checkboxWrap,
                      pressed && { opacity: 0.7 },
                    ]}
                    onPress={() => toggleComplete(task.id)}
                    onLongPress={() => confirmDelete(task.id)}
                    accessibilityLabel={task.completed ? 'Mark as not completed' : 'Mark as completed'}
                  >
                    {task.completed ? (
                      <View style={styles.checkboxChecked}>
                        <Feather name="check" size={16} color="#fff" />
                      </View>
                    ) : (
                      <View style={styles.checkbox} />
                    )}
                  </Pressable>
                </View>
              );
            })}
          </View>

          {/* Completed tasks sample list below grid (full width cards) */}
          <View style={{ marginTop: 8 }}>
            <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Other Tasks</Text>
            {tasks.map((t) => (
              <TouchableOpacity
                key={`list-${t.id}`}
                style={[styles.listCard, t.completed && { opacity: 0.6 }]}
                onPress={() => toggleComplete(t.id)}
                onLongPress={() => confirmDelete(t.id)}
                accessibilityLabel={`Task ${t.title}`}
              >
                <View style={[styles.listIcon, { backgroundColor: TASK_TYPES[t.type]?.bg || '#eef' }]}>
                  <Feather name={TASK_TYPES[t.type]?.icon?.name || 'clock'} size={18} color={TASK_TYPES[t.type]?.icon?.color || '#333'} />
                </View>
                <View style={styles.listContent}>
                  <Text style={[styles.taskTitleSmall, t.completed && styles.taskTitleDone]}>{t.title}</Text>
                  <Text style={styles.dateTextSmall}>{t.date}</Text>
                </View>
                <View style={styles.listAction}>
                  {t.completed ? (
                    <View style={styles.checkboxCheckedSmall}><Feather name="check" size={14} color="#fff" /></View>
                  ) : (
                    <View style={styles.checkboxSmall} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Add New Task Button */}
      <View style={styles.bottomWrap} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.addBtn}
          onPress={handleAddTask}
          accessibilityLabel="Add new task"
          activeOpacity={0.8}
        >
          <Feather name="plus" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addBtnText}>Add New Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.lightGray },
  header: { paddingHorizontal: CARD_GAP, paddingTop: 12, backgroundColor: COLORS.lightGray },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },

  plantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plantText: { flex: 1, marginLeft: 12 },
  plantName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  statusRow: { marginTop: 6, flexDirection: 'row', alignItems: 'center' },
  statusBadge: { backgroundColor: '#D1FAE5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: '#059669', fontSize: 12, fontWeight: '600' },

  headerRight: { flexDirection: 'row', alignItems: 'center' },
  bellBtn: { marginRight: 10 },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#EF4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarText: { color: COLORS.primary, fontWeight: '700' },

  container: { flex: 1 },
  section: { paddingHorizontal: CARD_GAP, paddingTop: 12 },

  sectionTitle: { fontSize: 12, fontWeight: '600', color: COLORS.grayText, letterSpacing: 0.5 },

  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 12 },

  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardLeft: { width: 44, alignItems: 'center', justifyContent: 'center' },
  typeIcon: { width: 40, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },

  cardMiddle: { flex: 1, paddingHorizontal: 8 },
  taskTitle: { fontSize: 14, fontWeight: '500', color: '#111827' },
  taskTitleDone: { textDecorationLine: 'line-through', color: COLORS.completed },

  dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  dateText: { marginLeft: 6, color: '#6B7280', fontSize: 13 },

  checkboxWrap: { padding: 6 },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* list style for full-width other tasks */
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  listIcon: { width: 44, height: 44, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  listContent: { flex: 1, marginLeft: 12 },
  taskTitleSmall: { fontSize: 14, fontWeight: '500', color: '#111827' },
  dateTextSmall: { color: '#6B7280', marginTop: 4, fontSize: 12 },
  listAction: { marginLeft: 8 },
  checkboxSmall: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
  },
  checkboxCheckedSmall: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* bottom add button */
  bottomWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 22,
    alignItems: 'center',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    height: 56,
    borderRadius: 12,
    width: width - 32,
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
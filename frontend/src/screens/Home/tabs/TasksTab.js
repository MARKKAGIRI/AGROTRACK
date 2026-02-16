import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getAllTasks, updateTask } from "../../../services/taskService"; 
import { useAuth } from "../../../context/AuthContext";

export default function TasksTab() { 
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth()
  

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]); 

  
  useEffect(() => {
    fetchTasks();
  }, []);

  // Generate the rolling 5-day calendar whenever selectedDate changes
  useEffect(() => {
    const days = [];
    for (let i = -2; i <= 2; i++) {
      const d = new Date(selectedDate);
      d.setDate(selectedDate.getDate() + i);
      days.push(d);
    }
    setCalendarDays(days);
  }, [selectedDate]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await getAllTasks(token);
      if (response.success) {
        setTasks(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch tasks for UI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle task completion
  const handleToggleTaskStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      await updateTask(taskId, { status: newStatus }, token);
    } catch (error) {
      console.log("Failed to update task status:", error);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, status: currentStatus } : task
        )
      );
    }
  };

  // --- Derived Data Calculations ---

  // 1. Calculate Progress Percentage
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // 2. Find the Upcoming Task (Nearest task in the future that isn't completed)
  const now = new Date();
  const upcomingTask = tasks
    .filter(t => new Date(t.date) >= now && t.status !== 'completed')
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  // 3. Filter tasks for the selected timeline date
  const selectedDayTasks = tasks.filter(t => {
    const taskDate = new Date(t.date);
    return (
      taskDate.getDate() === selectedDate.getDate() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getFullYear() === selectedDate.getFullYear()
    );
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  // Helper for formatting times (e.g., "11:00")
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  // Helper for Month header (e.g., "March")
  const currentMonthName = selectedDate.toLocaleString('default', { month: 'long' });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center py-20">
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <View>
      {/* Progress & Upcoming Task Row */}
      <View className="flex-row mb-6">
       
        {/* Upcoming Task Card */}
        <View className="flex-1 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm justify-between">
            <View className="flex-row justify-between items-start">
                <Text className="text-[#2E7D32] text-xs font-semibold">Upcoming task</Text>
                {upcomingTask && (
                  <View className="bg-gray-100 px-2 py-1 rounded-md">
                      <Text className="text-[10px] font-bold text-gray-600">
                        {new Date(upcomingTask.date).toLocaleDateString() === new Date().toLocaleDateString() ? 'Today' : new Date(upcomingTask.date).toLocaleDateString('en-US', { weekday: 'short' })}, {formatTime(upcomingTask.date)}
                      </Text>
                  </View>
                )}
            </View>
            <Text className="text-gray-800 font-medium text-sm mt-2" numberOfLines={2}>
                {upcomingTask ? upcomingTask.title : "No upcoming tasks! You are all caught up."}
            </Text>
        </View>
      </View>

      {/* Month Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-[#1A1C1B]">{currentMonthName}</Text>
        <Feather name="search" size={20} color="black" />
      </View>

      {/* Dynamic Calendar Strip */}
      <View className="flex-row justify-between mb-6">
        {calendarDays.map((dayObj, index) => {
          const isSelected = dayObj.getDate() === selectedDate.getDate();
          const dayName = dayObj.toLocaleDateString('en-US', { weekday: 'short' });
          const dateNumber = dayObj.getDate();

          return (
            <TouchableOpacity 
              key={index} 
              className="items-center"
              onPress={() => setSelectedDate(dayObj)} // Make the calendar clickable!
            >
                <Text className={`text-xs mb-1 ${isSelected ? 'text-[#2E7D32] font-bold' : 'text-gray-400'}`}>
                  {dayName}
                </Text>
                <View className={`h-8 w-8 rounded-full items-center justify-center ${isSelected ? 'bg-[#2E7D32]' : 'bg-transparent'}`}>
                    <Text className={`font-bold ${isSelected ? 'text-white' : 'text-[#1A1C1B]'}`}>
                      {dateNumber}
                    </Text>
                </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Dynamic Timeline Items */}
      <View className="pl-10 border-l border-dashed border-gray-200 ml-4 relative">
        {selectedDayTasks.length > 0 ? (
          selectedDayTasks.map((task, index) => (
            <TimelineItem 
              key={task.id}
              time={formatTime(task.date)} 
              title={task.title} 
              isChecked={task.status === 'completed'} 
              isActive={task.status === 'pending' && index === 0} 
              // Add the new onToggle prop here!
              onToggle={() => handleToggleTaskStatus(task.id, task.status)}
            />
          ))
        ) : (
          <Text className="text-gray-400 text-sm mt-4 ml-2 italic">No tasks assigned for this day.</Text>
        )}
      </View>

      {/* Manage Task Button */}
      <TouchableOpacity className="mt-6 bg-white border border-gray-200 py-4 rounded-2xl items-center shadow-sm">
        <Text className="font-bold text-[#1A1C1B]">Manage Task</Text>
      </TouchableOpacity>

       {/* Spacer for bottom button */}
       <View className="h-20" />
    </View>
  );
}

// TimelineItem remains unchanged except for passing dynamic props
// Add onToggle to the props
const TimelineItem = ({ time, title, isChecked, isActive, onToggle }) => (
    <View className="mb-6 relative pl-6">
        <View className={`absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full ${isActive ? 'bg-[#2E7D32]' : 'bg-gray-300'}`} />
        <Text className="absolute -left-16 top-0 text-xs text-gray-400 font-medium">{time}</Text>
        
        <View className={`p-4 rounded-xl ${isActive ? 'bg-[#E8F5E9]/50 border-l-2 border-[#2E7D32]' : 'bg-[#F9FAFB]'}`}>
            <View className="flex-row justify-between items-start">
                <Text className={`text-xs flex-1 mr-2 ${isActive ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>{title}</Text>
                
                {/* Wrap the checkmark in TouchableOpacity to make it clickable */}
                <TouchableOpacity 
                  onPress={onToggle}
                  activeOpacity={0.7}
                  className="p-1" // Gives a slightly larger tap area
                >
                  {isChecked ? (
                      <View className="bg-[#2E7D32] rounded-md p-1">
                        <Feather name="check" size={12} color="white" />
                      </View>
                  ) : (
                      <View className="border border-gray-300 rounded-md w-5 h-5 bg-white" />
                  )}
                </TouchableOpacity>

            </View>
        </View>
    </View>
);
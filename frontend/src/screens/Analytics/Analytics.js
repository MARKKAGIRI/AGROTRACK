import React, { useState } from "react";
import { 
  View, Text, ScrollView, TouchableOpacity, 
  SafeAreaView, Modal, TextInput, Alert, ActivityIndicator,
  RefreshControl // Add this import
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";

const SEASONS = ["Long Rains 2026"];
const CATEGORIES = ["Seeds", "Fertilizer", "Labor", "Transport", "Sales", "Equipment"];

export default function AnalyticsScreen() {
  const queryClient = useQueryClient();
  
  // --- 1. React Query: Fetching ---
  const { 
    data: transactions = [], 
    isLoading, 
    isRefetching,
    refetch // Add refetch function
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: api.getTransactions,
  });

  // UI State
  const [selectedSeason, setSelectedSeason] = useState("Long Rains 2026");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [newType, setNewType] = useState("Expense");
  const [newAmount, setNewAmount] = useState("");
  const [newCategory, setNewCategory] = useState("Seeds");
  const [newNote, setNewNote] = useState("");

  // ... rest of your mutations and functions ...

  const addMutation = useMutation({
    mutationFn: api.addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setModalVisible(false);
      resetForm();
      Alert.alert("Success", "Transaction added successfully");
    },
    onError: (error) => {
      Alert.alert("Error", error.message || "Could not save transaction");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }) => api.updateTransaction(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setModalVisible(false);
      resetForm();
      Alert.alert("Success", "Transaction updated successfully");
    },
    onError: (error) => {
      Alert.alert("Error", error.message || "Could not update transaction");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      Alert.alert("Success", "Transaction deleted successfully");
    },
    onError: (error) => {
      Alert.alert("Error", error.message || "Could not delete transaction");
    },
  });

  const resetForm = () => {
    setNewAmount("");
    setNewNote("");
    setNewType("Expense");
    setNewCategory("Seeds");
    setEditingTransaction(null);
  };

  // Calculations
  const seasonTransactions = transactions.filter(t => t.season === selectedSeason);
  const financials = seasonTransactions.reduce(
    (acc, item) => {
      item.type === "Revenue" ? acc.revenue += item.amount : acc.expense += item.amount;
      return acc;
    },
    { revenue: 0, expense: 0 }
  );
  const netProfit = financials.revenue - financials.expense;

  const handleOpenAddModal = () => {
    resetForm();
    setModalVisible(true);
  };

  const handleOpenEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setNewType(transaction.type);
    setNewAmount(transaction.amount.toString());
    setNewCategory(transaction.category);
    setNewNote(transaction.note || "");
    setModalVisible(true);
  };

  const handleSaveTransaction = () => {
    if (!newAmount || isNaN(parseFloat(newAmount))) {
      return Alert.alert("Error", "Please enter a valid amount");
    }

    const transactionData = {
      type: newType,
      amount: parseFloat(newAmount),
      category: newCategory,
      note: newNote || newCategory,
      season: selectedSeason,
    };

    if (editingTransaction) {
      updateMutation.mutate({
        id: editingTransaction.id,
        updates: transactionData
      });
    } else {
      addMutation.mutate({
        ...transactionData,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      });
    }
  };

  const handleDeleteTransaction = (transaction) => {
    Alert.alert(
      "Delete Transaction",
      `Are you sure you want to delete this ${transaction.type.toLowerCase()}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteMutation.mutate(transaction.id)
        }
      ]
    );
  };

  // Manual refresh handler
  const handleRefresh = async () => {
    await refetch();
  };

  const formatKES = (amount) => `KES ${amount.toLocaleString()}`;
  const isPending = addMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 pt-6 pb-4 border-b border-gray-100">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-gray-900">Financials</Text>
          <View className="flex-row items-center">
            {isRefetching && <ActivityIndicator size="small" color="#10b981" className="mr-2" />}
            {/* Manual Refresh Button */}
            <TouchableOpacity 
              onPress={handleRefresh}
              disabled={isRefetching}
              className="p-2"
            >
              <Feather 
                name="refresh-cw" 
                size={20} 
                color={isRefetching ? "#9ca3af" : "#10b981"} 
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {SEASONS.map((season) => (
            <TouchableOpacity
              key={season}
              onPress={() => setSelectedSeason(season)}
              className={`mr-2 px-4 py-2 rounded-md ${selectedSeason === season ? "bg-gray-900" : "bg-gray-100"}`}
            >
              <Text className={`text-sm font-medium ${selectedSeason === season ? "text-white" : "text-gray-600"}`}>
                {season}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
        // Pull-to-Refresh
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            colors={["#10b981"]} // Android
            tintColor="#10b981" // iOS
          />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#10b981" className="mt-10" />
        ) : (
          <>
            {/* Summary Stats */}
            <View className="mb-6">
              <View className="bg-gray-50 rounded-lg p-5 mb-3">
                <Text className="text-xs text-gray-500 mb-1">Total Revenue</Text>
                <Text className="text-2xl font-bold text-gray-900">{formatKES(financials.revenue)}</Text>
              </View>
              <View className="bg-gray-50 rounded-lg p-5 mb-3">
                <Text className="text-xs text-gray-500 mb-1">Total Expenses</Text>
                <Text className="text-2xl font-bold text-gray-900">{formatKES(financials.expense)}</Text>
              </View>
              <View className={`rounded-lg p-5 ${netProfit >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}>
                <Text className="text-xs text-white/80 mb-1">Net Profit</Text>
                <Text className="text-2xl font-bold text-white">{formatKES(netProfit)}</Text>
              </View>
            </View>

            {/* Transactions Header */}
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-base font-semibold text-gray-900">Transactions</Text>
              <TouchableOpacity onPress={handleOpenAddModal}>
                <Text className="text-sm text-emerald-600 font-medium">Add +</Text>
              </TouchableOpacity>
            </View>

            {seasonTransactions.length === 0 ? (
              <View className="items-center py-12">
                <Feather name="file-text" size={24} color="#9ca3af" />
                <Text className="text-sm font-medium text-gray-900 mt-2">No transactions yet</Text>
                <Text className="text-xs text-gray-500 mt-1">Tap "Add +" to create one</Text>
              </View>
            ) : (
              <View className="pb-6">
                {seasonTransactions.map((item) => (
                  <TouchableOpacity 
                    key={item.id}
                    onPress={() => handleOpenEditModal(item)}
                    onLongPress={() => handleDeleteTransaction(item)}
                    className="flex-row items-center justify-between py-4 border-b border-gray-50"
                    activeOpacity={0.7}
                  >
                    <View className="flex-1">
                      <View className="flex-row items-center mb-1">
                        <Text className="text-sm font-medium text-gray-900">{item.category}</Text>
                        <View className={`ml-2 px-2 py-0.5 rounded ${item.type === "Revenue" ? "bg-emerald-100" : "bg-gray-100"}`}>
                          <Text className={`text-xs font-medium ${item.type === "Revenue" ? "text-emerald-700" : "text-gray-600"}`}>
                            {item.type}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-xs text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                        {item.note && item.note !== item.category ? ` • ${item.note}` : ""}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text className={`text-sm font-semibold mr-2 ${item.type === "Revenue" ? "text-emerald-600" : "text-gray-900"}`}>
                        {item.type === "Revenue" ? "+" : "-"}{formatKES(item.amount)}
                      </Text>
                      <Feather name="chevron-right" size={16} color="#9ca3af" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Modal - Same as before */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-2xl p-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">
                {editingTransaction ? "Edit Transaction" : "New Transaction"}
              </Text>
              {editingTransaction && (
                <TouchableOpacity 
                  onPress={() => handleDeleteTransaction(editingTransaction)}
                  className="p-2"
                >
                  <Feather name="trash-2" size={20} color="#ef4444" />
                </TouchableOpacity>
              )}
            </View>
            
            {/* Type Toggle */}
            <View className="flex-row mb-4">
              <TouchableOpacity
                onPress={() => setNewType("Expense")}
                className={`flex-1 py-3 rounded-l-lg items-center ${newType === "Expense" ? "bg-gray-900" : "bg-gray-100"}`}
              >
                <Text className={`font-medium ${newType === "Expense" ? "text-white" : "text-gray-600"}`}>
                  Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setNewType("Revenue")}
                className={`flex-1 py-3 rounded-r-lg items-center ${newType === "Revenue" ? "bg-emerald-500" : "bg-gray-100"}`}
              >
                <Text className={`font-medium ${newType === "Revenue" ? "text-white" : "text-gray-600"}`}>
                  Revenue
                </Text>
              </TouchableOpacity>
            </View>

            {/* Amount Input */}
            <Text className="text-sm font-medium text-gray-700 mb-2">Amount (KES)</Text>
            <TextInput 
              placeholder="0.00" 
              keyboardType="numeric"
              value={newAmount}
              onChangeText={setNewAmount}
              className="bg-gray-100 p-4 rounded-lg mb-4 text-base"
            />

            {/* Category Picker */}
            <Text className="text-sm font-medium text-gray-700 mb-2">Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setNewCategory(cat)}
                  className={`mr-2 px-4 py-2 rounded-lg ${newCategory === cat ? "bg-gray-900" : "bg-gray-100"}`}
                >
                  <Text className={`text-sm font-medium ${newCategory === cat ? "text-white" : "text-gray-600"}`}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Note Input */}
            <Text className="text-sm font-medium text-gray-700 mb-2">Note (Optional)</Text>
            <TextInput 
              placeholder="Add details..." 
              value={newNote}
              onChangeText={setNewNote}
              className="bg-gray-100 p-4 rounded-lg mb-6 text-base"
              multiline
              numberOfLines={2}
            />

            {/* Submit Button */}
            <TouchableOpacity 
              onPress={handleSaveTransaction}
              disabled={isPending}
              className={`py-4 rounded-lg items-center ${isPending ? 'bg-gray-300' : 'bg-emerald-500'}`}
            >
              {isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold">
                  {editingTransaction ? "Update Transaction" : "Save Transaction"}
                </Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => {
                setModalVisible(false);
                resetForm();
              }} 
              className="mt-4 items-center py-2"
            >
              <Text className="text-gray-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
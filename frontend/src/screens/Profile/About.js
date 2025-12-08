import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const About = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView >
            {/* Header */}
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color="black"
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>About</Text>
            </View>

            {/* Top Card */}
            <View style={styles.topCard}>
                <View style={styles.appIcon}>
                    <Text style={styles.appIconText}>🌾</Text>
                </View>
                <Text style={styles.appName}>FarmConnect</Text>
                <Text style={styles.versionInfo}>Version 2.4.1 (Build 241)</Text>
                <Text style={styles.description}>
                    Empowering farmers with tools and insights to grow better.
                </Text>
            </View>

            {/* Information Section */}
            <Text style={styles.sectionHeader}>INFORMATION</Text>
            <View style={styles.infoItem}>
                <Ionicons name="information-circle-outline" size={24} color="#9333ea" />
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTitle}>Terms of Service</Text>
                    <Text style={styles.infoDescription}>Read our terms and conditions</Text>
                </View>
            </View>
            <View style={styles.infoItem}>
                <Ionicons name="shield-outline" size={24} color="#9333ea" />
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTitle}>Privacy Policy</Text>
                    <Text style={styles.infoDescription}>How we protect your data</Text>
                </View>
            </View>
            <View style={styles.infoItem}>
                <Ionicons name="help-circle-outline" size={24} color="#9333ea" />
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTitle}>Licenses</Text>
                    <Text style={styles.infoDescription}>Open source licenses</Text>
                </View>
            </View>

            {/* App Info Section */}
            <Text style={styles.sectionHeader}>APP INFO</Text>
            <View style={styles.appInfoCard}>
                <View style={styles.appInfoRow}>
                    <Text style={styles.appInfoLabel}>Version:</Text>
                    <Text style={styles.appInfoValue}>1.0.0</Text>
                </View>
                <View style={styles.appInfoRow}>
                    <Text style={styles.appInfoLabel}>Build Number:</Text>
                    <Text style={styles.appInfoValue}>241</Text>
                </View>
                <View style={styles.appInfoRow}>
                    <Text style={styles.appInfoLabel}>Last Updated:</Text>
                    <Text style={styles.appInfoValue}>Dec 8, 2025</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.updateButton}>Check for Updates</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Made with ❤️ for Kenyan Farmers</Text>
                <Text style={styles.footerText}>© 2024 FarmConnect. All rights reserved.</Text>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        elevation: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    topCard: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
        alignItems: 'center',
        padding: 16,
        elevation: 2,
    },
    appIcon: {
        backgroundColor: '#22c55e',
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appIconText: {
        fontSize: 32,
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
    },
    versionInfo: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
    description: {
        fontSize: 14,
        color: '#374151',
        textAlign: 'center',
        marginTop: 8,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#374151',
        marginHorizontal: 16,
        marginTop: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    infoTextContainer: {
        marginLeft: 16,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#374151',
    },
    infoDescription: {
        fontSize: 14,
        color: '#6b7280',
    },
    appInfoCard: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
        padding: 16,
        elevation: 2,
    },
    appInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    appInfoLabel: {
        fontSize: 14,
        color: '#374151',
    },
    appInfoValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#374151',
    },
    updateButton: {
        fontSize: 14,
        color: '#22c55e',
        textAlign: 'center',
        marginTop: 8,
    },
    footer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    footerText: {
        fontSize: 12,
        color: '#6b7280',
    },
});

export default About;
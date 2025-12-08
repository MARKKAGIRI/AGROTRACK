import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpSupport = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
        <View>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help & Support</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Get Help Section */}
                <Text style={styles.sectionHeader}>GET HELP</Text>
                <View style={styles.section}>
                    <HelpItem
                        icon="help-circle-outline"
                        title="FAQs"
                        description="Find answers to common questions"
                        iconColor="#2563eb"
                    />
                    <HelpItem
                        icon="chatbubble-ellipses-outline"
                        title="Chat with Support"
                        description="Get instant help from our team"
                        iconColor="#2563eb"
                    />
                    <HelpItem
                        icon="mail-outline"
                        title="Email Support"
                        description="support@farmapp.com"
                        iconColor="#2563eb"
                    />
                    <HelpItem
                        icon="call-outline"
                        title="Call Support"
                        description="+254 700 123456"
                        iconColor="#2563eb"
                    />
                </View>

                {/* Resources Section */}
                <Text style={styles.sectionHeader}>RESOURCES</Text>
                <View style={styles.section}>
                    <HelpItem
                        icon="help-circle-outline"
                        title="User Guide"
                        description="Learn how to use the app"
                        iconColor="#ea580c"
                    />
                    <HelpItem
                        icon="information-circle-outline"
                        title="Farming Tips"
                        description="Expert advice and best practices"
                        iconColor="#ea580c"
                    />
                    <HelpItem
                        icon="chatbubble-outline"
                        title="Community Forum"
                        description="Connect with other farmers"
                        iconColor="#ea580c"
                    />
                </View>
            </ScrollView>

            {/* Bottom Card */}
            <View style={styles.bottomCard}>
                <Text style={styles.bottomCardTitle}>Need More Help?</Text>
                <Text style={styles.bottomCardText}>
                    Our support team is available 24/7...
                </Text>
                <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.contactButtonText}>Contact Support Team</Text>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    );
};

const HelpItem = ({ icon, title, description, iconColor }) => (
    <View style={styles.helpItem}>
        <Ionicons name={icon} size={28} color={iconColor} />
        <View style={styles.helpText}>
            <Text style={styles.helpTitle}>{title}</Text>
            <Text style={styles.helpDescription}>{description}</Text>
        </View>
    </View>
);

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
    content: {
        padding: 16,
    },
    sectionHeader: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: 'bold',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    section: {
        marginBottom: 24,
    },
    helpItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    helpText: {
        marginLeft: 16,
    },
    helpTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    helpDescription: {
        fontSize: 14,
        color: '#6b7280',
    },
    bottomCard: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e5e7eb',
        padding: 16,
        alignItems: 'center',
    },
    bottomCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    bottomCardText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 16,
    },
    contactButton: {
        backgroundColor: '#22c55e',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HelpSupport;
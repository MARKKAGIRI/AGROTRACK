import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyScreen = ({ navigation }) => {
    const [twoFactorAuth, setTwoFactorAuth] = React.useState(false);
    const [biometricLogin, setBiometricLogin] = React.useState(false);
    const [profileVisibility, setProfileVisibility] = React.useState(true);
    const [activityStatus, setActivityStatus] = React.useState(true);

    return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Privacy & Security</Text>
                </View>

                {/* Security Section */}
                <Text style={styles.sectionHeader}>SECURITY</Text>
                <View style={styles.item}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="shield-checkmark" size={20} color="#16a34a" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>Two-Factor Authentication</Text>
                        <Text style={styles.itemDescription}>Add extra security to your account</Text>
                    </View>
                    <Switch
                        value={twoFactorAuth}
                        onValueChange={setTwoFactorAuth}
                        thumbColor={twoFactorAuth ? "#16a34a" : "#f4f3f4"}
                        trackColor={{ false: "#767577", true: "#a7f3d0" }}
                    />
                </View>
                <View style={styles.item}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="lock-closed" size={20} color="#16a34a" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>Biometric Login</Text>
                        <Text style={styles.itemDescription}>Use fingerprint or face ID</Text>
                    </View>
                    <Switch
                        value={biometricLogin}
                        onValueChange={setBiometricLogin}
                        thumbColor={biometricLogin ? "#16a34a" : "#f4f3f4"}
                        trackColor={{ false: "#767577", true: "#a7f3d0" }}
                    />
                </View>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ChangePassword')}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="lock-closed" size={20} color="#16a34a" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>Change Password</Text>
                        <Text style={styles.itemDescription}>Update your account password</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#16a34a" />
                </TouchableOpacity>

                {/* Privacy Section */}
                <Text style={styles.sectionHeader}>PRIVACY</Text>
                <View style={styles.item}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="eye" size={20} color="#16a34a" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>Profile Visibility</Text>
                        <Text style={styles.itemDescription}>Show your profile to other farmers</Text>
                    </View>
                    <Switch
                        value={profileVisibility}
                        onValueChange={setProfileVisibility}
                        thumbColor={profileVisibility ? "#16a34a" : "#f4f3f4"}
                        trackColor={{ false: "#767577", true: "#a7f3d0" }}
                    />
                </View>
                <View style={styles.item}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="notifications" size={20} color="#16a34a" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>Activity Status</Text>
                        <Text style={styles.itemDescription}>Let others see when you're online</Text>
                    </View>
                    <Switch
                        value={activityStatus}
                        onValueChange={setActivityStatus}
                        thumbColor={activityStatus ? "#16a34a" : "#f4f3f4"}
                        trackColor={{ false: "#767577", true: "#a7f3d0" }}
                    />
                </View>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DataPrivacy')}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="shield" size={20} color="#16a34a" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>Data & Privacy</Text>
                        <Text style={styles.itemDescription}>Manage your data and privacy settings</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#16a34a" />
                </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    sectionHeader: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 24,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0fdf4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    itemDescription: {
        fontSize: 12,
        color: '#6b7280',
    },
});

export default PrivacyScreen;
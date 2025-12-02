import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import CropCycleForm from '../../components/CropCycleForm';
import { styles } from './CropCycle.styles';
import { saveCropLifecycle } from '../../services/api';
import { useForm } from '../../hooks/useForm';
import { validateCropData } from '../../utils/validators';


const CropCycle = () => {
    const [cropData, setCropData] = useState({
        cropName: '',
        cropType: '',
        lifecycleEvents: [],
    });

    const { handleChange, handleSubmit, errors } = useForm(validateCropData, saveCropLifecycle);

    const onAddEvent = (event) => {
        setCropData((prevData) => ({
            ...prevData,
            lifecycleEvents: [...prevData.lifecycleEvents, event],
        }));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Add New Crop Lifecycle</Text>
            </View>
            <CropCycleForm 
                cropData={cropData}
                onChange={handleChange}
                onAddEvent={onAddEvent}
                onSubmit={handleSubmit}
                errors={errors}
            />
            <Button title="Save Crop Lifecycle" onPress={handleSubmit} />
        </ScrollView>
    );
};

export default CropCycle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    eventList: {
        marginTop: 20,
    },
    eventItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    eventText: {
        fontSize: 16,
        color: '#333333',
    },
});


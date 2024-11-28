import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground, ScrollView, TextInput } from 'react-native';
import axios from 'axios';
// import { Dropdown } from 'react-native-element-dropdown';
// import Icon from 'react-native-vector-icons/FontAwesome5';

const Croppred = ({ navigation }) => {
    const [year, setYear] = useState('');
    const [area, setArea] = useState('');
    const [place, setPlace] = useState(null);
    const [season, setSeason] = useState('');
    const [fertilizer, setFertilizer] = useState('');
    const [pesticide, setPesticide] = useState('');
    const [cropPrediction, setCropPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const items = [
        { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
        { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
        { label: 'Assam', value: 'Assam' },
        { label: 'Bihar', value: 'Bihar' },
        { label: 'Chhattisgarh', value: 'Chhattisgarh' },
        { label: 'Delhi', value: 'Delhi' },
        { label: 'Goa', value: 'Goa' },
        { label: 'Gujarat', value: 'Gujarat' },
        { label: 'Haryana', value: 'Haryana' },
        { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
        { label: 'Jammu and Kashmir', value: 'Jammu and Kashmir' },
        { label: 'Jharkhand', value: 'Jharkhand' },
        { label: 'Karnataka', value: 'Karnataka' },
        { label: 'Kerala', value: 'Kerala' },
        { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
        { label: 'Maharashtra', value: 'Maharashtra' },
        { label: 'Manipur', value: 'Manipur' },
        { label: 'Meghalaya', value: 'Meghalaya' },
        { label: 'Mizoram', value: 'Mizoram' },
        { label: 'Nagaland', value: 'Nagaland' },
        { label: 'Odisha', value: 'Odisha' },
        { label: 'Punjab', value: 'Punjab' },
        { label: 'Puducherry', value: 'Puducherry' },
        { label: 'Sikkim', value: 'Sikkim' },
        { label: 'Tamil Nadu', value: 'Tamil Nadu' },
        { label: 'Telangana', value: 'Telangana' },
        { label: 'Tripura', value: 'Tripura' },
        { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
        { label: 'Uttarakhand', value: 'Uttarakhand' },
        { label: 'West Bengal', value: 'West Bengal' }
    ];

    const items1 = [
        { label: 'Autumn', value: 'Autumn' },
        { label: 'Kharif', value: 'Kharif' },
        { label: 'Rabi', value: 'Rabi' },
        { label: 'Summer', value: 'Summer' },
        { label: 'Whole Year', value: 'Whole_Year' },
        { label: 'Winter', value: 'Winter' },
    ];

    const handlePredict = async () => {
        setLoading(true);
        setCropPrediction(null);

        try {
            // Log input values
            console.log({
                year: year,
                area: area,
                place: place,
                season: season,
                fertilizer: fertilizer,
                pesticide: pesticide,
            });

            const API_URL = 'http://192.168.105.48:5000/api/predict'; // Replace with your API URL

            const response = await axios.post(API_URL, {
                year: year,
                area: area,
                place: place,
                season: season,
                fertilizer: fertilizer,
                pesticide: pesticide,
            });

            // Log the response from the API
            console.log('Response:', response.crop_data);

            setCropPrediction(response.crop_data.prediction);
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('Error', 'Failed to get prediction from the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/aifarm1.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.headerText}>Crop Prediction</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="calendar-alt" size={20} color="#666" />
                        <TextInput
                            placeholder="Enter the Year ( Ex : 2018 )"
                            keyboardType="phone-pad"
                            value={year}
                            onChangeText={setYear}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="map-marker-alt" size={20} color="#666" />
                        <Dropdown
                            data={items}
                            labelField="label"
                            valueField="value"
                            placeholder="Select a place"
                            value={place}
                            onChange={item => setPlace(item.value)}
                            search
                            searchPlaceholder="Search..."
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            itemTextStyle={styles.itemTextStyle}
                            containerStyle={styles.dropdownContainer}
                            inputSearchStyle={styles.inputSearchStyle}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="cloud" size={16} color="#666" />
                        <Dropdown
                            data={items1}
                            labelField="label"
                            valueField="value"
                            placeholder="Select a Season"
                            value={season}
                            onChange={item => setSeason(item.value)}
                            search
                            searchPlaceholder="Search..."
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            itemTextStyle={styles.itemTextStyle}
                            containerStyle={styles.dropdownContainer}
                            inputSearchStyle={styles.inputSearchStyle}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="chart-area" size={20} color="#666" />
                        <TextInput
                            placeholder="Enter the Area ( Hectares )"
                            keyboardType="phone-pad"
                            value={area}
                            onChangeText={setArea}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="spray-can" size={20} color="#666" />
                        <TextInput
                            placeholder="Amount Of Fertilizer Used"
                            keyboardType="phone-pad"
                            value={fertilizer}
                            onChangeText={setFertilizer}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="bug" size={20} color="#666" />
                        <TextInput
                            placeholder="Amount Of Pesticide Used"
                            keyboardType="phone-pad"
                            value={pesticide}
                            onChangeText={setPesticide}
                            style={styles.textInput}
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.button} onPress={handlePredict} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? 'Predicting...' : 'Predict'}</Text>
                    </TouchableOpacity>

                    {/* Display Prediction */}
                    {cropPrediction !== null && (
                        <Text style={styles.predictionText}>
                            Predicted Crop: {cropPrediction}
                        </Text>
                    )}
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Croppred;




const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingVertical: 30,
        borderRadius: 20,
    },
    headerText: {
        color: '#000',
        fontSize: 35,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        paddingHorizontal: 20,
        marginVertical: 10,
        width: '100%',
        backgroundColor: '#A9A9A9',
        height: 55,
    },
    dropdownContainer: {
        backgroundColor: 'white',
        borderRadius: 30,
        color: 'black',
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: '78.5%',
        marginLeft: -32,
        maxHeight: 250
    },
    dropdown: {
        backgroundColor: '#A9A9A9',
        borderColor: '#ccc',
        borderRadius: 30,
        height: 55,
        paddingHorizontal: 20,
        width: '100%',
        color: 'black'
    },
    itemTextStyle: {
        color: 'black',
        fontSize: 16,
    },
    placeholderStyle: {
        color: "#003300",
        fontSize: 17,
    },
    selectedTextStyle: {
        color: '#000',
        fontSize: 16,
    },
    inputSearchStyle: {
        backgroundColor: '#fafafa',
        borderRadius: 10,
        color: 'black'
    },
    button: {
        backgroundColor: '#003300',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 55,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 22,
        color: '#f0f0f0',
        fontWeight: 'bold'
    },
    predictionText: {
        marginTop: 20,
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
});
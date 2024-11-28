import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [sentOtp, setSentOtp] = useState(null);

    const sendOtp = async () => {
        if (phoneNumber.length !== 10) {
            Alert.alert('Validation Error', 'Please enter a valid 10-digit phone number.');
            return;
        }

        try {
            const response = await fetch('http://192.168.29.249:3000/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: `+91${phoneNumber}` }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('OTP sent', 'Please check your phone for the OTP.');
                console.log('Sent OTP:', data.otp);
                setSentOtp(data.otp);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', error.message);
        }
    };

    const submitOtp = async () => {
        if (!otp) {
            Alert.alert('Validation Error', 'Please enter the OTP.');
            return;
        }

        console.log(`Submitting OTP for verification: ${otp}`);

        try {
            const response = await fetch('http://192.168.29.249:3000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp }),
            });

            const rawData = await response.text();
            console.log('Verification Raw Response:', rawData);

            const data = JSON.parse(rawData);

            if (data.success) {
                handleCreateAccount();
            } else {
                Alert.alert('Invalid OTP', data.message);
            }
        } catch (error) {
            console.log('Error:', error);
            Alert.alert('Error', error.message);
        }
    };

    const handleCreateAccount = async () => {
        if (!username || !password || !email || !phoneNumber) {
            Alert.alert('Validation Error', 'Please fill in all fields.');
            return;
        }

        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const createdUser = userCredential.user;
            setUser(createdUser);

            await createdUser.sendEmailVerification();
            Alert.alert('Check your email for the verification link.');

            setUsername('');
            setPassword('');
            setEmail('');
            setPhoneNumber('');
            setOtp('');
            setSentOtp(null);

            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', 'Failed to create account: ' + error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Text style={styles.createAccountText}>Create Account</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your mobile number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
                <Button title='Send OTP' onPress={sendOtp} />

                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your OTP"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="number-pad"
                />
                <Button title='Submit OTP' onPress={submitOtp} />

                <TouchableOpacity onPress={handleCreateAccount} style={styles.signInButtonContainer}>
                    <Text style={styles.signIn}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    createAccountText: {
        textAlign: 'center',
        fontSize: 30,
        color: 'black',
        marginBottom: 30,
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
        width: '100%',
    },
    signInButtonContainer: {
        backgroundColor: 'black',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    signIn: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
});

export default SignUpScreen;

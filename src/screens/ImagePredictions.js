// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Image,
//   StyleSheet,
// } from 'react-native';

// const ImagePredictions = () => {
//   const [imageName, setImageName] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [serverMessage, setServerMessage] = useState('');
//   const [predictedImageName, setPredictedImageName] = useState('');
//   const [groundTruthName, setGroundTruthName] = useState('');

//   const loadImage = () => {
//     if (imageName.trim() === '') {
//       alert('Please enter an image name!');
//       return;
//     }

//     setImageUrl('http://192.168.36.13:3000/assets/${imageName}');
//   };

//   const testServerConnection = async () => {
//     try {
//       const response = await fetch('http://192.168.36.13:3000/test');
//       const message = await response.text();
//       setServerMessage(message);
//     } catch (error) {
//       setServerMessage('Failed to connect to the server!');
//       console.error('Error connecting to the server:', error);
//     }
//   };

//   const predictImageName = async () => {
//     try {
//       const response = await fetch('http://192.168.36.13:3000/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ currentImageName: imageName }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch prediction');
//       }

//       const data = await response.json();
//       setPredictedImageName(data.predictedName); // Predicted name
//     } catch (error) {
//       console.error('Error predicting image name:', error);
//       setPredictedImageName('Prediction failed!');
//     }
//   };

//   const fetchGroundTruth = async () => {
//     try {
//       const response = await fetch('http://192.168.36.13:3000/groundTruth', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ currentImageName: imageName }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch ground truth');
//       }

//       const data = await response.json();
//       setGroundTruthName(data.groundTruthName); // Ground truth name
//     } catch (error) {
//       console.error('Error fetching ground truth:', error);
//       setGroundTruthName('Ground truth unavailable!');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Image Viewer</Text>

//       <Button title="Test Server" onPress={testServerConnection} />
//       {serverMessage ? <Text style={styles.serverMessage}>{serverMessage}</Text> : null}

//       <TextInput
//         style={styles.input}
//         placeholder="Enter image name (e.g., image1.jpg)"
//         value={imageName}
//         onChangeText={setImageName}
//       />

//       <Button title="Load Image" onPress={loadImage} />

//       {imageUrl ? (
//         <Image
//           source={{ uri: imageUrl }}
//           style={styles.image}
//           resizeMode="contain"
//         />
//       ) : (
//         <Text style={styles.placeholder}>No image loaded</Text>
//       )}

//       <Button title="Predict Image Name" onPress={predictImageName} />
//       <Button title="Fetch Ground Truth" onPress={fetchGroundTruth} />

//       {predictedImageName ? (
//         <Text style={styles.prediction}>Predicted Name: {predictedImageName}</Text>
//       ) : null}

//       {groundTruthName ? (
//         <Text style={styles.groundTruth}>Ground Truth Name: {groundTruthName}</Text>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f0f0f0',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   serverMessage: {
//     fontSize: 16,
//     color: 'blue',
//     marginVertical: 10,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: 300,
//     height: 300,
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   placeholder: {
//     marginTop: 20,
//     fontSize: 16,
//     color: 'gray',
//   },
//   prediction: {
//     marginTop: 20,
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'green',
//   },
//   groundTruth: {
//     marginTop: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'orange',
//   },
// });

// export default ImagePredictions;
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    StyleSheet,
} from 'react-native';

const ImagePredictions = () => {
    const [imageName, setImageName] = useState(''); // Store the image name
    const [imageUrl, setImageUrl] = useState('');   // Store the image URL
    const [serverMessage, setServerMessage] = useState(''); // Store server message
    const [predictionMessage, setPredictionMessage] = useState(''); // Store prediction message

    // Function to load the image dynamically based on input name
    const loadImage = () => {
      if (imageName.trim() === '') {
          alert('Please enter an image name!');
          return;
      }
  
      // Corrected: use backticks for template literal
      const url = `http://192.168.227.96:3000/assets/${imageName}`;
      setImageUrl(url);
  
      // Corrected: use backticks for template literal
      setPredictionMessage(`Ground image is ${imageName} and predicted image is ${imageName}`);
  };
  

    // Function to test the server connection
    const testServerConnection = async () => {
        try {
            const response = await fetch('http://192.168.227.96:3000/test');
            const message = await response.text();
            setServerMessage(message);
        } catch (error) {
            setServerMessage('Failed to connect to the server!');
            console.error('Error connecting to the server:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Image Viewer</Text>

            {/* Button to test server connection */}
            <Button title="Test Server" onPress={testServerConnection} />
            {serverMessage ? <Text style={styles.serverMessage}>{serverMessage}</Text> : null}

            {/* Text input to enter the image name */}
            <TextInput
                style={styles.input}
                placeholder="Enter image name (e.g., jute001a.jpeg)"
                value={imageName}
                onChangeText={setImageName}  // Update state on text input change
            />

            {/* Button to load the image */}
            <Button title="Load Image" onPress={loadImage} />

            {/* Show the image if URL is set */}
            {imageUrl ? (
                <Image
                    source={{ uri: imageUrl }}  // Dynamically use the image URL
                    style={styles.image}
                    resizeMode="contain"
                />
            ) : (
                <Text style={styles.placeholder}>No image loaded</Text>
            )}

            {/* Display the prediction message */}
            {predictionMessage ? (
                <Text style={styles.predictionMessage}>{predictionMessage}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    serverMessage: {
        fontSize: 16,
        color: 'blue',
        marginVertical: 10,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        color: '#262626'
    },
    image: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    placeholder: {
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
    predictionMessage: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default ImagePredictions;
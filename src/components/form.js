import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection } from "firebase/firestore";
import { firestore, firebase } from "../../firebaseConfig";

export default function TicketSubmissionForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImageAndGetUrl = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(`Pictures/${Date.now()}`);
    const snapshot = ref.put(blob);

    return new Promise((resolve, reject) => {
      snapshot.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          setUploading(true);
        },
        (error) => {
          setUploading(false);
          console.log(error);
          reject(error);
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then((url) => {
            setUploading(false);
            console.log("Download URL: ", url);
            setImage(url);
            URL.revokeObjectURL(blob);
            resolve(url);
          });
        }
      );
    });
  };

  const submitTicket = async () => {
    try {
      if (image) {
        await uploadImageAndGetUrl();
      }

      const ticketRef = collection(firestore, "tickets");
      const docRef = await addDoc(ticketRef, {
        name,
        email,
        description,
        status: "pending",
        imageUrl: image || null,
      });

      console.log("Ticket submitted:", docRef.id);
      setTicketSubmitted(true);
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  if (ticketSubmitted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Thank You!</Text>
        <Text>Your ticket was submitted successfully.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Submission Form</Text>
      <Text>Fill out the form below to submit a ticket.</Text>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.form}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.form}>
          <Text>Description:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={styles.imgContainer}>
          {image && (
            <Image source={{ uri: image }} style={{ width: 80, height: 120 }} />
          )}
          <Pressable style={styles.imgButton} onPress={pickImage}>
            <Text>Upload Image</Text>
          </Pressable>
        </View>
        <Pressable style={styles.button} onPress={submitTicket}>
          <Text style={styles.buttonText}>Submit Ticket</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  formContainer: {
    marginTop: "1rem",
    backgroundColor: "#d3d3d3",
    padding: "2rem",
  },
  input: {
    padding: "0.5rem",
    borderRadius: 5,
    marginBottom: "1rem",
    marginTop: "0.5rem",
    backgroundColor: "#fff",
  },
  imgContainer: {
    paddingBottom: "1rem",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  imgButton: {
    backgroundColor: "#D7DCFB",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: 5,
    alignItems: "center",
    marginTop: "0.5rem",
  },
  button: {
    backgroundColor: "#00030A",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});

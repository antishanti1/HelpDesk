import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection } from "firebase/firestore";
import { firestore, auth } from "../../firebaseConfig";

export default function TicketSubmissionForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const submitTicket = async () => {
    try {
      const ticketRef = collection(firestore, "tickets");
      const docRef = await addDoc(ticketRef, {
        name,
        email,
        image,
        description,
        status: "pending",
      });
      console.log("Ticket submitted:", docRef.id);
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

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

          <View style={styles.form}>
            <Text>Image URL:</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
        </View>

        <Button title="Submit Ticket" onPress={submitTicket} />
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
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginBottom: "1rem",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 15 : 10,
  },
});

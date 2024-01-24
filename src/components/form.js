import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection } from "firebase/firestore";
import { firestore, firebase } from "../../firebaseConfig";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
      quality: 0.2,
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
        status: "Pending",
        imageUrl: image || null,
      });

      console.log("Ticket submitted:", docRef.id);
      setTicketSubmitted(true);
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setImage(null);
    setDescription("");
    setTicketSubmitted(false);
  };

  if (ticketSubmitted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Thank You!</Text>
        <Text>Your ticket was submitted successfully.</Text>
        <Pressable
          style={styles.thankButton}
          onPress={() => {
            setTicketSubmitted(false);
            resetForm();
          }}
        >
          <Text style={styles.buttonText}>Submit Another Ticket</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Fill out the form below to submit a ticket:
      </Text>
      <View style={styles.formContainer}>
        <View style={styles.formName}>
          <Text style={styles.formText}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.formName}>
          <Text style={styles.formText}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.formDesc}>
          <Text style={styles.formText}>Issue:</Text>
          <TextInput
            style={styles.descInput}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={styles.imgContainer}>
          {image && (
            <Image source={{ uri: image }} style={{ width: 80, height: 120 }} />
          )}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.imgButton} onPress={pickImage}>
              <Text style={styles.imgText}>UPLOAD IMAGE</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={submitTicket}>
              <Text style={styles.buttonText}>SUBMIT TICKET</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: windowHeight * 0.04,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: windowHeight * 0.03,
    marginBottom: windowHeight * 0.02,
    textAlign: "center",
    paddingHorizontal: windowWidth * 0.05,
  },
  formContainer: {
    width: "80%",
    paddingTop: windowHeight * 0.02,
    gap: windowHeight * 0.02,
  },
  formText: {
    fontWeight: "semiBold",
    fontSize: 15,
  },
  formName: {
    backgroundColor: "#E7E7E7",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
    flexDirection: "row",
    gap: "7%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  formDesc: {
    backgroundColor: "#E7E7E7",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "row",
    gap: "5%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: 210,
    borderRadius: 10,
    backgroundColor: "#fff",
    height: windowHeight * 0.04,
  },
  descInput: {
    width: "77%",
    borderRadius: 12,
    backgroundColor: "#fff",
    height: windowHeight * 0.1,
  },
  imgContainer: {
    paddingBottom: "1rem",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    gap: windowHeight * 0.02,
    marginTop: windowHeight * 0.02,
  },
  imgButton: {
    backgroundColor: "#5B8577",
    padding: windowHeight * 0.017,
    width: "100%",
    borderRadius: "50%",
    alignItems: "center",
  },
  imgText: {
    color: "#000",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#00030A",
    padding: windowHeight * 0.017,
    width: "100%",
    borderRadius: "50%",
    alignItems: "center",
  },
  thankButton: {
    marginTop: windowHeight * 0.02,
    backgroundColor: "#00030A",
    padding: windowHeight * 0.01,
    width: "50%",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../../firebaseConfig";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TicketDetailsScreen = ({ route }) => {
  const { ticket } = route.params;
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(ticket.status);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const navigation = useNavigation();

  const handleUpdateStatus = async () => {
    try {
      setUpdatingStatus(true);

      if (ticket) {
        const ticketDocRef = doc(firestore, "tickets", ticket.id);
        await updateDoc(ticketDocRef, { status: "Resolved" });
        setResponse("");
        setStatus("Resolved");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleRespond = () => {
    console.log("Response:", response);
  };

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Ticket Details</Text>
        <Text>Ticket ID: {ticket.id}</Text>
        <Text>Email: {ticket.email}</Text>
        <Text>Description: {ticket.description}</Text>
        <Text>Name: {ticket.name}</Text>
        <Text>Status: {ticket.status}</Text>
        {ticket.imageUrl && (
          <Image
            source={{ uri: ticket.imageUrl }}
            style={styles.detailsImage}
          />
        )}
        <TextInput
          style={styles.responseInput}
          placeholder="Type your response..."
          value={response}
          onChangeText={(text) => setResponse(text)}
        />
        <Pressable style={styles.button} onPress={handleUpdateStatus}>
          <Text style={styles.buttonText}>Mark as resolved</Text>
        </Pressable>
        {updatingStatus && <ActivityIndicator size="small" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  detailsCard: {
    backgroundColor: "#d3d3d3",
    borderColor: "#d5d5d5",
    borderWidth: 1,
    borderRadius: 5,
    padding: "5%",
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "auto",
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsImage: {
    width: "100%",
    height: "50%",
    marginVertical: windowHeight * 0.02,
  },
  responseInput: {
    padding: "2%",
    width: "80%",
    borderRadius: 5,
    marginTop: "0.5rem",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#00030A",
    padding: windowHeight * 0.01,
    width: "50%",
    borderRadius: 5,
    alignItems: "center",
    marginTop: "5%",
  },
  buttonText: {
    color: "#fff",
  },
});

export default TicketDetailsScreen;

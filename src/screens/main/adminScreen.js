import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import Header from "../../components/header";
import { StyleSheet, Image, View, Text, Pressable } from "react-native";

export default function AdminScreen() {
  const [tickets, setTickets] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketRef = collection(firestore, "tickets");
        const querySnapshot = await getDocs(ticketRef);
        const ticketList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTickets(ticketList);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleViewDetails = (ticket) => {
    navigation.navigate("TicketDetails", { ticket });
  };

  return (
    <View>
      <Header />
      <Text style={styles.detailsTitle}>Tickets</Text>
      <View style={styles.ticketContainer}>
        {tickets.map((ticket) => (
          <View style={styles.ticket} key={ticket.id}>
            <Text style={styles.name}>{ticket.name}</Text>
            <Text style={styles.status}>{ticket.status}</Text>
            <Pressable
              style={styles.button}
              onPress={() => handleViewDetails(ticket)}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ticketContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: "100%",
  },
  ticket: {
    backgroundColor: "#d3d3d3",
    borderColor: "#d5d5d5",
    borderWidth: 1,
    borderRadius: 5,
    padding: 16,
    marginBottom: 10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    backgroundColor: "#D7DCFB",
    padding: "0.5rem",
    marginBottom: "1rem",
    marginTop: "1rem",
    borderRadius: 5,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#00030A",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "20%",
  },
  buttonText: {
    color: "#fff",
  },
});

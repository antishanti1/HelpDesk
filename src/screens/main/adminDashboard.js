import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import Header from "../../components/header";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AdminDashboard() {
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
    justifyContent: "center",
    alignItems: "center",
  },
  ticket: {
    backgroundColor: "#d3d3d3",
    borderColor: "#d5d5d5",
    borderWidth: 1,
    borderRadius: 5,
    padding: "5%",
    marginBottom: "5%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: windowHeight * 0.02,
    textAlign: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: "5%",
  },
  status: {
    backgroundColor: "#D7DCFB",
    padding: windowHeight * 0.01,
    width: "50%",
    borderRadius: 5,
    alignItems: "center",
    textAlign: "center",
    marginBottom: windowHeight * 0.02,
  },
  button: {
    backgroundColor: "#00030A",
    padding: windowHeight * 0.01,
    width: "50%",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});

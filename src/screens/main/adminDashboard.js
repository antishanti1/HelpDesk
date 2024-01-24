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
    <View style={styles.container}>
      <Text style={styles.title}>Tickets</Text>
      <View style={styles.ticketContainer}>
        <View style={styles.ticket}>
          <Text style={styles.name}>Alex Johnson</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.resStatus}>
              <Text style={styles.resText}>Resolved</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => handleViewDetails(ticket)}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.ticketContainer}>
        {tickets.map((ticket) => (
          <View style={styles.ticket} key={ticket.id}>
            <Text style={styles.name}>{ticket.name}</Text>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.status}>
                <Text style={styles.statName}> {ticket.status}</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => handleViewDetails(ticket)}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    height: "100%",
  },
  ticketContainer: {
    paddingTop: windowHeight * 0.02,
    gap: windowHeight * 0.02,
    width: "80%",
  },
  ticket: {
    backgroundColor: "#e7e7e7",
    borderRadius: 20,
    padding: "5%",
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: windowHeight * 0.03,
    marginBottom: windowHeight * 0.01,
    textAlign: "center",
    paddingHorizontal: windowWidth * 0.05,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: "5%",
  },
  status: {
    backgroundColor: "#C84954",
    padding: windowHeight * 0.01,
    width: "80%",
    borderRadius: 15,
    alignItems: "center",
  },
  resStatus: {
    backgroundColor: "#5B8577",
    padding: windowHeight * 0.01,
    width: "80%",
    borderRadius: 15,
    alignItems: "center",
  },
  resText: {
    color: "#000",
    fontWeight: "bold",
  },
  statName: {
    color: "#000",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: "10%",
    width: "100%",
    marginTop: "5%",
  },
  button: {
    backgroundColor: "#00030A",
    padding: windowHeight * 0.01,
    width: "80%",
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

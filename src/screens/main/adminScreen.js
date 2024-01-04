import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import Header from "../../components/header";
import { StyleSheet } from "react-native";

export default function AdminScreen() {
  const [tickets, setTickets] = useState([]);

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

  return (
    <div style={styles.page}>
      <Header />
      <ul style={styles.ticketContainer}>
        {tickets.map((ticket) => (
          <li style={styles.ticket} key={ticket.id}>
            <p style={styles.name}>
              Ticket ID: {ticket.id}
              <br />
              Name: {ticket.name}
              <br />
              Email: {ticket.email}
              <br />
              Description: {ticket.description}
              <br />
              Status: {ticket.status}
              <br />
              <button
                style={styles.button}
                onClick={() => handleRespond(ticket)}
              >
                Respond
              </button>
              <button
                style={styles.button}
                onClick={() => handleUpdateStatus(ticket, "in progress")}
              >
                Update Status to In Progress
              </button>
              <button
                style={styles.button}
                onClick={() => handleUpdateStatus(ticket, "resolved")}
              >
                Update Status to Resolved
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  ticketContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  ticket: {
    backgroundColor: "#d3d3d3",
    borderColor: "#d5d5d5",
    borderWidth: 1,
    borderRadius: 5,
    padding: "1rem",
    margin: "1rem",
  },
  name: {
    fontSize: 18,
    fontWeight: "semibold",
    padding: "1rem",
  },
  button: {
    backgroundColor: "#d3d3d3",
    borderColor: "#d5d5d5",
    borderWidth: 1,
    borderRadius: 5,
    padding: "0.5rem",
    margin: "0.5rem",
  },
});

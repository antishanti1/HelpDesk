import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";

const TicketDetails = ({ route }) => {
  const { ticket } = route.params;
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(ticket.status);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleUpdateStatus = () => {
    // Simulate an API call to update the ticket status
    setUpdatingStatus(true);
    setTimeout(() => {
      // Update the status in the backend
      setStatus("in progress");
      setUpdatingStatus(false);
    }, 2000);
  };

  const handleRespond = () => {
    // Simulate an API call to send a response
    console.log("Response:", response);
  };

  return (
    <View>
      <Text>Title: {ticket.title}</Text>
      <Text>Status: {status}</Text>
      <TextInput
        placeholder="Type your response..."
        value={response}
        onChangeText={(text) => setResponse(text)}
      />
      <Button title="Respond" onPress={handleRespond} />
      <Button title="Update Status" onPress={handleUpdateStatus} />
      {updatingStatus && <ActivityIndicator size="small" />}
    </View>
  );
};

export default TicketDetails;

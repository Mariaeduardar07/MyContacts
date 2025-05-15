
// app/settings.js
import React from "react";
import { View, Alert } from "react-native";
import { Text, List, Button } from "react-native-paper";

export default function SettingsScreen() {
  function handleReset() {
    Alert.alert("Confirmar", "Deseja apagar todos os contatos?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: () => {
          // Aqui você pode limpar contatos salvos em armazenamento, contexto, etc.
          console.log("Contatos apagados (simulação).");
        },
      },
    ]);
  }

  return (
    <View style={{ padding: 16 }}>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>
        ⚙️ Configurações
      </Text>

      <List.Item title="Desenvolvedor" description="Maria Eduarda" left={() => <List.Icon icon="account" />} />

      <Button mode="contained" buttonColor="#c22121" onPress={handleReset} style={{ marginTop: 24 }}>
        Apagar todos os contatos
      </Button>
    </View>
  );
}

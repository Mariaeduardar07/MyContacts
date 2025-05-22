import React, { useState } from "react";
import { FAB } from "react-native-paper";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-paper";

// Componente principal da tela de contatos
export default function HomeScreen() {
  // Lista de contatos (cada contato é um objeto)
  const [contacts, setContacts] = useState([]);
  // Controla se o modal está visível
  const [modalVisible, setModalVisible] = useState(false);
  // Estado para o novo contato ou contato em edição
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    category: "trabalho",
  });
  // Índice do contato em edição (null se for novo)
  const [editIndex, setEditIndex] = useState(null);

  // Função para adicionar ou editar contato
  function addOrEditContact() {
    if (!newContact.name.trim() || !newContact.phone.trim()) return;

    if (editIndex === null) {
      // Adiciona novo contato
      setContacts([...contacts, newContact]);
    } else {
      // Edita contato existente
      const updated = [...contacts];
      updated[editIndex] = newContact;
      setContacts(updated);
      setEditIndex(null);
    }
    // Limpa campos e fecha modal
    setNewContact({ name: "", phone: "", category: "trabalho" });
    setModalVisible(false);
  }

  // Função para confirmar exclusão de contato
  function confirmDelete(index) {
    Alert.alert("Excluir Contato?", `Remover "${contacts[index]?.name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          const updatedContacts = contacts.filter((_, i) => i !== index);
          setContacts(updatedContacts);
        },
      },
    ]);
  }
  // Função para abrir o modal em modo de edição
  function openEditModal(index) {
    setNewContact(contacts[index]);
    setEditIndex(index);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      {/* Lista de contatos */}
      <FlatList
        data={contacts}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => (
          <View style={styles.contactItemContainer}>
            <Avatar.Text
              label={item.name ? item.name.charAt(0).toUpperCase() : "?"}
              size={40}
              style={{ marginRight: 12, backgroundColor: "#87c4bc" }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.contactItem}>{item.name}</Text>
              <Text style={{ color: "#555" }}>{item.phone}</Text>
              <Text style={{ color: "#888" }}>{item.category}</Text>
            </View>
            <View style={styles.contactButtons}>
              {/* Botões para editar e excluir */}
              <Pressable
                onPress={() => openEditModal(index)}
                style={[styles.contactButton, styles.editButton]}
              >
                <Text style={styles.buttonText}>✏️</Text>
              </Pressable>
              <Pressable
                onPress={() => confirmDelete(index)}
                style={[styles.contactButton, styles.deleteButton]}
              >
                <Text style={styles.buttonText}>🗑️</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum contato ainda!</Text>
        }
      />

      {/* Modal para adicionar ou editar contato */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.addTitle}>
              {editIndex === null
                ? "Digite os dados do novo contato:"
                : "Edite o contato:"}
            </Text>
            <TextInput
              value={newContact.name}
              onChangeText={(name) => setNewContact({ ...newContact, name })}
              placeholder="Nome"
              style={styles.input}
            />
            <TextInput
              value={newContact.phone}
              onChangeText={(phone) => setNewContact({ ...newContact, phone })}
              placeholder="Telefone"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <Text style={styles.addTitle}>Categoria:</Text>
            {/* Simples seleção de categoria */}
            <View style={styles.buttonCategoryContainer}>
              {["trabalho", "pessoal", "familia"].map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() =>
                    setNewContact({ ...newContact, category: cat })
                  }
                  style={[
                    styles.categoryButton,
                    newContact.category === cat &&
                      styles.categoryButtonSelected,
                  ]}
                >
                  <Text
                    style={{
                      color: newContact.category === cat ? "#fff" : "#333",
                    }}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable onPress={addOrEditContact} style={{ marginBottom: 8 }}>
              <Text style={styles.addContact}>
                {editIndex === null ? "Adicionar" : "Salvar alterações"}
              </Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonCancel}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <FAB
        icon="plus"
        color="#fff"
        onPress={() => {
          setNewContact({ name: "", phone: "", category: "trabalho" });
          setEditIndex(null);
          setModalVisible(true);
        }}
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          backgroundColor: "#87c4bc",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    marginBottom: 16,
    alignSelf: "center",
    backgroundColor: "#87c4bc",
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  contactItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 6,
  },
  contactItem: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactButtons: {
    flexDirection: "row",
  },
  contactButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 4,
  },
  editButton: {
    backgroundColor: "#a9ccc7",
  },
  deleteButton: {
    backgroundColor: "#04574c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    color: "#666",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
    backgroundColor: "#d4d4d4",
  },
  categoryButtonSelected: {
    backgroundColor: "#5c8a83",
  },
  addTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonCategoryContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  addContact: {
    backgroundColor: "#4a756f",
    color: "#fff",
    textAlign: "center",
    borderRadius: 6,
    padding: 5,
  },
  buttonCancel: {
    backgroundColor: "#c3d6d3",
    borderRadius: 6,
    padding: 5,
    color: "#000",
    textAlign: "center",
  },
});

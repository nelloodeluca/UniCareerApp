import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import EsameCard from "../../components/EsameCard";

const esami = [
  {
    id: "1",
    nome: "Matematica",
    cfu: 6,
    data: "2024-06-15",
    categoria: "colorato",
  },
  { id: "2", nome: "Fisica", cfu: 8, data: "2024-07-20", categoria: "vuoto" },
  // Aggiungi altri esami qui
];

function Libretto_EsamiNonDati({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center p-4 w-full">
      <FlatList
        data={esami}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => 
              navigation.navigate("EsameDettagli", { esame: item })
            }
          >
            <EsameCard item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Libretto_EsamiNonDati;
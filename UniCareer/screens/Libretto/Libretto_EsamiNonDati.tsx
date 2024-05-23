import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import EsameCard from "../../components/EsameCard";

interface Esame {
  id: string;
  nome: string;
  cfu: number;
  data: string;
  categoria: string;
}

const esami: Esame[] = [
  {
    id: "1",
    nome: "Reti di Calcolatori",
    cfu: 9,
    data: "2024-06-15",
    categoria: "colorato",
  },
  { id: "2", nome: "Fisica", cfu: 8, data: "2024-07-20", categoria: "vuoto" },
  {
    id: "3",
    nome: "Analisi 1",
    cfu: 8,
    data: "2024-07-20",
    categoria: "vuoto",
  },
  // Aggiungi altri esami qui
];

function Libretto_EsamiNonDati() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View className="flex-1 items-center justify-center p-4">
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

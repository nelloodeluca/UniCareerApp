import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import ExamsContext from '../../EsamiContext';
import CategoriaCard from '../../components/aggiunta/CategoriaCard';
import ModificaCategoriaModal from '../../components/aggiunta/ModificaCategoriaModal';
import { Categoria } from '../../types';
import { IconButton, Paragraph, Snackbar } from 'react-native-paper';
import { addColor, getRandomColor, removeColor } from '../../utils/getColor';

function CategoriaAggiunta() {
  const context = useContext(ExamsContext);
  if (!context) {
    return <Text>Il contesto non è disponibile</Text>;
  }

  const { categorie, aggiungiCategoria, aggiornaCategoria, eliminaCategoria } =
    context;
  const [selectedCategory, setSelectedCategory] = useState<Categoria | null>(
    null
  );
  const [newCategoriaNome, setNewCategoria] = useState('');
  const [loading, setLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 50); // Simula un piccolo ritardo per il caricamento
  }, [categorie]);

  const handleModifica = (id: string) => {
    const categoria = categorie.find((cat) => cat.id === id);
    setSelectedCategory(categoria || null);
  };

  const handleElimina = (id: string) => {
    const categoria = categorie.find((cat) => cat.id === id);
    if (categoria) {
      setLoading(true);
      eliminaCategoria(id, categoria.colore);
    }
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const handleSaveCategory = (updatedCategoria: Categoria) => {
    if (selectedCategory !== null) {
      if (
        selectedCategory.nome !== updatedCategoria.nome ||
        selectedCategory.colore !== updatedCategoria.colore
      ) {
        setLoading(true);
        aggiornaCategoria(selectedCategory,updatedCategoria);
      }
    }
    setSelectedCategory(null);
  };

  const handleAggiungiCategoria = () => {
    //Numero predefinito massimo di categorie è 10.
    if (categorie.length < 10) {
      if (newCategoriaNome.trim() !== '') {
        const nuovaCategoria: Categoria = {
          id: '',
          nome: newCategoriaNome,
          colore: getRandomColor(),
        };
        setLoading(true);
        aggiungiCategoria(nuovaCategoria);
        setNewCategoria('');
      }
    } else {
      setSnackbarVisible(true);
    }
  };

  /*
  if(loading){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 16}}>
        <ActivityIndicator size="large" color="#6854a4" />
      </View>
    );
  }
   */

  return (
    <>
      <ScrollView>
        <Container>
          <InlineForm>
            <Input
              value={newCategoriaNome}
              onChangeText={(text) => {
                if (text.length <= 50) {
                  setNewCategoria(text);
                }
              }}
              placeholder="Aggiungi una Nuova Categoria..."
              maxLength={50}
            />
            <AddButton onPress={handleAggiungiCategoria}>
              <IconButton icon="plus" iconColor="#fff" size={24} />
            </AddButton>
          </InlineForm>

          {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
              <ActivityIndicator size="large" color="#6854a4" />
            </View>
          ) : (
            <>
              {categorie.length > 0 ? (
                categorie.map((categoria: Categoria) => (
                  <CategoriaCard
                    key={categoria.id}
                    categoria={categoria}
                    onModify={handleModifica}
                    onDelete={handleElimina}
                  />
                ))
              ) : (
                <>
                  <Label>Ehm, non ci sono categorie...</Label>
                  <Label>Creane una da qui in alto!</Label>
                </>
              )}
              {selectedCategory && (
                <ModificaCategoriaModal
                  visible={!!selectedCategory}
                  category={selectedCategory}
                  onClose={handleCloseModal}
                  onSave={handleSaveCategory}
                />
              )}
            </>
          )}
      </Container>
    </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ position: 'absolute', bottom: 0, width: '90%', alignSelf: 'center'}}
      >
        <Label style={{ color: '#fafafa' }}>
          Numero massimo di categorie raggiunto!
        </Label>
      </Snackbar>
    </>
  );
}

const Container = styled.View`
    flex: 1;
    padding: 16px;
    align-items: center;
`;

const Input = styled.TextInput`
    height: 40px;
    border: 1px solid #cccccc70;
    padding: 0 10px;
    border-radius: 5px;
    background-color: #fff;
    margin-right: 8px;
    flex: 3;
`;

const InlineForm = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 20px;
`;

const AddButton = styled.TouchableOpacity`
    background-color: #6854a4;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
`;

const Label = styled(Paragraph)`
    font-weight: 400;
    margin-top: 10px;
    font-size: 16px;
`;

export default CategoriaAggiunta;

import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import ExamsContext from '../../EsamiContext';
import CategoriaCard from '../../components/aggiunta/CategoriaCard';
import ModificaCategoriaModal from '../../components/aggiunta/ModificaCategoriaModal';
import { Categoria } from '../../types';
import { IconButton } from 'react-native-paper';
import { getRandomColor } from '../../utils/getColor';

function CategoriaAggiunta() {
  const context = useContext(ExamsContext);
  if (!context) {
    return <Text>Il contesto non è disponibile</Text>;
  }

  const { categorie, addCategory, updateCategory } = context;
  const [selectedCategory, setSelectedCategory] = useState<Categoria | null>(
    null
  );
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleModifica = (id: string) => {
    const categoria = categorie.find((cat) => cat.id === id);
    setSelectedCategory(categoria || null);
  };

  const handleElimina = (id: string) => {
    console.log(`Elimina categoria con id: ${id}`);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const handleSaveCategory = (updatedCategory: Categoria) => {
    updateCategory(updatedCategory);
    setSelectedCategory(null);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== '') {
      const newCategory: Categoria = {
        id: Math.random().toString(36).substring(7), // Generate a random id
        nome: newCategoryName,
        colore: getRandomColor(),
      };
      addCategory(newCategory);
      setNewCategoryName('');
    }
  };

  return (
    <Container>
      <InlineForm>
        <Input
          value={newCategoryName}
          onChangeText={setNewCategoryName}
          placeholder="Aggiungi una Nuova Categoria..."
        />
        <IconButton
          icon="plus"
          size={40}
          onPress={handleAddCategory}
          style={{ flex: 1 }}
        />
      </InlineForm>
      {categorie.map((categoria: Categoria) => (
        <CategoriaCard
          key={categoria.id}
          categoria={categoria}
          onModify={handleModifica}
          onDelete={handleElimina}
        />
      ))}
      {selectedCategory && (
        <ModificaCategoriaModal
          visible={!!selectedCategory}
          category={selectedCategory}
          onClose={handleCloseModal}
          onSave={handleSaveCategory}
        />
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const Label = styled(Text)`
  font-size: 18px;
  margin: 4px 0;
  color: #333;
`;

const Input = styled.TextInput`
  height: 40px;
  border: 1px solid #cccccc70;
  padding: 0 10px;
  border-radius: 5px;
  background-color: #fff;
  flex: 3;
`;

const InlineForm = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export default CategoriaAggiunta;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function App() {
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoOriginal, setPrecoOriginal] = useState('');
  const [percentual, setPercentual] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const calcularDesconto = () => {
    Keyboard.dismiss();
    setErro('');
    setResultado(null);

    const preco = parseFloat(precoOriginal.replace(',', '.'));
    const desc = parseFloat(percentual.replace(',', '.'));

    if (isNaN(preco) || preco < 0) {
      setErro('Informe um preço original válido (não negativo).');
      return;
    }

    if (isNaN(desc) || desc < 0 || desc > 100) {
      setErro('Informe um percentual de desconto entre 0% e 100%.');
      return;
    }

    const economia = preco * (desc / 100);
    const precoFinal = preco - economia;

    setResultado({
      produto: nomeProduto || 'Produto',
      economia: economia.toFixed(2),
      precoFinal: precoFinal.toFixed(2),
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Calculadora de Desconto</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          value={nomeProduto}
          onChangeText={setNomeProduto}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço original (R$)"
          keyboardType="numeric"
          value={precoOriginal}
          onChangeText={setPrecoOriginal}
        />
        <TextInput
          style={styles.input}
          placeholder="Desconto (%)"
          keyboardType="numeric"
          value={percentual}
          onChangeText={setPercentual}
        />

        <Button title="Aplicar desconto" onPress={calcularDesconto} />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        {resultado && (
          <View style={styles.resultadoBox}>
            <Text style={styles.produtoNome}>{resultado.produto}</Text>
            <Text style={styles.resultadoTexto}>Economia: R$ {resultado.economia}</Text>
            <Text style={styles.precoFinalTexto}>Preço Final: R$ {resultado.precoFinal}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  erro: { marginTop: 15, fontSize: 14, color: 'red', textAlign: 'center' },
  resultadoBox: { marginTop: 20, padding: 15, backgroundColor: '#f0f4f8', borderRadius: 8, alignItems: 'center' },
  produtoNome: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  resultadoTexto: { fontSize: 16, color: '#e65100', marginVertical: 2 },
  precoFinalTexto: { fontSize: 18, color: '#2e7d32', fontWeight: 'bold', marginTop: 5 },
});
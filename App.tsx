import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import styled from "styled-components/native";

const Container = styled.View`
	flex: 1;
	background-color: #fff;
	align-items: center;
	justify-content: center;
	padding: 20px;
`;

const Title = styled.Text`
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
`;

const Input = styled(TextInputMask)`
	border-width: 1px;
	border-color: #ccc;
	border-radius: 5px;
	padding: 10px;
	width: 100%;
	margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
	background-color: #0080ff;
	border-radius: 5px;
	padding: 10px;
`;

const ButtonText = styled.Text`
	color: #fff;
	font-weight: bold;
	text-align: center;
`;

const Resultado = styled.View`
	border-width: 1px;
	border-color: #ccc;
	border-radius: 5px;
	padding: 10px;
	margin-top: 20px;
	width: 100%;
`;

const ResultadoText = styled.Text`
	font-size: 16px;
	margin-bottom: 5px;
`;

const Loading = styled.ActivityIndicator`
	margin-top: 20px;
`;

type Endereco = {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
	ibge: string;
	gia: string;
	ddd: string;
	siafi: string;
};

type AppProps = {
	children?: React.ReactNode;
};

const App = ({ children }: AppProps): JSX.Element => {
	const [cep, setCep] = useState("");
	const [endereco, setEndereco] = useState<Endereco | null>(null);
	const [carregando, setCarregando] = useState(false);

	const consultarCep = async () => {
		try {
			setCarregando(true);
			if (cep === "") {
				Alert.alert("Error", "CEP não informado");
			}
			const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
			setEndereco(response.data);
		} catch (error) {
			console.error(error);
			setEndereco(null);
		} finally {
			setCarregando(false);
		}
	};

	return (
		<Container>
			<Title>CEP Finder</Title>
			<Input
				type='zip-code'
				placeholder='Digite o CEP'
				value={cep}
				onChangeText={setCep}
				keyboardType='number-pad'
				options={{ mask: "99999-999" }}
			/>
			<Button onPress={consultarCep}>
				<ButtonText>Consultar</ButtonText>
			</Button>
			{carregando ? (
				<Loading />
			) : (
				endereco && (
					<Resultado>
						<ResultadoText>CEP: {endereco.cep}</ResultadoText>
						<ResultadoText>Logradouro: {endereco.logradouro}</ResultadoText>
						<ResultadoText>Bairro: {endereco.bairro}</ResultadoText>
						<ResultadoText>Cidade: {endereco.localidade}</ResultadoText>
						<ResultadoText>Estado: {endereco.uf}</ResultadoText>
					</Resultado>
				)
			)}
		</Container>
	);
};

export default App;

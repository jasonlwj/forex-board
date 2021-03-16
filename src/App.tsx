import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Card from './components/Card';
import './App.css';

interface IRateIndex {
	[index: string]: number;
}

interface ICcyData {
	code: string;
	name: string;
}

interface ICcyNameIndex {
	[index: string]: string;
}

const App = (): JSX.Element => {
	const [forexData, setForexData] = useState<IRateIndex>({});
	const [ccyMap, setCcyMap] = useState<ICcyNameIndex>({});

	const fetchRateData = async (ccyBase: string = "AUD"): Promise<void> => {
		// Fetch data from the public API.
		const baseUrl: string = `https://api.exchangeratesapi.io/latest?base=${ccyBase.toUpperCase()}`;
		const response: AxiosResponse = await axios.get(baseUrl);

		// Move the data into state.
		setForexData(response.data.rates);
	}

	// im going through all this trouble so i can get currency names FML
	const fetchCcyData = async (): Promise<void> => {
		// Fetch data from the public API.
		const baseUrl: string = `https://pkgstore.datahub.io/core/currency-codes/codes-all_json/data/029be9faf6547aba93d64384f7444774/codes-all_json.json`;
		const response: AxiosResponse = await axios.get(baseUrl);

		// Create a map between the currency code and its name.
		// e.g. AUD: Australian Dollar
		const mappedData: ICcyNameIndex = response.data.reduce((tempCcyMap: ICcyNameIndex, ccy: any) => {
			tempCcyMap[ccy.AlphabeticCode] = ccy.Currency;
			return tempCcyMap;
		}, []);

		setCcyMap(mappedData);
	}

	const showRates = (): JSX.Element[] => {
		const ratesKeys: string[] = Object.keys(forexData);

		// console.group();
		// ratesKeys.forEach((key: string) => {
		// 	console.log(`key: ${key}\tvalue: ${forexData[key]}`);
		// });
		// console.groupEnd();

		

		return ratesKeys.map(ccyCode => { 
			const name = ccyMap[ccyCode];
			return <Card key={ccyCode} currency={ccyCode} name={name} rate={forexData[ccyCode]} />
		});
	}

	useEffect(() => {
		fetchRateData();
		fetchCcyData();
	}, []);

	return (
		<div className="App">
			<div className="Container">
				{showRates()}
			</div>
		</div>
	);
}

export default App;

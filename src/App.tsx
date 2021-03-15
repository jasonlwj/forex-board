import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

interface IRateIndex {
	[index: string]: number;
}

const App = (): JSX.Element => {
	const [forexData, setForexData] = useState<IRateIndex>({});

	const fetchData = async (): Promise<void> => {
		const baseUrl: string = "https://api.exchangeratesapi.io/latest?base=AUD";
		const data: Response = await fetch(baseUrl);
		const json: any = await data.json();
		setForexData(json.rates);
	}

	const showRates = (): JSX.Element[] => {
		const ratesKeys: string[] = Object.keys(forexData);

		ratesKeys.forEach((key: string) => {
			console.log(`key: ${key}\tvalue: ${forexData[key]}`);
		});

		return ratesKeys.map(currency =>
			<Card key={currency} currency={currency} rate={forexData[currency]} />
		);
	}

	useEffect(() => {
		fetchData();
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

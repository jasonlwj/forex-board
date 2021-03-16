import 'currency-flags/dist/currency-flags.css';

interface ICardProps {
	currency: string;
	name: string;
	rate: number;
}

const Card = ({ currency, name, rate }: ICardProps): JSX.Element => {
	return (
		<div className="Card">
			<div className={`currency-flag currency-flag-${currency.toLowerCase()}`}></div>
			<div>
				{currency}<span>/AUD</span>
			</div>
			<div>
				{name}
			</div>
			<div>
				{rate}
			</div>
		</div>
	);
}

export default Card;

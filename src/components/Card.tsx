interface ICardProps {
	currency: string;
	rate: number;
}

const Card = ({ currency, rate }: ICardProps): JSX.Element => {

	return (
		<div className="Card">{currency}/AUD: {rate}</div>
	);
}

export default Card;

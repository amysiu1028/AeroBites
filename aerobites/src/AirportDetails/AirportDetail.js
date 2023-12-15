import './AirportDetail.css';
import { useParams } from 'react-router-dom';

export default function AirportDetail() {
    const airport = useParams().Airport;

    return (
        <div>
            <h1>{ airport }</h1>
        </div>
    )
}
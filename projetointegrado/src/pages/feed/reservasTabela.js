import { useEffect, useState } from "react";
import "../../estilos/areaComum.css";

function ReservasTabela() {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/reservas")
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then((data) => {
                console.log("Dados convertidos em JSON:", data); // Log do JSON parseado
                setReservas(data);
            })
            .catch((err) => console.error("Erro ao buscar reservas:", err));
    }, []);

    return (
        <div className="fundo">
            <div className="reserva-container">
                <h1>Reservas da Área de Eventos</h1>
                <table className="reserva-tabela">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Início</th>
                            <th>Fim</th>
                            <th>Motivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.length === 0 ? (
                            <tr><td colSpan="4">Nenhuma reserva encontrada</td></tr>
                        ) : (
                            reservas.map((reserva, index) => (
                                <tr key={index}>
                                    <td>{reserva.nome}</td>
                                    <td>{new Date(reserva.horario_inicio).toLocaleString("pt-BR")}</td>
                                    <td>{new Date(reserva.horario_fim).toLocaleString("pt-BR")}</td>
                                    <td>{reserva.motivo}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReservasTabela;

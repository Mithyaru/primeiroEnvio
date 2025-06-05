import { useState } from "react";
import "../../estilos/areaComum.css"

function AreaComum() {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    console.log(userInfo)
    const [form, setForm] = useState({
        data: "",
        horaInicio: "",
        horaFim: "",
        motivo: "reserva"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reservaData = {
            nome: userInfo.nome,
            data: form.data,
            horaInicio: form.horaInicio,
            horaFim: form.horaFim,
            motivo: form.motivo,
        };

        console.log(reservaData)

        try {
            const response = await fetch("http://localhost:3001/reserva-area", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservaData),
            });
    
            const result = await response.json();
            console.log(result)
    
            if (response.ok) {
                alert("Reserva enviada com sucesso!");
                console.log(result);
            } else {
                alert("Erro ao enviar reserva: " + result.error);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao enviar reserva.");
        }
    };


    return (
        <div className="fundo">
            <div className="reserva-container">
                <h1>Reserva da Área de Eventos</h1>
                <form className="reserva-form" onSubmit={handleSubmit}>
                    <label>
                        Data da Reserva:
                        <input
                            type="date"
                            name="data"
                            value={form.data}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Horário de Início:
                        <input
                            type="time"
                            name="horaInicio"
                            value={form.horaInicio}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Horário de Término:
                        <input
                            type="time"
                            name="horaFim"
                            value={form.horaFim}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Motivo:
                        <select
                            name="motivo"
                            value={form.motivo}
                            onChange={handleChange}
                            required
                        >
                            <option value="reserva">Reserva</option>
                            <option value="manutencao">Manutenção</option>
                        </select>
                    </label>

                    <button type="submit" onClick={handleSubmit} >Reservar</button>
                </form>
            </div>
        </div>
    );
}

export default AreaComum
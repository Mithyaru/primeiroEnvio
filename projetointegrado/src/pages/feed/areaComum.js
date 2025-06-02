import { useState } from "react";
import "../../estilos/areaComum.css"

function AreaComum() {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    console.log(userInfo)
    const [form, setForm] = useState({
        data: "",
        horaInicio: "",
        horaFim: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Reserva enviada:", form);
        alert("Reserva enviada com sucesso!");
        // Enviar para backend futuramente
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

                    <button type="submit">Reservar</button>
                </form>
            </div>
        </div>
    );
}

export default AreaComum
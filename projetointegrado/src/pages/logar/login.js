import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import axios from 'axios';
import '../../componentsLogin/estilos/estiloLogin.css';

function Login() {
  const formRef = useRef(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    console.log('Submetendo login com email:', email, 'e senha:', senha);
    e.preventDefault();
    setErro('');
    try {
      const response = await axios.post('http://localhost:3001/login', { email, senha });
      const { adm, nome, email: emailRetornado, apartamento } = response.data;
      localStorage.setItem('user', JSON.stringify({
        nome,
        email: emailRetornado,
        apartamento,
        adm
      }));
      console.log('Usuário salvo:', localStorage.getItem('user'));
      console.log(response)
  
      // Redireciona
      if (adm) {
        navigate('/admindashboard');
      } else {
        navigate('/userdashboard');
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 401) {
        setErro('Credenciais inválidas.');
      } else {
        setErro('Erro ao efetuar login.');
      }
    }
  };
  

  return (
    <div className="App fundo">
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div id="quadrado">
                <div className="card-body p-5 text-center">
                  <div className="position-relative mb-4">
                    <div
                      className="position-absolute"
                      style={{ left: 0, top: '50%', transform: 'translateY(-50%)' }}
                    >
                      <Link to="/">
                        <GoArrowLeft size={24} style={{ color: 'black', cursor: 'pointer' }} />
                      </Link>
                    </div>
                    <h3 className="fw-bold mb-0 text-uppercase">Login</h3>
                  </div>
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Email"
                      className="form-control form-control-lg transparent-input mb-4"
                      required
                    />
                    <input
                      type="password"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                      placeholder="Senha"
                      className="form-control form-control-lg transparent-input mb-4"
                      required
                    />
                    <button type="submit" className="btn btn-outline-light btn-lg px-5 black">
                      Login
                    </button>
                  </form>
                  {erro && <div style={{ color: 'red', marginTop: '10px' }}>{erro}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;

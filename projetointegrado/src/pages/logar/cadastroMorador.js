import React, { useRef, useEffect, useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CadastroMorador() {
  const formRef = useRef(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [apartamento, setApartamento] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleClickButton = () => {
    setErro('');
    setMensagem('');

    if (!nome || !email || !telefone || !apartamento || !senha) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }

    if (!validarEmail(email)) {
      setErro('E-mail inválido.');
      return;
    }

    const aptNum = Number(apartamento);
    if (isNaN(aptNum) || aptNum < 1) {
      setErro('Apartamento inválido.');
      return;
    }

    axios.post('http://localhost:3001/registerMorador', {
      nome,
      email,
      telefone,
      apartamento: aptNum,
      senha
    })
      .then((response) => {
        setMensagem(response.data.message);
        formRef.current.reset();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setErro(error.response.data.error);
        } else {
          setErro('Erro ao cadastrar.');
        }
      });

      setNome('');
      setEmail('');
      setTelefone();
      setApartamento('');
      setSenha('');
  };

  useEffect(() => {
    const elements = formRef.current.querySelectorAll('input, textarea, select');
    elements.forEach((element) => {
      element.addEventListener('focus', () => {
        element.classList.add('piscar-no-foco');
      });
      element.addEventListener('animationend', () => {
        element.classList.remove('piscar-no-foco');
      });
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('focus', () => {});
        element.removeEventListener('animationend', () => {});
      });
    };
  }, []);

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
                    <h3 className="fw-bold mb-0 text-uppercase" id="textoIndex">
                      Cadastro Morador
                    </h3>
                  </div>

                  <form ref={formRef}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        placeholder="Nome Completo"
                        onChange={e => setNome(e.target.value)}
                        className="form-control form-control-lg transparent-input"
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        placeholder="Insira um Email válido"
                        onChange={e => setEmail(e.target.value)}
                        className="form-control form-control-lg transparent-input"
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        placeholder="Insira um telefone válido"
                        onChange={e => setTelefone(e.target.value)}
                        className="form-control form-control-lg transparent-input"
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="number"
                        placeholder="Insira seu apartamento"
                        min="1"
                        onChange={e => setApartamento(e.target.value)}
                        className="form-control form-control-lg transparent-input"
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        placeholder="Senha"
                        onChange={e => setSenha(e.target.value)}
                        className="form-control form-control-lg transparent-input"
                      />
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-light btn-lg px-5 black"
                      onClick={handleClickButton}
                    >
                      Cadastrar
                    </button>
                  </form>

                  {erro && <div style={{ color: 'red', marginTop: '10px' }}>{erro}</div>}
                  {mensagem && <div style={{ color: 'green', marginTop: '10px' }}>{mensagem}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CadastroMorador;

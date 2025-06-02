import React, { useRef, useEffect, useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CadastroVisitante() {
  const formRef = useRef(null);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataVisita, setDataVisita] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  const validarCpf = (cpf) => /^\d{11}$/.test(cpf);

  const handleClickButton = () => {
    setErro('');
    setMensagem('');

    if (!nome || !cpf || !dataVisita) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }
    if (!validarCpf(cpf)) {
      setErro('CPF inválido. Deve conter 11 dígitos numéricos.');
      return;
    }

    axios.post('http://localhost:3001/registerVisitante',{ 
      nome, 
      cpf, 
      data: dataVisita 
    }).then((response) =>{
      setMensagem(response.data.message);
      formRef.current.reset();
    }).catch((error) =>{
      if(error.response && error.response.data && error.response.data.error){
        setErro(error.response.data.error);
      } else {
        setErro('Erro ao cadastrar.');
      }
    })

      setNome('');
      setCpf('');
      setDataVisita('');
  };

  useEffect(() => {
    const elements = formRef.current.querySelectorAll('input');
    elements.forEach((el) => {
      el.addEventListener('focus', () => el.classList.add('piscar-no-foco'));
      el.addEventListener('animationend', () => el.classList.remove('piscar-no-foco'));
    });
    return () => elements.forEach((el) => {
      el.removeEventListener('focus', () => {});
      el.removeEventListener('animationend', () => {});
    });
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
                    <div className="position-absolute" style={{ left: 0, top: '50%', transform: 'translateY(-50%)' }}>
                      <Link to="/">
                        <GoArrowLeft size={24} style={{ color: 'black', cursor: 'pointer' }} />
                      </Link>
                    </div>
                    <h3 className="fw-bold mb-0 text-uppercase" id="textoIndex">
                      Cadastro Visitante
                    </h3>
                  </div>

                  {/* Formulário de cadastro */}
                  <form name="frmResetarSenha" action="resetarSenha" ref={formRef}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        name="login"
                        className="form-control form-control-lg transparent-input"
                        placeholder="Nome Completo"
                        onChange={e => setNome(e.target.value)}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        name="cpf"
                        className="form-control form-control-lg transparent-input"
                        placeholder="Insira seu CPF"
                        onChange={e => setCpf(e.target.value)}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="date"
                        name="DataVisita"
                        className="form-control form-control-lg transparent-input"
                        onChange={e => setDataVisita(e.target.value)}
                      />
                    </div>
                    <input
                      type="button"
                      value="Cadastrar"
                      className="btn btn-outline-light btn-lg px-5 black"
                      onClick= {handleClickButton}
                    />
                  </form>
                  {erro && <div style={{color:'red', marginTop:10}}>{erro}</div>}
                  {mensagem && <div style={{color:'green',marginTop:10}}>{mensagem}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CadastroVisitante;
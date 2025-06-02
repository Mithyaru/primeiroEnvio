import '../../componentsLogin/estilos/estiloLogin.css';
import { Link} from 'react-router-dom';


function Admindashboard() {

  return (
    <div className="App fundo">
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div id="quadrado">
              <div className="card-body p-5 text-center">
                <h2 className="fw-bold mb-2 text-uppercase" id="textoIndex">Condo Hub - ADMINISTRAÇÃO</h2>
                  

                  <h5 className="mb-5">Escolha uma opção:</h5>


                  <Link to="/cadastroMorador" className="btn btn-outline-dark btn-lg mb-3 px-5">
                    Cadastro de Morador
                  </Link>

                  <Link to="/cadastroVisitante" className="btn btn-outline-dark btn-lg px-5">
                    Cadastro de Visitante
                  </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}

export default Admindashboard;

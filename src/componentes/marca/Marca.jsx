import Tabela from './Tabela';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Cadastrar from './Cadastrar';

function Marca() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });

    const atualizaAlerta = (pstatus, pmensagem) => {
        setAlerta({ status: pstatus, message: pmensagem })
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/marcas" render={
                        () => <Tabela alerta={alerta} atualizaAlerta={atualizaAlerta} />
                    } />
                    <Route path="/cadastrarmarca" render={() =>
                        <Cadastrar editar={false} atualizaAlerta={atualizaAlerta} />
                    } />
                    <Route path="/editarmarca/:codigo" render={
                        props =>
                        <Cadastrar editar={true} atualizaAlerta={atualizaAlerta} 
                        pcodigo={props.match.params.codigo}/>
                    } />
                </Switch>
            </Router>
        </div>
    )

}

export default Marca;
import { Redirect } from 'react-router-dom';
import config from '../../Config';
import { useState, useEffect } from 'react';

function Cadastrar({ pcodigo, atualizaAlerta, editar }) {

    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", ano: null, marca: ""
    })

    const [listaMarcas, setListaMarcas] = useState([]);

    const [redirecionar, setRedirecionar] = useState(false);

    const recuperar = async codigo => {
        await fetch(`${config.enderecoapi}/carros/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data[0]))
            .catch(err => console.log(err))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                const body = {
                    codigo: objeto.codigo,
                    nome: objeto.nome,
                    ano: objeto.ano,
                    marca: objeto.marca
                }
                const response = await fetch(config.enderecoapi + "/carros", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(json => {
                        atualizaAlerta(json.status, json.message)
                    })

            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const body = {
                    nome: objeto.nome,
                    ano: objeto.ano,
                    marca: objeto.marca
                }
                const response = await fetch(config.enderecoapi + "/carros", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(json => {
                        atualizaAlerta(json.status, json.message)
                    })

            } catch (err) {
                console.log(err)
            }
        }
        setRedirecionar(true);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value })
    }

    const recuperaMarcas = async () => {
        await fetch(`${config.enderecoapi}/marcas`)
            .then(response => response.json())
            .then(data => setListaMarcas(data))
            .catch(err => console.log('Erro: ' + err))
    }

    useEffect(() => {
        if (editar) {
            recuperar(pcodigo);
        } else {
            setObjeto({
                codigo: "", nome: "", ano: new Date().toISOString().slice(0, 10), marca: ""
            });
        }
        recuperaMarcas();
    }, []);

    if (redirecionar === true) {
        return <Redirect to="/carros" />
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Carro</h2>
            <form id="formulario" onSubmit={acaoCadastrar}>
                <div >
                    <div className="form-group">
                        <label htmlFor="txtCodido" className="form-label">
                            Código
                        </label>
                        <input
                            type="text"
                            readOnly
                            className="form-control"
                            id="txtCodido"
                            name="codigo"
                            value={objeto.codigo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtNome" className="form-label">
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="txtNome"
                            name="nome"
                            value={objeto.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtData" className="form-label">
                            ano
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="txtData"
                            name="ano"
                            value={objeto.ano}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectMarca" className="form-label">
                            Marca
                        </label>
                        <select
                            required
                            className="form-control"
                            id="selectselectMarcaPerson"
                            value={objeto.marca}
                            name="marca"
                            onChange={handleChange}>
                            <option disable="true" value="">(Selecione a marca)</option>
                            {listaMarcas.map((marca) => (
                                <option key={marca.codigo} value={marca.codigo}>
                                    {marca.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-success" >
                    Salvar  <i className="bi bi-save"></i>
                </button>

            </form>
        </div>
    )

}

export default Cadastrar;

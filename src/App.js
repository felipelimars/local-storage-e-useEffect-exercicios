import { useEffect, useState } from 'react'
import { DivContainer, InputsContainer, ListaDeTarefas, Tarefa } from './style';



function App() {
  const [tarefas, setTarefas] = useState([]);
  const [valorDoInput, setValorDoInput] = useState("");
  const [filtro, setFiltro] = useState("")

  const setLocalStorage = () => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
  }

  useEffect(() => {
    if (tarefas.length) {
      setLocalStorage()
    }
  }, [tarefas])


 useEffect(() => {
  const listaLocalStorage = JSON.parse(localStorage.getItem("tarefas"))
  console.log(listaLocalStorage)
  if (listaLocalStorage){
     setTarefas(listaLocalStorage)
  }
}, []) 


  const pegarValorDoInput = (event) => {
    setValorDoInput(event.target.value)
  }

  const criarTarefa = () => {
    const novaTarefa = {
      id: Date.now(),
      texto: valorDoInput,
      completa: false
    };

    const copiaDoEstado = [...tarefas, novaTarefa];
    if (valorDoInput.trim() !== "")
      setTarefas(copiaDoEstado);
    setValorDoInput("");
  };

  const selecionarTarefa = (id) => {
    const tarefasListadas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return {
          ...tarefa, completa: !tarefa.completa
        };
      }
      return tarefa;
    });

    setTarefas(tarefasListadas);
  };

  const pegarValorDoSelect = (event) => {
    setFiltro(event.target.value)
  }


  const listaFiltrada = tarefas.filter(tarefa => {
    switch (filtro) {
      case 'pendentes':
        return !tarefa.completa
      case 'completas':
        return tarefa.completa
      default:
        return true
    }
  });


  return (
    <DivContainer>
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={valorDoInput} onChange={pegarValorDoInput} />
        <button onClick={criarTarefa}>Adicionar</button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={pegarValorDoSelect}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <ListaDeTarefas>
        {listaFiltrada.map(tarefa => {
          return (
            <Tarefa key={tarefa.id}
              completa={tarefa.completa}
              onClick={() => selecionarTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          )
        })}
      </ListaDeTarefas>
    </DivContainer>
  )
}


export default App



import Cliente from '../core/Cliente'
import { useEffect, useState } from 'react'
import ClienteRepositorio from '../core/ClienteRepositorio'
import ColecaoCliente from '../backend/db/ColecaoCliente'
import useTabelaOuForm from './useTabelaOuForm'

export default function useClientes(){
    const repo: ClienteRepositorio = new ColecaoCliente()

//   const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
    const {tabelaVisivel,exibirTabela, exibirFormulario } = useTabelaOuForm()
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

  useEffect(obterTodos, [])

  function obterTodos(){
      repo.obterTodos().then(clientes => {
          setClientes(clientes)
          exibirTabela()
      })
  }

  function selecionarCliente(cliente: Cliente){
    console.log(cliente)
    setCliente(cliente)
    exibirFormulario()
    
  } 
  async function excluirCliente(cliente: Cliente){
    await repo.excluir(cliente)
    obterTodos()
    console.log(`Excluir ... ${cliente}`)
  } 

  async function salvarCliente(cliente: Cliente){
    console.log(cliente)
    await repo.salvar(cliente)
    obterTodos()
    
  }

  function novoCliente(cliente: Cliente){
    setCliente(Cliente.vazio())
    exibirFormulario()
  }
 
  return{
    cliente,
    clientes,
    novoCliente,  
    salvarCliente,
    excluirCliente,
    selecionarCliente,
    obterTodos,
    exibirTabela,
    tabelaVisivel
  }
}
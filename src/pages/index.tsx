import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import Table from '../components/Table'
import styles from '../styles/Home.module.css'
import Cliente from '../core/Cliente'
import Botao from '../components/Botao'
import Formulario from '../components/Formulario'
import { useEffect, useState } from 'react'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import ClienteRepositorio from '../core/ClienteRepositorio'
import ColecaoCliente from '../backend/db/ColecaoCliente'

export default function Home() {


  const repo: ClienteRepositorio = new ColecaoCliente()

  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

  useEffect(obterTodos, [])

  function obterTodos(){
      repo.obterTodos().then(clientes => {
          setClientes(clientes)
          setVisivel('tabela')
      })
  }

  function clienteSelecionado(cliente: Cliente){
    console.log(cliente)
    setCliente(cliente)
    setVisivel('form')
    
  } 
  function clienteExcluido(cliente: Cliente){
    console.log(`Excluir ... ${cliente}`)
  } 

  async function salvarCliente(cliente: Cliente){
    console.log(cliente)
    await repo.salvar(cliente)
    obterTodos()
    
  }

  function novoCliente(cliente: Cliente){
    setCliente(Cliente.vazio())
    setVisivel('form')
  }
 

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white 
    `}>
      <Layout titulo='Cadastro'>

{visivel === 'tabela' ? (
   <>
   <div className={`flex justify-end`}>       
       <Botao cor='green' clasName='mb-4'
          onClick={novoCliente}>
          Novo Cliente 
        </Botao>
        
     </div>
     <Table clientes={clientes} 
       clienteSelecionado={clienteSelecionado} 
       clienteExcluido={clienteExcluido}></Table>
 </>

):(
  <Formulario 
    cliente={cliente}
    clienteMudou={salvarCliente}
    cancelado={() => setVisivel('tabela')}
  />
)}
     
      </Layout>
    </div>
  )
}

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
import useClientes from '../hooks/useClientes'

export default function Home() {


  const {novoCliente, selecionarCliente, excluirCliente, salvarCliente, cliente, clientes, tabelaVisivel, exibirTabela} = useClientes()

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white 
    `}>
      <Layout titulo='Cadastro'>

{tabelaVisivel ? (
   <>
   <div className={`flex justify-end`}>       
       <Botao cor='green' clasName='mb-4'
          onClick={novoCliente}>
          Novo Cliente 
        </Botao>
        
     </div>
     <Table clientes={clientes} 
       clienteSelecionado={selecionarCliente} 
       clienteExcluido={excluirCliente}></Table>
 </>

):(
  <Formulario 
    cliente={cliente}
    clienteMudou={salvarCliente}
    cancelado={exibirTabela}
  />
)}
     
      </Layout>
    </div>
  )
}

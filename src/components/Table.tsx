import Cliente from '../core/Cliente'
import { IconeDelete, IconeEdicao } from './Icones'

interface TableProps{
    clientes: Cliente[]
    clienteSelecionado?: (cliente: Cliente) => void
    clienteExcluido?: (cliente: Cliente) => void

}

export default function Table(props: TableProps){

    const exibirAcoes = props.clienteExcluido || props.clienteSelecionado

    function renderizarCabecalho(){
        return(
            <tr>
                <th className='text-left p-4 '>Código</th>
                <th className='text-left p-4 '>Nome</th>
                <th className='text-left p-4 '>Idade</th>
                {exibirAcoes? <th className='text-center p-4 '>Ações</th> : false}
            </tr>
        )
    }

    function renderizarDados(){
        return props.clientes?.map((cliente, i) => {

            return(
                <tr key={cliente.id}
                    className={`${i % 2 === 0 ? 'bg-purple-200' :'bg-purple-100' }`}>
                    <td className='text-left p-4'>{cliente.id}</td>
                    <td className='text-left p-4'>{cliente.nome}</td>
                    <td className='text-left p-4'>{cliente.idade}</td>
                    {exibirAcoes ? rendereizarAcoes(cliente): false}
                </tr>
        )
        })
    }

    function rendereizarAcoes(cliente: Cliente){
        return(
            <td className='flex justify-center'>
                {props.clienteSelecionado ? (
                <button onClick={() => props.clienteSelecionado?.(cliente)} className={`
                flex justify-center items-center
                text-green-600 rounded-full p-2 m-1
                hover:bg-green-700  hover:text-indigo-200
                `}>
                    {IconeEdicao}
                </button>
                ): false}

                {props.clienteExcluido ? (
                <button onClick={() => props.clienteExcluido?.(cliente)} className={`
                    flex justify-center items-center
                    text-red-600 rounded-full p-2 m-1
                    hover:bg-red-700 hover:text-indigo-200                
                `}>
                    {IconeDelete}
                </button>

                ): false}

            </td>
        )
    }

    return(
        <table className='w-full rounded-xl overflow-hidden'>

            <thead className={`
                bg-gradient-to-r from-purple-500 to-purple-800
                text-gray-100
            `}>
                {renderizarCabecalho()}
            </thead>

            <tbody>
                {renderizarDados()}
            </tbody>
        
        </table>
    )
}
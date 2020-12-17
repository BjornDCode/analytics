import { useContext } from 'react'
import context from '~/state/SocketContext'

const useSocket = () => useContext(context)

export default useSocket

import { createContext, useContext } from 'react'
import io from 'socket.io-client'

const accessToken = localStorage.getItem('accessToken')
const socket = io('http://localhost:8080', {
    query: { token: accessToken },
    transports: ['websocket'],
})

const context = createContext(socket)

export const SocketProvider = ({ children }) => (
    <context.Provider value={socket}>{children}</context.Provider>
)

export default context

import { createContext, useContext } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:8080', {
    transports: ['websocket'],
})

const context = createContext(socket)

export const SocketProvider = ({ children }) => (
    <context.Provider value={socket}>{children}</context.Provider>
)

export default context

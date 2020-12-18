import { createContext, useContext } from 'react'
import io from 'socket.io-client'

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080'
const accessToken = localStorage.getItem('accessToken')
const socket = io(baseUrl, {
    query: { token: accessToken },
    transports: ['websocket'],
})

const context = createContext(socket)

export const SocketProvider = ({ children }) => (
    <context.Provider value={socket}>{children}</context.Provider>
)

export default context

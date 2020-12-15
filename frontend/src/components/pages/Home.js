import React, { Component } from 'react'

import Simple from '@/layouts/Simple'

class Home extends Component {
    render() {
        return (
            <Simple>
                <h1>Home</h1>
                <p>This is both a public and non-public route</p>
            </Simple>
        )
    }
}

export default Home

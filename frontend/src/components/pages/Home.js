import React, { Component } from 'react'

import Shell from '@/layouts/Shell'

class Home extends Component {
    render() {
        return (
            <Shell>
                <h1>Home</h1>
                <p>This is both a public and non-public route</p>
            </Shell>
        )
    }
}

export default Home

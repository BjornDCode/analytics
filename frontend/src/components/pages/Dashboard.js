import React, { Component } from 'react'

import api from '~/helpers/api'

import Shell from '@/layouts/Shell'

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        api.get('/posts', (response, data) => {
            this.setState({
                ...this.state,
                posts: data.data,
            })
        })
    }

    render() {
        return (
            <Shell>
                <h1>Dashboard</h1>
                {this.state.posts.map(post => (
                    <div key={post.id}>{post.title}</div>
                ))}
            </Shell>
        )
    }
}

export default Dashboard

import React, { Component } from 'react'
import api from '~/helpers/api'

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
            <div>
                <h1>Dashboard</h1>
                {this.state.posts.map(post => (
                    <div key={post.id}>{post.title}</div>
                ))}
            </div>
        )
    }
}

export default Dashboard

import React, { Component } from 'react'

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>
class Profile extends Component {
    render() {
        return (
            <div>
            <div>This is the Profile page </div>    
            </div>
        )
    }
}

export default Profile
const users = []
//Here's more object destructuring
const addUser = ({ id, username, room}) => {
    //Sanitize data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    //Prevent user from entering a room without a user name/choosing a room
    if(!username || !room){
        return {
            error: 'Username and room are required'
        }
    }
    //Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })
    //Validate username for room
    if(existingUser) {
        return {
            error: 'Username is already in use'
        }
    }
    const user = {id, username, room}
    users.push(user)
    return {user}
}


const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })

    const user = users[index]

    if (user === undefined){
        return {
            error: 'Could not locate user'
        }
    }

    return user
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    const usersInRoom = users.filter(function(user) {
        return user.room === room
    })
    return usersInRoom
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom}
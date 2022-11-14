import React from 'react'
import { userModel } from '../interfaces/userData'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './userslist.css'

const UsersList: React.FC = () => {

const [usersList, setUsersList] = useState<userModel[]>()
const [name, setName] = useState<string>()
const [type, setType] = useState<string>()
const [newName, setNewName] = useState<string>()
const [searchName, setSearchName] = useState<string>("")

const getContact = () => {
    axios.get('http://localhost:3001/getUsers').then((res) => {
        setUsersList(res.data) 
     })
}

useEffect(() => {
    getContact()
}, [])

const createUser = () => {
    axios.post('http://localhost:3001/createUser', {name, type}).then((res) => {
        getContact()
    })
}

const deleteUser = (id:number) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`).then(() => {
        getContact()
    })

}

const updateUserName = (id:number) => {
    axios.put('http://localhost:3001/updateUser/', {
        id: id,
        newName: newName
    }).then(() => {
        getContact()
    })
}

const handleSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value:string = e.target.value
    setSearchName(value)
}

  return (
    <div className='contact-list'>
        <div className='header'>
        <h1 className='title'>Add a contact :</h1>
        <div className='add-form'>
        <input 
        className='create-input'
        type="text" 
        placeholder='name...' 
        onChange={(e) => {
            setName(e.target.value)
        }}/>
            <div className='checkbox-form'>
                <input 
                className='checkbox'
                type="checkbox" 
                name="team" 
                value="Team"
                onChange={(e) => {
                    setType(e.target.value)
                }}/>
                <label htmlFor="team">Team</label>
                <input 
                className='checkbox'
                type="checkbox" 
                name="friend" 
                value="Friend"
                onChange={(e) => {
                    setType(e.target.value)
                }}/>
                <label htmlFor="friend">Friend</label>
                <input 
                className='checkbox'
                type="checkbox" 
                name="family" 
                value="Family"
                onChange={(e) => {
                    setType(e.target.value)
                }}/>
                <label htmlFor="family">Family</label>
            </div>
            <button className='create-button' onClick={createUser}>Add Contact</button>
            <input 
                className='create-input'
                type="text" 
                placeholder='search by name...' 
                onChange={handleSearchName}/>
            </div>
        </div>
        <ul className='users-list'>
            {usersList?.filter((user) => {
                return user.name.toLowerCase().includes(searchName.toLowerCase())
            }).map(user => (
                <li key={user._id}>
                    <h1>{user.name}</h1>
                    <p>{user.type}</p>
                    <input
                    type="text" 
                    placeholder='update name...' 
                    onChange={(e) => {
                        setNewName(e.target.value)
                    }}/>
                    <button className='update-button' onClick={() => updateUserName(user._id)}>Update Contact</button>
                    <button className='delete-button' onClick={() => deleteUser(user._id)}>Delete Contact</button>
                </li>
            ))}
        </ul>
    </div>
  )
  
}

export default UsersList
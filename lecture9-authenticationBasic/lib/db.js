import { writeFile, readFile } from 'fs/promises';


export const getAllusers = async() => {
    const result = await readFile("./lib/data.json","utf-8")
    if(!result) return []
    return JSON.parse(result)
}

export const addUser = async (user) => {
    const users = await getAllusers()
    users.push({...user,id:Date.now()})
    await writeFile("./lib/data.json",JSON.stringify(users))
}
export const getUserByLogin = async (login) => {
    const users =  await getAllusers()
     return users.find(user => user.login === login)
}

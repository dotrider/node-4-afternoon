const users = require('../models/users');

let id = 1

module.exports = {

    login: (req, res) => {
        const { username, password} = req.body;

        let user = users.find(user => user.username === username && user.password === password)

      if(user){
             req.session.username == user.username;
             res.status(200).send(req.session.user)

      }else {
            res.status(500).send('Unauthorized!')
      }

    },

    register: (req, res) => {
        const { username, password} = req.body;

        let newUser = {
            id,
            username,
            password,
        }
        id++;

        users.push(newUser);
        res.status(200).send(req.session.user)

    },

    signout: (req, res) => {
        req.session.destroy();
        res.status(200).send(req.session)
        
    },

    getUser: (req, res) => {
        res.status(200).send(req.session.user)
        
    }
}
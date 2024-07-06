const db =  require("./index")
const Role = db.role;

function initial() {
    Role.bulkCreate([
        {
            id: 0,
            name: "user"
        },
        {
            id: 1,
            name: "contestant"
        },
        {
            id: 2,
            name: "admin"
        }
    ])
    .then(roles => {
        console.log(roles)
    })
    .catch(err => {
        console.log(err.message)
    })
}
initial()
module.exports = initial
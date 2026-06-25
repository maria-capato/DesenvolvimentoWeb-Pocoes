// Sequelize
const {Sequelize, DataTypes, Model} = require("sequelize")
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
})

class Item extends Model {}
Item.init({
    Name: {
        primaryKey: true,
        notNull: true,
        type: DataTypes.STRING
    },
    Description: {
        notNull: true,
        type: DataTypes.TEXT
    },
    URL: {
        notNull: true,
        type: DataTypes.STRING
    },
    Price: {
        notNull: true,
        type: DataTypes.INTEGER
    }
}, {
    sequelize
})

async function CreateItems(){
    await sequelize.sync()
    await Item.create({Name: "Poção Blue Sky", Description: "Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds", URL: "https://i.ibb.co/ZzS7xb2/rsz-sky.png", Price: 300})
    await Item.create({Name: "Poção do Perfume Misterioso", Description: "Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.", URL: "https://i.ibb.co/pyhZJXf/rsz-lilas.png", Price: 200})
    await Item.create({Name: "Poção de Pinus", Description: "Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.", URL: "https://i.ibb.co/DkzdL1q/rsz-pinus.png", Price: 3000})
    await Item.create({Name: "Poção da Beleza Eterna", Description: "Veneno que mata rápido.", URL: "https://i.ibb.co/9p872NK/rsz-1beleza.png", Price: 100})
    await Item.create({Name: "Poção do Arco Íro", Description: "Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.", URL: "https://i.ibb.co/PrC09MP/rsz-2unicornio.png", Price: 120})
    await Item.create({Name: "Caldeirão das Verdades Secretas", Description: "As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.", URL: "https://i.ibb.co/s9Lyvj8/rsz-verdades.png", Price: 150})

}

CreateItems()

// Express
const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
    let items = await Item.findAll()
    res.send(items)
})

app.delete("/:name", async (req, res) =>{
    let item = await Item.findByPk(req.params.name)
    await item.destroy()
    res.send(item)
})

app.post("/", async (req, res) =>{
    let item = await Item.create({
        Name: req.body.name,
        Description: req.body.description,
        URL: req.body.URL,
        Price: req.body.price,
    })
    res.send(item)
})

app.listen(3000, () =>{
    console.log("listening!")
})

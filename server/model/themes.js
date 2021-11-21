const Mongoose = require('mongoose')
const Themes = new Mongoose.Schema({
    ThemeName : {
        type : String,
        required: true
    },
    ThemePreviewLink : {
        type : String,
    },
    ThemeImageLink : {
        type : String
    }
},
{
    collection : 'Themes'
})

const Themes = Mongoose.model("Themes", Themes);

module.exports = Themes;
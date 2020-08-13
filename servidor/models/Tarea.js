const mongoose = require('mongoose');
const { schema } = require('./Proyecto');

const TareaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required : true,
        trim : true

    },
    estado:{
        type: Boolean,
        default: false

    },
    fecha:{
        type: Date,
        default: Date.now()

    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Proyecto'

    }
});

module.exports = mongoose.model('Tarea', TareaSchema);
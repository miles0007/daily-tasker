

const mongoose = require('mongoose');


const urlSchema = mongoose.Schema({
  url_id: {
    type: String,
    required: true,
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
  },
  timestamp: {
      type: Date,
      default: Date.now
  }
});



urlSchema.statics.addUrl = async function(url_id) {
    if (url_id) {
        const url = await new Url({ url_id });
        return true;
    }
}

urlSchema.statics.isUrlExist = async function(url_id) {
    const isUrl = await Url.findOne({ url_id: url_id });
    if (isUrl) {
        console.log('url found', url_id)
        return true;
    } else {
        return false;
    }
    
}


const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
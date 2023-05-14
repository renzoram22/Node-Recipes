const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
   await mongoose.connect(process.env.MONGO_CNN,{
    useNewUrlParser: true,
    useUnifiedTopology: true
   });
   console.log('Connection Succesful')
  } catch (error) {
    console.log(error)
}
};

module.exports = {
  dbConnection,
};

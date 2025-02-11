import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gustavo:WHd5saACOEoC0NRl@cluster0.jlnrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    //WHd5saACOEoC0NRl
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB

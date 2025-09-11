// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
// <<<<<<< HEAD
//     await mongoose.connect('mongodb+srv://lumen:cUMyfN1vXgGLXE90@lumen.njnmvvi.mongodb.net/', {
      
// =======
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
// >>>>>>> ec769bcd180b1bed5096134444b068a923219d06
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;

import mongoose from 'mongoose';

export default async function connectToDB(URI) {
    mongoose.set('strictQuery', true);

    if (!URI) {
        console.log('MongoDB Uri not defined');
        return;
    }

    try {
        await mongoose.connect(URI);

        const db = mongoose.connection;
        db.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });
        db.once('open', () => {
            console.log('Connected to MongoDB');
        });
    } catch (error) {
        console.log('Error connecting to database: ', error);
    }
}

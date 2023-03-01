import mongoose from 'mongoose';

const DatabaseName = process.env.MONGO_INITDB_DATABASE || 'root-db';

const initialize = async () => {
  const DatabaseURL = process.env.NOSQL_URL || `${process.env.MONGO_URL}`;

  console.log('Initialize Database: ', DatabaseName, DatabaseURL)
  await mongoose.connect(
    DatabaseURL,
    { dbName: DatabaseName },
    (err) => {
      if (err) {
        console.log('Connection Failed to ', DatabaseURL, err)

        return;
      }

      console.log('Success connect to ', DatabaseURL)
    }
  )
}

export default {
  initialize
}

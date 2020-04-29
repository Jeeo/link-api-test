import { connect } from 'mongoose';

export default (connection) => connect(connection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    reconnectTries: 5,
    reconnectInterval: 500,
    connectTimeoutMS: 5000,
  });

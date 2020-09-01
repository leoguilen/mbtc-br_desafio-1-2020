import app from './app';
import chalk from 'chalk';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const _PORT = process.env.PORT || 3333;

app.listen(_PORT, () => console.log(chalk.green(`Server is running on ${_PORT}`)));

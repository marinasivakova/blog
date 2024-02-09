import { message } from 'antd';

const errorToMessage = (err) => {
  for (let i = 0; i < Object.keys(err).length; i += 1) {
    message.error(`${Object.keys(err)[i]}  ${Object.values(err)[i]}`);
  }
  return null;
};

export default errorToMessage;

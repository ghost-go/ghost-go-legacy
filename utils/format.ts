import moment from 'moment';
// import 'moment/locale/zh-cn';

export const formatDate = (date: moment.MomentInput) => {
  return moment(date).format('YYYY.MM.DD HH:mm');
};

export const timeAgo = (date: moment.MomentInput) => {
  return moment(date).fromNow();
};

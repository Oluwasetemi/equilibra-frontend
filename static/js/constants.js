const moment = require('moment');
const now = new Date();
let saturday =
  now.getDay() == 6
    ? moment(now).format('YYYY-MM-DD')
    : moment()
        .weekday(6)
        .format('YYYY-MM-DD');
saturday = new Date(saturday + ' ' + '23:58');
console.log(saturday);

export const roomType = {
  judiciary: 'COURT',
  senate: 'SENATE',
  executive: 'MINISTRY',
  HOR: 'HOUSE_OF_REPRESENTATIVE',
  HOA: 'HOUSE_OF_ASSEMBLY',
  LGA: 'LGA'
};

export const voteType = {
  poor: 'poorVotes',
  notAcceptable: 'notAcceptableVotes',
  upVote: 'upVotes',
  downVote: 'downVotes',
  challenges: 'challengesVotes',
  commendable: 'commendableVotes',
  excellent: 'excellentVotes'
};

export const endDiscussionTime = {
  startTime: saturday,
  duration: 5, //in mins
  test: true
};

export default (error, context) => {
  console.log(error, 'amas error');
  context.error({ statusCode: 304, message: 'Server error' });
};

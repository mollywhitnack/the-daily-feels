import delay from './delay';

const articles = [
  {
    id: 'cory-house',
    firstName: 'Cory',
    lastName: 'House',
  },
  {
    id: 'scott-allen',
    firstName: 'Scott',
    lastName: 'Allen',
  },
  {
    id: 'dan-wahlin',
    firstName: 'Dan',
    lastName: 'Wahlin',
  },
];

class mockNewsApi {
  static getArticles() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign([], articles));
      }, delay);
    });
  }
}

export default mockNewsApi;

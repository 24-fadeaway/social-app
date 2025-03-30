export const categories = [
    {
        name: '汽车',
        enName: 'cars',
        image: 'https://ts1.tc.mm.bing.net/th/id/R-C.650387cfa92fb7dd1cc5858404e875ed?rik=X04uh6O7qpWOMA&riu=http%3a%2f%2fn.sinaimg.cn%2fsinacn17%2f203%2fw2043h1360%2f20180324%2f6f5e-fysnevm6346919.jpg&ehk=wBFejODooJAu0uywJ%2f2JvtPqkT06x65QL%2fwGEW5CBTE%3d&risl=&pid=ImgRaw&r=0',
    },
    {
        name: '健身',
        enName: 'fitness',
        image: 'https://cdn.pixabay.com/photo/2016/09/17/23/52/fitness-1677212_1280.jpg',
    },
    {
        name: '音乐',
        enName: 'music',
        image: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.vtpC0ucT2OQdi4aOC9XJUgHaE7?rs=1&pid=ImgDetMain',
    },
    {
        name: '摄影',
        enName: 'photography',
        image: 'https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_1280.jpg',
    },
    {
        name: '美食',
        enName: 'food',
        image: 'https://cdn.pixabay.com/photo/2021/02/04/12/47/food-5981232_1280.jpg',
    },
    {
        name: '自然',
        enName: 'nature',
        image: 'https://cdn.pixabay.com/photo/2025/03/21/21/22/roche-9485693_1280.jpg',
    },
    {
        name: '艺术',
        enName: 'art',
        image: 'https://cdn.pixabay.com/photo/2023/11/17/14/40/street-art-8394476_1280.jpg',
    }, {
        name: '旅游',
        enName: 'travel',
        image: 'https://cdn.pixabay.com/photo/2021/12/11/11/48/nature-6862612_1280.jpg',
    },
    {
        name: '动物',
        enName: 'animals',
        image: 'https://cdn.pixabay.com/photo/2023/02/22/21/36/goose-7807430_1280.jpg',
    },
    {
        name: '其它',
        enName: 'others',
        image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
    },
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
    return query;
};

export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
    return query;
};

export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
    return query;
};

export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
};

export const userCreatedPinsQuery = (userId) => {
    const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
    return query;
};

export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
    return query;
};
if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Hi ! ',
    subtitle : 'First use',
    content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mauris purus, iaculis at lectus non, faucibus fermentum felis. Nam tempus porta nisl non tempus. Nam maximus, dui non consequat sollicitudin, quam eros lacinia libero, vel dapibus ipsum augue sit amet tortor. Praesent molestie sodales lacus eu vulputate.',
    author : 'Admin' ,
    date : '21/05/2015',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  
}


import urlMetadata from "url-metadata";

urlMetadata('https://github.com/lucasnerism')
  .then((metadata) => {
    console.log(metadata);
    const title = metadata['og:title'];
    const description = metadata['og:description'];
    const image = metadata['og:image'];
    console.log(title, description, image);
  }, (err) => {
    console.log(err);
  });

export default interface Tip {
    _id: string;
    IDcategory: {
      _id: string;
      name: string;
    };
    author: string;
    cloudinary_id: string;
    createdAt: string;
    description: string;
    image: string;
    info: string;
    title: string;
  }
  
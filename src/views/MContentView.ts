import { ContentEntity } from "../entities/index";

export interface MContentView {
  title: string;
  description: string;
  content: string;
  active: number;
  image: string;
  categories: string[];
  userId: string;
}

export module ContentModule {
  export function convertContentView(mContentView: MContentView): ContentEntity {
    
    let categories = '';
    mContentView.categories.forEach(element => {
      categories += element + ',';
    });
    const contentEntity: ContentEntity = {
      title: mContentView.title,
      content: mContentView.content,
      description: mContentView.description,
      image: mContentView.image,
      active: mContentView.active,
      userId: mContentView.userId,
      categories: categories,
    }
    return contentEntity;
  }
}
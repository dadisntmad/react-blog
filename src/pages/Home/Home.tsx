import React from 'react';
import { Posts } from '../../components/Posts/Posts';

import styles from './Home.module.scss';

const data = [
  {
    id: '1',
    imageUrl:
      'https://images.pexels.com/photos/4050284/pexels-photo-4050284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Test title 1',
    text: 'test text 1',
    fullName: 'Test full name',
    views: 7,
    datePublished: '30th NOVEMBER 2022',
  },
  {
    id: '2',
    imageUrl:
      'https://images.pexels.com/photos/2433985/pexels-photo-2433985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Test title 2',
    text: 'test text 2',
    fullName: 'Test full name',
    views: 25,
    datePublished: '30th NOVEMBER 2022',
  },
  {
    id: '3',
    imageUrl:
      'https://images.pexels.com/photos/3875821/pexels-photo-3875821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Test title 3',
    text: 'test text 3',
    fullName: 'Test full name',
    views: 3,
    datePublished: '30th NOVEMBER 2022',
  },
  {
    id: '4',
    imageUrl:
      'https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Test title 4',
    text: 'test text 4',
    fullName: 'Test full name',
    views: 137,
    datePublished: '30th NOVEMBER 2022',
  },
];

export const Home: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.posts}>
        {data && data.map((post) => <Posts key={post.id} {...post} />)}
      </div>
    </div>
  );
};

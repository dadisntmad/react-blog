import React from 'react';

import ContentLoader from 'react-content-loader';

export const PostsLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={500}
      height={390}
      viewBox="0 0 500 390"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="0" rx="8" ry="8" width="500" height="390" />
    </ContentLoader>
  );
};

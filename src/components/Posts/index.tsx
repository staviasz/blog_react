import { PostCard } from '../PostCard';
import './style.css';

export const Post = ({ posts = [] }: { posts: Array<{ [key: string]: string | number }> }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

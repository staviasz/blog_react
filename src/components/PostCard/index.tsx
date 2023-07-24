import './style.css';

export const PostCard = ({ post }: { post: { [key: string]: string | number } }) => {
  return (
    <div className="post">
      <img src={post.cover.toString()} alt={post.title.toString()} />
      <div className="post-content">
        <h2>
          {post.title} {post.id}
        </h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

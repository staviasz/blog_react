import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Post } from '../../components/Posts';
import { loadPosts } from '../../services/loadPosts';
import './style.css';

export const Home = () => {
  const [posts, setPosts] = useState<{ [key: string]: string | number }[]>([]);
  const [allPosts, setAllPosts] = useState<{ [key: string]: string | number }[]>([]);
  const [page, setPage] = useState<number>(0);
  const [postPerPage] = useState<number>(2);
  const [searchValue, setSearchValue] = useState<string>('');

  const noMorePosts = page + postPerPage >= allPosts.length;

  const handleLoadPosts = useCallback(async (page: number, postPerPage: number): Promise<void> => {
    const postsAndPhotos: { [key: string]: string | number }[] = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = (): void => {
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return (post.title as string).toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  useEffect(() => {
    handleLoadPosts(0, postPerPage);
  }, [handleLoadPosts, postPerPage]);

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <>
            <h1>Search Value: {searchValue}</h1>
          </>
        )}
        <Input searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filteredPosts.length > 0 ? <Post posts={filteredPosts} /> : <p>There are no posts =(</p>}
      {/* <Post posts={filteredPosts} /> */}
      {!searchValue && (
        <div className="btn-container">
          <Button text="More posts" onClick={loadMorePosts} disabled={noMorePosts} />
        </div>
      )}
    </section>
  );
};

export default Home;

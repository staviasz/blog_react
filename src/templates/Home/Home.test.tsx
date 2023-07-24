import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '.';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body 2',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body 3',
        },
      ]),
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          url: 'img/img1.png',
        },
        {
          url: 'img/img2.png',
        },
        {
          url: 'img/img3.png',
        },
      ]),
    );
  }),
];
const server = setupServer(...handlers);

export {};
describe('<Home />', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.restoreHandlers());
  afterAll(() => server.close());

  it('should render search, post and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('There are no posts =(');
    await waitForElementToBeRemoved(noMorePosts);
    expect.assertions(3);
    const search = screen.getByPlaceholderText(/search/i);
    expect(search).toBeInTheDocument();
    const image = screen.getAllByRole('img', { name: /title/i });
    expect(image).toHaveLength(2);
    const button = screen.getByRole('button', { name: /More posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('There are no posts =(');
    await waitForElementToBeRemoved(noMorePosts);
    expect.assertions(10);
    const search = screen.getByPlaceholderText(/search/i);
    expect(screen.getByRole('heading', { name: 'title 1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2 2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 3 3' })).not.toBeInTheDocument();

    userEvent.type(search, 'title 1');
    expect(screen.getByRole('heading', { name: 'title 1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search Value: title 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 2 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 3 3' })).not.toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title 1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2 2' })).toBeInTheDocument();

    userEvent.type(search, 'abs');
    expect(screen.getByText('There are no posts =(')).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('There are no posts =(');
    await waitForElementToBeRemoved(noMorePosts);
    // expect.assertions(3);
    const button = screen.getByRole('button', { name: /More posts/i });
    expect(button).toBeInTheDocument();
    act(() => {
      userEvent.click(button);
    });
    expect(screen.getByRole('heading', { name: 'title 3 3' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});

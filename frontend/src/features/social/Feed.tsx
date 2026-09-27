'use client';

import { useEffect, useState } from 'react';
import { api, getToken } from '@/lib/api';

interface Post {
  id: string;
  content?: string | null;
  imageUrl?: string | null;
  createdAt: string;
  author: {
    id: string;
    username: string;
    displayName?: string | null;
    avatarUrl?: string | null;
    status?: string;
  };
}

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  async function loadFeed() {
    try {
      const data = await api<Post[]>('/posts/feed');
      setPosts(data);
    } catch {
      // silently fail if not logged in or no posts yet
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeed();
  }, []);

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || !getToken()) return;

    setPosting(true);
    setError('');
    try {
      const newPost = await api<Post>('/posts', {
        method: 'POST',
        body: JSON.stringify({ content: content.trim() }),
      });
      setPosts((prev) => [newPost, ...prev]);
      setContent('');
    } catch (err: any) {
      setError(err.message || 'Не удалось опубликовать');
    } finally {
      setPosting(false);
    }
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-bold text-white">Лента</h2>

      {/* Create post */}
      {getToken() && (
        <form onSubmit={handlePost} className="mb-6 rounded-xl border border-forge-border bg-forge-card p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Что у тебя нового? Поделись с сообществом..."
            rows={3}
            className="w-full resize-none rounded-lg border border-forge-border bg-forge-dark px-4 py-3 text-white placeholder-zinc-600 focus:border-wyvern-500 focus:outline-none focus:ring-1 focus:ring-wyvern-500"
          />
          {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={posting || !content.trim()}
              className="rounded-lg bg-wyvern-600 px-5 py-2 text-sm font-medium text-white hover:bg-wyvern-500 disabled:opacity-50 transition"
            >
              {posting ? 'Публикуем...' : 'Опубликовать'}
            </button>
          </div>
        </form>
      )}

      {/* Posts list */}
      {loading ? (
        <p className="text-center text-zinc-500 py-8">Загрузка ленты...</p>
      ) : posts.length === 0 ? (
        <div className="rounded-xl border border-forge-border bg-forge-card p-12 text-center text-zinc-500">
          Пока нет постов. Будь первым!
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-forge-border bg-forge-card p-5 transition hover:border-forge-border/80"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-500">
                  {post.author.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.author.avatarUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    (post.author.displayName || post.author.username)[0]?.toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">
                      {post.author.displayName || post.author.username}
                    </span>
                    <span className="text-sm text-zinc-500">@{post.author.username}</span>
                    <span className="text-xs text-zinc-600">· {formatDate(post.createdAt)}</span>
                  </div>
                  {post.content && (
                    <p className="mt-2 text-zinc-200 whitespace-pre-wrap">{post.content}</p>
                  )}
                  {post.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="mt-3 max-h-96 rounded-lg object-cover"
                    />
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

import { allWritings } from '.contentlayer/generated';
import { cn } from '@/lib/className';
import DateViewer from '@/ui/DateView';
import ExternalLink from '@/ui/ExternalLink';
import { pick } from 'contentlayer/client';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

async function getData() {
  const posts = allWritings
    .map((post) => pick(post, ['slug', 'title', 'summary', 'publishedAt']))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    )
    .slice(0, 3);

  return {
    props: {
      posts,
    },
  };
}

export default function Home() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-16 px-8">
      <Header />
      <AboutMe />
      <Suspense>
        <RecentWritings />
      </Suspense>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="relative h-12 w-12">
        <Image
          alt="Logo"
          className="rounded-full"
          layout="fill"
          objectFit="contain"
          src="/static/images/logo.png"
        />
        <div className="absolute -bottom-2 -right-2 rounded-full bg-white px-1 py-0.5 text-sm dark:bg-gray-900">
          ✨
        </div>
      </div>
      <div className="flex flex-col">
        <h1>Crețu</h1>
        <p className="text-quaternary">Design, Engineer</p>
      </div>
    </div>
  );
}

function AboutMe() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-tertiary">About me</p>
      <div className="text-secondary flex flex-col gap-4">
        <p>
          Passionate about crafting seamless, polished interfaces where design
          meets engineering.
        </p>
        <p>
          Working on multiple projects and apps; formerly at{' '}
          <ExternalLink arrow={false} href="http://example.com/">
            Moon
          </ExternalLink>{' '}
          developing the{' '}
          <ExternalLink href="http://example.com/">
            Tools for the Web
          </ExternalLink>{' '}
          , and at{' '}
          <ExternalLink arrow={false} href="http://discord.tokenup.store">
            TokenUp
          </ExternalLink>{' '}
          creating a good service.
        </p>
        <p>
          Currently studying Computer Science at BBU. Ardent in reading,
          writing, and improving consistently through learning.
        </p>
        <p>
          Check out my{' '}
          <Link className="underline" href={'/work'}>
            highlights and projects
          </Link>{' '}
          if you want to learn more about me.
        </p>
      </div>
    </div>
  );
}

async function RecentWritings() {
  const { posts } = (await getData()).props;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-tertiary">Recent writing</p>
      <div className="space-y-2">
        {posts.map((post) => (
          <Link
            className={cn(
              '-mx-2 flex flex-row justify-between rounded-md px-2 py-2',
              'hover:bg-gray-200 dark:hover:bg-gray-800',
              'transition-all duration-200',
            )}
            href={`/writing/${post.slug}`}
            key={post.slug}
          >
            <span className="text-secondary mr-2 flex-grow truncate">
              {post.title}
            </span>
            <span className="text-tertiary flex-shrink-0">
              <DateViewer date={post.publishedAt} />{' '}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}




// Ensure there's a newline at the end of the file
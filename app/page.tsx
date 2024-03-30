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
      <Contact />
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

function ContactLink({
  href,
  title,
  website,
  email,
}: {
  email?: string;
  href?: string;
  title: string;
  website?: string;
}) {
  return (
    <span className="block items-center gap-4">
      {website && <p className="text-quaternary">{website}</p>}
      {href && (
        <a
          className="text-secondary hover:text-primary transition-opacity duration-150"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {title}{' '}
          <svg
            className=" inline-block h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
      {email && (
        <p className="text-secondary hover:text-primary transition-opacity duration-150">
          {title}
        </p>
      )}
    </span>
  );
}

function Contact() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-tertiary">Links</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ContactLink
          href="https://X.com/"
          title="cristicrtu"
          website="X"
        />
        <ContactLink
          href="https://github.com/"
          title="cristicretu"
          website="GitHub"
        />
        <ContactLink
          href="https://www.figma.com/"
          title="cretu"
          website="Figma"
        />
        <ContactLink
          href="https://layers.to/"
          title="cretu"
          website="Layers.to"
        />
        <ContactLink
          email="admin[at]tokenup(dot)store"
          title="admin[at]tokenup(dot)store"
          website="Email"
        />
        <ContactLink href="https://discord.tokenup.store" title="cretu" website="Discord" />
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

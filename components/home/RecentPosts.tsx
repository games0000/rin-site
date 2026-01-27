"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

interface RecentPostsProps {
  title: string;
  posts: Post[];
  viewAllLink: string;
  delay?: number;
}

export default function RecentPosts({ title, posts, viewAllLink, delay = 0 }: RecentPostsProps) {
  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto mb-20 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <h2 className="text-2xl md:text-3xl font-serif text-white/90">{title}</h2>
        <Link href={viewAllLink} className="text-sm text-white/50 hover:text-white transition-colors">
          View All →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Link href={post.link} key={post.id}>
            <motion.div 
              className="group h-full p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-xs text-white/40 mb-3 font-mono">{post.date}</div>
              <h3 className="text-lg font-medium text-white/90 mb-3 group-hover:text-white transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-white/60 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

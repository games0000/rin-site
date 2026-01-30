import { config, fields, collection } from '@keystatic/core';

export default config({
  storage:
    process.env.NODE_ENV === 'development' || 
    !process.env.KEYSTATIC_GITHUB_CLIENT_ID || 
    !process.env.KEYSTATIC_GITHUB_CLIENT_SECRET || 
    !process.env.KEYSTATIC_SECRET
      ? { kind: 'local' }
      : {
          kind: 'github',
          repo: 'games0000/rin-site',
        },
  collections: {
    posts: collection({
      label: 'Plans',
      slugField: 'title',
      path: 'content/plans/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.text({ label: 'Publish Date' }), // Using text for simpler date handling matching existing format
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),
        content: fields.markdoc({
          label: 'Body',
          options: {
            image: {
              directory: 'public/images/plans',
              publicPath: '/images/plans',
            },
          },
        }),
      },
    }),
    letters: collection({
      label: 'Letters',
      slugField: 'title',
      path: 'content/letters/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.text({ label: 'Publish Date' }),
        color: fields.select({
          label: 'Color Theme',
          description: 'Background color style for the letter card',
          options: [
            { label: 'White/10 (Default)', value: 'bg-white/10' },
            { label: 'White/5', value: 'bg-white/5' },
            { label: 'Blue/10', value: 'bg-blue-500/10' },
            { label: 'Purple/10', value: 'bg-purple-500/10' },
          ],
          defaultValue: 'bg-white/10',
        }),
        content: fields.markdoc({
          label: 'Body',
          options: {
            image: {
              directory: 'public/images/letters',
              publicPath: '/images/letters',
            },
          },
        }),
      },
    }),
    timeline: collection({
      label: 'Timeline',
      slugField: 'title',
      path: 'content/timeline/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        dateString: fields.text({ label: 'Date String', description: 'e.g. Jan 27, 2026' }),
        year: fields.text({ label: 'Year' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Life', value: 'Life' },
            { label: 'Work', value: 'Work' },
            { label: 'Project', value: 'Project' },
            { label: 'Idea', value: 'Idea' },
          ],
          defaultValue: 'Life',
        }),
        content: fields.markdoc({
          label: 'Description',
          options: {
            image: {
              directory: 'public/images/timeline',
              publicPath: '/images/timeline',
            },
          },
        }),
      },
    }),
    notes: collection({
      label: 'Notes',
      slugField: 'title',
      path: 'content/notes/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.text({ label: 'Publish Date' }),
        content: fields.markdoc({
          label: 'Body',
          options: {
            image: {
              directory: 'public/images/notes',
              publicPath: '/images/notes',
            },
          },
        }),
      },
    }),
  },
});

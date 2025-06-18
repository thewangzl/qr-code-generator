import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ai-qr-code-generator.art',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // 如果有其他页面，可以在这里添加
  ]
} 
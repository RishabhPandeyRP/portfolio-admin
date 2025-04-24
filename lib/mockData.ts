import { Work } from '@/types/works'

export const mockWorks: Work[] = [
  {
    id: '1',
    title: 'Modern Portfolio Site',
    shortDescription: 'A stylish developer portfolio website.',
    description: 'This project showcases...',
    category: 'web',
    liveLink: 'https://example.com',
    techStack: ['Next.js', 'Tailwind', 'Prisma'],
    featured: true,
    createdAt: '2024-10-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Mobile Task App',
    shortDescription: 'A cross-platform task tracking app.',
    description: 'An intuitive app built using...',
    category: 'app',
    liveLink: undefined,
    techStack: ['Flutter', 'Firebase'],
    featured: false,
    createdAt: '2024-09-15T08:30:00Z',
    updatedAt: '2024-10-01T12:00:00Z'
  }
]


export const reviews = [
    {
      "id": "1",
      "name": "John Doe",
      "company": "Acme Corp",
      "position": "CEO",
      "feedback": "This is a great company to work with. They deliver top-quality solutions.",
      "rating": 5,
      "imageLink": "https://via.placeholder.com/150",
      "featured": true,
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    },
    {
      "id": "2",
      "name": "Jane Smith",
      "company": "Tech Innovators",
      "position": "CTO",
      "feedback": "I had an amazing experience collaborating with this team. Highly recommended!",
      "rating": 4,
      "imageLink": "https://via.placeholder.com/150",
      "featured": false,
      "createdAt": "2023-02-01T00:00:00Z",
      "updatedAt": "2023-02-01T00:00:00Z"
    },
    {
      "id": "3",
      "name": "Mark Johnson",
      "company": "DevWorks",
      "position": "Lead Developer",
      "feedback": "They understand the needs of the developers and provide an excellent work environment.",
      "rating": 5,
      "imageLink": "https://via.placeholder.com/150",
      "featured": false,
      "createdAt": "2023-03-01T00:00:00Z",
      "updatedAt": "2023-03-01T00:00:00Z"
    }
  ]
  
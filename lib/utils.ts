export function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(' ')
  }
  

  // /utils/api.ts
// export const fetchReviews = async () => {
//     // Returning dummy data
//     return [
//       {
//         id: "1",
//         name: "John Doe",
//         company: "Acme Corp",
//         position: "CEO",
//         feedback: "This is a great company to work with. They deliver top-quality solutions.",
//         rating: 5,
//         imageLink: "https://via.placeholder.com/150",
//         featured: true,
//         createdAt: "2023-01-01T00:00:00Z",
//         updatedAt: "2023-01-01T00:00:00Z",
//       },
//       {
//         id: "2",
//         name: "Jane Smith",
//         company: "Tech Innovators",
//         position: "CTO",
//         feedback: "I had an amazing experience collaborating with this team. Highly recommended!",
//         rating: 4,
//         imageLink: "https://via.placeholder.com/150",
//         featured: false,
//         createdAt: "2023-02-01T00:00:00Z",
//         updatedAt: "2023-02-01T00:00:00Z",
//       },
//       {
//         id: "3",
//         name: "Mark Johnson",
//         company: "DevWorks",
//         position: "Lead Developer",
//         feedback: "They understand the needs of the developers and provide an excellent work environment.",
//         rating: 5,
//         imageLink: "https://via.placeholder.com/150",
//         featured: false,
//         createdAt: "2023-03-01T00:00:00Z",
//         updatedAt: "2023-03-01T00:00:00Z",
//       },
//     ];
//   };
  
//   export const fetchReview = async (id: string) => {
//     const reviews = await fetchReviews();
//     return reviews.find((review) => review.id === id);
//   };
  
//   export const createReview = async (data: any) => {
//     // Simulate API call to create review
//     return { ...data, id: Math.random().toString() };
//   };
  
//   export const updateReview = async (id: string, data: any) => {
//     // Simulate API call to update review
//     return { ...data, id };
//   };
  
//   export const deleteReview = async () => {
//     // Simulate deleting a review
//     return { success: true };
//   };
  
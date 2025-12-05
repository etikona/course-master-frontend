// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/hooks/useRedux";
// import { useStudentsAPI } from "@/hooks/useAPI";
// import Link from "next/link";
// import {
//   FiBook,
//   FiCheckCircle,
//   FiClock,
//   FiBarChart2,
//   FiCalendar,
//   FiTrendingUp,
// } from "react-icons/fi";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import ProgressBar from "@/components/student/ProgressBar";

// export default function StudentDashboard() {
//   const { user } = useAuth();
//   const { loading, error, data, getDashboard } = useStudentsAPI();
//   const [dashboardData, setDashboardData] = useState(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     const response = await getDashboard();
//     if (response?.data) {
//       setDashboardData(response.data);
//     }
//   };

//   if (loading && !dashboardData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">Error: {error}</p>
//           <button onClick={fetchDashboardData} className="btn-primary">
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const stats = dashboardData?.stats || {};
//   const enrollments = dashboardData?.enrollments || [];
//   const recentActivity = dashboardData?.recentActivity || [];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//             <div>
//               <h1 className="text-3xl font-bold">
//                 Welcome back, {user?.name}!
//               </h1>
//               <p className="text-primary-100 mt-2">
//                 Continue your learning journey
//               </p>
//             </div>
//             <div className="mt-4 md:mt-0">
//               <Link
//                 href="/courses"
//                 className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//               >
//                 Browse More Courses
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="container mx-auto px-4 -mt-8">
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="card p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Total Courses</p>
//                 <p className="text-3xl font-bold mt-2">
//                   {stats.totalCourses || 0}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
//                 <FiBook className="w-6 h-6 text-primary-600" />
//               </div>
//             </div>
//           </div>

//           <div className="card p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Completed</p>
//                 <p className="text-3xl font-bold mt-2">
//                   {stats.completedCourses || 0}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <FiCheckCircle className="w-6 h-6 text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="card p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">In Progress</p>
//                 <p className="text-3xl font-bold mt-2">
//                   {stats.inProgressCourses || 0}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                 <FiClock className="w-6 h-6 text-yellow-600" />
//               </div>
//             </div>
//           </div>

//           <div className="card p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Avg. Progress</p>
//                 <p className="text-3xl font-bold mt-2">
//                   {enrollments.length > 0
//                     ? Math.round(
//                         enrollments.reduce(
//                           (acc, curr) => acc + (curr.progress || 0),
//                           0
//                         ) / enrollments.length
//                       )
//                     : 0}
//                   %
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                 <FiTrendingUp className="w-6 h-6 text-purple-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Enrolled Courses */}
//           <div className="lg:col-span-2">
//             <div className="card">
//               <div className="p-6 border-b">
//                 <h2 className="text-xl font-bold flex items-center">
//                   <FiBook className="mr-2" /> My Courses
//                 </h2>
//               </div>
//               <div className="p-6">
//                 {enrollments.length === 0 ? (
//                   <div className="text-center py-8">
//                     <p className="text-gray-600 mb-4">
//                       You have not enrolled in any courses yet
//                     </p>
//                     <Link href="/courses" className="btn-primary inline-block">
//                       Browse Courses
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {enrollments.map((enrollment) => (
//                       <div
//                         key={enrollment._id}
//                         className="p-4 border rounded-lg hover:bg-gray-50"
//                       >
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <Link
//                               href={`/student/my-courses/${enrollment.course?._id}`}
//                               className="font-semibold text-lg hover:text-primary-600"
//                             >
//                               {enrollment.course?.title}
//                             </Link>
//                             <div className="flex items-center mt-2 text-sm text-gray-600">
//                               <span className="mr-4">
//                                 Instructor:{" "}
//                                 {enrollment.course?.instructor?.name}
//                               </span>
//                               <span>
//                                 Enrolled:{" "}
//                                 {new Date(
//                                   enrollment.enrolledAt
//                                 ).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <span className="text-2xl font-bold text-primary-600">
//                               {enrollment.progress}%
//                             </span>
//                           </div>
//                         </div>
//                         <ProgressBar
//                           progress={enrollment.progress}
//                           className="mt-3"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="card mt-6">
//               <div className="p-6 border-b">
//                 <h2 className="text-xl font-bold flex items-center">
//                   <FiCalendar className="mr-2" /> Recent Activity
//                 </h2>
//               </div>
//               <div className="p-6">
//                 {recentActivity.length === 0 ? (
//                   <p className="text-gray-600 text-center py-4">
//                     No recent activity
//                   </p>
//                 ) : (
//                   <div className="space-y-4">
//                     {recentActivity.map((activity, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
//                       >
//                         <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
//                           <FiBarChart2 className="w-5 h-5 text-primary-600" />
//                         </div>
//                         <div>
//                           <p className="font-medium">
//                             Progress updated in {activity.courseTitle}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             {activity.progress}% completed
//                           </p>
//                         </div>
//                         <div className="ml-auto text-sm text-gray-500">
//                           {new Date(activity.lastAccessed).toLocaleDateString()}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div>
//             {/* Quick Stats */}
//             <div className="card mb-6">
//               <div className="p-6 border-b">
//                 <h3 className="font-bold">Learning Summary</h3>
//               </div>
//               <div className="p-6 space-y-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Learning Hours</p>
//                   <p className="text-2xl font-bold">24h 30m</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Last Active</p>
//                   <p className="text-lg font-medium">2 hours ago</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Streak</p>
//                   <p className="text-lg font-medium">7 days</p>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="card">
//               <div className="p-6 border-b">
//                 <h3 className="font-bold">Quick Actions</h3>
//               </div>
//               <div className="p-6 space-y-3">
//                 <Link
//                   href="/courses"
//                   className="block w-full btn-secondary text-center"
//                 >
//                   Find New Courses
//                 </Link>
//                 <button className="block w-full btn-primary">
//                   Update Profile
//                 </button>
//                 <button className="block w-full btn-secondary">
//                   View Certificates
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

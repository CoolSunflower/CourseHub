export interface Course {
  courseCode: string;
  title: string;
  instructors: string;
  language: string;
  duration: string;
  fee: number;
  rating: string;
  description: string;
  skills: string[];
  subject: string;
  category: string;
  enrollURL: string;
}

export interface CourseData {
  [key: string]: Course;
}

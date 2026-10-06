import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICourse {
    _id: string;
    title: string;
    slug: string;
    shortDescription?: string;
    description?: string;
    thumbnail?: string;
    banner?: string;
    category?: string;
    tags?: string[];
    price?: number;
    originalPrice?: number | null;
    level?: "beginner" | "intermediate" | "advanced" | "all";
    mode?: "recorded" | "live" | "hybrid";
    unlockMode?: "free" | "sequential";
    instructorName?: string;
    outcomes?: string[];
    requirements?: string[];
    status?: "draft" | "published" | "archived";
    isPublished?: boolean;
    isFeatured?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICourseClass {
    _id: string;
    courseId: string | ICourse;
    name: string;
    code?: string;
    status?: "upcoming" | "ongoing" | "completed" | "cancelled";
    startAt?: string | null;
    endAt?: string | null;
    enrollmentOpenAt?: string | null;
    enrollmentCloseAt?: string | null;
    recordEndsAt?: string | null;
    capacity?: number | null;
    meetingUrl?: string;
    location?: string;
    isPublished?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface IChapter {
    _id: string;
    courseId: string;
    title: string;
    description?: string;
    order: number;
    isPublished?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ILessonResource {
    title: string;
    url: string;
    type?: string;
}

export interface ILesson {
    _id: string;
    courseId: string;
    chapterId: string | IChapter;
    title: string;
    description?: string;
    type?: "video" | "text" | "live" | "download";
    videoUrl?: string;
    content?: string;
    durationSeconds?: number;
    order: number;
    isPreview?: boolean;
    isPublished?: boolean;
    resources?: ILessonResource[];
    isCompleted?: boolean;
    isLocked?: boolean;
    lastPosition?: number;
    watchedSeconds?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IEnrollment {
    _id: string;
    userId?: string;
    courseId: string | ICourse;
    courseClassId?: string | ICourseClass | null;
    status?: "active" | "completed" | "expired" | "cancelled";
    progress?: number;
    isCompleted?: boolean;
    lastLessonId?: string | null;
    lastAccessedAt?: string | null;
    accessStartsAt?: string | null;
    accessEndsAt?: string | null;
    completedAt?: string | null;
    source?: "manual" | "order" | "free";
    orderId?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICourseStats {
    totalLessons: number;
    completedLessons: number;
    progress: number;
}

export interface ICourseDetail {
    course?: ICourse;
    classes?: ICourseClass[];
    chapters?: IChapter[];
    lessons?: ILesson[];
}

export interface ICourseLearningState {
    course?: ICourse;
    courseClass?: ICourseClass | null;
    enrollment?: IEnrollment;
    chapters?: IChapter[];
    lessons?: ILesson[];
    stats?: ICourseStats;
    nextLessonId?: string | null;
}

interface IinitialState {
    courses?: ICourse[];
    courseDetail?: ICourseDetail;
    myCourses?: IEnrollment[];
    learningState?: ICourseLearningState;
    adminCourses?: ICourse[];
}

const initialState: IinitialState = {
    courses: undefined,
    courseDetail: undefined,
    myCourses: undefined,
    learningState: undefined,
    adminCourses: undefined,
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        getAllCourses: (state, action: PayloadAction<any>) => {
            state.courses = action.payload.courses;
        },
        getCourseDetail: (state, action: PayloadAction<any>) => {
            state.courseDetail = action.payload.courseDetail;
        },
        getMyCourses: (state, action: PayloadAction<any>) => {
            state.myCourses = action.payload.myCourses;
        },
        getCourseLearningState: (state, action: PayloadAction<any>) => {
            state.learningState = action.payload.learningState;
        },
        getAdminCourses: (state, action: PayloadAction<any>) => {
            state.adminCourses = action.payload.adminCourses;
        },
        updateLessonProgress: (state, action: PayloadAction<any>) => {
            if (!state.learningState?.lessons) return;

            const lesson = state.learningState.lessons.find(
                (item) => item._id === action.payload.lessonId
            );

            if (!lesson) return;

            if (action.payload.lastPosition !== undefined) {
                lesson.lastPosition = action.payload.lastPosition;
            }

            if (action.payload.watchedSeconds !== undefined) {
                lesson.watchedSeconds = action.payload.watchedSeconds;
            }
        },
        clearCourseDetail: (state) => {
            state.courseDetail = undefined;
        },
        clearCourseLearningState: (state) => {
            state.learningState = undefined;
        },
    },
});

export const {
    getAllCourses,
    getCourseDetail,
    getMyCourses,
    getCourseLearningState,
    getAdminCourses,
    updateLessonProgress,
    clearCourseDetail,
    clearCourseLearningState,
} = courseSlice.actions;

export default courseSlice.reducer;

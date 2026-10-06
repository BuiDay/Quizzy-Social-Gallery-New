import { apiSlice } from "../api/apiSlice";
import {
    getAllCourses,
    getCourseDetail,
    getMyCourses,
    getCourseLearningState,
    getAdminCourses,
    updateLessonProgress,
} from "./courseSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        /* ======================================================
           PUBLIC
           ====================================================== */
        getLessonVideoUrl:
            builder.mutation<
                {
                    url: string;
                },
                {
                    lessonId: string;
                    courseClassId?: string;
                }
            >({
                query: ({
                    lessonId,
                    courseClassId,
                }) => ({
                    url: courseClassId
                        ? `/courses/classes/${courseClassId}/lessons/${lessonId}/video-url`
                        : `/courses/lessons/${lessonId}/video-url`,

                    method: "GET",
                }),
            }),
        getCourses: builder.mutation({
            query: (query = {}) => ({
                url: "courses",
                method: "GET",
                params: query,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    dispatch(
                        getAllCourses({
                            courses: result.data.courses,
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        getCourseById: builder.mutation({
            query: (slugOrId) => ({
                url: `courses/${slugOrId}`,
                method: "GET",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    dispatch(
                        getCourseDetail({
                            courseDetail: {
                                course: result.data.course,
                                classes: result.data.classes || [],
                                chapters: result.data.chapters || [],
                                lessons: result.data.lessons || [],
                            },
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        /* ======================================================
           USER
           ====================================================== */

        getMyCourses: builder.mutation({
            query: () => ({
                url: "courses/my-courses",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    dispatch(
                        getMyCourses({
                            myCourses: result.data.courses,
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        getCourseLearningState: builder.mutation({
            query: ({ courseId, courseClassId }) => ({
                url: courseClassId
                    ? `courses/${courseId}/classes/${courseClassId}`
                    : `courses/${courseId}/learn`,
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    dispatch(
                        getCourseLearningState({
                            learningState: {
                                course: result.data.course,
                                courseClass: result.data.courseClass || null,
                                enrollment: result.data.enrollment,
                                chapters: result.data.chapters || [],
                                lessons: result.data.lessons || [],
                                stats: result.data.stats,
                                nextLessonId: result.data.nextLessonId || null,
                            },
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        saveLessonProgress: builder.mutation({
            query: ({
                courseId,
                courseClassId,
                lessonId,
                lastPosition,
                watchedSeconds,
            }) => ({
                url: courseClassId
                    ? `courses/${courseId}/classes/${courseClassId}/lessons/${lessonId}/progress`
                    : `courses/${courseId}/lessons/${lessonId}/progress`,
                method: "POST",
                body: {
                    lastPosition,
                    watchedSeconds,
                },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const progress = result.data.progress;

                    dispatch(
                        updateLessonProgress({
                            lessonId: arg.lessonId,
                            lastPosition:
                                progress?.lastPosition ?? arg.lastPosition,
                            watchedSeconds:
                                progress?.watchedSeconds ?? arg.watchedSeconds,
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        completeLesson: builder.mutation({
            query: ({ courseId, courseClassId, lessonId }) => ({
                url: courseClassId
                    ? `courses/${courseId}/classes/${courseClassId}/lessons/${lessonId}/complete`
                    : `courses/${courseId}/lessons/${lessonId}/complete`,
                method: "POST",
                credentials: "include" as const,
            }),
        }),

        /* ======================================================
           ADMIN — COURSE
           ====================================================== */

        getAdminCourses: builder.mutation({
            query: () => ({
                url: "courses/admin/all",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    dispatch(
                        getAdminCourses({
                            adminCourses: result.data.courses,
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        createCourse: builder.mutation({
            query: (body) => ({
                url: "courses/admin",
                method: "POST",
                body,
                credentials: "include" as const,
            }),
        }),

        updateCourse: builder.mutation({
            query: ({ courseId, body }) => ({
                url: `courses/admin/${courseId}`,
                method: "PUT",
                body,
                credentials: "include" as const,
            }),
        }),

        deleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `courses/admin/${courseId}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),

        /* ======================================================
           ADMIN — CLASS
           ====================================================== */

        createCourseClass: builder.mutation({
            query: ({ courseId, body }) => ({
                url: `courses/admin/${courseId}/classes`,
                method: "POST",
                body,
                credentials: "include" as const,
            }),
        }),

        updateCourseClass: builder.mutation({
            query: ({ classId, body }) => ({
                url: `courses/admin/classes/${classId}`,
                method: "PUT",
                body,
                credentials: "include" as const,
            }),
        }),

        deleteCourseClass: builder.mutation({
            query: (classId) => ({
                url: `courses/admin/classes/${classId}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),

        /* ======================================================
           ADMIN — CHAPTER
           ====================================================== */

        createChapter: builder.mutation({
            query: ({ courseId, body }) => ({
                url: `courses/admin/${courseId}/chapters`,
                method: "POST",
                body,
                credentials: "include" as const,
            }),
        }),

        updateChapter: builder.mutation({
            query: ({ chapterId, body }) => ({
                url: `courses/admin/chapters/${chapterId}`,
                method: "PUT",
                body,
                credentials: "include" as const,
            }),
        }),

        deleteChapter: builder.mutation({
            query: (chapterId) => ({
                url: `courses/admin/chapters/${chapterId}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),

        /* ======================================================
           ADMIN — LESSON
           ====================================================== */

        createLesson: builder.mutation({
            query: ({ courseId, chapterId, body }) => ({
                url: `courses/admin/${courseId}/chapters/${chapterId}/lessons`,
                method: "POST",
                body,
                credentials: "include" as const,
            }),
        }),

        updateLesson: builder.mutation({
            query: ({ lessonId, body }) => ({
                url: `courses/admin/lessons/${lessonId}`,
                method: "PUT",
                body,
                credentials: "include" as const,
            }),
        }),

        deleteLesson: builder.mutation({
            query: (lessonId) => ({
                url: `courses/admin/lessons/${lessonId}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),

        /* ======================================================
           ADMIN — ENROLLMENT
           ====================================================== */

        enrollUser: builder.mutation({
            query: (body) => ({
                url: "courses/admin/enrollments",
                method: "POST",
                body,
                credentials: "include" as const,
            }),
        }),

        revokeEnrollment: builder.mutation({
            query: (enrollmentId) => ({
                url: `courses/admin/enrollments/${enrollmentId}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetCoursesMutation,
    useGetCourseByIdMutation,
    useGetMyCoursesMutation,
    useGetCourseLearningStateMutation,
    useSaveLessonProgressMutation,
    useCompleteLessonMutation,
    useGetLessonVideoUrlMutation,
    useGetAdminCoursesMutation,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,

    useCreateCourseClassMutation,
    useUpdateCourseClassMutation,
    useDeleteCourseClassMutation,

    useCreateChapterMutation,
    useUpdateChapterMutation,
    useDeleteChapterMutation,

    useCreateLessonMutation,
    useUpdateLessonMutation,
    useDeleteLessonMutation,

    useEnrollUserMutation,
    useRevokeEnrollmentMutation,
} = courseApi;

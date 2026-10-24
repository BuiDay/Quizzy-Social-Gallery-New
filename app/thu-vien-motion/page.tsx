"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import UserAuth from "@/hook/userAuth";
import {
  useGetCourseByIdMutation,
  useGetMyCoursesMutation,
} from "@/redux/features/course/courseApi";
import MotionLibraryApp from "@/components/motion-library/MotionLibraryApp";

import styles from "@/components/motion-library/AccessGate.module.css";

/*
 * Có thể dùng _id hoặc slug của khóa học.
 *
 * .env.local:
 * NEXT_PUBLIC_MOTION_LIBRARY_COURSE_ID=YOUR_COURSE_ID_OR_SLUG
 */
const COURSE_SLUG_OR_ID ="6ac289e84500cbae43734a94"

type CourseRef =
  | string
  | {
      _id?: string;
      id?: string;
      slug?: string;
      title?: string;
    }
  | null
  | undefined;

type Enrollment = {
  _id?: string;
  id?: string;

  courseId?: CourseRef;

  courseClassId?:
    | string
    | {
        _id?: string;
        id?: string;
      }
    | null;

  progress?: number;
  isCompleted?: boolean;
};

type CourseResponse = {
  course?: {
    _id?: string;
    id?: string;
    slug?: string;
    title?: string;
  };
};

type MyCoursesResponse =
  | Enrollment[]
  | {
      courses?: Enrollment[];
      enrollments?: Enrollment[];
      data?: {
        courses?: Enrollment[];
        enrollments?: Enrollment[];
      };
    };

type AccessState =
  | "checking"
  | "allowed"
  | "denied"
  | "error";

const entityId = (
  value: CourseRef,
) => {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  return String(
    value._id ??
      value.id ??
      "",
  );
};

const entitySlug = (
  value: CourseRef,
) => {
  if (
    !value ||
    typeof value === "string"
  ) {
    return "";
  }

  return String(
    value.slug ?? "",
  );
};

const normalizeEnrollments = (
  response: MyCoursesResponse,
): Enrollment[] => {
  if (Array.isArray(response)) {
    return response;
  }

  if (
    Array.isArray(
      response?.courses,
    )
  ) {
    return response.courses;
  }

  if (
    Array.isArray(
      response?.enrollments,
    )
  ) {
    return response.enrollments;
  }

  if (
    Array.isArray(
      response?.data?.courses,
    )
  ) {
    return response.data.courses;
  }

  if (
    Array.isArray(
      response?.data?.enrollments,
    )
  ) {
    return response.data.enrollments;
  }

  return [];
};

function AccessScreen({
  eyebrow,
  title,
  text,
  loading = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  loading?: boolean;
}) {
  return (
    <main className={styles.screen}>
      <section className={styles.card}>
        <div className={styles.eyebrow}>
          {eyebrow}
        </div>

        <h1 className={styles.title}>
          {title}
        </h1>

        {loading ? (
          <div
            className={`${styles.text} ${styles.loading}`}
          >
            <span className={styles.dot} />
            {text}
          </div>
        ) : (
          <>
            <p className={styles.text}>
              {text}
            </p>

            <Link
              className={styles.action}
              href="/collections"
            >
              Về bộ sưu tập
            </Link>
          </>
        )}
      </section>
    </main>
  );
}

export default function MotionLibraryPage() {
  const isAuthenticated =
    UserAuth();

  const [
    getCourseById,
  ] =
    useGetCourseByIdMutation();

  const [
    getMyCourses,
  ] =
    useGetMyCoursesMutation();

  const [
    accessState,
    setAccessState,
  ] =
    useState<AccessState>(
      "checking",
    );

  const [
    accessError,
    setAccessError,
  ] =
    useState("");

  /*
   * Resolve slug -> course _id trước.
   *
   * Enrollment lưu courseId, nên dùng _id thật để match
   * sẽ chắc chắn hơn việc so slug.
   */
  useEffect(() => {
    if (!isAuthenticated) {
      setAccessState("denied");
      setAccessError("");
      return;
    }

    if (!COURSE_SLUG_OR_ID) {
      setAccessState("error");
      setAccessError(
        "Chưa cấu hình NEXT_PUBLIC_MOTION_LIBRARY_COURSE_ID.",
      );
      return;
    }

    let active = true;

    setAccessState("checking");
    setAccessError("");

    const checkEnrollment =
      async () => {
        try {
          /*
           * 1. GET course detail để resolve _id thật.
           *
           * API này KHÔNG dùng để check enrollment.
           */
          const courseResponse =
            (await getCourseById(
              COURSE_SLUG_OR_ID,
            ).unwrap()) as CourseResponse;

          if (!active) return;

          const course =
            courseResponse?.course;

          const resolvedCourseId =
            String(
              course?._id ??
                course?.id ??
                "",
            );

          const resolvedCourseSlug =
            String(
              course?.slug ??
                "",
            );

          if (!resolvedCourseId) {
            throw new Error(
              "Không lấy được course _id.",
            );
          }

          /*
           * 2. GET /courses/my-courses
           *
           * Đây mới là API lấy ENROLLMENT của user.
           */
          const myCoursesResponse =
            (await getMyCourses(
              {},
            ).unwrap()) as MyCoursesResponse;

          if (!active) return;

          const enrollments =
            normalizeEnrollments(
              myCoursesResponse,
            );

          /*
           * courseId có thể:
           * - string ObjectId
           * - populated object { _id, slug, ... }
           *
           * Nên hỗ trợ cả hai.
           */
          const enrollment =
            enrollments.find(
              (item) => {
                const id =
                  entityId(
                    item.courseId,
                  );

                const slug =
                  entitySlug(
                    item.courseId,
                  );

                return (
                  id ===
                    resolvedCourseId ||
                  id ===
                    COURSE_SLUG_OR_ID ||
                  slug ===
                    resolvedCourseSlug ||
                  slug ===
                    COURSE_SLUG_OR_ID
                );
              },
            );

          console.log(
            "[MotionLibrary] course:",
            {
              resolvedCourseId,
              resolvedCourseSlug,
            },
          );

          console.log(
            "[MotionLibrary] enrollments:",
            enrollments,
          );

          console.log(
            "[MotionLibrary] matched enrollment:",
            enrollment,
          );

          if (enrollment) {
            setAccessState(
              "allowed",
            );
            return;
          }

          setAccessState(
            "denied",
          );
        } catch (error) {
          if (!active) return;

          console.error(
            "[MotionLibrary] enrollment check failed:",
            error,
          );

          setAccessState(
            "error",
          );

          setAccessError(
            "Không thể kiểm tra enrollment của khóa học. Vui lòng thử lại.",
          );
        }
      };

    void checkEnrollment();

    return () => {
      active = false;
    };
  }, [
    getCourseById,
    getMyCourses,
    isAuthenticated,
  ]);

  if (!isAuthenticated) {
    return (
      <AccessScreen
        eyebrow="Members only"
        title="Bạn cần đăng nhập"
        text="Trang Thư viện Motion Quizzy chỉ hiển thị cho tài khoản đã đăng nhập và đã được enroll vào khóa học."
      />
    );
  }

  if (
    accessState ===
    "checking"
  ) {
    return (
      <AccessScreen
        eyebrow="QCC Mastery · Motion Library"
        title="Đang kiểm tra quyền truy cập"
        text="Đang kiểm tra enrollment của khóa học…"
        loading
      />
    );
  }

  if (
    accessState ===
    "error"
  ) {
    return (
      <AccessScreen
        eyebrow="Access check"
        title="Không thể kiểm tra quyền truy cập"
        text={
          accessError ||
          "Không thể kiểm tra enrollment của khóa học."
        }
      />
    );
  }

  if (
    accessState ===
    "denied"
  ) {
    return (
      <AccessScreen
        eyebrow="Enrollment required"
        title="Bạn chưa có quyền truy cập"
        text="Tài khoản hiện tại chưa có enrollment của khóa học này."
      />
    );
  }

  return (
    <MotionLibraryApp />
  );
}

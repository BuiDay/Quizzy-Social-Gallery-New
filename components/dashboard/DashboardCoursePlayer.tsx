"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
  useSearchParams,
} from "next/navigation";

import {
  FiArrowLeft,
  FiCheck,
  FiClock,
  FiLock,
  FiPlay,
} from "react-icons/fi";

import {
  dashboardRequest,
  entityId,
  useDashboardData,
  type DashboardCourse,
} from "./DashboardDataProvider";


type Chapter = {
  _id?: string;
  id?: string;

  title?: string;

  order?: number;
};

type Lesson = {
  _id?: string;
  id?: string;

  chapterId?:
    | string
    | {
        _id?: string;
        id?: string;
      };

  title?: string;

  type?: string;

  duration?: number | string;

  order?: number;

  videoUrl?: string;

  isCompleted?: boolean;

  isLocked?: boolean;

  watchedSeconds?: number;

  lastPosition?: number;
};

type LearningState = {
  course?: DashboardCourse;

  courseClass?: {
    _id?: string;
    id?: string;
    name?: string;
    meetingUrl?: string;
  };

  chapters?: Chapter[];

  lessons?: Lesson[];

  enrollment?: {
    progress?: number;
    isCompleted?: boolean;
  };

  stats?: {
    totalLessons?: number;
    completedLessons?: number;
    progress?: number;
  };

  nextLessonId?: string | null;
};


const idOf = (
  value: unknown,
) =>
  entityId(value);


export function DashboardCoursePlayer() {
  const params =
    useParams();

  const searchParams =
    useSearchParams();

  const {
    courses,
    token,
    reloadRemote,
  } =
    useDashboardData();

  const courseId =
    String(
      params.courseId ?? "",
    );

  const enrollment =
    courses.find(
      (item) =>
        entityId(
          item.courseId,
        ) === courseId,
    );

  const classIdFromUrl =
    searchParams.get(
      "classId",
    ) || "";

  const courseClassId =
    classIdFromUrl ||
    entityId(
      enrollment?.courseClassId,
    );

  const [
    state,
    setState,
  ] =
    useState<
      LearningState | null
    >(null);

  const [
    selectedLessonId,
    setSelectedLessonId,
  ] = useState("");

  const [
    videoUrl,
    setVideoUrl,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    videoLoading,
    setVideoLoading,
  ] = useState(false);

  const [
    completing,
    setCompleting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const lastSentSecond =
    useRef(-1);


  /* ============================================================
     PATH
     ============================================================ */

  const learningPath =
    courseClassId
      ? `/courses/${courseId}/classes/${courseClassId}`
      : `/courses/${courseId}`;

  const progressPath = (
    lessonId: string,
  ) =>
    courseClassId
      ? `/courses/${courseId}/classes/${courseClassId}/lessons/${lessonId}/progress`
      : `/courses/${courseId}/lessons/${lessonId}/progress`;

  const completePath = (
    lessonId: string,
  ) =>
    courseClassId
      ? `/courses/${courseId}/classes/${courseClassId}/lessons/${lessonId}/complete`
      : `/courses/${courseId}/lessons/${lessonId}/complete`;


  /* ============================================================
     LOAD STATE
     ============================================================ */

  const loadCourse =
    useCallback(async () => {
      if (!courseId) return;

      try {
        setLoading(true);
        setError("");

        const result =
          await dashboardRequest<
            LearningState
          >(
            learningPath,
            token,
          );

        setState(result);

        const lessons =
          result.lessons ??
          [];

        const firstLesson =
          result.nextLessonId ||
          lessons.find(
            (lesson) =>
              !lesson.isLocked &&
              !lesson.isCompleted,
          )?._id ||
          lessons.find(
            (lesson) =>
              !lesson.isLocked,
          )?._id ||
          "";

        setSelectedLessonId(
          (current) =>
            current ||
            String(
              firstLesson,
            ),
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Không thể tải khóa học.",
        );
      } finally {
        setLoading(false);
      }
    }, [
      courseId,
      learningPath,
      token,
    ]);

  useEffect(() => {
    void loadCourse();
  }, [loadCourse]);


  /* ============================================================
     SELECTED LESSON
     ============================================================ */

  const lessons =
    state?.lessons ?? [];

  const selectedLesson =
    lessons.find(
      (lesson) =>
        idOf(lesson) ===
        selectedLessonId,
    ) ?? null;


  /* ============================================================
     VIDEO URL
     ============================================================ */

  useEffect(() => {
    let cancelled = false;

    const loadVideo =
      async () => {
        if (!selectedLesson) {
          setVideoUrl("");

          return;
        }

        if (
          selectedLesson.videoUrl
        ) {
          setVideoUrl(
            selectedLesson.videoUrl,
          );

          return;
        }

        if (
          !courseClassId
        ) {
          setVideoUrl("");

          return;
        }

        try {
          setVideoLoading(
            true,
          );

          const result =
            await dashboardRequest<{
              url?: string;
              videoUrl?: string;
              signedUrl?: string;
            }>(
              `/courses/classes/${courseClassId}/lessons/${idOf(
                selectedLesson,
              )}/video-url`,
              token,
            );

          if (!cancelled) {
            setVideoUrl(
              result.videoUrl ||
                result.signedUrl ||
                result.url ||
                "",
            );
          }
        } catch {
          if (!cancelled) {
            setVideoUrl("");
          }
        } finally {
          if (!cancelled) {
            setVideoLoading(
              false,
            );
          }
        }
      };

    void loadVideo();

    return () => {
      cancelled = true;
    };
  }, [
    courseClassId,
    selectedLesson,
    token,
  ]);


  /* ============================================================
     GROUP CHAPTERS
     ============================================================ */

  const groups =
    useMemo(() => {
      const chapters =
        [...(state?.chapters ??
          [])].sort(
          (a, b) =>
            Number(
              a.order ?? 0,
            ) -
            Number(
              b.order ?? 0,
            ),
        );

      if (!chapters.length) {
        return [
          {
            id: "all",
            title:
              "Nội dung khóa học",
            lessons: [...lessons].sort(
              (a, b) =>
                Number(
                  a.order ?? 0,
                ) -
                Number(
                  b.order ?? 0,
                ),
            ),
          },
        ];
      }

      return chapters.map(
        (chapter) => {
          const chapterId =
            idOf(chapter);

          return {
            id: chapterId,

            title:
              chapter.title ||
              "Chương",

            lessons:
              lessons
                .filter(
                  (lesson) =>
                    idOf(
                      lesson.chapterId,
                    ) ===
                    chapterId,
                )
                .sort(
                  (a, b) =>
                    Number(
                      a.order ??
                        0,
                    ) -
                    Number(
                      b.order ??
                        0,
                    ),
                ),
          };
        },
      );
    }, [
      lessons,
      state?.chapters,
    ]);


  /* ============================================================
     SAVE VIDEO PROGRESS
     ============================================================ */

  const saveWatchingProgress =
    async (
      currentTime: number,
    ) => {
      if (
        !selectedLessonId
      ) {
        return;
      }

      const second =
        Math.floor(
          currentTime,
        );

      if (
        second < 1 ||
        second %
          10 !==
          0 ||
        second ===
          lastSentSecond.current
      ) {
        return;
      }

      lastSentSecond.current =
        second;

      try {
        await dashboardRequest(
          progressPath(
            selectedLessonId,
          ),
          token,
          {
            method: "POST",

            body: JSON.stringify({
              lastPosition:
                second,

              watchedSeconds:
                second,
            }),
          },
        );
      } catch {
        // silent autosave
      }
    };


  /* ============================================================
     COMPLETE
     ============================================================ */

  const completeLesson =
    async () => {
      if (
        !selectedLessonId ||
        completing
      ) {
        return;
      }

      try {
        setCompleting(true);

        await dashboardRequest(
          completePath(
            selectedLessonId,
          ),
          token,
          {
            method: "POST",
          },
        );

        await loadCourse();

        await reloadRemote();

        const currentIndex =
          lessons.findIndex(
            (lesson) =>
              idOf(lesson) ===
              selectedLessonId,
          );

        const next =
          lessons
            .slice(
              currentIndex + 1,
            )
            .find(
              (lesson) =>
                !lesson.isLocked,
            );

        if (next) {
          setSelectedLessonId(
            idOf(next),
          );
        }
      } finally {
        setCompleting(false);
      }
    };


  /* ============================================================
     LOADING
     ============================================================ */

//   if (loading) {
//     return (
//       <div className="ud-player-loading">
//         <span />
//         Đang tải khóa học...
//       </div>
//     );
//   }


//   if (error) {
//     return (
//       <div className="ud-player-error">
//         <h2>
//           Không thể mở khóa học
//         </h2>

//         <p>
//           {error}
//         </p>

//         <Link href="/collections/courses">
//           Quay lại khóa học
//         </Link>
//       </div>
//     );
//   }


  const progress =
    Number(
      state?.stats?.progress ??
        state?.enrollment
          ?.progress ??
        enrollment?.progress ??
        0,
    );


  return (
    <div className="ud-player-page">

      {/* TOP */}

      <div className="ud-player-header">

        <div>
          <Link
            href="/collections/courses"
            className="ud-player-back"
          >
            <FiArrowLeft />

            Khóa học của tôi
          </Link>

          <h1>
            {state?.course
              ?.title ||
              "Khóa học"}
          </h1>

          {state?.courseClass
            ?.name && (
            <p>
              {
                state
                  .courseClass
                  .name
              }
            </p>
          )}
        </div>


        <div className="ud-player-progress-card">
          <div>
            <span>
              Tiến độ
            </span>

            <strong>
              {progress}%
            </strong>
          </div>

          <div>
            <i
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>


      {/* BODY */}

      <div className="ud-player-layout">

        {/* VIDEO */}

        <section className="ud-player-stage">

          <div className="ud-player-video">
            {videoLoading ? (
              <div className="ud-player-video__empty">
                Đang tải video...
              </div>
            ) : videoUrl ? (
              <video
                key={videoUrl}
                src={videoUrl}
                controls
                playsInline
                onLoadedMetadata={(
                  event,
                ) => {
                  if (
                    selectedLesson
                      ?.lastPosition
                  ) {
                    event.currentTarget.currentTime =
                      Number(
                        selectedLesson.lastPosition,
                      );
                  }
                }}
                onTimeUpdate={(
                  event,
                ) =>
                  void saveWatchingProgress(
                    event
                      .currentTarget
                      .currentTime,
                  )
                }
              />
            ) : (
              <div className="ud-player-video__empty">
                <FiPlay />

                <strong>
                  {
                    selectedLesson?.title
                  }
                </strong>

                <span>
                  Bài học này chưa có
                  video hoặc là một
                  session trực tiếp.
                </span>
              </div>
            )}
          </div>


          <div className="ud-player-lesson-info">
            <div>
              <small>
                BÀI HỌC HIỆN TẠI
              </small>

              <h2>
                {selectedLesson
                  ?.title ||
                  "Chọn một bài học"}
              </h2>
            </div>

            {selectedLesson &&
              !selectedLesson.isCompleted &&
              !selectedLesson.isLocked && (
              <button
                type="button"
                onClick={
                  completeLesson
                }
                disabled={
                  completing
                }
                data-cur="OPEN"
              >
                <FiCheck />

                {completing
                  ? "Đang lưu..."
                  : "Hoàn thành bài"}
              </button>
            )}

            {selectedLesson
              ?.isCompleted && (
              <span className="ud-player-completed">
                <FiCheck />
                Đã hoàn thành
              </span>
            )}
          </div>
        </section>


        {/* CURRICULUM */}

        <aside className="ud-curriculum">
          <div className="ud-curriculum__head">
            <span>
              COURSE CONTENT
            </span>

            <strong>
              {state?.stats
                ?.completedLessons ??
                0}
              /
              {state?.stats
                ?.totalLessons ??
                lessons.length}
            </strong>
          </div>

          {groups.map(
            (
              group,
              chapterIndex,
            ) => (
              <section
                key={group.id}
                className="ud-curriculum-group"
              >
                <div className="ud-curriculum-group__title">
                  <span>
                    {String(
                      chapterIndex +
                        1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <strong>
                    {
                      group.title
                    }
                  </strong>
                </div>

                <div>
                  {group.lessons.map(
                    (
                      lesson,
                      index,
                    ) => {
                      const id =
                        idOf(
                          lesson,
                        );

                      const active =
                        id ===
                        selectedLessonId;

                      return (
                        <button
                          key={
                            id
                          }
                          type="button"
                          className={`ud-lesson ${
                            active
                              ? "is-active"
                              : ""
                          } ${
                            lesson.isCompleted
                              ? "is-completed"
                              : ""
                          }`}
                          disabled={
                            lesson.isLocked
                          }
                          onClick={() => {
                            if (
                              !lesson.isLocked
                            ) {
                              lastSentSecond.current =
                                -1;

                              setSelectedLessonId(
                                id,
                              );
                            }
                          }}
                        >
                          <span className="ud-lesson__icon">
                            {lesson.isLocked ? (
                              <FiLock />
                            ) : lesson.isCompleted ? (
                              <FiCheck />
                            ) : (
                              <FiPlay />
                            )}
                          </span>

                          <span className="ud-lesson__copy">
                            <small>
                              Bài{" "}
                              {index +
                                1}
                            </small>

                            <strong>
                              {
                                lesson.title
                              }
                            </strong>
                          </span>

                          {lesson.duration && (
                            <span className="ud-lesson__duration">
                              <FiClock />

                              {
                                lesson.duration
                              }
                            </span>
                          )}
                        </button>
                      );
                    },
                  )}
                </div>
              </section>
            ),
          )}
        </aside>

      </div>
    </div>
  );
}
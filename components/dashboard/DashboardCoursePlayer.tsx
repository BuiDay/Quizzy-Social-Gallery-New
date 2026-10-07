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
  useCompleteLessonMutation,
  useGetCourseLearningStateMutation,
  useGetMyCoursesMutation,
  useSaveLessonProgressMutation,
} from "@/redux/features/course/courseApi";


type Course = {
  _id?: string;
  id?: string;
  title?: string;
};


type Chapter = {
  _id?: string;
  id?: string;

  title?: string;

  order?: number;
};


type LessonResource = {
  title?: string;
  name?: string;

  url?: string;

  type?:
    | "file"
    | "link"
    | "pdf";
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
  durationSeconds?: number | string;

  order?: number;

  videoUrl?: string;

  isCompleted?: boolean;

  isLocked?: boolean;

  watchedSeconds?: number;

  lastPosition?: number;

  resources?: LessonResource[];
};


type LearningState = {
  course?: Course;

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



type BunnyTimingData = {
  seconds?: number;
  duration?: number;
};



type MyCourseEnrollment = {
  courseId?:
    | string
    | {
        _id?: string;
        id?: string;
      };

  courseClassId?:
    | string
    | {
        _id?: string;
        id?: string;
      }
    | null;
};


const idOf = (
  value: unknown,
) => {
  if (!value) return "";

  if (
    typeof value === "string"
  ) {
    return value;
  }

  if (
    typeof value === "object"
  ) {
    const item = value as {
      _id?: unknown;
      id?: unknown;
    };

    return String(
      item._id ??
        item.id ??
        "",
    );
  }

  return String(value);
};


const normalizeLearningState = (
  value: unknown,
): LearningState => {
  const result =
    (value ?? {}) as LearningState;

  return {
    ...result,

    chapters:
      result.chapters ?? [],

    lessons:
      (result.lessons ?? []).map(
        (lesson) => ({
          ...lesson,

          duration:
            lesson.duration ??
            lesson.durationSeconds,
        }),
      ),
  };
};



const getBunnyEmbedUrl = (
  value: string,
) => {
  if (!value) return "";

  try {
    const url = new URL(value);

    /*
      Bunny Direct Play URL:
      https://player.mediadelivery.net/play/{libraryId}/{videoId}

      Player.js works with the Bunny Embed iframe URL:
      https://iframe.mediadelivery.net/embed/{libraryId}/{videoId}
    */
    if (
      url.hostname ===
        "player.mediadelivery.net" &&
      url.pathname.startsWith(
        "/play/",
      )
    ) {
      const parts =
        url.pathname
          .split("/")
          .filter(Boolean);

      const libraryId =
        parts[1] || "";

      const videoId =
        parts[2] || "";

      if (
        libraryId &&
        videoId
      ) {
        const embedUrl =
          new URL(
            `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}`,
          );

        /* Preserve any existing query parameters if Bunny adds them. */
        url.searchParams.forEach(
          (paramValue, key) => {
            embedUrl.searchParams.set(
              key,
              paramValue,
            );
          },
        );

        return embedUrl.toString();
      }
    }

    return value;
  } catch {
    return value;
  }
};


export function DashboardCoursePlayer() {
  const params =
    useParams();

  const searchParams =
    useSearchParams();

  const courseId =
    String(
      params.courseId ?? "",
    );

  const classIdFromUrl =
    searchParams.get(
      "classId",
    ) || "";

  const [
    resolvedCourseClassId,
    setResolvedCourseClassId,
  ] = useState("");

  const courseClassId =
    classIdFromUrl ||
    resolvedCourseClassId;


  /* ============================================================
     REDUX COURSE API
     ============================================================ */

  const [
    getMyCourses,
  ] =
    useGetMyCoursesMutation();

  const [
    getCourseLearningState,
  ] =
    useGetCourseLearningStateMutation();

  const [
    saveLessonProgress,
  ] =
    useSaveLessonProgressMutation();

  const [
    completeLessonApi,
  ] =
    useCompleteLessonMutation();


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

  const completionLock = useRef(false);

  const lastSentSecond =
    useRef(-1);

  const bunnyIframeRef =
    useRef<HTMLIFrameElement | null>(
      null,
    );


  const bunnyCurrentTimeRef =
    useRef(0);

  const bunnyDurationRef =
    useRef(0);

  const autoplayNextRef =
    useRef(false);

  const bunnyCompletionTriggeredRef =
    useRef(false);


  const [
    bunnyIframeLoaded,
    setBunnyIframeLoaded,
  ] = useState(false);


  /* ============================================================
     LOAD STATE — REDUX API
     ============================================================ */

  const loadCourse =
    useCallback(async () => {
      if (!courseId) {
        return null;
      }

      try {
        setLoading(true);
        setError("");

        let activeCourseClassId =
          classIdFromUrl ||
          resolvedCourseClassId;

        /*
          Nếu URL không có classId, lấy enrollment hiện tại
          để resolve class cho course live / hybrid.
          Với recorded course thì courseClassId sẽ để trống.
        */
        if (!activeCourseClassId) {
          try {
            const myCoursesResult =
              await getMyCourses(
                {},
              ).unwrap();

            const enrollments =
              Array.isArray(
                myCoursesResult
                  ?.courses,
              )
                ? (myCoursesResult.courses as MyCourseEnrollment[])
                : [];

            const enrollment =
              enrollments.find(
                (item) =>
                  idOf(
                    item.courseId,
                  ) ===
                  courseId,
              );

            const enrollmentClassId =
              idOf(
                enrollment
                  ?.courseClassId,
              );

            if (
              enrollmentClassId
            ) {
              activeCourseClassId =
                enrollmentClassId;

              setResolvedCourseClassId(
                enrollmentClassId,
              );
            }
          } catch {
            /*
              Không chặn recorded course nếu request my-courses lỗi.
              API learning state phía dưới vẫn là nguồn kiểm tra access chính.
            */
          }
        }

        const rawResult =
          await getCourseLearningState(
            {
              courseId,

              courseClassId:
                activeCourseClassId ||
                undefined,
            },
          ).unwrap();

        const result =
          normalizeLearningState(
            rawResult,
          );

        setState(result);

        const lessons =
          result.lessons ?? [];

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
          (current) => {
            const currentStillExists =
              lessons.some(
                (lesson) =>
                  idOf(lesson) ===
                  current,
              );

            if (
              current &&
              currentStillExists
            ) {
              return current;
            }

            return String(
              firstLesson,
            );
          },
        );

        return result;
      } catch (err: any) {
        setError(
          err?.data?.message ||
            err?.error ||
            err?.message ||
            "Không thể tải khóa học.",
        );

        return null;
      } finally {
        setLoading(false);
      }
    }, [
      classIdFromUrl,
      courseId,
      getCourseLearningState,
      getMyCourses,
      resolvedCourseClassId,
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

  const lessonResources =
    selectedLesson?.resources ?? [];

  const bunnyEmbedUrl =
    useMemo(
      () =>
        getBunnyEmbedUrl(
          videoUrl,
        ),
      [videoUrl],
    );

  useEffect(() => {
    bunnyCompletionTriggeredRef.current =
      false;

    bunnyCurrentTimeRef.current = 0;
    bunnyDurationRef.current = 0;
  }, [selectedLessonId]);

  const getResourceUrl = (
    resource: LessonResource,
  ) =>
    resource.url || "";

  const getResourceTitle = (
    resource: LessonResource,
  ) =>
    resource.title ||
    resource.name ||
    "Tài liệu";


  /* ============================================================
     VIDEO URL
     ============================================================ */

  useEffect(() => {
    setVideoLoading(true);
    setBunnyIframeLoaded(false);

    if (!selectedLesson) {
      setVideoUrl("");
      setVideoLoading(false);

      return;
    }

    /*
      API learning state đã trả videoUrl cho lesson được mở quyền.
      Lesson bị lock sẽ bị backend bỏ videoUrl.
    */
    setVideoUrl(
      selectedLesson.videoUrl ||
        "",
    );

    setVideoLoading(false);
  }, [selectedLesson]);


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
     SAVE VIDEO PROGRESS — REDUX API
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
        (
          lastSentSecond.current >= 0 &&
          second - lastSentSecond.current < 10
        )
      ) {
        return;
      }

      lastSentSecond.current =
        second;

      try {
        await saveLessonProgress(
          {
            courseId,

            courseClassId:
              courseClassId ||
              undefined,

            lessonId:
              selectedLessonId,

            lastPosition:
              second,

            watchedSeconds:
              second,
          },
        ).unwrap();
      } catch {
        // silent autosave
      }
    };


  /* ============================================================
     COMPLETE — REDUX API
     ============================================================ */

  const completeLesson = async (finalPosition?: number) => {
    if (!selectedLessonId || selectedLesson?.isLocked || completionLock.current) return;
    const lessonId = selectedLessonId;
    completionLock.current = true;
    setCompleting(true);
    setError("");

    try {
      // onTimeUpdate only saves every 10 seconds. Save the final position too.
      if (finalPosition !== undefined && Number.isFinite(finalPosition)) {
        const second = Math.max(0, Math.floor(finalPosition));
        await saveLessonProgress({
          courseId,
          courseClassId: courseClassId || undefined,
          lessonId,
          lastPosition: second,
          watchedSeconds: second,
        }).unwrap();
      }

      // The backend owns completion and unlocking permissions.
      if (!selectedLesson?.isCompleted) {
        await completeLessonApi({
          courseId,
          courseClassId: courseClassId || undefined,
          lessonId,
        }).unwrap();
      }

      const refreshedState = await loadCourse();
      if (!refreshedState) return;

      // Match the order displayed in the chapter sidebar.
      const chapterOrder = new Map(
        (refreshedState.chapters ?? []).map((chapter) => [idOf(chapter), Number(chapter.order ?? 0)]),
      );
      const refreshedLessons = [...(refreshedState.lessons ?? [])].sort((a, b) =>
        (chapterOrder.get(idOf(a.chapterId)) ?? 0) - (chapterOrder.get(idOf(b.chapterId)) ?? 0) ||
        Number(a.order ?? 0) - Number(b.order ?? 0),
      );
      const currentIndex = refreshedLessons.findIndex((lesson) => idOf(lesson) === lessonId);
      const next = currentIndex >= 0 ? refreshedLessons[currentIndex + 1] : undefined;

      if (next && !next.isLocked) {
        lastSentSecond.current = -1;
        autoplayNextRef.current = true;
        setSelectedLessonId((current) => current === lessonId ? idOf(next) : current);
      }
    } catch (err: unknown) {
      const failure = err as { data?: { message?: string }; message?: string };
      setError(failure?.data?.message || failure?.message || "Không thể lưu hoàn thành bài học. Vui lòng thử lại.");
    } finally {
      completionLock.current = false;
      setCompleting(false);
    }
  };

  const handleVideoEnded = (
    finalPosition?: number,
  ) => {
    void completeLesson(
      finalPosition,
    );
  };


  /* ============================================================
     BUNNY STREAM — DIRECT PLAYER.JS POSTMESSAGE PROTOCOL
     ============================================================ */

  /*
    Không dùng player-0.1.0.min.js nữa.

    Lý do:
    Khi React đổi bài, iframe cũ bị unmount. Player.js global listener
    của instance cũ vẫn có thể nhận message và cố postMessage vào
    iframe đã bị xoá => "Cannot read properties of null (reading 'postMessage')".

    Bunny Stream hỗ trợ chuẩn Player.js qua window.postMessage, nên
    component giao tiếp trực tiếp với iframe. Như vậy không có instance
    Player.js cũ bị treo khi chuyển lesson.
  */
  useEffect(() => {
    if (
      !bunnyEmbedUrl ||
      !bunnyIframeLoaded
    ) {
      return;
    }

    const iframe =
      bunnyIframeRef.current;

    if (
      !iframe ||
      !iframe.contentWindow
    ) {
      return;
    }

    let destroyed = false;

    const PLAYER_CONTEXT =
      "player.js";

    const PLAYER_VERSION =
      "0.0.11";

    const listenerPrefix =
      `qcc-${selectedLessonId}`;

    const sendToBunny = (
      method: string,
      value?: unknown,
      listener?: string,
    ) => {
      const target =
        bunnyIframeRef.current
          ?.contentWindow;

      if (
        destroyed ||
        !target
      ) {
        return;
      }

      const message: Record<
        string,
        unknown
      > = {
        context:
          PLAYER_CONTEXT,
        version:
          PLAYER_VERSION,
        method,
      };

      if (
        value !== undefined
      ) {
        message.value =
          value;
      }

      if (listener) {
        message.listener =
          listener;
      }

      target.postMessage(
        JSON.stringify(
          message,
        ),
        "*",
      );
    };

    const subscribe = () => {
      sendToBunny(
        "addEventListener",
        "timeupdate",
        `${listenerPrefix}-timeupdate`,
      );

      sendToBunny(
        "addEventListener",
        "ended",
        `${listenerPrefix}-ended`,
      );

      sendToBunny(
        "addEventListener",
        "play",
        `${listenerPrefix}-play`,
      );

      sendToBunny(
        "addEventListener",
        "pause",
        `${listenerPrefix}-pause`,
      );
    };

    const restoreAndAutoplay =
      () => {
        const lastPosition =
          Number(
            selectedLesson
              ?.lastPosition ??
              0,
          );

        if (
          lastPosition > 0
        ) {
          sendToBunny(
            "setCurrentTime",
            lastPosition,
            `${listenerPrefix}-seek`,
          );
        }

        if (
          autoplayNextRef.current
        ) {
          autoplayNextRef.current =
            false;

          sendToBunny(
            "play",
            undefined,
            `${listenerPrefix}-play-command`,
          );
        }
      };

    const processTiming = (
      currentTimeValue: unknown,
      durationValue: unknown,
    ) => {
      const currentTime =
        Number(
          currentTimeValue ??
            0,
        );

      const duration =
        Number(
          durationValue ??
            bunnyDurationRef.current,
        );

      if (
        Number.isFinite(
          currentTime,
        ) &&
        currentTime >= 0
      ) {
        bunnyCurrentTimeRef.current =
          currentTime;

        void saveWatchingProgress(
          currentTime,
        );
      }

      if (
        Number.isFinite(
          duration,
        ) &&
        duration > 0
      ) {
        bunnyDurationRef.current =
          duration;

        const remaining =
          duration -
          currentTime;

        const reachedEnd =
          currentTime > 0 &&
          (
            currentTime /
              duration >=
              0.99 ||
            remaining <= 1.5
          );

        if (
          reachedEnd &&
          !bunnyCompletionTriggeredRef.current
        ) {
          bunnyCompletionTriggeredRef.current =
            true;

          void completeLesson(
            duration,
          );
        }
      }
    };

    const handleMessage = (
      event: MessageEvent,
    ) => {
      if (
        destroyed ||
        event.source !==
          bunnyIframeRef.current
            ?.contentWindow
      ) {
        return;
      }

      let data: any =
        event.data;

      if (
        typeof data ===
        "string"
      ) {
        try {
          data =
            JSON.parse(
              data,
            );
        } catch {
          return;
        }
      }

      if (
        !data ||
        data.context !==
          PLAYER_CONTEXT
      ) {
        return;
      }

      if (
        data.event ===
        "ready"
      ) {
        /*
          Subscribe lại khi Bunny báo ready để tránh trường hợp
          iframe load xong nhưng receiver chưa sẵn sàng ở lần gửi đầu.
        */
        subscribe();
        restoreAndAutoplay();

        return;
      }

      if (
        data.event ===
        "timeupdate"
      ) {
        const value =
          data.value ?? {};

        processTiming(
          value.seconds,
          value.duration,
        );

        return;
      }

      if (
        data.event ===
        "ended"
      ) {
        if (
          bunnyCompletionTriggeredRef.current
        ) {
          return;
        }

        bunnyCompletionTriggeredRef.current =
          true;

        const finalPosition =
          bunnyDurationRef.current >
          0
            ? bunnyDurationRef.current
            : bunnyCurrentTimeRef.current;

        void completeLesson(
          finalPosition,
        );
      }
    };

    window.addEventListener(
      "message",
      handleMessage,
    );

    /*
      onLoad của iframe đã chạy trước effect này. Gửi subscription ngay,
      rồi gửi lại sau 300ms/1200ms để cover trường hợp Bunny receiver
      chưa ready tại đúng thời điểm React effect chạy.
    */
    subscribe();

    const timer1 =
      window.setTimeout(
        () => {
          subscribe();
          restoreAndAutoplay();
        },
        300,
      );

    const timer2 =
      window.setTimeout(
        () => {
          subscribe();
        },
        1200,
      );

    return () => {
      destroyed = true;

      window.clearTimeout(
        timer1,
      );

      window.clearTimeout(
        timer2,
      );

      window.removeEventListener(
        "message",
        handleMessage,
      );
    };
  }, [
    bunnyEmbedUrl,
    bunnyIframeLoaded,
    selectedLessonId,
    selectedLesson?.lastPosition,
  ]);


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
              <iframe
                id={`bunny-stream-${selectedLessonId}`}
                ref={bunnyIframeRef}
                key={bunnyEmbedUrl}
                src={bunnyEmbedUrl}
                title={
                  selectedLesson?.title ||
                  "Course video"
                }
                loading="eager"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                onLoad={() =>
                  setBunnyIframeLoaded(true)
                }
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
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

            {error && <p role="alert" className="ud-player-error">{error}</p>}

            {selectedLesson &&
              !selectedLesson.isCompleted &&
              !selectedLesson.isLocked && (
              <div>
                {/* <FiCheck /> */}

                {completing
                  ? "Đang lưu..."
                  : ""}
              </div>
            )}

            {selectedLesson
              ?.isCompleted && (
              <span className="ud-player-completed">
                <FiCheck />
                Đã hoàn thành
              </span>
            )}
          </div>

          {lessonResources.length > 0 && (
            <div className="ud-player-resources">
              <div className="ud-player-resources__head">
                <small>
                  TÀI LIỆU BÀI HỌC
                </small>

                <span>
                  {lessonResources.length} tài liệu
                </span>
              </div>

              <div className="ud-player-resources__list">
                {lessonResources.map(
                  (resource, index) => {
                    const url =
                      getResourceUrl(
                        resource,
                      );

                    const title =
                      getResourceTitle(
                        resource,
                      );

                    return (
                      <a
                        key={`${title}-${index}`}
                        href={
                          url || undefined
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ud-player-resource"
                        aria-disabled={!url}
                        onClick={(event) => {
                          if (!url) {
                            event.preventDefault();
                          }
                        }}
                        data-cur={
                          url
                            ? "OPEN"
                            : undefined
                        }
                      >
                        <div>
                          <span className="ud-player-resource__icon">
                            {resource.type ===
                            "pdf"
                              ? "PDF"
                              : resource.type ===
                                  "link"
                                ? "LINK"
                                : "FILE"}
                          </span>

                          <div>
                            <strong>
                              {title}
                            </strong>

                            <small>
                              {resource.type ===
                              "pdf"
                                ? "Tài liệu PDF"
                                : resource.type ===
                                    "link"
                                  ? "Liên kết tài liệu"
                                  : "Tài liệu đính kèm"}
                            </small>
                          </div>
                        </div>

                        <span>
                          {url
                            ? "Mở ↗"
                            : "Chưa có link"}
                        </span>
                      </a>
                    );
                  },
                )}
              </div>
            </div>
          )}
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

                              autoplayNextRef.current =
                                false;

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
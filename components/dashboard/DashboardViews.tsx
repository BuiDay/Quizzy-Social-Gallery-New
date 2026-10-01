"use client";

import {
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  FiArrowUpRight,
  FiBookOpen,
  FiCheck,
  FiCreditCard,
  FiFileText,
  FiSearch,
} from "react-icons/fi";

import {
  AuthModal,
  type AuthMode,
} from "@/components/auth/AuthModal";

import {
  useLogoutMutation,
} from "@/redux/features/auth/authApi";

import {
  dashboardRequest,
  entityId,
  getCourse,
  getCourseClass,
  useDashboardData,
  type DashboardOrder,
} from "./DashboardDataProvider";


/* ============================================================
   HELPERS
   ============================================================ */

const money = (
  value?: number,
) =>
  `${new Intl.NumberFormat(
    "vi-VN",
  ).format(
    Number(value ?? 0),
  )}đ`;

const formatDate = (
  value?: string | null,
) => {
  if (!value) return "—";

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "—";
  }

  return date.toLocaleDateString(
    "vi-VN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  );
};

const documentHref = (
  document: {
    _id: string;
    url?: string;
    descriptionLink?: string;
  },
) => {
  const href =
    document.url ||
    document.descriptionLink;

  if (!href) {
    return `/products/${document._id}`;
  }

  if (
    /^https?:\/\//i.test(
      href,
    )
  ) {
    return href;
  }

  return href.startsWith("/")
    ? href
    : `/${href}`;
};

const courseHref = (
  enrollment: {
    courseId: unknown;
    courseClassId?: unknown;
  },
) => {
  const courseId =
    entityId(
      enrollment.courseId,
    );

  const classId =
    entityId(
      enrollment.courseClassId,
    );

  if (!courseId) {
    return "#";
  }

  return `/collections/courses/${courseId}${
    classId
      ? `?classId=${classId}`
      : ""
  }`;
};

const statusText = (
  status?: string,
) => {
  switch (status) {
    case "paid":
      return "Đã thanh toán";

    case "pending":
      return "Chờ thanh toán";

    case "failed":
      return "Thất bại";

    case "cancelled":
      return "Đã hủy";

    case "refunded":
      return "Đã hoàn tiền";

    default:
      return status || "—";
  }
};


/* ============================================================
   COMMON PAGE HEAD
   ============================================================ */

function PageHead({
  kicker,
  title,
  description,
  action,
}: {
  kicker: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="ud-page-head">
      <div>
        <span className="ud-kicker">
          <i />

          {kicker}
        </span>

        <h1>
          {title}
        </h1>

        <p>
          {description}
        </p>
      </div>

      {action && (
        <div className="ud-page-head__action">
          {action}
        </div>
      )}
    </header>
  );
}


/* ============================================================
   OVERVIEW
   ============================================================ */

export function DashboardOverview() {
  const {
    user,
    documents,
    courses,
    orders,

    documentsLoading,
    coursesLoading,
    ordersLoading,
  } =
    useDashboardData();

  const completedCourses =
    courses.filter(
      (course) =>
        course.isCompleted ||
        Number(
          course.progress ??
            0,
        ) >= 100,
    ).length;

  const paidOrders =
    orders.filter(
      (order) =>
        order.status ===
        "paid",
    ).length;

  const firstName =
    user?.name
      ?.trim()
      .split(/\s+/)
      .slice(-1)[0] ||
    "bạn";

  return (
    <div className="ud-page">

      <section className="ud-overview-hero">
        <div>
          <span>
            WELCOME BACK ✦
          </span>

          <h1>
            XIN CHÀO,
            <br />

            <strong>
              {firstName}.
            </strong>
          </h1>

          <p>
            Tiếp tục tài liệu,
            khóa học và những
            nội dung bạn đã mở
            khóa tại Quizzy
            Social Gallery.
          </p>
        </div>

        <div
          className="ud-overview-hero__art"
          aria-hidden="true"
        >
          <span>✱</span>

          <div>
            YOUR
            <br />
            LIBRARY
          </div>
        </div>
      </section>


      {/* STATS */}

      <section className="ud-stats-grid">

        <Link
          href="/collections/documents"
          className="ud-stat-card"
          data-cur="OPEN"
        >
          <span>
            TÀI LIỆU
          </span>

          <strong>
            {documentsLoading
              ? "—"
              : String(
                  documents.length,
                ).padStart(
                  2,
                  "0",
                )}
          </strong>

          <small>
            Đã sở hữu
          </small>

          <FiArrowUpRight />
        </Link>


        <Link
          href="/collections/courses"
          className="ud-stat-card ud-stat-card--purple"
          data-cur="OPEN"
        >
          <span>
            KHÓA HỌC
          </span>

          <strong>
            {coursesLoading
              ? "—"
              : String(
                  courses.length,
                ).padStart(
                  2,
                  "0",
                )}
          </strong>

          <small>
            Đã đăng ký
          </small>

          <FiArrowUpRight />
        </Link>


        <div className="ud-stat-card ud-stat-card--lime">
          <span>
            HOÀN THÀNH
          </span>

          <strong>
            {coursesLoading
              ? "—"
              : String(
                  completedCourses,
                ).padStart(
                  2,
                  "0",
                )}
          </strong>

          <small>
            Khóa học
          </small>

          <FiCheck />
        </div>


        <Link
          href="/collections/transactions"
          className="ud-stat-card ud-stat-card--dark"
          data-cur="OPEN"
        >
          <span>
            GIAO DỊCH
          </span>

          <strong>
            {ordersLoading
              ? "—"
              : String(
                  paidOrders,
                ).padStart(
                  2,
                  "0",
                )}
          </strong>

          <small>
            Thành công
          </small>

          <FiArrowUpRight />
        </Link>

      </section>


      {/* COURSES */}

      <section className="ud-dashboard-section">
        <div className="ud-section-head">
          <div>
            <span>
              CONTINUE LEARNING
            </span>

            <h2>
              Khóa học của bạn
            </h2>
          </div>

          <Link
            href="/collections/courses"
            data-cur="hover"
          >
            Xem tất cả
            <FiArrowUpRight />
          </Link>
        </div>

        {coursesLoading ? (
          <DashboardSkeleton
            count={2}
          />
        ) : courses.length ? (
          <div className="ud-course-row">
            {courses
              .slice(0, 2)
              .map(
                (
                  enrollment,
                ) => (
                  <CourseCard
                    key={
                      enrollment._id ||
                      `${entityId(
                        enrollment.courseId,
                      )}-${entityId(
                        enrollment.courseClassId,
                      )}`
                    }
                    enrollment={
                      enrollment
                    }
                  />
                ),
              )}
          </div>
        ) : (
          <EmptyState
            icon={
              <FiBookOpen />
            }
            title="Chưa có khóa học"
            description="Các khóa học đã đăng ký sẽ xuất hiện tại đây."
            href="/courses"
            action="Khám phá khóa học"
          />
        )}
      </section>


      {/* DOCUMENTS */}

      <section className="ud-dashboard-section">
        <div className="ud-section-head">
          <div>
            <span>
              MY DOCUMENTS
            </span>

            <h2>
              Tài liệu gần đây
            </h2>
          </div>

          <Link
            href="/collections/documents"
            data-cur="hover"
          >
            Xem tất cả
            <FiArrowUpRight />
          </Link>
        </div>

        {documentsLoading ? (
          <DashboardSkeleton
            count={3}
          />
        ) : documents.length ? (
          <div className="ud-document-mini-grid">
            {documents
              .slice(0, 3)
              .map(
                (document) => (
                  <DocumentMiniCard
                    key={
                      document._id
                    }
                    document={
                      document
                    }
                  />
                ),
              )}
          </div>
        ) : (
          <EmptyState
            icon={
              <FiFileText />
            }
            title="Chưa có tài liệu"
            description="Tài liệu bạn đã mua hoặc kích hoạt sẽ xuất hiện tại đây."
            href="/products"
            action="Khám phá tài liệu"
          />
        )}
      </section>

    </div>
  );
}


/* ============================================================
   DOCUMENTS PAGE
   ============================================================ */

export type CollectionDocument = {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  thumnail?: string;
  url?: string;
  urlUpdate?: string;
  instructionLink?: string;
  isCombo?: boolean;
};

type DashboardDocumentsProps = {
  documents: CollectionDocument[];
  documentsLoading?: boolean;
  documentsError?: boolean;
  onRetry?: () => void;
};

export function DashboardDocuments({
  documents: collections,
  documentsLoading = false,
  documentsError = false,
  onRetry,
}: DashboardDocumentsProps) {
  const documents = useMemo(() => collections.filter((document) => !document.isCombo), [collections]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    category,
    setCategory,
  ] =
    useState("Tất cả");

  const categories =
    useMemo(
      () => [
        "Tất cả",

        ...Array.from(
          new Set(
            documents
              .map(
                (document) =>
                  document.category,
              )
              .filter(
                Boolean,
              ) as string[],
          ),
        ),
      ],
      [documents],
    );

  const filtered =
    useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      return documents.filter(
        (document) => {
          const matchSearch =
            !keyword ||
            document.name
              .toLowerCase()
              .includes(
                keyword,
              ) ||
            document.description
              ?.toLowerCase()
              .includes(
                keyword,
              );

          const matchCategory =
            category ===
              "Tất cả" ||
            document.category ===
              category;

          return (
            matchSearch &&
            matchCategory
          );
        },
      );
    }, [
      category,
      documents,
      search,
    ]);

  return (
    <div className="ud-page">
      <PageHead
        kicker="MY DOCUMENTS"
        title="Tài liệu của tôi"
        description="Toàn bộ tài liệu, template và sản phẩm số bạn đã mua hoặc kích hoạt."
        action={
          <Link
            href="/products"
            className="ud-primary-button"
            data-cur="OPEN"
          >
            Khám phá thêm
            <FiArrowUpRight />
          </Link>
        }
      />


      <div className="ud-toolbar">
        <label className="ud-search">
          <FiSearch />

          <input
            type="search"
            value={search}
            placeholder="Tìm tài liệu..."
            onChange={(
              event,
            ) =>
              setSearch(
                event.target
                  .value,
              )
            }
          />
        </label>

        <div className="ud-filters">
          {categories.map(
            (item) => (
              <button
                type="button"
                key={item}
                className={
                  category ===
                  item
                    ? "is-active"
                    : ""
                }
                onClick={() =>
                  setCategory(
                    item,
                  )
                }
              >
                {item}
              </button>
            ),
          )}
        </div>
      </div>


      {documentsLoading ? (
        <DashboardSkeleton
          count={6}
        />
      ) : documentsError ? (
        <div role="alert" className="ud-empty">
          <h3>Không tải được bộ sưu tập</h3>
          <p>Vui lòng thử lại.</p>
          {onRetry && <button type="button" className="ud-primary-button" onClick={onRetry}>Thử lại</button>}
        </div>
      ) : filtered.length ? (
        <div className="ud-documents-grid">
          {filtered.map(
            (document) => (
              <article
                key={
                  document._id
                }
                className="ud-document-card"
              >
                <a
                  href={document.url || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ud-document-card__image"
                  data-cur="OPEN"
                >
                  {document.thumnail ? (
                    <img
                      src={
                        document.thumnail
                      }
                      alt=""
                    />
                  ) : (
                    <div className="ud-document-placeholder">
                      <FiFileText />
                    </div>
                  )}

                  <span>
                    ĐÃ SỞ HỮU
                  </span>
                </a>

                <div className="ud-document-card__content">
                  <span className="ud-document-card__category">
                    {document.category ||
                      "Tài liệu số"}
                  </span>

                  <h3>
                    {
                      document.name
                    }
                  </h3>

                  <p>
                    {document.description ||
                      "Tài liệu thực hành từ Quizzy Social Gallery."}
                  </p>

                  {document.url && <a
                    href={document.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ud-document-card__button"
                    data-cur="OPEN"
                  >
                    <span>
                      Mở tài liệu
                    </span>

                    <FiArrowUpRight />
                  </a>}
                  {document.urlUpdate && <a href={document.urlUpdate} target="_blank" rel="noopener noreferrer" className="ud-document-card__button" data-cur="OPEN"><span>Link update</span><FiArrowUpRight /></a>}
                  {document.instructionLink && <a href={document.instructionLink} target="_blank" rel="noopener noreferrer" className="ud-document-card__button" data-cur="OPEN"><span>Hướng dẫn</span><FiArrowUpRight /></a>}
                </div>
              </article>
            ),
          )}
        </div>
      ) : (
        <EmptyState
          icon={
            <FiFileText />
          }
          title="Không tìm thấy tài liệu"
          description="Thử đổi từ khóa hoặc bộ lọc của bạn."
        />
      )}
    </div>
  );
}


/* ============================================================
   COURSES PAGE
   ============================================================ */

export function DashboardCourses() {
  const {
    courses,
    coursesLoading,
    coursesError,
  } =
    useDashboardData();

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    filter,
    setFilter,
  ] =
    useState<
      "all" |
      "learning" |
      "completed"
    >("all");

  const filtered =
    useMemo(
      () =>
        courses.filter(
          (enrollment) => {
            const course =
              getCourse(
                enrollment,
              );

            const courseClass =
              getCourseClass(
                enrollment,
              );

            const title =
              `${course?.title ?? ""} ${courseClass?.name ?? ""}`
                .toLowerCase();

            const matchSearch =
              title.includes(
                search
                  .trim()
                  .toLowerCase(),
              );

            const progress =
              Number(
                enrollment.progress ??
                  0,
              );

            const completed =
              enrollment.isCompleted ||
              progress >= 100;

            const matchFilter =
              filter === "all" ||
              (filter ===
                "completed" &&
                completed) ||
              (filter ===
                "learning" &&
                !completed);

            return (
              matchSearch &&
              matchFilter
            );
          },
        ),
      [
        courses,
        filter,
        search,
      ],
    );

  return (
    <div className="ud-page">
      <PageHead
        kicker="MY COURSES"
        title="Khóa học của tôi"
        description="Theo dõi tiến độ và tiếp tục học từ bài gần nhất."
        action={
          <Link
            href="/courses"
            className="ud-primary-button"
            data-cur="OPEN"
          >
            Xem khóa học
            <FiArrowUpRight />
          </Link>
        }
      />


      <div className="ud-toolbar">
        <label className="ud-search">
          <FiSearch />

          <input
            value={search}
            placeholder="Tìm khóa học..."
            onChange={(
              event,
            ) =>
              setSearch(
                event.target
                  .value,
              )
            }
          />
        </label>

        <div className="ud-filters">
          {[
            [
              "all",
              "Tất cả",
            ],
            [
              "learning",
              "Đang học",
            ],
            [
              "completed",
              "Hoàn thành",
            ],
          ].map(
            ([
              value,
              label,
            ]) => (
              <button
                key={value}
                type="button"
                className={
                  filter ===
                  value
                    ? "is-active"
                    : ""
                }
                onClick={() =>
                  setFilter(
                    value as typeof filter,
                  )
                }
              >
                {label}
              </button>
            ),
          )}
        </div>
      </div>


      {coursesError && (
        <div className="ud-alert">
          {coursesError}
        </div>
      )}


      {coursesLoading ? (
        <DashboardSkeleton
          count={4}
        />
      ) : filtered.length ? (
        <div className="ud-courses-grid">
          {filtered.map(
            (enrollment) => (
              <CourseCard
                key={
                  enrollment._id ||
                  `${entityId(
                    enrollment.courseId,
                  )}-${entityId(
                    enrollment.courseClassId,
                  )}`
                }
                enrollment={
                  enrollment
                }
              />
            ),
          )}
        </div>
      ) : (
        <EmptyState
          icon={
            <FiBookOpen />
          }
          title="Chưa có khóa học"
          description="Khóa học bạn đã đăng ký sẽ xuất hiện tại đây."
          href="/courses"
          action="Khám phá khóa học"
        />
      )}
    </div>
  );
}


/* ============================================================
   TRANSACTIONS
   ============================================================ */

export function DashboardTransactions() {
  const {
    orders,
    ordersLoading,
    ordersError,
    token,
  } =
    useDashboardData();

  const [
    filter,
    setFilter,
  ] =
    useState("all");

  const [
    paying,
    setPaying,
  ] =
    useState("");

  const filtered =
    filter === "all"
      ? orders
      : orders.filter(
          (order) =>
            order.status ===
            filter,
        );

  const retryPayment =
    async (
      order: DashboardOrder,
    ) => {
      const id =
        order._id ||
        order.id;

      if (!id) return;

      try {
        setPaying(id);

        const result =
          await dashboardRequest<{
            payment?: {
              checkoutUrl?: string | null;
            };
          }>(
            `/orders/my-orders/${id}/checkout-session`,
            token,
            {
              method: "POST",
            },
          );

        if (
          result.payment
            ?.checkoutUrl
        ) {
          window.location.assign(
            result.payment
              .checkoutUrl,
          );
        }
      } finally {
        setPaying("");
      }
    };

  return (
    <div className="ud-page">
      <PageHead
        kicker="TRANSACTIONS"
        title="Lịch sử giao dịch"
        description="Theo dõi các đơn hàng và trạng thái thanh toán của tài khoản."
      />


      <div className="ud-filters ud-filters--standalone">
        {[
          ["all", "Tất cả"],
          ["paid", "Đã thanh toán"],
          ["pending", "Chờ thanh toán"],
          ["cancelled", "Đã hủy"],
        ].map(
          ([value, label]) => (
            <button
              type="button"
              key={value}
              className={
                filter ===
                value
                  ? "is-active"
                  : ""
              }
              onClick={() =>
                setFilter(value)
              }
            >
              {label}
            </button>
          ),
        )}
      </div>


      {ordersError && (
        <div className="ud-alert">
          {ordersError}
        </div>
      )}


      {ordersLoading ? (
        <DashboardSkeleton
          count={5}
        />
      ) : filtered.length ? (
        <div className="ud-transactions">
          <div className="ud-transactions__head">
            <span>
              MÃ ĐƠN
            </span>

            <span>
              NỘI DUNG
            </span>

            <span>
              NGÀY
            </span>

            <span>
              TỔNG
            </span>

            <span>
              TRẠNG THÁI
            </span>

            <span />
          </div>

          {filtered.map(
            (order) => {
              const id =
                order._id ||
                order.id ||
                "";

              return (
                <div
                  key={id}
                  className="ud-transaction-row"
                >
                  <strong>
                    {order.orderCode ||
                      id.slice(
                        -8,
                      )}
                  </strong>

                  <div>
                    {(order.items ??
                      [])
                      .slice(0, 2)
                      .map(
                        (item) => (
                          <span
                            key={
                              item._id ||
                              item.id ||
                              item.title
                            }
                          >
                            {
                              item.title
                            }
                          </span>
                        ),
                      )}

                    {(order.items
                      ?.length ??
                      0) >
                      2 && (
                      <small>
                        +
                        {(order.items
                          ?.length ??
                          0) - 2}{" "}
                        sản phẩm
                      </small>
                    )}
                  </div>

                  <span>
                    {formatDate(
                      order.createdAt,
                    )}
                  </span>

                  <strong>
                    {money(
                      order.totalAmount,
                    )}
                  </strong>

                  <span
                    className={`ud-status ud-status--${order.status}`}
                  >
                    {statusText(
                      order.status,
                    )}
                  </span>

                  <div className="ud-transaction-actions">
                    {order.status ===
                      "pending" && (
                      <button
                        type="button"
                        onClick={() =>
                          retryPayment(
                            order,
                          )
                        }
                        disabled={
                          paying === id
                        }
                      >
                        {paying === id
                          ? "Đang mở..."
                          : "Thanh toán"}
                      </button>
                    )}

                    <Link
                      href={`/collections/transactions/${id}`}
                      data-cur="OPEN"
                    >
                      <FiArrowUpRight />
                    </Link>
                  </div>
                </div>
              );
            },
          )}
        </div>
      ) : (
        <EmptyState
          icon={
            <FiCreditCard />
          }
          title="Chưa có giao dịch"
          description="Các giao dịch mua khóa học sẽ xuất hiện tại đây."
        />
      )}
    </div>
  );
}


/* ============================================================
   ORDER DETAIL
   ============================================================ */

export function DashboardTransactionDetail() {
  const params =
    useParams();

  const {
    orders,
    ordersLoading,
  } =
    useDashboardData();

  const orderId =
    String(
      params.orderId ?? "",
    );

  const order =
    orders.find(
      (item) =>
        (item._id ||
          item.id) ===
        orderId,
    );

  if (ordersLoading) {
    return (
      <div className="ud-page">
        <DashboardSkeleton
          count={3}
        />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="ud-page">
        <EmptyState
          icon={
            <FiCreditCard />
          }
          title="Không tìm thấy giao dịch"
          description="Giao dịch không tồn tại hoặc chưa tải được."
          href="/collections/transactions"
          action="Quay lại giao dịch"
        />
      </div>
    );
  }

  return (
    <div className="ud-page">

      <div className="ud-order-detail__back">
        <Link
          href="/collections/transactions"
        >
          ← Lịch sử giao dịch
        </Link>
      </div>

      <PageHead
        kicker="ORDER DETAIL"
        title={
          order.orderCode ||
          "Chi tiết giao dịch"
        }
        description={`Tạo ngày ${formatDate(
          order.createdAt,
        )}`}
      />


      <div className="ud-order-detail-grid">

        <section className="ud-panel">
          <div className="ud-panel__title">
            Sản phẩm
          </div>

          <div className="ud-order-items">
            {(order.items ??
              []).map(
              (item) => (
                <div
                  key={
                    item._id ||
                    item.id ||
                    item.title
                  }
                >
                  <span>
                    {item.title}
                  </span>

                  <strong>
                    {money(
                      item.price,
                    )}
                  </strong>
                </div>
              ),
            )}
          </div>
        </section>


        <section className="ud-panel">
          <div className="ud-panel__title">
            Thanh toán
          </div>

          <div className="ud-order-summary">
            <div>
              <span>
                Tạm tính
              </span>

              <strong>
                {money(
                  order.subtotal,
                )}
              </strong>
            </div>

            <div>
              <span>
                Giảm giá
              </span>

              <strong>
                −
                {money(
                  order.discountAmount,
                )}
              </strong>
            </div>

            <div className="is-total">
              <span>
                Tổng cộng
              </span>

              <strong>
                {money(
                  order.totalAmount,
                )}
              </strong>
            </div>
          </div>

          <div className="ud-order-meta">
            <span>
              Trạng thái
            </span>

            <strong
              className={`ud-status ud-status--${order.status}`}
            >
              {statusText(
                order.status,
              )}
            </strong>
          </div>

          <div className="ud-order-meta">
            <span>
              Phương thức
            </span>

            <strong>
              {order.paymentMethod ||
                "—"}
            </strong>
          </div>

          <div className="ud-order-meta">
            <span>
              Thanh toán lúc
            </span>

            <strong>
              {formatDate(
                order.paidAt,
              )}
            </strong>
          </div>
        </section>

      </div>
    </div>
  );
}


/* ============================================================
   ACCOUNT
   ============================================================ */

export function DashboardAccount() {
  const router =
    useRouter();

  const {
    user,
  } =
    useDashboardData();

  const [logout] =
    useLogoutMutation();

  const [
    authMode,
    setAuthMode,
  ] =
    useState<
      AuthMode | null
    >(null);

  const displayName =
    user?.name ||
    "Học viên Quizzy";

  const avatar =
    user?.avatar?.url ||
    user?.avatarUrl;

  const initial =
    displayName
      .charAt(0)
      .toUpperCase();

  return (
    <>
      <div className="ud-page">
        <PageHead
          kicker="ACCOUNT"
          title="Tài khoản"
          description="Thông tin tài khoản đang dùng tại Quizzy Social Gallery."
        />


        <section className="ud-account-card">
          <div className="ud-account-card__avatar">
            {avatar ? (
              <img
                src={avatar}
                alt=""
              />
            ) : (
              initial
            )}
          </div>

          <div className="ud-account-card__identity">
            <small>
              MEMBER ACCOUNT
            </small>

            <h2>
              {displayName}
            </h2>

            <p>
              {user?.email}
            </p>
          </div>
        </section>


        <section className="ud-account-info">
          <div>
            <span>
              Họ và tên
            </span>

            <strong>
              {user?.name ||
                "Chưa cập nhật"}
            </strong>
          </div>

          <div>
            <span>
              Email
            </span>

            <strong>
              {user?.email ||
                "—"}
            </strong>
          </div>
        </section>


        <section className="ud-account-actions">
          <button
            type="button"
            onClick={() =>
              setAuthMode(
                "forgot",
              )
            }
          >
            Đặt lại mật khẩu
          </button>

          <button
            type="button"
            className="is-danger"
            onClick={async () => {
              await logout(
                {},
              ).unwrap();

              router.push("/");
            }}
          >
            Đăng xuất
          </button>
        </section>


        <p className="ud-account-note">
          Phần chỉnh sửa thông tin
          cá nhân chưa được bật vì
          backend hiện tại chưa có
          endpoint self-update riêng
          cho user.
        </p>
      </div>

      {authMode && (
        <AuthModal
          mode={authMode}
          onModeChange={
            setAuthMode
          }
          onClose={() =>
            setAuthMode(null)
          }
        />
      )}
    </>
  );
}


/* ============================================================
   SUB COMPONENTS
   ============================================================ */

function CourseCard({
  enrollment,
}: {
  enrollment: Parameters<
    typeof getCourse
  >[0];
}) {
  const course =
    getCourse(enrollment);

  const courseClass =
    getCourseClass(
      enrollment,
    );

  const progress =
    Math.max(
      0,
      Math.min(
        100,
        Number(
          enrollment.progress ??
            0,
        ),
      ),
    );

  const completed =
    enrollment.isCompleted ||
    progress >= 100;

  const image =
    courseClass?.thumbnail ||
    course?.thumbnail;

  return (
    <article className="ud-course-card">
      <Link
        href={courseHref(
          enrollment,
        )}
        className="ud-course-card__image"
        data-cur="OPEN"
      >
        {image ? (
          <img
            src={image}
            alt=""
          />
        ) : (
          <div className="ud-course-placeholder">
            <FiBookOpen />
          </div>
        )}

        <span>
          {completed
            ? "HOÀN THÀNH"
            : "ĐANG HỌC"}
        </span>
      </Link>

      <div className="ud-course-card__body">
        <small>
          {courseClass?.name ||
            course?.category ||
            "ONLINE COURSE"}
        </small>

        <h3>
          {course?.title ||
            "Khóa học"}
        </h3>

        <div className="ud-course-progress__head">
          <span>
            Tiến độ
          </span>

          <strong>
            {progress}%
          </strong>
        </div>

        <div className="ud-course-progress">
          <i
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <Link
          href={courseHref(
            enrollment,
          )}
          className="ud-course-card__button"
          data-cur="OPEN"
        >
          <span>
            {completed
              ? "Xem lại khóa học"
              : progress > 0
                ? "Tiếp tục học"
                : "Bắt đầu học"}
          </span>

          <FiArrowUpRight />
        </Link>
      </div>
    </article>
  );
}


function DocumentMiniCard({
  document,
}: {
  document: {
    _id: string;
    name: string;
    thumnail?: string;
    category?: string;
    url?: string;
    descriptionLink?: string;
  };
}) {
  return (
    <a
      href={documentHref(
        document,
      )}
      className="ud-document-mini"
      data-cur="OPEN"
    >
      <div className="ud-document-mini__image">
        {document.thumnail ? (
          <img
            src={
              document.thumnail
            }
            alt=""
          />
        ) : (
          <FiFileText />
        )}
      </div>

      <div>
        <small>
          {document.category ||
            "TÀI LIỆU"}
        </small>

        <strong>
          {document.name}
        </strong>
      </div>

      <FiArrowUpRight />
    </a>
  );
}


function EmptyState({
  icon,
  title,
  description,
  href,
  action,
}: {
  icon:
    React.ReactNode;

  title: string;
  description: string;

  href?: string;
  action?: string;
}) {
  return (
    <div className="ud-empty">
      <div className="ud-empty__icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      {href && action && (
        <Link
          href={href}
          data-cur="OPEN"
        >
          {action}
          <FiArrowUpRight />
        </Link>
      )}
    </div>
  );
}


function DashboardSkeleton({
  count,
}: {
  count: number;
}) {
  return (
    <div className="ud-skeleton-grid">
      {Array.from({
        length: count,
      }).map((_, index) => (
        <div
          key={index}
          className="ud-skeleton"
        />
      ))}
    </div>
  );
}

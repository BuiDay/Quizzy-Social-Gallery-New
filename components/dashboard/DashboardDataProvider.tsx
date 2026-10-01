"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useSelector } from "react-redux";

import type { RootState } from "@/redux/store";
import { useGetAllMutation } from "@/redux/features/product/productApi";

import UseProtectProduct from "@/hook/useProtectProduct";

/* ============================================================
   TYPES
   ============================================================ */

export type DashboardUser = {
  _id?: string;
  id?: string;

  name?: string;
  email?: string;

  avatar?: {
    url?: string;
  } | null;

  avatarUrl?: string | null;
};

export type DashboardDocument = {
  _id: string;

  name: string;
  description?: string;

  thumnail?: string;

  price?: number;

  discount?: {
    discountPrice?: number;
  } | null;

  category?: string;

  descriptionLink?: string;
  url?: string;

  charge?: boolean;
  isShow?: boolean;
};

export type DashboardCourse = {
  _id?: string;
  id?: string;

  title?: string;
  description?: string;

  thumbnail?: string;

  category?: string;

  courseType?: string;

  status?: string;

  price?: number;

  totalChapters?: number;
  totalLessons?: number;
  totalDuration?: number;

  startDate?: string | null;
  endDate?: string | null;

  location?: string | null;
  meetingUrl?: string | null;
};

export type DashboardCourseClass = {
  _id?: string;
  id?: string;

  name?: string;

  thumbnail?: string;

  status?: string;

  startDate?: string | null;
  endDate?: string | null;

  location?: string | null;
  meetingUrl?: string | null;
};

export type DashboardEnrollment = {
  _id?: string;
  id?: string;

  courseId:
    | string
    | DashboardCourse;

  courseClassId?:
    | string
    | DashboardCourseClass;

  progress?: number;

  isCompleted?: boolean;

  completedAt?: string | null;

  createdAt?: string;
  updatedAt?: string;
};

export type DashboardOrderItem = {
  _id?: string;
  id?: string;

  courseId?: string;
  courseClassId?: string;

  title?: string;

  price?: number;
};

export type DashboardOrder = {
  _id?: string;
  id?: string;

  orderCode?: string;

  items?: DashboardOrderItem[];

  subtotal?: number;
  discountAmount?: number;
  totalAmount?: number;

  paymentMethod?: string;

  status?:
    | "pending"
    | "paid"
    | "failed"
    | "cancelled"
    | "refunded"
    | string;

  note?: string | null;

  paidAt?: string | null;

  createdAt?: string;
  updatedAt?: string;
};


/* ============================================================
   API
   ============================================================ */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL
    ?.replace(/\/+$/, "") ||
  "http://localhost:4000";

export async function dashboardRequest<T>(
  path: string,
  token?: string | null,
  options: RequestInit = {},
): Promise<T> {
  const headers =
    new Headers(options.headers);

  if (
    token &&
    !headers.has("Authorization")
  ) {
    headers.set(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  if (
    options.body &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json",
    );
  }

  const response =
    await fetch(
      `${API_BASE_URL}${
        path.startsWith("/")
          ? path
          : `/${path}`
      }`,
      {
        ...options,

        headers,

        credentials: "include",
      },
    );

  let data: unknown;

  try {
    data =
      await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data &&
      "message" in data
        ? String(
            (
              data as {
                message?: unknown;
              }
            ).message,
          )
        : "Không thể tải dữ liệu.";

    throw new Error(message);
  }

  return data as T;
}

function normalizeArray<T>(
  payload: unknown,
): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (
    payload &&
    typeof payload === "object"
  ) {
    const obj =
      payload as Record<
        string,
        unknown
      >;

    const keys = [
      "data",
      "items",
      "orders",
      "courses",
      "enrollments",
    ];

    for (const key of keys) {
      if (
        Array.isArray(obj[key])
      ) {
        return obj[key] as T[];
      }
    }
  }

  return [];
}


/* ============================================================
   HELPERS
   ============================================================ */

export function entityId(
  value: unknown,
): string {
  if (!value) return "";

  if (
    typeof value === "string"
  ) {
    return value;
  }

  if (
    typeof value === "object"
  ) {
    const object =
      value as {
        _id?: string;
        id?: string;
      };

    return (
      object._id ||
      object.id ||
      ""
    );
  }

  return "";
}

export function getCourse(
  enrollment:
    DashboardEnrollment,
) {
  if (
    enrollment.courseId &&
    typeof enrollment.courseId ===
      "object"
  ) {
    return enrollment.courseId;
  }

  return null;
}

export function getCourseClass(
  enrollment:
    DashboardEnrollment,
) {
  if (
    enrollment.courseClassId &&
    typeof enrollment.courseClassId ===
      "object"
  ) {
    return enrollment.courseClassId;
  }

  return null;
}


/* ============================================================
   OWNERSHIP PROBE
   ============================================================ */

function OwnershipProbe({
  productId,
  onChange,
}: {
  productId: string;

  onChange: (
    id: string,
    owned: boolean,
  ) => void;
}) {
  const isOwned =
    UseProtectProduct({
      productId,
    });

  useEffect(() => {
    onChange(
      productId,
      Boolean(isOwned),
    );
  }, [
    isOwned,
    onChange,
    productId,
  ]);

  return null;
}


/* ============================================================
   CONTEXT
   ============================================================ */

type DashboardContextValue = {
  user:
    | DashboardUser
    | null;

  token:
    | string
    | null;

  documents:
    DashboardDocument[];

  courses:
    DashboardEnrollment[];

  orders:
    DashboardOrder[];

  documentsLoading: boolean;
  coursesLoading: boolean;
  ordersLoading: boolean;

  coursesError: string;
  ordersError: string;

  reloadRemote: () =>
    Promise<void>;
};

const DashboardContext =
  createContext<
    DashboardContextValue | undefined
  >(undefined);


/* ============================================================
   PROVIDER
   ============================================================ */

export function DashboardDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const auth =
    useSelector(
      (state: RootState) =>
        state.auth,
    ) as unknown as {
      user?:
        | DashboardUser
        | null;

      token?:
        | string
        | null;

      accessToken?:
        | string
        | null;
    };

  const productState =
    useSelector(
      (state: RootState) =>
        state.product,
    ) as unknown as {
      products?:
        DashboardDocument[];
    };

  const user =
    auth.user ?? null;

  const token =
    auth.token ??
    auth.accessToken ??
    null;

  const [
    getProducts,
    {
      isLoading:
        productsLoading,
    },
  ] =
    useGetAllMutation();

  const [ownership, setOwnership] =
    useState<
      Record<string, boolean>
    >({});

  const [courses, setCourses] =
    useState<
      DashboardEnrollment[]
    >([]);

  const [orders, setOrders] =
    useState<
      DashboardOrder[]
    >([]);

  const [
    coursesLoading,
    setCoursesLoading,
  ] = useState(false);

  const [
    ordersLoading,
    setOrdersLoading,
  ] = useState(false);

  const [
    coursesError,
    setCoursesError,
  ] = useState("");

  const [
    ordersError,
    setOrdersError,
  ] = useState("");


  /* ==========================================================
     PRODUCTS
     ========================================================== */

  useEffect(() => {
    if (!user) return;

    void getProducts({
      charge: "",
      keywords: "",
    });
  }, [
    getProducts,
    user,
  ]);

  const availableProducts =
    useMemo(
      () =>
        (
          productState.products ??
          []
        ).filter(
          (product) =>
            product.isShow !==
            false,
        ),
      [productState.products],
    );

  const handleOwnership =
    useCallback(
      (
        id: string,
        owned: boolean,
      ) => {
        setOwnership(
          (current) => {
            if (
              current[id] ===
              owned
            ) {
              return current;
            }

            return {
              ...current,
              [id]: owned,
            };
          },
        );
      },
      [],
    );

  const documents =
    useMemo(
      () =>
        availableProducts.filter(
          (product) =>
            ownership[
              product._id
            ] === true,
        ),
      [
        availableProducts,
        ownership,
      ],
    );

  const documentsResolved =
    availableProducts.every(
      (product) =>
        product._id in
        ownership,
    );

  const documentsLoading =
    productsLoading ||
    (availableProducts.length >
      0 &&
      !documentsResolved);


  /* ==========================================================
     COURSES + ORDERS
     ========================================================== */

  const reloadRemote =
    useCallback(async () => {
      if (!user) {
        setCourses([]);
        setOrders([]);

        return;
      }

      setCoursesLoading(true);
      setOrdersLoading(true);

      setCoursesError("");
      setOrdersError("");

      const [
        coursesResult,
        ordersResult,
      ] =
        await Promise.allSettled([
          dashboardRequest<unknown>(
            "/courses/my-courses",
            token,
          ),

          dashboardRequest<unknown>(
            "/orders/my-orders",
            token,
          ),
        ]);

      if (
        coursesResult.status ===
        "fulfilled"
      ) {
        setCourses(
          normalizeArray<
            DashboardEnrollment
          >(
            coursesResult.value,
          ),
        );
      } else {
        setCourses([]);

        setCoursesError(
          coursesResult.reason
            instanceof Error
            ? coursesResult.reason
                .message
            : "Không tải được khóa học.",
        );
      }

      if (
        ordersResult.status ===
        "fulfilled"
      ) {
        setOrders(
          normalizeArray<
            DashboardOrder
          >(
            ordersResult.value,
          ),
        );
      } else {
        setOrders([]);

        setOrdersError(
          ordersResult.reason
            instanceof Error
            ? ordersResult.reason
                .message
            : "Không tải được giao dịch.",
        );
      }

      setCoursesLoading(false);
      setOrdersLoading(false);
    }, [
      token,
      user,
    ]);

  useEffect(() => {
    void reloadRemote();
  }, [reloadRemote]);


  /* ==========================================================
     VALUE
     ========================================================== */

  const value =
    useMemo(
      () => ({
        user,
        token,

        documents,
        courses,
        orders,

        documentsLoading,
        coursesLoading,
        ordersLoading,

        coursesError,
        ordersError,

        reloadRemote,
      }),
      [
        user,
        token,
        documents,
        courses,
        orders,
        documentsLoading,
        coursesLoading,
        ordersLoading,
        coursesError,
        ordersError,
        reloadRemote,
      ],
    );

  return (
    <DashboardContext.Provider
      value={value}
    >
      {user && (
        <div
          aria-hidden="true"
          style={{
            display: "none",
          }}
        >
          {availableProducts.map(
            (product) => (
              <OwnershipProbe
                key={
                  product._id
                }
                productId={
                  product._id
                }
                onChange={
                  handleOwnership
                }
              />
            ),
          )}
        </div>
      )}

      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardData() {
  const context =
    useContext(
      DashboardContext,
    );

  if (!context) {
    throw new Error(
      "useDashboardData must be used inside DashboardDataProvider",
    );
  }

  return context;
}
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Image1 from "@/assets/images/TikTok Ideas Hacking/10.png"
import Image2 from "@/assets/images/TikTok Ideas Hacking/11.png"
import Image3 from "@/assets/images/TikTok Ideas Hacking/12.png"
import Image4 from "@/assets/images/TikTok Ideas Hacking/13.png"
import Image5 from "@/assets/images/TikTok Ideas Hacking/14.png"
import Image6 from "@/assets/images/TikTok Ideas Hacking/15.png"
import Image7 from "@/assets/images/TikTok Ideas Hacking/16.png"
import Image8 from "@/assets/images/TikTok Ideas Hacking/17.png"

type DocumentChapter = {
    image: any
    number: string;
    title: string;
    description: string;
    contents: string[];
};

const chapters: DocumentChapter[] = [
    {
        image: Image1,
        number: "01",
        title: "TIKTOK: TẠI SAO ĐÂY\nLÀ NỀN TẢNG SỐ 1?",
        description:
            "Hiểu rõ hơn về TikTok và cách tận dụng nền tảng này để phát triển content.",
        contents: [
            "TikTok hoạt động như thế nào?",
            "Vì sao TikTok có khả năng lan tỏa content mạnh?",
            "TikTok có thể phục vụ những mục tiêu gì?",
            "Cách nhìn TikTok như một công cụ xây thương hiệu và tạo cơ hội kinh doanh.",
        ],
    },
    {
        image: Image2,
        number: "02",
        title: "IDEAS\nHACKING",
        description:
            "Học cách tìm kiếm và phát triển ý tưởng thay vì ngồi chờ idea tự xuất hiện.",
        contents: [
            "Quan sát và nhận diện những content có tiềm năng.",
            "Khai thác trend, viral content và insight.",
            "“Hack” một idea thành nhiều hướng.",
            "Tái sử dụng và phát triển từ những content sẵn có.",
        ],
    },
    {
        image: Image3,
        number: "03",
        title: "CÔNG THỨC HOOK –\nBODY – CTA",
        description:
            "Biến một idea thành một video hoàn chỉnh.",
        contents: [
            "Cách xây dựng Hook để thu hút người xem.",
            "Công thức triển khai phần Body rõ ràng, dễ theo dõi.",
            "Cách sử dụng CTA phù hợp với từng mục tiêu content.",
            "Template Hook và template triển khai nội dung có thể áp dụng ngay.",
        ],
    },
    {
        image: Image4,
        number: "04",
        title: "XÂY DỰNG CONCEPT\nKÊNH TIKTOK",
        description:
            "Để kênh không chỉ là tập hợp của những video ngẫu nhiên.",
        contents: [
            "Xác định concept phù hợp với cá nhân/thương hiệu.",
            "Xây dựng các nhóm nội dung cho kênh.",
            "Tạo sự nhất quán trong cách triển khai content.",
            "Phát triển những series có thể làm lâu dài.",
        ],
    },
    {
        image: Image5,
        number: "05",
        title: "GIẢI PHÁP KHI BÍ Ý\nTƯỞNG",
        description:
            "Khi không biết đăng gì, bạn vẫn biết tìm idea ở đâu.",
        contents: [
            "Khai thác trend và các cuộc hội thoại trên mạng xã hội.",
            "Tìm insight từ khách hàng và người xem.",
            "Biến content cũ thành những ý tưởng mới.",
            "Dùng công cụ để tìm kiếm và phát triển idea.",
        ],
    },
    {
        image: Image6,
        number: "06",
        title: "30+ TIKTOK SCRIPTS\nCHO 10 NGÀNH HÀNG",
        description:
            "Tham khảo cách một idea được biến thành nội dung thực tế.",
        contents: [
            "30+ TikTok Scripts mẫu.",
            "10 ngành hàng khác nhau.",
            "Nhiều hướng triển khai content để tham khảo.",
            "Dễ dàng ứng dụng cho sản phẩm, thương hiệu của bạn.",
        ],
    },
    {
        image: Image7,
        number: "07",
        title: "ĐO LƯỜNG & TỐI ƯU\nKÊNH TIKTOK",
        description:
            "Biết đọc dữ liệu để làm content tốt hơn.",
        contents: [
            "Những chỉ số quan trọng cần theo dõi.",
            "Cách đọc Retention, Engagement và Conversion.",
            "Xác định content nào đang thực sự hiệu quả.",
            "Tìm điểm cần tối ưu cho video tiếp theo.",
        ],
    },
    {
        image: Image8,
        number: "08",
        title: "RESOURCE\nLIBRARY",
        description:
            "Một thư viện tài nguyên hỗ trợ bạn trong quá trình xây dựng TikTok.",
        contents: [
            "Các công cụ hỗ trợ làm content.",
            "Nguồn tìm kiếm trend và idea.",
            "Template và tài nguyên hữu ích.",
            "Giúp tiết kiệm thời gian trong quá trình lên và triển khai content.",
        ],
    },
];

export function TiktokDocumentInsideSection() {
    const [activeChapter, setActiveChapter] = useState("01");

    const goToChapter = (number: string) => {
        setActiveChapter(number);

        document
            .getElementById(`tiktok-chapter-${number}`)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
    };

    useEffect(() => {
        const elements = chapters
            .map((chapter) =>
                document.getElementById(
                    `tiktok-chapter-${chapter.number}`,
                ),
            )
            .filter(Boolean) as HTMLElement[];

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio -
                            a.intersectionRatio,
                    );

                if (visible[0]) {
                    const number =
                        visible[0].target.getAttribute(
                            "data-chapter",
                        );

                    if (number) {
                        setActiveChapter(number);
                    }
                }
            },
            {
                rootMargin: "-30% 0px -45% 0px",
                threshold: [0.15, 0.35, 0.55],
            },
        );

        elements.forEach((element) =>
            observer.observe(element),
        );

        return () => observer.disconnect();
    }, []);

    return (
        <section
            className="tiktok-document-inside"
            id="document-inside"
        >
            {/* ================= BLACK HEADER ================= */}

            <div className="tiktok-document-nav">
                <div className="wrap tiktok-document-nav-inner">
                    <div
                        className="tiktok-document-down"
                        data-rv="up"
                        aria-hidden="true"
                    >
                        ↓
                    </div>

                    <h2
                        className="tiktok-document-nav-title"
                        data-rv="up"
                        data-dl="60"
                    >
                        KHÁM PHÁ BÊN TRONG TÀI LIỆU
                    </h2>

                    <div
                        className="tiktok-document-tabs"
                        data-rv="up"
                        data-dl="120"
                    >
                        {chapters.map((chapter) => (
                            <button
                                key={chapter.number}
                                type="button"
                                className={`tiktok-document-tab ${activeChapter === chapter.number
                                        ? "is-active"
                                        : ""
                                    }`}
                                onClick={() =>
                                    goToChapter(chapter.number)
                                }
                                aria-label={`Xem phần ${chapter.number}`}
                            >
                                {chapter.number}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= CONTENT ================= */}

            <div className="tiktok-document-content">
                <div className="wrap tiktok-document-list">
                    {chapters.map((chapter, index) => (
                        <article
                            className="tiktok-document-card"
                            id={`tiktok-chapter-${chapter.number}`}
                            data-chapter={chapter.number}
                            data-rv="up"
                            data-dl={String((index % 2) * 70)}
                            key={chapter.number}
                        >
                            {/* LEFT */}

                            <div className="tiktok-document-card-copy">
                                <span className="tiktok-document-number">
                                    {chapter.number}
                                </span>

                                <div className="tiktok-document-card-main">
                                    <h3>
                                        {chapter.title
                                            .split("\n")
                                            .map((line, lineIndex) => (
                                                <span key={lineIndex}>
                                                    {line}
                                                    {lineIndex <
                                                        chapter.title.split("\n")
                                                            .length -
                                                        1 && <br />}
                                                </span>
                                            ))}
                                    </h3>

                                    <p className="tiktok-document-card-description">
                                        {chapter.description}
                                    </p>

                                    <div className="tiktok-document-content-label">
                                        NỘI DUNG CHƯƠNG
                                    </div>

                                    <ul className="tiktok-document-points">
                                        {chapter.contents.map(
                                            (content) => (
                                                <li key={content}>
                                                    <i />
                                                    <span>{content}</span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            </div>

                            {/* RIGHT IMAGE */}

                            <div className="tiktok-document-preview">

                                <Image
                                    src={chapter.image}
                                    alt="TikTok Ideas Hacking chapter 01"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="tiktok-document-preview-image"
                                    loading="eager"
                                />

                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
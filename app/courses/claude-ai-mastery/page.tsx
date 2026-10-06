"use client";

import "@/styles/claude-ai-mastery.css";

import { ModalProvider } from "@/components/ui/ModalContext";
import { SiteEffects } from "@/components/SiteEffects";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ClaudeAIMasteryHero } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryHero";
import { ClaudeAIMasteryIntroSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryIntroSection";
import { ClaudeAIMasteryProblemsSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryProblemsSection";
import { ClaudeAIMasterySolutionSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasterySolutionSection";
import { ClaudeAIMasteryApplicationsSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryApplicationsSection";
import { ClaudeAIMasteryCurriculumSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryCurriculumSection";
import { ClaudeAIMasteryBenefitsSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryBenefitsSection";
import { ClaudeAIMasteryPricingSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryPricingSection";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { ClaudeAIMasteryFeedbackSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryFeedbackSection";
import { ClaudeAIMasteryFAQSection } from "@/components/courses/ClaudeAiMastery/ClaudeAIMasteryFAQSection";

import HeroImage from '@/assets/images/claude ai/1.png'
import QuizzyProfile from "@/assets/images/claude ai/1. Ảnh Quizzy png.png"

import researchImage from '@/assets/images/claude ai/Research asssistant.png'
import contentImage from '@/assets/images/claude ai/Content assistant.png'
import designImage from '@/assets/images/claude ai/Design assitant png.png'
import dataImage from '@/assets/images/claude ai/Data assistant.png'
import careerImage from '@/assets/images/claude ai/Job Assistant.png'

import productImage from '@/assets/images/claude ai/intro.png'

import module01Image from '@/assets/images/claude ai/Buổi 1/10.png'
import module02Image from '@/assets/images/claude ai/Buổi 2/12.png'
import module03Image from '@/assets/images/claude ai/Buổi 3/14.png'
import module04Image from '@/assets/images/claude ai/Buổi 4/16.png'
import module05Image from '@/assets/images/claude ai/Buổi 5/18.png'
import module06Image from '@/assets/images/claude ai/Buổi 6/20.png'
import module07Image from '@/assets/images/claude ai/Buổi 7/22.png'
import module08Image from '@/assets/images/claude ai/Buổi 8/24.png'

import { useEffect, useState, type MouseEvent } from "react";
import { useGetCourseByIdMutation } from "@/redux/features/course/courseApi";
import type { ICourse } from "@/redux/features/course/courseSlice";
import { PurchaseModal, type PurchaseProduct } from "@/components/ui/PurchaseModal";
import ModalNeedLogin from "@/components/ui/ModalNeedLogin";
import UserAuth from "@/hook/userAuth";

// Thay bằng slug hoặc _id thực tế của khóa học trong database.
const COURSE_SLUG_OR_ID = "claude-ai-mastery";
const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
        style: "currency", currency: "VND", maximumFractionDigits: 0,
    }).format(price);

export default function ClaudeAIMasteryPage() {
    const [getCourseById] = useGetCourseByIdMutation();
    const [course, setCourse] = useState<ICourse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [retryCount, setRetryCount] = useState(0);
    const [needLogin, setNeedLogin] = useState(false);
    const [selectedPurchaseProduct, setSelectedPurchaseProduct] =
        useState<PurchaseProduct | null>(null);
    const isAuthenticated = UserAuth();

    useEffect(() => {
        let active = true;
        setIsLoading(true);
        setLoadError("");
        setCourse(null);
        const request = getCourseById(COURSE_SLUG_OR_ID);
        request.unwrap().then((response: { course?: ICourse }) => {
            if (!active) return;
            const detail = response.course;
            if (!detail?._id || !detail.title ||
                typeof detail.price !== "number" ||
                !Number.isFinite(detail.price) || detail.price < 0) {
                setLoadError("Thông tin khóa học hoặc giá bán chưa hợp lệ.");
                return;
            }
            setCourse(detail);
        }).catch(() => {
            if (active) setLoadError("Không tải được thông tin khóa học. Vui lòng thử lại.");
        }).finally(() => {
            if (active) setIsLoading(false);
        });
        return () => { active = false; request.abort(); };
    }, [getCourseById, retryCount]);

    console.log(course)

    const handleBuy = () => {
        if (isLoading || !course) return;
        if (!isAuthenticated) {
            setNeedLogin(true);
            return;
        }
        setSelectedPurchaseProduct({
            id: course._id,
            title: course.title,
            category: course.category ? [course.category] : [],
            description: course.shortDescription || course.description,
            price: course.price!,
            originalPrice: course.originalPrice ?? undefined,
            image: course.thumbnail || course.banner || HeroImage.src,
            charge: course.price! > 0,
        });
    };

    // Các section vẫn dùng purchaseUrl như UI cũ; chỉ bắt nút mua #checkout.
    // Các liên kết #claude-register vẫn cuộn xuống bảng giá.

    return (
        <ModalProvider>
            <SiteEffects />
            <Navbar />
            <main>
                <ClaudeAIMasteryHero
                    imageSrc={HeroImage}
                    purchaseUrl="#claude-register"
                    curriculumUrl="#claude-curriculum"
                    handleBuy={handleBuy}
                    product={course}
                />

                <ClaudeAIMasteryIntroSection profileImage={QuizzyProfile} videoSrc="https://qccagency.s3.ap-southeast-1.amazonaws.com/QCC_CLAUDE+AI.mp4"/>
                <ClaudeAIMasteryProblemsSection />
                <ClaudeAIMasterySolutionSection
                    productImage={productImage}
                    curriculumUrl="#claude-curriculum"
                />

                <ClaudeAIMasteryApplicationsSection
                    researchImage={researchImage}
                    contentImage={contentImage}
                    designImage={designImage}
                    dataImage={dataImage}
                    careerImage={careerImage}
                    purchaseUrl="#claude-register"
                    handleBuy={handleBuy}
                    product={course}
                />

                <ClaudeAIMasteryCurriculumSection
                    moduleImages={{
                        "01": module01Image,
                        "02": module02Image,
                        "03": module03Image,
                        "04": module04Image,
                        "05": module05Image,
                        "06": module06Image,
                        "07": module07Image,
                        "08": module08Image,
                    }}
                />

                <ClaudeAIMasteryBenefitsSection />
                {isLoading && <p role="status" style={{ textAlign: "center" }}>Đang tải thông tin khóa học...</p>}
                {loadError && (
                    <div role="alert" style={{ textAlign: "center" }}>
                        <p>{loadError}</p>
                        <button type="button" onClick={() => setRetryCount((count) => count + 1)}>Thử lại</button>
                    </div>
                )}
                <ClaudeAIMasteryPricingSection
                    originalPrice={course ? formatPrice(course.originalPrice ?? course.price!) : "—"}
                    currentPrice={course ? formatPrice(course.price!) : "—"}
                    purchaseUrl="#checkout"
                    handleBuy={handleBuy}
                    product={course}
                />
                <ClaudeAIMasteryFeedbackSection />
                <ClaudeAIMasteryFAQSection />
                <NewsletterCTA />
                {needLogin && <ModalNeedLogin open={needLogin} setOpen={setNeedLogin} />}
                <PurchaseModal
                    open={Boolean(selectedPurchaseProduct)}
                    product={selectedPurchaseProduct}
                    onClose={() => setSelectedPurchaseProduct(null)}
                />
            </main>
            <Footer />
        </ModalProvider>
    );
}

import React from 'react';

const FeatureGrid = ({ section = {}, supportFeatures = [] }) => {
    // Demo data শুধুমাত্র development এর জন্য
    const defaultFeatures = [
        { id: "01", title: "Global Localization", description: "Expert adaptation of your content for diverse international markets and cultures." },
        { id: "02", title: "Voice-Over Excellence", description: "Professional voice talent in 40+ languages to bring your characters and stories to life." },
        { id: "03", title: "Creative Sound Design", description: "Immersive audio experiences tailored to your animation, games, or digital content." },
    ];

    const features = supportFeatures.length > 0 ? supportFeatures : defaultFeatures;

    // Main description - API থেকে বা default
    const mainDescription = section.mainDescription ||
        "HS+ Is A Global Partner For Localization, Multilingual Voice-Over, And Cross-Border Marketing. Since 2010, We've Helped Leading Game Studios, Anime Creators, And Tech Innovators Connect With In 40 Languages. Cross-Border Marketing. Since 2010, We've Helped Leading Game Studios, Anime Creators, And Tech Innovators Connect With In 40 Languages.";

    return (
        <section className="container mx-auto px-6 py-20 font-sans bg-white rounded-[32px] ">
            <div className="flex justify-between items-center mb-10">
                {/* Left Badge: Details this concept */}
                <div
                    className="inline-flex items-center justify-center mb-6"
                    style={{
                        display: 'flex',
                        height: '50px',
                        width: '180px',
                        padding: '8px 16px',
                        gap: '8px',
                        borderRadius: '49px',
                        background: '#F5F5F5',
                    }}
                >
                    <img
                        src="/Frame.svg"
                        alt="icon"
                        style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                    />
                    <span
                        style={{
                            color: '#404040', // var(--dark-5)
                            fontFamily: 'var(--font-poppins), sans-serif',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            lineHeight: '160%',
                            letterSpacing: '0.16px',
                        }}
                    >
                        {section.badgeText || "Core promise"}
                    </span>
                </div>

                {/* Right Badge: over 5k+ project */}
                <div className="px-5 py-2 border border-gray-200 rounded-full shadow-sm">
                    <span className="font-['Inter'] font-normal text-[16px] text-gray-500">
                        {section.projectSummaryText || "over 5k+ project"}
                    </span>
                </div>
            </div>

            {/* Main Description Text - Dynamic */}
            <div className="mb-10">
                <p
                    className="font-['Inter'] font-medium text-[#595959]"
                    style={{
                        fontSize: 'clamp(24px, 3.5vw, 32px)',
                        lineHeight: '140%',
                        letterSpacing: '0%',
                    }}
                >
                    {mainDescription}
                </p>
            </div>

            {/* Numbered Feature Grid - Dynamic */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {features.map((feature, index) => (
                    <div
                        key={feature._id || feature.id || index}
                        className="flex flex-col items-start transition-all duration-300 hover:shadow-lg w-full group"
                        style={{
                            minHeight: "180px",
                            borderRadius: "32px",
                            padding: "clamp(20px, 3vw, 32px)",
                            gap: "12px",
                            opacity: "1",
                            background: "linear-gradient(180deg, #A9DAFF 0%, #CCE7FB 55.48%, #F7F7F7 100%)",
                        }}
                    >
                        {/* Number/ID */}
                        <span
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "clamp(32px, 4vw, 48px)",
                                fontWeight: "500",
                                color: "#B0D0E8",
                                lineHeight: "120%",
                                letterSpacing: "0%",
                                textTransform: "capitalize",
                                display: "inline-block",
                                marginBottom: "8px",
                            }}
                        >
                            {feature.id || String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Title */}
                        <h4
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "clamp(18px, 2.5vw, 28px)",
                                fontWeight: "500",
                                color: "#0A0A0A",
                                lineHeight: "120%",
                                letterSpacing: "0%",
                                textTransform: "capitalize",
                                margin: "0",
                                fontStyle: "normal",
                            }}
                        >
                            {feature.title}
                        </h4>

                        {/* Description */}
                        <p
                            className="line-clamp-3"
                            style={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "clamp(13px, 1.5vw, 16px)",
                                fontWeight: "400",
                                color: "#616161",
                                lineHeight: "150%",
                                letterSpacing: "0%",
                                margin: "0",
                                fontStyle: "normal",
                            }}
                        >
                            {feature.description || feature.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Coverage Footer - Dynamic */}
            <div
                className="mx-auto flex flex-col items-center justify-center w-full px-4 sm:px-8 shadow-sm transition-all hover:shadow-md"
                style={{
                    maxWidth: "1232px",
                    minHeight: "100px",
                    borderRadius: "32px",
                    paddingTop: "24px",
                    paddingBottom: "24px",
                    gap: "8px",
                    background: "#FFFFFF",
                    opacity: "1",
                    border: "1px solid rgba(0,0,0,0.05)",
                }}
            >
                <h3
                    style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "clamp(22px, 3.5vw, 40px)",
                        fontWeight: "500",
                        color: "#0A0A0A",
                        lineHeight: "120%",
                        letterSpacing: "0%",
                        textAlign: "center",
                        textTransform: "capitalize",
                        margin: "0",
                        fontStyle: "normal",
                    }}
                >
                    {section.coverageTitle || "Coverage Across 40+ Languages"}
                </h3>
                <p
                    className="max-w-3xl"
                    style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "clamp(13px, 1.5vw, 18px)",
                        fontWeight: "400",
                        color: "#6B6B6B",
                        lineHeight: "160%",
                        letterSpacing: "0%",
                        textAlign: "center",
                        margin: "0 auto",
                        fontStyle: "normal",
                    }}
                >
                    {section.coverageDescription || "We support a wide range of global and regional languages so your projects can ship with confidence across markets."}
                </p>
            </div>
        </section>
    );
};

export default FeatureGrid;
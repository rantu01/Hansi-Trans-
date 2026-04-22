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
                    <span className="text-[14px] sm:text-[16px] md:text-[16px] text-gray-700 font-medium" style={{ fontFamily: 'var(--font-poppins), sans-serif', lineHeight: '160%' }}>
                        {section.badgeText || "Core promise"}
                    </span>
                </div>

                {/* Right Badge: over 5k+ project */}
                <div className="px-4 py-2 border border-gray-200 rounded-full shadow-sm">
                    <span className="font-['Inter'] font-normal text-sm sm:text-[16px] text-gray-500">
                        {section.projectSummaryText || "over 5k+ project"}
                    </span>
                </div>
            </div>

            {/* Main Description Text - Dynamic */}
            <div className="mb-10">
                <p className="font-['Inter'] font-medium text-[#595959] text-base sm:text-lg md:text-xl lg:text-[28px] leading-[1.4]">
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
                        <span className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#B0D0E8] mb-2 inline-block">
                            {feature.id || String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Title */}
                        <h4 className="text-lg sm:text-xl md:text-2xl font-medium text-[#0A0A0A] m-0">
                            {feature.title}
                        </h4>

                        {/* Description */}
                        <p className="line-clamp-3 text-sm sm:text-base md:text-base text-[#616161]" style={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.5', margin: 0 }}>
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
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-center text-[#0A0A0A] m-0">
                    {section.coverageTitle || "Coverage Across 40+ Languages"}
                </h3>
                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-center text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.6', margin: '0 auto' }}>
                    {section.coverageDescription || "We support a wide range of global and regional languages so your projects can ship with confidence across markets."}
                </p>
            </div>
        </section>
    );
};

export default FeatureGrid;
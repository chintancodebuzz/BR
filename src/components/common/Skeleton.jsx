import React from "react";

const Skeleton = ({ className = "", variant = "rect" }) => {
    const baseClass = "animate-skeleton-theme rounded-md";
    const variantClasses = {
        rect: "w-full h-full",
        circle: "w-full h-full rounded-full",
        text: "w-full h-4 my-2",
    };

    return <div className={`${baseClass} ${variantClasses[variant] || ""} ${className}`} />;
};

export const BannerSkeleton = () => (
    <div className="w-full h-100 md:h-150 lg:h-200 relative overflow-hidden">
        <Skeleton className="w-full h-full" />
    </div>
);

export const CollectionSkeleton = ({ count = 4 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="relative aspect-square">
                <Skeleton className="w-full h-full rounded-xl" />
            </div>
        ))}
    </div>
);

export const ProductSkeleton = ({ count = 6 }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="space-y-3">
                <div className="aspect-square relative overflow-hidden rounded-2xl">
                    <Skeleton className="w-full h-full" />
                </div>
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-1/3 rounded-md" />
                    <Skeleton className="h-4 w-1/4 rounded-md" />
                </div>
            </div>
        ))}
    </div>
);

export const ReelSkeleton = ({ count = 4 }) => (
    <div className="flex gap-4 overflow-hidden">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="min-w-[280px] h-[650px] relative rounded-2xl overflow-hidden">
                <Skeleton className="w-full h-full" />
            </div>
        ))}
    </div>
);

export const CardSkeleton = ({ count = 3 }) => (
    <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 flex gap-6">
                <Skeleton className="w-32 h-32 rounded-lg" />
                <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                    <div className="pt-4">
                        <Skeleton className="h-8 w-1/3" />
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default Skeleton;

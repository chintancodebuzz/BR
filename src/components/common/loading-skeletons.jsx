import React from "react";

const Skeleton = ({ className = "", variant = "rect" }) => {
    const baseClass = "animate-pulse bg-gray-300 rounded-lg";
    const variantClasses = {
        rect: "w-full h-full",
        circle: "w-full h-full rounded-full",
        text: "w-full h-4 my-2",
    };

    return <div className={`${baseClass} ${variantClasses[variant] || ""} ${className}`} />;
};

export const BannerSkeleton = () => (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[750px] bg-gray-50 overflow-hidden relative">
        <Skeleton className="w-full h-full rounded-none" />
        <div className="absolute inset-0 flex items-center justify-start px-8 md:px-16">
            <div className="max-w-xl w-full space-y-6">
                <Skeleton className="h-4 w-32 bg-gray-200/50" />
                <Skeleton className="h-12 md:h-20 w-full bg-gray-200/50" />
                <Skeleton className="h-6 w-2/3 bg-gray-200/30" />
                <Skeleton className="h-12 w-48 rounded-xl bg-gray-200/50" />
            </div>
        </div>
    </div>
);

export const CollectionSkeleton = ({ count = 8 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 p-2">
                <Skeleton className="w-full h-full rounded-lg" />
            </div>
        ))}
    </div>
);

export const ProductCardSkeleton = ({ viewMode = "grid" }) => (
    <div className={`bg-white rounded-[20px] sm:rounded-[32px] overflow-hidden border border-gray-100 ${viewMode === 'list' ? 'flex p-4 gap-6' : 'flex flex-col h-full shadow-sm'}`}>
        <div className={`relative ${viewMode === 'grid' ? 'aspect-square' : 'w-48 h-48'} shrink-0 bg-gray-50 uppercase`}>
            <Skeleton className="w-full h-full rounded-none" />

            {/* Badge Overlay Skeleton */}
            <div className="absolute top-3 left-3 z-10">
                <Skeleton className="h-5 w-14 rounded-md opacity-50 bg-gray-200" />
            </div>

            {/* Heart Overlay Skeleton */}
            <div className="absolute top-3 right-3 z-10">
                <Skeleton className="h-9 w-9 rounded-full opacity-50 bg-white shadow-sm" />
            </div>
        </div>
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
            <div className="space-y-2.5 flex-1">
                {/* Collection Label */}
                <Skeleton className="h-2 w-20 opacity-40 uppercase" />

                {/* Product Name */}
                <Skeleton className="h-5 w-full rounded-md" />

                {/* Price Row */}
                <div className="flex items-center gap-3 pt-2">
                    <Skeleton className="h-7 w-20 rounded-md" />
                    <Skeleton className="h-4 w-12 opacity-30 rounded-md" />
                </div>
            </div>

            {/* CTA Button Skeleton */}
            <div className="mt-5 pt-1">
                <Skeleton className="h-11 w-full rounded-xl border-2 border-gray-50" />
            </div>
        </div>
    </div>
);

export const ProductSkeleton = ({ count = 6, viewMode = "grid" }) => (
    <div className={viewMode === 'grid'
        ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
        : "space-y-6"}>
        {[...Array(count)].map((_, i) => (
            <ProductCardSkeleton key={i} viewMode={viewMode} />
        ))}
    </div>
);

export const ReelSkeleton = ({ count = 4 }) => (
    <div className="flex gap-4 md:gap-6 overflow-hidden">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="flex-1 aspect-9/16 relative rounded-2xl overflow-hidden border border-gray-100 min-w-[200px]">
                <Skeleton className="w-full h-full rounded-none" />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/20 to-transparent space-y-2">
                    <Skeleton className="h-4 w-3/4 bg-white/30" />
                    <Skeleton className="h-3 w-1/2 bg-white/20" />
                </div>
            </div>
        ))}
    </div>
);

export const ProductDetailSkeleton = () => (
    <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div className="space-y-4">
                    <div className="aspect-square rounded-3xl overflow-hidden border border-gray-100 bg-gray-50">
                        <Skeleton className="w-full h-full rounded-none" />
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="shrink-0 w-20 h-20 rounded-xl border-2 border-transparent bg-gray-50 overflow-hidden">
                                <Skeleton className="w-full h-full rounded-none" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-12 w-3/4" />
                        <div className="flex items-center gap-4">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="w-4 h-4 rounded-full" />)}
                            </div>
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-40" />
                        <div className="flex gap-3 items-center">
                            <Skeleton className="h-6 w-24 opacity-40" />
                            <Skeleton className="h-5 w-20 rounded-md bg-green-50" />
                        </div>
                    </div>
                    <div className="space-y-4 pt-6 border-t border-gray-50">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-24 w-full rounded-xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2].map(i => (
                            <div key={i} className="h-16 bg-gray-50 rounded-xl p-3 border border-gray-100 flex gap-3">
                                <Skeleton className="w-10 h-10 rounded-lg" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-12 w-48 rounded-xl" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-14 rounded-xl" />
                            <Skeleton className="h-14 rounded-xl border-2 border-gray-100 bg-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const ContactSkeleton = () => (
    <div className="max-w- screen-2xl mx-auto px-4 md:px-12 lg:px-24 py-10 md:py-20">
        <div className="text-center mb-16 space-y-4">
            <Skeleton className="h-12 w-64 md:w-96 rounded-2xl mx-auto" />
            <Skeleton className="h-6 w-48 md:w-80 rounded-lg mx-auto opacity-40" />
        </div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-8">
                <Skeleton className="h-10 w-48 rounded-lg" />
                <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-white rounded-2xl border border-gray-50 p-6 flex items-start gap-4 shadow-sm">
                            <Skeleton className="w-12 h-12 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-6 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-50 space-y-6 shadow-sm">
                <div className="text-center space-y-2">
                    <Skeleton className="h-8 w-1/2 mx-auto" />
                    <Skeleton className="h-4 w-1/3 mx-auto opacity-40" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-48 w-full rounded-xl" />
                </div>
                <Skeleton className="h-14 w-full rounded-xl" />
            </div>
        </div>
    </div>
);

export const CartSkeleton = () => (
    <div className="grid lg:grid-cols-12 gap-12 min-h-[60vh]">
        <div className="lg:col-span-8 space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-44 bg-white rounded-[24px] border border-gray-50 p-4 flex gap-6 animate-pulse">
                    <Skeleton className="w-36 h-36 rounded-[18px] shrink-0 bg-gray-100" />
                    <div className="flex-1 space-y-4 py-2">
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-20 opacity-40" />
                            <Skeleton className="h-6 w-3/4" />
                        </div>
                        <div className="flex justify-between items-end pt-4 border-t border-gray-50">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-10 w-24 rounded-xl" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="lg:col-span-4">
            <div className="h-80 bg-white rounded-[32px] border border-gray-50 p-8 space-y-8 animate-pulse">
                <Skeleton className="h-8 w-1/2" />
                <div className="space-y-4">
                    <div className="flex justify-between"><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-16" /></div>
                    <div className="flex justify-between"><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-16" /></div>
                    <div className="pt-8 border-t-2 border-dashed border-gray-50 flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
                <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
        </div>
    </div>
);

export const CheckoutSkeleton = () => (
    <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm space-y-6">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="w-24 h-4 rounded-md" />
            </div>
            <Skeleton className="w-20 h-9 rounded-xl" />
        </div>
        <div className="space-y-3">
            <Skeleton className="h-7 w-1/3 rounded-lg" />
            <Skeleton className="h-5 w-2/3 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md opacity-40" />
            <Skeleton className="h-4 w-1/4 rounded-md pt-4 opacity-30" />
        </div>
    </div>
);

export const CheckoutSummarySkeleton = () => (
    <div className="space-y-4">
        {[1, 2].map(i => (
            <div key={i} className="flex gap-4 items-center">
                <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-12 opacity-40" />
                </div>
                <Skeleton className="h-4 w-16" />
            </div>
        ))}
    </div>
);

export const OrderSkeleton = ({ count = 3 }) => (
    <div className="space-y-6 min-h-[60vh]">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-50 flex flex-wrap gap-8">
                    {[1, 2, 3, 4].map(j => (
                        <div key={j} className="space-y-2">
                            <Skeleton className="h-3 w-16 opacity-40" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                </div>
                <div className="p-6 flex gap-6">
                    <Skeleton className="w-24 h-24 rounded-2xl bg-gray-100" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/3 opacity-40" />
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export const AddressSkeleton = ({ count = 3 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[50vh]">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="bg-white rounded-[28px] p-6 border border-gray-50 space-y-6 shadow-sm">
                <div className="flex justify-between">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-2/3 opacity-60" />
                    <Skeleton className="h-4 w-1/2 opacity-40" />
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-50">
                    <div className="flex gap-2">
                        <Skeleton className="w-10 h-10 rounded-xl" />
                        <Skeleton className="w-10 h-10 rounded-xl" />
                    </div>
                    <Skeleton className="h-4 w-20 my-auto" />
                </div>
            </div>
        ))}
    </div>
);

export default Skeleton;

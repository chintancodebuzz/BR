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
    <div className="w-full h-[500px] md:h-[600px] relative overflow-hidden">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl w-full px-6 space-y-6">
                <Skeleton className="h-4 w-32 bg-white/20" />
                <Skeleton className="h-16 w-3/4 bg-white/20" />
                <Skeleton className="h-6 w-1/2 bg-white/10" />
                <Skeleton className="h-12 w-40 bg-white/30 rounded-full" />
            </div>
        </div>
    </div>
);

export const CollectionSkeleton = ({ count = 4 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto px-6 md:px-12 lg:px-24">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 p-2">
                <Skeleton className="w-full h-full rounded-lg" />
            </div>
        ))}
    </div>
);

export const ProductSkeleton = ({ count = 6, viewMode = "grid" }) => (
    <div className={viewMode === 'grid'
        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
        : "space-y-4"}>
        {[...Array(count)].map((_, i) => (
            <div key={i} className={`bg-white rounded-xl border border-gray-100 overflow-hidden ${viewMode === 'list' ? 'flex p-4 gap-6' : 'flex flex-col h-full'}`}>
                <div className={`${viewMode === 'grid' ? 'aspect-square' : 'w-48 h-48'} shrink-0`}>
                    <Skeleton className="w-full h-full rounded-none" />
                </div>
                <div className="p-4 flex-1 space-y-3">
                    <Skeleton className="h-3 w-20 opacity-60" />
                    <Skeleton className="h-5 w-full" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-4 w-12 opacity-40" />
                    </div>
                    <div className="pt-2">
                        <Skeleton className="h-10 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export const ReelSkeleton = ({ count = 4 }) => (
    <div className="flex gap-6 overflow-hidden px-6 md:px-12 lg:px-24">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="min-w-[280px] h-[500px] md:h-[600px] relative rounded-3xl overflow-hidden border border-gray-100">
                <Skeleton className="w-full h-full" />
                <div className="absolute bottom-8 left-6 right-6 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-white/30" />
                    <Skeleton className="h-4 w-1/2 bg-white/20" />
                </div>
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
                    <Skeleton className="w-24 h-24 rounded-2xl" />
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
            <div key={i} className="bg-white rounded-[28px] p-6 border border-gray-50 space-y-6">
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

export const ProductDetailSkeleton = () => (
    <div className="min-h-screen bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-12">
            <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-4">
                    <div className="aspect-square rounded-3xl overflow-hidden border border-gray-100">
                        <Skeleton className="w-full h-full" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square rounded-xl border border-gray-100 overflow-hidden">
                                <Skeleton className="w-full h-full" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-8 py-4">
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-12 w-full" />
                        <div className="flex items-center gap-4">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="w-4 h-4" />)}
                            </div>
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex items-center gap-4 pt-4">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-6 w-24 opacity-40" />
                            <Skeleton className="h-8 w-20 rounded-md bg-emerald-50" />
                        </div>
                    </div>
                    <Skeleton className="h-24 w-full rounded-2xl" />
                    <div className="flex gap-4">
                        <Skeleton className="h-14 flex-1 rounded-2xl" />
                        <Skeleton className="h-14 w-14 rounded-2xl" />
                    </div>
                    <div className="space-y-4 pt-8 border-t border-gray-100">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-4">
                                <Skeleton className="w-10 h-10 rounded-lg" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-1/2 opacity-60" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const CartSkeleton = () => (
    <div className="grid lg:grid-cols-12 gap-12 min-h-[60vh]">
        <div className="lg:col-span-8 space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-44 bg-white rounded-[24px] border border-gray-50 p-4 flex gap-6 animate-pulse">
                    <Skeleton className="w-36 h-36 rounded-[18px] shrink-0" />
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

export const ContactSkeleton = () => (
    <div className="space-y-12">
        <div className="text-center space-y-4">
            <Skeleton className="h-12 w-1/2 rounded-2xl mx-auto" />
            <Skeleton className="h-6 w-1/3 rounded-lg mx-auto opacity-40" />
        </div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-8">
                <Skeleton className="h-10 w-48 rounded-lg" />
                <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-white rounded-2xl border border-gray-50 p-6 flex items-start gap-4">
                            <Skeleton className="w-12 h-12 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-6 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white rounded-3xl p-10 border border-gray-50 space-y-6">
                <div className="text-center space-y-2">
                    <Skeleton className="h-8 w-1/2 mx-auto" />
                    <Skeleton className="h-4 w-1/3 mx-auto opacity-40" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <Skeleton className="h-12 w-full rounded-xl" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                </div>
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-14 w-full rounded-xl" />
            </div>
        </div>
    </div>
);

export default Skeleton;

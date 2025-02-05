import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
    return (
        <div className="flex flex-col space-y-3 mt-12">
            <div className="space-y-2">
                <div className=" flex items-center justify-between">
                    <Skeleton className="h-10 w-72" />
                    <div className="flex gap-1">
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-44" />
                    </div>
                </div>
            <Skeleton className="h-12 w-full rounded-md" />
                <div className="flex gap-1">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-10 w-10" />
                </div>
                <div className="flex gap-1">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-10 w-10" />
                </div>
                <div className="flex gap-1">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-10 w-10" />
                </div>
            </div>
        </div>
    )
}
import {FC} from "react";
import {Skeleton} from "@/app/components/skeletons/skeleton/Skeleton";

export const Skeletons: FC = () => {
    const countSkeleton = 6
    const countSkeletonArr = Array.from(Array(countSkeleton).keys());
    return <div>
        {countSkeletonArr.map((i) => <Skeleton key={i}/>)}
        <Skeleton/>
    </div>
}
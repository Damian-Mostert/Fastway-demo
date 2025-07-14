import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';


type Props = {
    error:boolean,
    title:string,
    trackingNumber:string
};

export default function GeneratedQuote({
    trackingNumber
}:Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Track',
            href: '/',
        },
        {
            title: `Parcel - ${trackingNumber}`,
            href: "#",
        },

    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Parcel - ${trackingNumber}`}/>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

            </div>
        </AppLayout>
    );
}

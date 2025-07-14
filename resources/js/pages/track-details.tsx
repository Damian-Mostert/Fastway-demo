import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';


type Props = {
    title:string,
    trackingNumber:string,
    body:string
};

export default function ItemDetails({
    body,
    trackingNumber
}:Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Track',
            href: '/track',
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
                <div dangerouslySetInnerHTML={{__html:body}} className='fastway-content'></div>
            </div>
        </AppLayout>
    );
}

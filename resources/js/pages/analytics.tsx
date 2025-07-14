import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analytics',
        href: '/analytics',
    },
];

type AnalyticsProps = {
    total_tracked:number,
    total_quotes:number,
    total_shipped:number
}

export default function Analytics({total_tracked,total_quotes,total_shipped}:AnalyticsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            <AnalyticsCards total_quotes={total_quotes} total_shipped={total_shipped} total_tracked={total_tracked}/>
        </AppLayout>
    );
}


export function AnalyticsCards({total_tracked,total_quotes,total_shipped}:AnalyticsProps){
    return <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="relative flex flex-col aspect-video overflow-hidden p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <h2 className='text-2xl'>Total quotes done</h2>
                <div className='text-7xl m-auto text-[#BA0C2F]'>{total_quotes}</div>
            </div>
            <div className="relative flex flex-col aspect-video overflow-hidden p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <h2 className='text-2xl'>Total items tracked</h2>
                <div className='text-7xl m-auto text-[#BA0C2F]'>{total_tracked}</div>
            </div>
        </div>
        <div className="relative min-h-[100vh] flex flex-col flex-1 p-4 bg-neutral-100 dark:bg-neutral-900 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
            <h2 className='text-2xl'>Total items shipped</h2>
            <div className='text-6xl m-auto text-[#BA0C2F]'>{total_shipped}</div>
        </div>
    </div>
}
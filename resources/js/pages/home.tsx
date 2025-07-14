import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrackingForm } from './track';
import { QuoteForm } from './quote';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Home',
		href: '/home',
	},
];


export default function Dashboard() {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Home" />
			<div className='w-full flex p-4 flex-col m-auto gap-16 lg:w-2/3 pb-8'>
                <TrackingForm/>
                <QuoteForm/>
            </div>
		</AppLayout>
	);
}


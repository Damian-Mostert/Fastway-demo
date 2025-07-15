import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function QuoteHistory({
    quotes
}:any) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Old quotes',
            href: '/old-quotes',
        },
    ];
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Old quotes`}/>
            <div className="flex fastway-content h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <td>
                                ID
                            </td>
                            <td>
                                DATE
                            </td>
                            <td>
                                OPTIONS
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.data.map((q:any,key:any)=>{
                            return <tr key={key}>
                                <td>
                                    {q.id}
                                </td>
                                <td>
                                    {new Date(q.created_at).toDateString()}
                                </td>
                                <td className='flex'>
                                    <Link href={`/view-old-quote?id=${q.id}`}>
                                        <Button className='w-full'>View</Button>
                                    </Link>
                                </td>
                            </tr>
                        })}
                    </tbody>

                </table>
                <div className='w-full flex justify-end gap-4'>
                    <div className='flex gap-2 px-4'>
                        {Array.from({length:Math.ceil(quotes.total / quotes.per_page)}).map((_:any,index:number)=>{
                            return <Link href={`?page=${index+1}`} className={quotes.current_page == index + 1 ? "font-semibold":""} key={index}>
                                {index + 1}
                            </Link>
                        })}
                    </div>
                </div>                
            </div>
        </AppLayout>
    );
}
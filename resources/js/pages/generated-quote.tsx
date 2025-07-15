import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';


type Props = {
    title:string,
    body:any
};

type Service = {
    type: string,
    name: string,
    labelcolour: string,
    labelcolour_array: string[],
    labelcolour_pretty: string,
    labelcolour_pretty_array: string[],
    weightlimit: number,
    baseweight: number,
    excess_labels_required: number,
    excess_label_price_normal: string,
    excess_label_price_frequent: string,
    excess_label_price_normal_exgst: string,
    excess_label_price_frequent_exgst: string,
    labelprice_normal: string,
    labelprice_frequent: string,
    labelprice_normal_exgst: string,
    labelprice_frequent_exgst: string,
    totalprice_normal: string,
    totalprice_frequent: string,
    totalprice_normal_exgst: number,
    totalprice_frequent_exgst: number,
    rural_labels_required: number,
    rural_labels_cost_exgst: string,
    rural_labels_cost:  string
}

export default function GeneratedQuote({
    title,
    body
}:Props) {

    const parsed = JSON.parse(body);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Track',
            href: '/',
        },
        {
            title: `${title}`,
            href: "#",
        },

    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${title}`}/>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {parsed.error ? <p>
                    {parsed.error}
                </p>:<>
                    {(()=>{
                        const {
                            isRural,
                            isSaturdayDeliveryAvailable,
                            from,
                            to,
                            state,
                            postcode,
                            delfranchise,
                            delfranchise_code,
                            pickfranchise,
                            pickfranchise_code,
                            pickfranchise_phone_number,
                            currency_symbol,
                            currency_taxword,
                            delivery_timeframe_days,
                            parcel_weight_kg,
                            services,
                            cheapest_service,
                            additional_services,
                            country_code,
                            multiple_regions,
                            delivery_rf_deeded
                        } = parsed.result;
                        
                        return <div className='w-full flex flex-col gap-4'>
                            <div className='w-full flex-wrap lg:flex-nowrap flex gap-2 items-center'>
                            <div className='mr-auto text-wrap w-full p-2 rounded-md border border-border'>
                                From <b>{from} ({delfranchise}, {delfranchise_code})</b> to <b> {state},{to} ({pickfranchise_code} {pickfranchise_phone_number})</b>
                            </div>
                            {isRural ?<div className='bg-red-400 w-max p-2 rounded-md text-white'>RURAL</div>:<div className='bg-green-400 w-max p-2 rounded-md text-white'>NOT RURAL</div>}
                            {!isSaturdayDeliveryAvailable ?<div className='bg-red-400 w-max p-2 rounded-md text-white'>BUSINESS DAY DELIVERIES ONLY</div>:<div className='bg-green-400 w-max p-2 rounded-md text-white'>CAN BE DELIVERED OVER THE WEEKEND</div>}
                            {multiple_regions ?<div className='bg-red-400 w-max p-2 rounded-md text-white'>MULTIPLE REGIONS</div>:<div className='bg-green-400 w-max p-2 rounded-md text-white'>SINGLE REGION</div>}
                            </div>
                            <div className='text-2xl'>Estimated delivery date: <b>{(new Date(Date.now() + (Number(delivery_timeframe_days) * (1000 * 60 * 60 * 24)))).toDateString()}</b></div>
                            <div className='p-2 rounded-md border border-border'>
                                <div className='flex'>Country code: <b className='ml-auto'>{country_code}</b></div>
                                <div className='flex'>Postal code: <b className='ml-auto'>{postcode}</b></div>
                            </div>
                            <div className='p-2 rounded-md border border-border'>
                                <div className='text-2xl flex'>
                                    Weight <b className='ml-auto'>{parcel_weight_kg}kg</b>
                                </div>
                            </div>
                            <div className='text-2xl font-semibold'>
                                Services
                            </div>
                            {cheapest_service?.[0] && <>
                                <div className='font-semibold'>
                                    Best valued service:
                                </div>
                                <Service curency_symbol={currency_symbol} service={cheapest_service[0]}/>
                            </>}                                    
                            <div className='font-semibold'>
                                All services
                            </div>
                            <div className='flex flex-col gap-2'>
                                {services.map((service:Service,key:number)=>{
                                    return <Service curency_symbol={currency_symbol} key={key} service={service}/>
                                })}
                            </div>
                            <div className='font-semibold'>
                                Additional services
                            </div>
                            <div className='flex flex-col gap-2'>
                                {additional_services.map((service:Service,key:number)=>{
                                    return <Service curency_symbol={currency_symbol} key={key} service={service}/>
                                })}
                            </div>  
                        </div>
                    })()}                
                </>}
            </div>
        </AppLayout>
    );
}


function Service({service,curency_symbol}:{service:Service,curency_symbol:string}){
    return <div className='p-2 flex gap-2 items-center rounded-md bg-accent-foreground text-accent'>
        <div className='min-w-6 min-h-6 rounded-full' style={{
            background:service.labelcolour
        }} />
        <div className='w-full fastway-content -mb-4'>
            <table>
                <thead>
                    <tr>
                        <td>
                            Type
                        </td>
                        <td>
                            Name
                        </td>
                        <td>
                            Base weight
                        </td>
                        <td>
                            Max weight
                        </td>
                        <td>
                            Price
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {service.type}
                        </td>
                        <td>
                            {service.name}
                        </td>
                        <td>
                            {service.baseweight} KG
                        </td>
                        <td>
                            {service.weightlimit} KG
                        </td>
                        <td>
                            {service.labelprice_normal}{curency_symbol}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import {useFormik} from "formik";
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import * as Yup from "yup";
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Track',
		href: '/track',
	},
];


export default function Dashboard() {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Track" />
			<div className='w-full flex flex-col m-auto lg:w-2/3'>
                <div className="flex h-full justify-center w-full items-center p-8">
                    <TrackingForm/>
                </div>
            </div>
		</AppLayout>
	);
}

type trackingForm = {
	trackingNumber:string
};


export function TrackingForm(){

	const {get,processing,setData:setFormValues} = useForm();
	const { values:data, setValues:setData, submitForm, errors, resetForm } = useFormik<Required<trackingForm>>({
		initialValues:{
			trackingNumber:""
		},
		validationSchema:Yup.object({
			trackingNumber:Yup.string().matches(/[a-zA-Z][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/,"Tracking number must start with one letter followed by 11 digits").required("Parcel ID is required")
		}),
		onSubmit(){
			get("/api/v1/track-parcel",{
				onSuccess(){
				},
				onError(error){
					resetForm()
					alert("Could not find parcel") 
				},
			});
		},
	});

	useEffect(()=>{
		//sync formik form data with inertia form data
		setFormValues(data);
	},[data]);

    return <form className="flex flex-col w-full" onSubmit={(ev)=>{
        ev.preventDefault();
        submitForm()
    }}>
        <div className="grid gap-6">
            <h2 className='text-3xl'>Track and Trace a Parcel</h2>
            <div className="grid gap-2">
                <Label htmlFor="text">Enter tracking number</Label>
                <Input
                    id="text"
                    type="text"
                    name="text"
                    autoFocus
                    tabIndex={1}
                    value={data.trackingNumber}
                    onChange={(e) => setData({
                        trackingNumber:e.target.value
                    })}
                    placeholder="Z0000000000"
                />
                <InputError message={errors.trackingNumber} />
            </div>
            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Track
            </Button>
        </div>
    </form>
}

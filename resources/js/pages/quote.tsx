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
		title: 'Quote',
		href: '/quote',
	},
];


export default function Dashboard() {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Quote" />
			<div className='w-full flex flex-col m-auto lg:w-2/3'>
                <div className="flex h-full justify-center w-full items-center p-8">
                    <QuoteForm/>
                </div>
            </div>
		</AppLayout>
	);
}


type quoteForm = {
    destination:string,
    destination_2:string,
    postal_code:string,
    weight:number,
	dimensions_x:number,
	dimensions_y:number,
	dimensions_z:number,
};



export function QuoteForm(){
	const {get,processing,setData:setFormValues} = useForm();
	const { values:data, setValues:setData, submitForm, errors, resetForm } = useFormik<Required<quoteForm>>({
		initialValues:{
            destination:"",
            destination_2:"",
            postal_code:"",
            weight:0,
            dimensions_x:0,
            dimensions_y:0,
            dimensions_z:0,
		},
		validationSchema:Yup.object({
            destination:Yup.string().required(),
            destination_2:Yup.string().required(),
            postal_code:Yup.string().required(),
            weight:Yup.number().min(1).max(30),
            dimensions_x:Yup.number().min(1).max(500),
            dimensions_y:Yup.number().min(1).max(500),
            dimensions_z:Yup.number().min(1).max(500),
		}),
		onSubmit(){
			get("/api/v1/generate",{
				onSuccess(){
				},
				onError(error){
                    console.error(error)
					alert("Failed to generate a quote") 
				},
			});
			resetForm()
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
            <h2 className='text-3xl'>Get a Quote for Sending a Parcel</h2>
            <div className="grid gap-2">
                <Label htmlFor="text">From destination</Label>
                <Input
                    id="text"
                    type="text"
                    name="destination"
                    tabIndex={1}
                    value={data.destination}
                    //@ts-ignore
                    onChange={(e) => setData({
                        ...data,
                        destination:e.target.value
                    })}
                    placeholder=""
                />
                <InputError message={errors.destination} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="text">To destination</Label>
                <Input
                    id="text"
                    type="text"
                    name="destination_2"
                    tabIndex={1}
                    value={data.destination_2}
                    //@ts-ignore
                    onChange={(e) => setData({
                        ...data,
                        destination_2:e.target.value
                    })}
                    placeholder=""
                />
                <InputError message={errors.destination_2} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="text">Postal code</Label>
                <Input
                    id="text"
                    type="text"
                    name="postal_code"
                    tabIndex={1}
                    value={data.postal_code}
                    //@ts-ignore
                    onChange={(e) => setData({
                        ...data,
                        postal_code:e.target.value
                    })}
                    placeholder="0000"
                />
                <InputError message={errors.postal_code} />
            </div>						
            <div className="grid gap-2">
                <Label htmlFor="text">Parcel weight</Label>
                <Input
                    id="text"
                    type="number"
                    name="weight"
                    tabIndex={1}
                    value={data.weight}
                    //@ts-ignore
                    onChange={(e) => setData({
                        ...data,
                        weight:e.target.valueAsNumber
                    })}
                    placeholder="12 KG"
                />
                <InputError message={errors.weight} />
            </div>						                            
            <div className="grid gap-2">
                <Label htmlFor="text">Parcel dimensions (in CM)</Label>
                <div className='w-full flex gap-8'>
                    <div className="flex w-full items-center gap-4">
                        <Label htmlFor="text">Width</Label>
                        <Input
                            id="text"
                            type="number"
                            name="dimensions_x"
                            tabIndex={1}
                            value={data.dimensions_x}
                            //@ts-ignore
                            onChange={(e) => setData({
                                ...data,
                                dimensions_x:e.target.valueAsNumber
                            })}
                            placeholder="0"
                        />
                    </div>	
                    <div className="flex w-full items-center gap-4">
                        <Label htmlFor="text">Length</Label>
                        <Input
                            id="text"
                            type="number"
                            name="dimensions_y"
                            tabIndex={1}
                            value={data.dimensions_y}
                            //@ts-ignore
                            onChange={(e) => setData({
                                ...data,
                                dimensions_y:e.target.valueAsNumber
                            })}
                            placeholder="0"
                        />
                    </div>	
                    <div className="flex w-full items-center gap-4">
                        <Label htmlFor="text">Height</Label>
                        <Input
                            id="text"
                            type="number"
                            name="dimensions_z"
                            tabIndex={1}
                            value={data.dimensions_z}
                            //@ts-ignore
                            onChange={(e) => setData({
                                ...data,
                                dimensions_z:e.target.valueAsNumber
                            })}
                            placeholder="0"
                        />
                    </div>	
                </div>
                <InputError message={errors.dimensions_x||errors.dimensions_y||errors.dimensions_z} />
            </div>
            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Generate quote
            </Button>
        </div>
    </form>
}
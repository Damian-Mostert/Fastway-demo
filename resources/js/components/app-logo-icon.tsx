import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        //@ts-expect-error
       <img {...props} src="/fastway-couriers-logo.png"/>
    );
}

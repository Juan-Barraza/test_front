import React, { useState, useEffect, Suspense } from 'react';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

interface Coordinates {
    longitude?: number;
    latitude?: number;
}

interface Attributes {
    external_id?: string;
    magnitude?: number;
    place?: string;
    time?: string;
    tsunami?: boolean;
    mag_type?: string;
    title?: string;
    coordinates?: Coordinates;
}

interface Links {
    external_url?: string;
}

interface Feature {
    id?: number;
    type?: string;
    attributes?: Attributes;
    links?: Links;
}

interface Pagination {
    current_page?: number;
    total?: number;
    per_page?: number;
}

interface ApiResponse {
    data?: Feature[];
    pagination?: Pagination;
}


const FeatureList = () => {
    const [features, setFeatures] = useState<Feature[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/features')
            .then((response: Response) => response.json())
            .then((response: ApiResponse) => {
                setFeatures(response.data!);
            })
            .catch(error => {
                console.error('Error fetching features:', error);
            });
    }, []);

    return (
        <div>
            <h2>Features</h2>
            <Suspense fallback={<div>...Loading</div>}>
                <ul key="jshdd">
                    {features.map((feature: Feature) => (
                        <Link to={`features/${feature.id!}`}>
                            <li key={feature.id!}>
                                <strong>{feature.attributes!.title!}</strong> - Magnitude: {feature.attributes!.magnitude!}
                            </li>
                        </Link>
                    ))}
                </ul>
            </Suspense>
            {/* <Outlet /> */}
        </div>
    );
}

export default FeatureList;

import Link from "next/link";
import { useEffect, useState } from "react";
import PreviewPartComponent from "./PreviewPartComponent";
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from "next/router";
import TemplateTableCards from "./TemplateTableCards";
import TemplateComponent from "./TemplateComponent";

export default function ViewTemplatesComponent({companyID}){


    return (
        <div className="max-w-6xl mx-auto pt-4">
           <TemplateComponent companyID={companyID} />
        </div>
    )

}

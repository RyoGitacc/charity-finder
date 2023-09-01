export type orgType={
    name:string,
    location?:string,
    profileUrl:string,
    description: string,
    ein:string,
    logoCloudinaryId?: string,
    logoUrl?: string,
    matchedTerms: string[],
    slug:string,
    tags:string[],
    coverImageUrl?:string
}

export type AxiosReturnOrgType={
 nonprofits:orgType[]
}


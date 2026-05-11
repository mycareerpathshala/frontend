// imports
import { CountryType } from "./countryTypes";
import { MedicalApplicationRequirementType } from "./mbbsTypes";
import { StrapiCollectionMetaType, StrapiDataType, StrapiResponseType } from "./responseTypes";
import { ApplicationRequirementType, RequiredDocumentsType } from "./universityTypes";


// general application requirement typ
export interface GeneralRequirementType {
    id: number;
    undergraduate: ApplicationRequirementType;
    postgraduate: ApplicationRequirementType;
}


// fallback types
export interface FallbackApplicationRequirement {
    title: string;
    country: CountryType & StrapiDataType;
    mbbsApplicationRequirements: MedicalApplicationRequirementType;
    generalApplicationRequirement: GeneralRequirementType;
    docsAndCertification: RequiredDocumentsType[];
}

// application requirement response type
export type FallbackRequirementListResponse = StrapiResponseType<(FallbackApplicationRequirement & StrapiDataType)[], StrapiCollectionMetaType>

